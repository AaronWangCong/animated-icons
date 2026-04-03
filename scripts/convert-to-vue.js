const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "../icons");
const vueDir = path.join(__dirname, "../icons-vue");

if (!fs.existsSync(vueDir)) {
  fs.mkdirSync(vueDir, { recursive: true });
}

// 已转换的文件
const converted = fs
  .readdirSync(vueDir)
  .filter((f) => f.endsWith(".vue"))
  .map((f) => f.replace(".vue", ""));

const files = fs
  .readdirSync(iconsDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(".tsx", ""));

const toConvert = files.filter((f) => !converted.includes(f));
console.log(`Already converted: ${converted.length}`);
console.log(`Need to convert: ${toConvert.length}`);

// 将文件名转为 PascalCase 类名
function toPascalCase(str) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

// 将文件名转为 camelCase CSS 类名
function toCssClass(str) {
  return str;
}

/**
 * 从 TSX 内容中提取 SVG 元素（去掉 motion. 前缀）
 */
function extractSvgContent(tsx) {
  // 找到 return 语句中的 svg（支持 <svg> 和 <motion.svg>）
  const svgMatch = tsx.match(/<(?:motion\.)?svg[\s\S]*?<\/(?:motion\.)?svg>/);
  if (!svgMatch) return null;

  let svg = svgMatch[0];

  // 移除 motion. 前缀
  svg = svg.replace(/<motion\./g, "<").replace(/<\/motion\./g, "</");

  // 移除 React 特有属性
  svg = svg.replace(/\s+animate=\{[^}]+\}/g, "");
  svg = svg.replace(/\s+initial="[^"]*"/g, "");
  svg = svg.replace(/\s+variants=\{[^}]+\}/g, "");
  svg = svg.replace(/\s+transition=\{[^}]+\}/g, "");
  svg = svg.replace(/\s+custom=\{[^}]+\}/g, "");
  svg = svg.replace(/\s+whileHover=\{[^}]+\}/g, "");
  svg = svg.replace(/\s+style=\{[^}]+\}/g, "");

  // 转换 JSX 属性为 HTML 属性
  svg = svg.replace(/strokeLinecap/g, "stroke-linecap");
  svg = svg.replace(/strokeLinejoin/g, "stroke-linejoin");
  svg = svg.replace(/strokeWidth/g, "stroke-width");
  svg = svg.replace(/fillRule/g, "fill-rule");
  svg = svg.replace(/clipRule/g, "clip-rule");
  svg = svg.replace(/clipPath/g, "clip-path");
  svg = svg.replace(/gradientUnits/g, "gradient-units");
  svg = svg.replace(/gradientTransform/g, "gradient-transform");
  svg = svg.replace(/stopColor/g, "stop-color");
  svg = svg.replace(/stopOpacity/g, "stop-opacity");
  svg = svg.replace(/viewBox/g, "viewBox");
  svg = svg.replace(/className=/g, "class=");

  // 转换 JSX 表达式属性 {size} -> :size="size"
  svg = svg.replace(/height=\{size\}/g, ":height=\"size\"");
  svg = svg.replace(/width=\{size\}/g, ":width=\"size\"");
  svg = svg.replace(/stroke="currentColor"/g, ":stroke=\"color\"");
  svg = svg.replace(/stroke-width="2"/g, ":stroke-width=\"strokeWidth\"");

  return svg;
}

/**
 * 分析动画变体，提取动画信息
 */
function analyzeAnimations(tsx) {
  const animations = [];

  // 查找所有 Variants 定义
  const variantMatches = tsx.matchAll(/const\s+(\w+):\s*Variants\s*=\s*\{([\s\S]*?)^};/gm);

  for (const match of variantMatches) {
    const varName = match[1];
    const varBody = match[2];

    // 提取 animate 状态中的属性
    const animateMatch = varBody.match(/animate:\s*\{([\s\S]*?)(?=\},?\s*(?:\w+:|$))/);
    if (!animateMatch) continue;

    const animateBody = animateMatch[1];

    const anim = { name: varName, props: {} };

    // translateX
    const txMatch = animateBody.match(/translateX:\s*\[([^\]]+)\]/);
    if (txMatch) {
      const vals = txMatch[1].split(",").map((v) => parseFloat(v.trim()));
      anim.props.translateX = vals;
    }

    // translateY
    const tyMatch = animateBody.match(/translateY:\s*\[([^\]]+)\]/);
    if (tyMatch) {
      const vals = tyMatch[1].split(",").map((v) => parseFloat(v.trim()));
      anim.props.translateY = vals;
    }

    // rotate
    const rotMatch = animateBody.match(/rotate:\s*\[([^\]]+)\]/);
    if (rotMatch) {
      const vals = rotMatch[1].split(",").map((v) => parseFloat(v.trim()));
      anim.props.rotate = vals;
    }

    // scale
    const scaleMatch = animateBody.match(/scale:\s*\[([^\]]+)\]/);
    if (scaleMatch) {
      const vals = scaleMatch[1].split(",").map((v) => parseFloat(v.trim()));
      anim.props.scale = vals;
    }

    // opacity
    const opacityMatch = animateBody.match(/opacity:\s*\[([^\]]+)\]/);
    if (opacityMatch) {
      const vals = opacityMatch[1].split(",").map((v) => parseFloat(v.trim()));
      anim.props.opacity = vals;
    }

    // duration
    const durationMatch = animateBody.match(/duration:\s*([\d.]+)/);
    if (durationMatch) {
      anim.duration = parseFloat(durationMatch[1]);
    } else {
      anim.duration = 0.5;
    }

    animations.push(anim);
  }

  return animations;
}

