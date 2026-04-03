const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "../icons/icons");
const vueDir = path.join(__dirname, "../packages/core/src/icons");

if (!fs.existsSync(vueDir)) {
  fs.mkdirSync(vueDir, { recursive: true });
}

function toPascalCase(str) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function matchBraces(str, startIdx) {
  let depth = 0;
  let i = startIdx;
  while (i < str.length) {
    if (str[i] === "{") depth++;
    else if (str[i] === "}") {
      depth--;
      if (depth === 0) return i + 1;
    }
    i++;
  }
  return i;
}

function matchSquareBraces(str, startIdx) {
  let depth = 0;
  let i = startIdx;
  while (i < str.length) {
    if (str[i] === "[") depth++;
    else if (str[i] === "]") {
      depth--;
      if (depth === 0) return i + 1;
    }
    i++;
  }
  return i;
}

function parseConstArrays(tsx) {
  const result = {};
  const arrayPattern = /(?:const|let)\s+([A-Z_][A-Z0-9_]*)\s*=\s*\[/g;
  let m;
  while ((m = arrayPattern.exec(tsx)) !== null) {
    const arrayName = m[1];
    const bracketStart = m.index + m[0].length - 1;
    const bracketEnd = matchSquareBraces(tsx, bracketStart);
    const arrayContent = tsx.slice(bracketStart, bracketEnd);
    try {
      const items = new Function(`return ${arrayContent}`)();
      if (items && items.length > 0) result[arrayName] = items;
    } catch (e) {}
  }
  return result;
}

function processMapExpansion(mapExpr, items) {
  const paramMatch = mapExpr.match(/\.map\s*\(\s*\(?\s*([^,)\s]+)(?:\s*,\s*([^)\s]+))?\s*\)?/);
  const itemParam = paramMatch ? paramMatch[1].trim() : "item";
  const indexParam = paramMatch && paramMatch[2] ? paramMatch[2].trim() : "index";

  const arrowIdx = mapExpr.indexOf("=>");
  if (arrowIdx === -1) return null;

  const jsxStart = mapExpr.indexOf("<", arrowIdx);
  if (jsxStart === -1) return null;

  let template = mapExpr.slice(jsxStart);
  template = template.replace(/\s*\)\s*\)\s*\}?\s*$/, "").trim();
  template = template.replace(/<motion\./g, "<").replace(/<\/motion\./g, "</");

  const framerProps = [
    "initial", "animate", "variants", "transition",
    "custom", "whileHover", "whileTap", "style", "exit"
  ];
  for (const prop of framerProps) {
    template = removeJsxPropWithBraces(template, prop);
  }

  const expanded = items.map((item, index) => {
    let el = template;

    // First, completely strip key={...} to prevent any nested braces (like `${i}`) from breaking the attribute eval regex
    el = removeJsxPropWithBraces(el, "key");
    el = el.replace(/\s+key="[^"]*"/g, "");

    // Evaluate attr={expr} for anything like x2={line.x + line.width}
    el = el.replace(
      /(\w[-\w]*)=\{([^}]+)\}/g,
      (match, attr, expr) => {
         if (expr.includes(itemParam + ".") || expr === itemParam || expr === indexParam || expr.includes(indexParam)) {
            try {
                const evaluate = new Function(itemParam, indexParam, `return ${expr}`);
                const val = evaluate(item, index);
                return `${attr}="${val}"`;
            } catch(e) {
                return `${attr}=""`;
            }
         }
         return match;
      }
    );

    // Evaluate {expr} content
    el = el.replace(
      /\{([^}]+)\}/g,
      (match, expr) => {
         if (expr.includes(itemParam + ".") || expr === itemParam || expr === indexParam || expr.includes(indexParam)) {
            try {
                const evaluate = new Function(itemParam, indexParam, `return ${expr}`);
                const val = evaluate(item, index);
                return String(val);
            } catch(e) {
                return "";
            }
         }
         return match;
      }
    );

    return el.trim();
  });
  return "\n" + expanded.join("\n") + "\n";
}

