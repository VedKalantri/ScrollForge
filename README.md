# ScrollForge — The Ultimate Scrolling Text Generator

> **Create. Customize. Scroll.**  
> A production-grade creative motion workstation for designing, customizing, and exporting animated scrolling text in real time.

---

## Features

- ⚡ **Zero-Latency Live Preview**: Keystroke-by-keystroke real-time animation updates with zero artificial debouncing or refresh delays.
- 🔄 **Multi-Directional Motion**: Horizontal (left/right), vertical (credits roll), diagonals, and custom 0°–360° vector headings.
- 🎨 **Deep Typographic Control**: Font families (Inter, Anton, Bebas Neue, Oswald, JetBrains Mono, Space Grotesk, Poppins, etc.), custom sizing, weights, line heights, letter-spacing, and cases.
- ✨ **Visual Effects Suite**: Neon glow bloom, typographic outline strokes, drop shadows, CRT scanlines, LED matrix simulator, and RGB split chromatic aberration.
- 🖼️ **Client-Side Animated GIF Export**: Powered by `gifenc` with configurable frame rate (12–30 FPS), duration, resolution scaling, and transparent 1-bit alpha palettes.
- 🎥 **High-Definition Video Export**: In-browser canvas stream recording delivering up to 60 FPS WebM and MP4.
- 💻 **Production Code Generator**: Instant generation of zero-dependency HTML, CSS keyframes, React (TSX) components, iframe embeds, and standalone downloadable HTML files.
- 📦 **12+ Curated Motion Presets**: Minimal, Breaking News, Neon Nights, Cyberpunk 2099, LED Matrix, Wall Street Ticker, Retro CRT, Linux Terminal, Cinema Credits, and more.
- 💾 **Local Persistence**: Save, duplicate, rename, and reopen projects with local browser storage.
- 🔗 **Shareable Configuration URLs**: Encode complete editor state into a shareable link.
- 📱 **Dedicated Mobile Layout**: Custom responsive workstation with ordered accordion sections and touch-optimized controls.

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **GIF Encoding**: [gifenc](https://github.com/mattdesl/gifenc)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/VedKalantri/ScrollForge.git
cd ScrollForge
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page or [http://localhost:3000/generator](http://localhost:3000/generator) to jump directly into the studio workstation.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## License

MIT License. Free for personal and commercial use.