/**
 * 从 SVG 内容中找到带有特定 variants 的元素，并给它们加上 class
 */
function addAnimationClasses(svg, tsx) {
  // 找到所有 motion 元素及其 variants
  const motionElements = [];
  const motionRegex = /<motion\.([\w]+)[^>]*variants=\{(\w+)\}[^>]*(?:\/?>)/g;
  let match;

  while ((match = motionRegex.exec(tsx)) !== null) {
    motionElements.push({
      tag: match[1],
      variantName: match[2],
    });
  }

  return { svg, motionElements };
}

/**
 * 生成简单的 Vue 组件
 * 对于复杂动画，使用通用的 bounce/pulse 动画
 */
function generateVueComponent(name, tsx) {
  const className = `${name}-icon`;

  // 提取 SVG 内容
  let svgContent = extractSvgContent(tsx);
  if (!svgContent) {
    console.warn(`Could not extract SVG from ${name}`);
    return null;
  }

  // 分析动画类型
  const hasTranslateX = tsx.includes("translateX");
  const hasTranslateY = tsx.includes("translateY");
  const hasRotate = tsx.includes("rotate");
  const hasScale = tsx.includes("scale");
  const hasOpacity = tsx.includes("opacity");
  const hasPathMorph = tsx.includes("d:") && tsx.includes("animate");

  // 找出所有 motion 元素对应的 variants
  const motionPairs = [];
  const motionRegex = /<motion\.([\w]+)([^>]*?)variants=\{(\w+)\}([^>]*?)(?:>([\s\S]*?)<\/motion\.\1>|\/>)/g;
  let mMatch;
  while ((mMatch = motionRegex.exec(tsx)) !== null) {
    motionPairs.push({
      tag: mMatch[1],
      variantName: mMatch[3],
    });
  }

  // 为每个 motion 元素生成唯一 class
  const animClasses = motionPairs.map((p, i) => {
    const cls = `anim-${i}`;
    return { ...p, cls };
  });

  // 在 SVG 中为对应元素添加 class（简化处理：按顺序匹配）
  // 先找到所有没有 class 的可动画元素
  let processedSvg = svgContent;

  // 给 SVG 根元素添加动态属性
  processedSvg = processedSvg.replace(
    /<svg/,
    `<svg\n      xmlns="http://www.w3.org/2000/svg"`
  );

  // 移除重复的 xmlns
  processedSvg = processedSvg.replace(
    /xmlns="http:\/\/www\.w3\.org\/2000\/svg"\s+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g,
    'xmlns="http://www.w3.org/2000/svg"'
  );

  // 确定动画方向和参数
  let animKeyframes = "";
  let animStyles = "";

  // 根据动画类型生成 CSS
  if (hasTranslateX && !hasTranslateY) {
    // 水平移动
    const rightMatch = tsx.match(/translateX:\s*\[0,\s*([\d.]+)/);
    const leftMatch = tsx.match(/translateX:\s*\[0,\s*-([\d.]+)/);
    const dist = rightMatch ? parseFloat(rightMatch[1]) : leftMatch ? -parseFloat(leftMatch[1]) : 3;
    animKeyframes = `@keyframes icon-anim {
  0% { transform: translateX(0); }
  50% { transform: translateX(${dist}px); }
  100% { transform: translateX(0); }
}`;
  } else if (hasTranslateY && !hasTranslateX) {
    const downMatch = tsx.match(/translateY:\s*\[0,\s*([\d.]+)/);
    const upMatch = tsx.match(/translateY:\s*\[0,\s*-([\d.]+)/);
    const dist = downMatch ? parseFloat(downMatch[1]) : upMatch ? -parseFloat(upMatch[1]) : 3;
    animKeyframes = `@keyframes icon-anim {
  0% { transform: translateY(0); }
  50% { transform: translateY(${dist}px); }
  100% { transform: translateY(0); }
}`;
  } else if (hasRotate) {
    const rotMatch = tsx.match(/rotate:\s*\[0,\s*([\d.]+)/);
    const deg = rotMatch ? parseFloat(rotMatch[1]) : 360;
    animKeyframes = `@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(${deg}deg); }
}`;
  } else if (hasScale) {
    const scaleMatch = tsx.match(/scale:\s*\[1,\s*([\d.]+)/);
    const s = scaleMatch ? parseFloat(scaleMatch[1]) : 1.2;
    animKeyframes = `@keyframes icon-anim {
  0% { transform: scale(1); }
  50% { transform: scale(${s}); }
  100% { transform: scale(1); }
}`;
  } else if (hasOpacity) {
    animKeyframes = `@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}`;
  } else {
    // 默认：轻微缩放
    animKeyframes = `@keyframes icon-anim {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}`;
  }

  // 获取 duration
  const durationMatch = tsx.match(/duration:\s*([\d.]+)/);
  const duration = durationMatch ? parseFloat(durationMatch[1]) : 0.5;

  animStyles = `.${className} svg.animating {
  animation: icon-anim ${duration}s ease-in-out forwards;
  transform-origin: center;
}`;

  // 清理 SVG：移除 JSX 特有内容
  processedSvg = processedSvg
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "") // JSX 注释
    .replace(/\s+key="[^"]*"/g, "") // key 属性
    .replace(/\s+ref=\{[^}]+\}/g, "") // ref
    .replace(/\s+onClick=\{[^}]+\}/g, "") // 事件
    .replace(/\s+onMouseEnter=\{[^}]+\}/g, "")
    .replace(/\s+onMouseLeave=\{[^}]+\}/g, "")
    .replace(/\{[^}]+\}/g, (m) => {
      // 处理剩余的 JSX 表达式
      const inner = m.slice(1, -1).trim();
      if (inner === "size") return "";
      return m;
    });

  // 最终清理
  processedSvg = processedSvg
    .replace(/\s+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, "") // 先移除所有
    .replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"') // 再加回一个
    .replace(/:height="size"/g, `:height="size"`)
    .replace(/:width="size"/g, `:width="size"`)
    .replace(/height=\{size\}/g, `:height="size"`)
    .replace(/width=\{size\}/g, `:width="size"`)
    .replace(/stroke="currentColor"/g, `:stroke="color"`)
    .replace(/stroke-width="2"/g, `:stroke-width="strokeWidth"`);

  // 给 SVG 添加动画 class
  processedSvg = processedSvg.replace(
    /<svg([^>]*)>/,
    `<svg$1\n      :class="{ animating: isAnimating || active }">`
  );

  // 缩进 SVG 内容
  const svgLines = processedSvg
    .split("\n")
    .map((line) => "      " + line)
    .join("\n");

  return `<script setup lang="ts">
import { ref } from "vue";

defineProps({
  size: { type: Number, default: 28 },
  color: { type: String, default: "currentColor" },
  strokeWidth: { type: Number, default: 2 },
  className: { type: String, default: "" },
  active: { type: Boolean, default: false },
});

const isAnimating = ref(false);
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  isAnimating.value = true;
}

function stopAnimation() {
  isControlled.value = true;
  isAnimating.value = false;
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) isAnimating.value = true;
}

function handleMouseLeave() {
  if (!isControlled.value) isAnimating.value = false;
}
</script>

<template>
  <div
    class="${className}"
    :class="[className]"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
${svgLines}
  </div>
</template>

<style scoped>
.${className} {
  display: inline-flex;
}

${animStyles}

${animKeyframes}
</style>
`;
}

let successCount = 0;
let failCount = 0;

for (const name of toConvert) {
  const tsxPath = path.join(iconsDir, `${name}.tsx`);
  const vuePath = path.join(vueDir, `${name}.vue`);

  try {
    const tsx = fs.readFileSync(tsxPath, "utf-8");
    const vue = generateVueComponent(name, tsx);

    if (vue) {
      fs.writeFileSync(vuePath, vue, "utf-8");
      successCount++;
      if (successCount % 20 === 0) {
        console.log(`Progress: ${successCount}/${toConvert.length}`);
      }
    } else {
      failCount++;
      console.warn(`Failed to generate: ${name}`);
    }
  } catch (err) {
    failCount++;
    console.error(`Error processing ${name}:`, err.message);
  }
}

console.log(`\nDone! Success: ${successCount}, Failed: ${failCount}`);
console.log(`Total vue files: ${fs.readdirSync(vueDir).filter(f => f.endsWith('.vue')).length}`);
