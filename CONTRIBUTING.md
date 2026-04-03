# Contributing to animated-icons

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs
Please open an [issue](https://github.com/AaronWangCong/animated-icons/issues) with:
- A clear description of the bug
- Steps to reproduce
- Expected vs actual behavior

### Suggesting New Icons
Open an issue with the tag `icon-request` and describe the icon you'd like to see added.

### Pull Requests

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/animated-icons.git
   cd animated-icons
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feat/my-new-icon
   ```
5. Make your changes
6. Start the docs dev server to preview:
   ```bash
   pnpm dev
   ```
7. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add new rocket icon"
   ```
8. Push and open a Pull Request

## Icon Component Guidelines

Each icon in `icons/` must follow this structure:

- **Props**: `size` (Number), `color` (String), `strokeWidth` (Number), `className` (String), `active` (Boolean)
- **Expose**: `startAnimation()` and `stopAnimation()` methods
- **Animation**: Triggered on `mouseenter` / `mouseleave` when not controlled
- **CSS**: Scoped styles with `@keyframes icon-anim`

## Development

```bash
# Start preview website
pnpm dev

# Build npm package
pnpm build:core

# Build docs site
pnpm build:docs
```

## Code of Conduct

Please be respectful and inclusive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).
