<div align="center">

# ⚡ ScrollForge
### The Ultimate Real-Time Scrolling Text Generator & Motion Typography Studio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ScrollForge-f97316?style=for-the-badge&logo=vercel&logoColor=white)](https://github.com/VedKalantri/ScrollForge)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br />

> **ScrollForge is a real-time motion typography studio that lets you design customizable scrolling text and export it instantly as an animated GIF, video, or clean HTML/CSS code.**

<br />

[**Launch Studio**](https://github.com/VedKalantri/ScrollForge) • [**Explore Presets**](https://github.com/VedKalantri/ScrollForge) • [**Documentation**](https://github.com/VedKalantri/ScrollForge) • [**Report Bug**](https://github.com/VedKalantri/ScrollForge/issues)

</div>

---

## 🌟 Overview

ScrollForge reimagines scrolling text as a dedicated, creative motion design workstation. Built for content creators, stream designers, broadcast editors, and frontend engineers, it delivers a zero-latency feedback loop:

$$\text{\bf Type} \longrightarrow \text{\bf See Instantly} \longrightarrow \text{\bf Customize} \longrightarrow \text{\bf Preview} \longrightarrow \text{\bf Export}$$

There are **zero artificial debounces**, no server processing queues, and no watermarks. Every keystroke, velocity change, or angle tilt recalculates the animation immediately. Everything renders directly in your browser.

---

## ✨ Key Features

### 🎬 Real-Time Motion Typography Engine
- **Multi-Directional & 360° Vectors**: Smooth horizontal marquee (left/right), vertical film credits (up/down), diagonals, or precise custom vector angles (0°–360°).
- **Linear Velocity Control**: Variable speed from relaxed editorial reading (20 px/s) to high-speed broadcast tickers (600 px/s).
- **Dual-Track Seamless Looping**: Zero-stutter infinite wrapping, ping-pong bounce oscillation, and pause-on-hover triggers.
- **Parametric Spacing**: Customizable repeat gap and quick glyph inserts (`★`, `✦`, `⚡`, `🚨`, `•`, `//`, `→`).

### 🎨 Deep Typographic & Visual Customization
- **Display Typography**: Built-in Google Fonts catalog (*Inter, Anton, Bebas Neue, Oswald, JetBrains Mono, Space Grotesk, Poppins, Roboto, Montserrat*).
- **Full Font Control**: Font size, weights (100–900), letter-spacing, line-height, text transforms (uppercase, lowercase, capitalize), italics, and underlines.
- **Vibrant Gradients**: Multi-stop linear text fills, background colors, custom gradient angles, and alpha channel opacity.
- **Geometric Canvas Patterns**: Precision dot matrix grids, technical blueprints, diagonal stripes, and transparency checkerboards.

### ⚡ Visual Effects (FX) Suite
- **Neon Glow**: Luminous multi-layered neon bloom with customizable color and blur radius.
- **Outline Contours**: Sharp typographic stroke outlines with variable stroke width and color.
- **Retro CRT Scanlines**: Authentic CRT monitor scanline simulator with variable line density.
- **LED Matrix Display**: Dot-matrix stadium screen emulator with configurable dot radius and spacing.
- **Chromatic Aberration / RGB Split**: Retro glitch effect with directional color shifting.

### 📦 Multi-Format Client-Side Exports
- **Animated GIF**: Client-side frame-by-frame rendering powered by [`gifenc`](https://github.com/mattdesl/gifenc). Supports 12 to 30 FPS, custom durations, and true 1-bit alpha transparent palettes.
- **High-Definition Video**: Direct in-browser canvas stream recording via MediaRecorder (WebM / MP4) up to 60 FPS.
- **Production-Ready Code**: Instant generation of:
  - Clean semantic HTML & pure CSS keyframe animations (zero dependencies).
  - Production-ready React (TSX) component.
  - Embeddable `<iframe>` code.
  - One-click downloadable runnable standalone `.html` file.

### 📱 Responsive Cross-Device Workstations
- **Desktop (>= 1024px)**: Full 3-pane workstation featuring Left Content Panel, Center Canvas, and Right Properties Panel.
- **Tablet (768px – 1023px)**: Dynamic 2-pane workstation with large live preview and right-hand tabbed tool dock.
- **Mobile (< 768px)**: Optimized single-screen workstation with pinned live preview, floating transport bar (Play/Pause, Restart, Randomize), swipable studio tabs, and a persistent quick-action export dock.

### 🌓 Theme Engine & Project Persistence
- **Dark / Light Mode**: Instant toggle with zero flash of unstyled content (FOUC) and WCAG-aligned contrast.
- **Local Browser Storage**: Automatically preserve, save, duplicate, and load your custom projects locally.
- **One-Click Share URLs**: Compress the complete workstation state into a shareable URL string.

---

## 🚀 Curated Motion Presets

ScrollForge includes 12+ pre-configured motion presets ready for immediate use:

| Preset Name | Category | Primary Style | Best For |
| :--- | :--- | :--- | :--- |
| **Studio Clean** | Essential | Minimalist monochrome, relaxed speed | Modern websites, minimal hero sections |
| **Neon Nights** | Bold & Neon | Cyber cyan glow, Bebas Neue, 120 px/s | Nightclub banners, synthwave streams |
| **Breaking News** | Bold & Neon | High-contrast crimson alert ticker | Live streams, urgent announcements |
| **Cyberpunk 2099** | Display & Tech | High-velocity yellow monospace with glitch | Gaming overlays, esports broadcasts |
| **Phosphor CRT** | Broadcast & Retro | Retro green CRT scanlines, terminal font | Tech blogs, dev portfolios, retro games |
| **Cinema Credits** | Broadcast & Retro | Elegant vertical scroll, serif typography | Film credits, acknowledgements, changelogs |
| **Wall Street Ticker** | Display & Tech | Rapid horizontal financial ticker | Stock/crypto dashboards, live metrics |
| **LED Stadium** | Display & Tech | Dot-matrix LED screen effect | Sports graphics, digital billboards |

---

## 🛠️ Tech Stack & Architecture

```
ScrollForge
├── Framework: Next.js 14 (App Router)
├── Language: TypeScript 5.6
├── Styling: Tailwind CSS & Custom CSS Keyframe Engines
├── Icons: Lucide React
├── GIF Rendering: gifenc (Fast client-side NeuQuant & octree color quantization)
└── Video Recording: Web MediaRecorder API + HTML5 Canvas Stream
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18.17+ or higher
- npm, pnpm, or yarn

### 1. Clone the repository
```bash
git clone https://github.com/VedKalantri/ScrollForge.git
cd ScrollForge
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the landing page or [http://localhost:3000/generator](http://localhost:3000/generator) to jump straight into the studio.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🎯 Usage & Export Guide

### Exporting Animated GIFs
1. Open the studio workstation and customize your text, font, velocity, and visual effects.
2. Click **Export** in the top navigation or bottom action bar.
3. Select **Animated GIF**.
4. Choose your resolution scale (100%, 75%, 50%), frame rate (12–30 FPS), and duration (2–8 seconds).
5. Toggle **Transparent Background** if you need an alpha channel overlay.
6. Click **Generate Animated GIF** and download.

### Exporting Video
1. In the Export modal, select **Video (WebM / MP4)**.
2. Set your frame rate (up to 60 FPS) and recording duration (up to 10 seconds).
3. Click **Render Video File** — the video is recorded frame-accurately in browser memory.

### Generating Code
1. Click **Code** in the navigation bar.
2. Select your target: **HTML**, **CSS Keyframes**, **React Component**, or **Embed iframe**.
3. Click **Copy Code** or **Download Standalone HTML**.

---

## 📄 License

Distributed under the **MIT License**. Free for personal and commercial projects.

---

<div align="center">

Built with ❤️ by [Ved Kalantri](https://github.com/VedKalantri)

*Create. Customize. Scroll.*

</div>