function expandMapExpressions(svg, constArrays) {
  // First, named arrays like {ARRAY_NAME.map(...)}
  const mapPattern = /\{([A-Z_][A-Z0-9_]*)\.map\s*\(/g;
  let result = "";
  let lastIndex = 0;
  let m;
  while ((m = mapPattern.exec(svg)) !== null) {
    const arrayName = m[1];
    const items = constArrays[arrayName];
    const exprStart = m.index;
    const exprEnd = matchBraces(svg, exprStart);
    const mapExpr = svg.slice(exprStart, exprEnd);

    result += svg.slice(lastIndex, exprStart);

    if (items && items.length > 0) {
      const expanded = processMapExpansion(mapExpr, items);
      if (expanded) result += expanded;
    }

    lastIndex = exprEnd;
    mapPattern.lastIndex = lastIndex;
  }
  svg = result + svg.slice(lastIndex);

  // Next, inline arrays like {[ {x: 1}, {x: 2} ].map(...)}
  let mapIdx = 0;
  while ((mapIdx = svg.indexOf(".map(")) !== -1) {
    let i = mapIdx - 1;
    while (i > 0 && /\s/.test(svg[i])) i--;
    if (svg[i] === "]") {
      let depth = 0;
      let startBracket = -1;
      for (let j = i; j >= 0; j--) {
        if (svg[j] === "]") depth++;
        else if (svg[j] === "[") {
          depth--;
          if (depth === 0) {
            startBracket = j;
            break;
          }
        }
      }
      if (startBracket !== -1) {
        let k = startBracket - 1;
        while (k > 0 && /\s/.test(svg[k])) k--;
        if (svg[k] === "{") {
          const exprStart = k;
          const exprEnd = matchBraces(svg, exprStart);
          const mapExpr = svg.slice(exprStart, exprEnd);
          const arrayContent = svg.slice(startBracket, i + 1);

          let items;
          try {
            items = new Function(`return ${arrayContent}`)();
          } catch (e) {}

          if (items && items.length > 0) {
            const expanded = processMapExpansion(mapExpr, items);
            if (expanded) {
              svg = svg.slice(0, exprStart) + expanded + svg.slice(exprEnd);
              continue; // Retry string slice index parsing since we mutated SVG string
            }
          }
          // Failed parse => strip it blindly to allow compilation
          svg = svg.slice(0, exprStart) + svg.slice(exprEnd);
          continue;
        }
      }
    }
    // Non-match map expression: replace `.map` to bypass infinite loop matching
    svg = svg.slice(0, mapIdx) + "__REPLACED_MAP__" + svg.slice(mapIdx + 4);
  }
  svg = svg.replace(/__REPLACED_MAP__/g, ".map");

  return svg;
}

function removeJsxPropWithBraces(svg, propName) {
  const pattern = new RegExp(`\\s+${propName}=\\{`, "g");
  let result = "";
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(svg)) !== null) {
    const braceStart = match.index + match[0].length - 1;
    const braceEnd = matchBraces(svg, braceStart);
    result += svg.slice(lastIndex, match.index);
    lastIndex = braceEnd;
    pattern.lastIndex = lastIndex;
  }

  result += svg.slice(lastIndex);
  return result;
}

