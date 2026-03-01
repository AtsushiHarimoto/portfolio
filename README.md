# Atsushi Harimoto — Portfolio

[日本語](docs/README.ja.md) | [繁體中文](docs/README.zh-TW.md)

A personal portfolio website built with a cinematic, immersive aesthetic — cherry blossom pink on deep violet-grey, powered by WebGL shaders, 3D navigation, and full trilingual i18n support.

**Live site:** [atsushiharimoto.github.io/portfolio](https://atsushiharimoto.github.io/portfolio)

---

## Features

- **Immersive WebGL hero** — full-screen water ripple shader rendered with OGL (custom GLSL), reacts to mouse/touch
- **3D navigation** — arc-layout card navigation built on Three.js with depth parallax
- **Floating skill bubbles** — physics-driven skill tags rendered in WebGL
- **Sakura particle system** — ambient cherry blossom petal animation
- **Full i18n** — English, Japanese (日本語), and Traditional Chinese (繁體中文) with zero-reload locale switching
- **Live demos** — embedded showcases of Moyin Gateway, Dev Dashboard, and Game projects
- **Featured video** — YouTube embed with lazy loading and strict CSP sandbox
- **Scroll-triggered animations** — Framer Motion viewport animations throughout
- **Static export** — fully pre-rendered HTML for GitHub Pages hosting
- **Accessible motion** — respects `prefers-reduced-motion` system preference

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI Library | React 18 + TypeScript 5 |
| Styling | Tailwind CSS 3 + custom `moyin-*` color tokens |
| Animation | Framer Motion 11 + GSAP 3 |
| WebGL | Three.js 0.183 + OGL 1.0 (custom GLSL shaders) |
| Icons | Lucide React |
| Markdown | react-markdown + remark-gfm |
| Diagrams | Mermaid.js |
| Build | Vite (via Next.js) |
| Deploy | GitHub Pages (static export) |

### Brand Design Tokens

The visual identity uses a fixed palette defined in `tailwind.config.ts`:

| Role | Token | Value |
|---|---|---|
| Background (60%) | `moyin-dark` | `#1a1625` |
| Accent (10%) | `moyin-pink` | `#ffc0d3` |
| Text base (30%) | `moyin-text-primary` | `#e8eef5` |
| Petal accent | `moyin-petal` | `#e8b4d4` |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+ (or pnpm / yarn)

### Install & run locally

```bash
git clone https://github.com/AtsushiHarimoto/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

The static output is written to the `out/` directory, ready to serve from any static host.

---

## Project Structure

```
portfolio/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── client-layout.tsx       # Client shell (WebGL bg, header, footer, i18n)
│   ├── page.tsx                # Home page (hero, demos, CTA)
│   ├── projects/               # Projects listing + live demo embeds
│   ├── articles/               # Technical articles (Markdown)
│   ├── career/                 # Career timeline
│   └── about/                  # About page
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SakuraBackground.tsx    # CSS/canvas cherry blossom particles
│   └── webgl/
│       ├── WaterRippleHero.tsx # OGL water ripple shader (full-screen bg)
│       ├── ImmersiveNav.tsx    # Three.js 3D navigation cards
│       ├── FloatingSkillBubbles.tsx  # WebGL floating skill tags
│       ├── FloatingMiniNav.tsx # Compact nav for inner pages
│       └── shaders/            # GLSL vertex & fragment shaders
├── lib/
│   ├── i18n.ts                 # Translation strings (en / ja / zh-TW)
│   ├── locale-context.tsx      # React context + locale switcher hook
│   ├── projects.ts             # Project data
│   └── articles.ts             # Article metadata
├── public/                     # Static assets
├── design/                     # Design references & tokens
├── next.config.mjs             # Static export config (basePath: /portfolio)
├── tailwind.config.ts          # Brand color tokens & custom animations
└── tsconfig.json
```

---

## Deployment

This site is deployed to **GitHub Pages** via static export.

`next.config.mjs` sets:
- `output: 'export'` (production only)
- `basePath: '/portfolio'`
- `assetPrefix: '/portfolio/'`
- `images.unoptimized: true` (required for static export)

To deploy manually:

```bash
npm run build
# The `out/` directory contains the deployable static site.
# Push it to the gh-pages branch or configure GitHub Actions.
```

A GitHub Actions workflow is recommended for automatic deployment on push to `main`.

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero (WebGL), featured video, live demos, CTA |
| `/projects/` | Project cards and embedded live demos |
| `/articles/` | Technical writing (Markdown rendered) |
| `/career/` | Career timeline |
| `/about/` | Bio and contact |

---

## License

[MIT](LICENSE) — feel free to use this as a reference or starting point for your own portfolio.

---

<p align="center">
  Built with Next.js · Styled with cherry blossom · Powered by WebGL
</p>