function extractSvgContent(tsx, constArrays) {
  const svgMatch = tsx.match(/<(?:motion\.)?svg[\s\S]*?<\/(?:motion\.)?svg>/);
  if (!svgMatch) return null;

  let svg = svgMatch[0];

  svg = svg.replace(/<motion\./g, "<").replace(/<\/motion\./g, "</");

  if (constArrays && Object.keys(constArrays).length > 0) {
    svg = expandMapExpressions(svg, constArrays);
  } else {
    // Fallback trigger even if no constants for pure inline arrays parsing
    svg = expandMapExpressions(svg, {});
  }

  const framerProps = [
    "initial", "animate", "variants", "transition",
    "custom", "whileHover", "whileTap", "style", "exit", "key"
  ];
  for (const prop of framerProps) {
    svg = removeJsxPropWithBraces(svg, prop);
  }

  svg = svg.replace(/\s+initial="[^"]*"/g, "");

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
  svg = svg.replace(/strokeOpacity/g, "stroke-opacity");
  svg = svg.replace(/className=/g, "class=");

  svg = svg.replace(/height=\{size\}/g, ':height="size"');
  svg = svg.replace(/width=\{size\}/g, ':width="size"');
  svg = svg.replace(/stroke="currentColor"/g, ':stroke="color"');
  svg = svg.replace(/stroke-width="2"/g, ':stroke-width="strokeWidth"');

  // Convert pure scalars `{0.4}` to HTML string `"0.4"` for ANY prop e.g strokeOpacity={0.4}
  svg = svg.replace(/(\w[-\w]*)=\{([0-9.]+|-?[0-9.]+|"[^"]*"|'[^']*')\}/g, (_, attr, val) => {
    return `${attr}="${val.replace(/['"]/g, "")}"`;
  });

  svg = svg.replace(/\s+key="[^"]*"/g, "");
  svg = svg.replace(/\s+ref=\{[^}]+\}/g, "");
  svg = svg.replace(/\s+onClick=\{[^}]+\}/g, "");
  svg = svg.replace(/\s+onMouseEnter=\{[^}]+\}/g, "");
  svg = svg.replace(/\s+onMouseLeave=\{[^}]+\}/g, "");

  // Clear remaining unsupported simple JSX expressions
  svg = svg.replace(/\{[^{}]+\}/g, () => "");

  svg = svg
    .replace(/\s+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, "")
    .replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');

  svg = svg.replace(/\n{3,}/g, "\n\n");

  return svg;
}

function buildAnimKeyframes(tsx) {
  const hasTranslateX = tsx.includes("translateX");
  const hasTranslateY = tsx.includes("translateY");
  const hasRotate = /rotate[^d]/.test(tsx);
  const hasScale = tsx.includes("scale");
  const hasOpacity = tsx.includes("opacity");
  const hasPathLength = tsx.includes("pathLength");

  if (hasPathLength) {
    return {
      keyframes: `@keyframes icon-anim {
  0% { stroke-dashoffset: 100; stroke-dasharray: 100; }
  100% { stroke-dashoffset: 0; stroke-dasharray: 100; }
}`,
      styles: `svg.animating path, svg.animating circle, svg.animating line, svg.animating polyline { animation: icon-anim var(--d) ease-in-out forwards; }`,
    };
  } else if (hasTranslateX && hasTranslateY) {
    return {
      keyframes: `@keyframes icon-anim {
  0% { transform: translate(0, 0); }
  50% { transform: translate(2px, -2px); }
  100% { transform: translate(0, 0); }
}`,
      styles: `svg.animating { animation: icon-anim var(--d) ease-in-out forwards; transform-origin: center; }`,
    };
  } else if (hasTranslateX) {
    const rightMatch = tsx.match(/translateX:\s*\[0,\s*([\d.]+)/);
    const leftMatch = tsx.match(/translateX:\s*\[0,\s*-([\d.]+)/);
    const dist = rightMatch ? parseFloat(rightMatch[1]) : leftMatch ? -parseFloat(leftMatch[1]) : 3;
    return {
      keyframes: `@keyframes icon-anim {
  0% { transform: translateX(0); }
  50% { transform: translateX(${dist}px); }
  100% { transform: translateX(0); }
}`,
      styles: `svg.animating { animation: icon-anim var(--d) ease-in-out forwards; transform-origin: center; }`,
    };
  } else if (hasTranslateY) {
    const downMatch = tsx.match(/translateY:\s*\[0,\s*([\d.]+)/);
    const upMatch = tsx.match(/translateY:\s*\[0,\s*-([\d.]+)/);
    const dist = downMatch ? parseFloat(downMatch[1]) : upMatch ? -parseFloat(upMatch[1]) : 3;
    return {
      keyframes: `@keyframes icon-anim {
  0% { transform: translateY(0); }
  50% { transform: translateY(${dist}px); }
  100% { transform: translateY(0); }
}`,
      styles: `svg.animating { animation: icon-anim var(--d) ease-in-out forwards; transform-origin: center; }`,
    };
  } else if (hasRotate) {
    const rotMatch = tsx.match(/rotate:\s*\[0,\s*([\d.]+)/);
    const deg = rotMatch ? parseFloat(rotMatch[1]) : 360;
    const isPartial = deg < 90;
    if (isPartial) {
      return {
        keyframes: `@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(${deg}deg); }
  75% { transform: rotate(-${deg}deg); }
  100% { transform: rotate(0deg); }
}`,
        styles: `svg.animating { animation: icon-anim var(--d) ease-in-out forwards; transform-origin: center; }`,
      };
    }
    return {
      keyframes: `@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(${deg}deg); }
}`,
      styles: `svg.animating { animation: icon-anim var(--d) ease-in-out forwards; transform-origin: center; }`,
    };
  } else if (hasScale) {
    const scaleMatch = tsx.match(/scale:\s*\[1,\s*([\d.]+)/);
    const s = scaleMatch ? parseFloat(scaleMatch[1]) : 1.2;
    return {
      keyframes: `@keyframes icon-anim {
  0% { transform: scale(1); }
  50% { transform: scale(${s}); }
  100% { transform: scale(1); }
}`,
      styles: `svg.animating { animation: icon-anim var(--d) ease-in-out forwards; transform-origin: center; }`,
    };
  } else if (hasOpacity) {
    return {
      keyframes: `@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}`,
      styles: `svg.animating { animation: icon-anim var(--d) ease-in-out forwards; }`,
    };
  } else {
    return {
      keyframes: `@keyframes icon-anim {
  0% {
    stroke-dashoffset: 100;
    stroke-dasharray: 100;
  }
  100% {
    stroke-dashoffset: 0;
    stroke-dasharray: 100;
  }
}`,
      styles: `svg.animating { animation: icon-anim var(--d) ease-in-out forwards; transform-origin: center; }`,
    };
  }
}

function generateVueComponent(name, tsx) {
  const className = `${name}-icon`;

  const constArrays = parseConstArrays(tsx);

  let svgContent = extractSvgContent(tsx, constArrays);
  if (!svgContent) {
    console.warn(`Could not extract SVG from ${name}`);
    return null;
  }

  const { keyframes, styles } = buildAnimKeyframes(tsx);

  const durationMatch = tsx.match(/duration:\s*([\d.]+)/);
  const duration = durationMatch ? parseFloat(durationMatch[1]) : 0.5;

  svgContent = svgContent.replace(
    /<svg([^>]*)>/,
    `<svg$1\n          :class="{ animating: isAnimating || active }">`
  );

  const svgLines = svgContent
    .split("\n")
    .map((line) => "      " + line)
    .join("\n");

  const animStyle = styles
    .split(",")
    .map((sel) => sel.replace(/svg\.animating/g, `.${className} svg.animating`))
    .join(",")
    .replace(/var\(--d\)/g, `${duration}s`);

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

${animStyle}

${keyframes}
</style>
`;
}

const files = fs
  .readdirSync(iconsDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(".tsx", ""));

const forceAll = process.argv.includes("--force");
const converted = forceAll
  ? []
  : fs
      .readdirSync(vueDir)
      .filter((f) => f.endsWith(".vue"))
      .map((f) => f.replace(".vue", ""));

const toConvert = files.filter((f) => !converted.includes(f));
console.log(`Source TSX files: ${files.length}`);
console.log(`Already converted: ${converted.length}`);
console.log(`Need to convert: ${toConvert.length}`);
if (forceAll) console.log("(--force mode: reconverting all files)");

let successCount = 0;
let failCount = 0;
const failed = [];

for (const name of toConvert) {
  const tsxPath = path.join(iconsDir, `${name}.tsx`);
  const vuePath = path.join(vueDir, `${name}.vue`);

  try {
    const tsx = fs.readFileSync(tsxPath, "utf-8");
    const vue = generateVueComponent(name, tsx);

    if (vue) {
      fs.writeFileSync(vuePath, vue, "utf-8");
      successCount++;
      if (successCount % 50 === 0) {
        console.log(`Progress: ${successCount}/${toConvert.length}`);
      }
    } else {
      failCount++;
      failed.push(name);
    }
  } catch (err) {
    failCount++;
    failed.push(name);
    console.error(`Error processing ${name}:`, err.message);
  }
}

console.log(`\\nDone! Success: ${successCount}, Failed: ${failCount}`);
if (failed.length > 0) {
  console.log(`Failed icons: ${failed.join(", ")}`);
}
console.log(
  `Total vue files: ${
    fs.readdirSync(vueDir).filter((f) => f.endsWith(".vue")).length
  }`
);
