"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Film,
  Image as ImageIcon,
  Code2,
  Move,
  Layers,
  Wand2,
  Type,
  ChevronDown,
  Sliders,
  Palette,
} from "lucide-react";
import { PRESETS } from "../constants/presets";
import { Logo } from "../components/common/Logo";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Interactive Live Hero Playground State
  const [heroText, setHeroText] = useState("WELCOME TO SCROLLFORGE // CREATE. CUSTOMIZE. SCROLL.");
  const [heroTheme, setHeroTheme] = useState<"default" | "neon" | "news" | "cyber" | "crt">("default");
  const [heroSpeed, setHeroSpeed] = useState<number>(18); // seconds

  const toggleFaq = (idx: number) => {
    setActiveFaq((prev) => (prev === idx ? null : idx));
  };

  const getThemeStyles = () => {
    switch (heroTheme) {
      case "neon":
        return {
          bg: "bg-[#050814]",
          textColor: "#22d3ee",
          glow: "0 0 20px #06b6d4, 0 0 40px #06b6d4",
          font: "font-sans",
          tag: "CYAN NEON",
        };
      case "news":
        return {
          bg: "bg-[#dc2626]",
          textColor: "#ffffff",
          glow: "0 2px 8px rgba(0,0,0,0.6)",
          font: "font-sans",
          tag: "BREAKING NEWS",
        };
      case "cyber":
        return {
          bg: "bg-[#090a0f]",
          textColor: "#facc15",
          glow: "0 0 16px #eab308",
          font: "font-mono",
          tag: "CYBERPUNK GLITCH",
        };
      case "crt":
        return {
          bg: "bg-[#041208]",
          textColor: "#4ade80",
          glow: "0 0 18px #22c55e",
          font: "font-mono",
          tag: "PHOSPHOR CRT",
        };
      default:
        return {
          bg: "bg-studio-950",
          textColor: "#ffffff",
          glow: "0 0 16px rgba(255,255,255,0.7)",
          font: "font-sans",
          tag: "STUDIO DEFAULT",
        };
    }
  };

  const currentTheme = getThemeStyles();

  const faqs = [
    {
      q: "What is a scrolling text generator?",
      a: "A scrolling text generator is a motion typography tool that creates continuous, looped animations of moving text. ScrollForge allows you to customize velocity, direction, angles, typography, and visual effects in real time, and export the result as GIF, video, or code.",
    },
    {
      q: "Can I create vertical scrolling text?",
      a: "Yes! ScrollForge supports vertical scrolling (top-to-bottom and bottom-to-top, perfect for film credits), horizontal scrolling, diagonal angles (top-left, bottom-right, etc.), and custom 0°–360° vector angles.",
    },
    {
      q: "Can I download scrolling text as a GIF?",
      a: "Yes. ScrollForge includes a built-in client-side animated GIF encoder (powered by gifenc). It renders every frame directly in your browser with selectable frame rates (12 to 30 FPS) and support for 1-bit alpha transparent backgrounds.",
    },
    {
      q: "Can I export scrolling text as video?",
      a: "Yes. You can record high-definition video in WebM format (and MP4 where supported by your browser's native codecs). Duration, resolution, and frame rates are fully customizable.",
    },
    {
      q: "Can I generate HTML/CSS?",
      a: "Absolutely. ScrollForge generates zero-dependency HTML, CSS keyframes, React components, and standalone downloadable HTML files that run immediately in any web environment.",
    },
    {
      q: "Can I create transparent scrolling text?",
      a: "Yes. By selecting the Transparent background mode, your text will export with an alpha channel in GIF format and as transparent HTML/CSS overlays for websites and streaming software.",
    },
    {
      q: "Can I use custom fonts?",
      a: "ScrollForge includes a curated library of Google Fonts and display typography—including Inter, Anton, Bebas Neue, Oswald, Space Grotesk, JetBrains Mono, Poppins, and serif fonts—with immediate live rendering.",
    },
    {
      q: "Does ScrollForge work on mobile?",
      a: "Yes. ScrollForge features a dedicated responsive mobile layout with touch-friendly controls, accordion sections, and a pinned live preview canvas.",
    },
  ];

  return (
    <div className="page-transition min-h-screen flex flex-col bg-white dark:bg-studio-950 text-studio-900 dark:text-studio-100 selection:bg-forge-500 selection:text-white">
      {/* ===================== SPACIOUS CLEAN NAVBAR ===================== */}
      <header className="sticky top-0 z-40 h-20 border-b border-studio-200 dark:border-studio-800/80 bg-white/95 dark:bg-studio-950/95 backdrop-blur-md px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo size={36} showWordmark={true} />
        </Link>

        {/* Center Navigation Links with generous spacing */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-studio-600 dark:text-studio-300">
          <Link
            href="/generator"
            className="hover:text-forge-500 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-forge-500 hover:after:w-full after:transition-all"
          >
            Studio
          </Link>
          <Link
            href="/presets"
            className="hover:text-forge-500 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-forge-500 hover:after:w-full after:transition-all"
          >
            Presets
          </Link>
          <Link
            href="/docs"
            className="hover:text-forge-500 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-forge-500 hover:after:w-full after:transition-all"
          >
            Documentation
          </Link>
          <Link
            href="/about"
            className="hover:text-forge-500 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-forge-500 hover:after:w-full after:transition-all"
          >
            About
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/generator"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-forge-500 hover:bg-forge-600 text-white shadow-md shadow-forge-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-12 pb-20 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Dynamic Typography Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-studio-950 dark:text-white max-w-5xl leading-[1.06] mb-6">
          Scrolling Text, <br className="hidden sm:inline" />
          <span className="underline decoration-forge-500/50 decoration-wavy decoration-2">
            Without the Hassle.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-studio-600 dark:text-studio-400 max-w-2xl font-normal leading-relaxed mb-8">
          Design fully customizable horizontal, vertical, and diagonal scrolling text. Export as animated GIF, high-definition video, or production-ready code in seconds.
        </p>

        {/* Direct Navigation CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link
            href="/generator"
            className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-xl bg-forge-500 hover:bg-forge-600 text-white shadow-lg shadow-forge-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Creating in Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/presets"
            className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl border border-studio-300 dark:border-studio-700 bg-white dark:bg-studio-900 text-studio-800 dark:text-studio-200 hover:bg-studio-100 dark:hover:bg-studio-850 transition-colors"
          >
            <Layers className="w-4 h-4 text-forge-500" />
            <span>Explore 12+ Presets</span>
          </Link>
        </div>

        {/* ===================== INTERACTIVE LIVE MARQUEE HERO ===================== */}
        <div className="w-full rounded-2xl border border-studio-300 dark:border-studio-800 bg-studio-900 shadow-2xl overflow-hidden relative text-left">
          {/* Workstation Header Bar */}
          <div className="px-5 py-3 bg-studio-950 border-b border-studio-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 text-xs font-mono text-studio-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-bold text-white uppercase tracking-wider">
                Live Interactive Canvas
              </span>
              <span className="hidden sm:inline text-studio-600">|</span>
              <span className="hidden sm:inline font-mono text-studio-400">
                {currentTheme.tag}
              </span>
            </div>

            {/* Quick Live Style Switchers */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono text-studio-500 mr-1 hidden md:inline">
                Quick Style:
              </span>
              {(
                [
                  { id: "default", label: "Studio" },
                  { id: "neon", label: "⚡ Neon" },
                  { id: "news", label: "🚨 Alert" },
                  { id: "cyber", label: "👾 Cyber" },
                  { id: "crt", label: "📺 CRT" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setHeroTheme(t.id)}
                  className={`px-2.5 py-1 text-xs font-mono font-semibold rounded transition-all ${
                    heroTheme === t.id
                      ? "bg-forge-500 text-white shadow-sm"
                      : "bg-studio-800 text-studio-300 hover:bg-studio-750"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actual Animated Scrolling Banner (Reacts immediately to theme & input) */}
          <div
            className={`py-14 px-4 overflow-hidden flex items-center transition-colors duration-300 ${currentTheme.bg}`}
          >
            <div
              className={`sf-hero-track flex items-center whitespace-nowrap will-change-transform ${currentTheme.font}`}
              style={{
                animationDuration: `${heroSpeed}s`,
              }}
            >
              <span
                className="inline-block text-3xl sm:text-5xl md:text-6xl font-black tracking-widest uppercase px-8 transition-all"
                style={{
                  color: currentTheme.textColor,
                  textShadow: currentTheme.glow,
                }}
              >
                {heroText || "START TYPING TO PREVIEW SCROLLFORGE"}
              </span>
              <span
                aria-hidden="true"
                className="inline-block text-3xl sm:text-5xl md:text-6xl font-black tracking-widest uppercase px-8 transition-all"
                style={{
                  color: currentTheme.textColor,
                  textShadow: currentTheme.glow,
                }}
              >
                {heroText || "START TYPING TO PREVIEW SCROLLFORGE"}
              </span>
            </div>
          </div>

          {/* Interactive Live Tweak Bar: Test right on landing page! */}
          <div className="p-4 bg-studio-950 border-t border-studio-800 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-[280px]">
              <span className="text-xs font-mono text-studio-400 font-bold shrink-0">
                Type here to test:
              </span>
              <input
                type="text"
                value={heroText}
                onChange={(e) => setHeroText(e.target.value)}
                placeholder="Type anything to see it scroll live..."
                className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-studio-800 bg-studio-900 text-white placeholder:text-studio-500 focus:outline-none focus:border-forge-500"
              />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 text-xs font-mono text-studio-400">
                <span className="hidden sm:inline">Speed:</span>
                {[
                  { s: 26, label: "0.5x" },
                  { s: 18, label: "1x" },
                  { s: 10, label: "2x" },
                ].map((sp) => (
                  <button
                    key={sp.label}
                    type="button"
                    onClick={() => setHeroSpeed(sp.s)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      heroSpeed === sp.s
                        ? "bg-forge-500 text-white"
                        : "bg-studio-800 text-studio-400 hover:text-white"
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>

              <Link
                href="/generator"
                className="px-3.5 py-1.5 text-xs font-bold font-mono rounded-lg bg-white text-studio-950 hover:bg-studio-200 transition-colors flex items-center gap-1"
              >
                <span>Open in Studio →</span>
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes heroScroll {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .sf-hero-track {
            animation: heroScroll linear infinite;
          }
        `}</style>
      </section>

      {/* ===================== EVERYTHING YOU CONTROL ===================== */}
      <section className="py-24 px-6 sm:px-12 border-t border-studio-200 dark:border-studio-800/80 bg-studio-50/50 dark:bg-studio-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-950 dark:text-white">
                Everything You Control
              </h2>
            </div>
            <p className="text-sm text-studio-500 dark:text-studio-400 max-w-md font-normal leading-relaxed">
              Engineered with zero artificial debounce. Every keystroke, velocity change, and angle tilt immediately recalculates the live animation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Move,
                title: "Direction & 360° Vectors",
                desc: "Horizontal left/right marquee, vertical credits roll, diagonal angles, or custom 0°–360° vector headings.",
              },
              {
                icon: Sliders,
                title: "Linear Velocity Control",
                desc: "Variable velocity from 20px/s relaxed editorial reading to 600px/s high-velocity broadcast tickers.",
              },
              {
                icon: Type,
                title: "Display Typography",
                desc: "Google Fonts catalog including Inter, Anton, Bebas Neue, Oswald, JetBrains Mono, Space Grotesk, and Poppins.",
              },
              {
                icon: Palette,
                title: "Gradients & Multi-Stops",
                desc: "Multi-stop linear text fills, background colors, custom gradient angles, and alpha channel opacity.",
              },
              {
                icon: Wand2,
                title: "Real-Time Visual Effects",
                desc: "Luminous neon glow, outline strokes, drop shadows, retro CRT scanlines, LED matrix, and RGB split.",
              },
              {
                icon: Layers,
                title: "Geometric Patterns",
                desc: "Precision dot matrix grids, technical blueprints, diagonal stripes, and 1-bit alpha transparency.",
              },
              {
                icon: Sparkles,
                title: "Gapless Looping",
                desc: "Dual-track seamless infinite wrapping, ping-pong bounce oscillation, and pause-on-hover triggers.",
              },
              {
                icon: Code2,
                title: "Pure Code Generation",
                desc: "Production-ready HTML, pure CSS keyframes, React TSX components, and standalone single-file downloads.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 flex flex-col justify-between shadow-sm hover:border-forge-500/60 transition-all group"
              >
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-studio-100 dark:bg-studio-800 flex items-center justify-center text-forge-500 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-studio-900 dark:text-studio-100 mt-2">
                    {title}
                  </h3>
                  <p className="text-xs text-studio-500 dark:text-studio-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CLIENT-SIDE EXPORT DELIVERABLES ===================== */}
      <section className="py-24 px-6 sm:px-12 border-t border-studio-200 dark:border-studio-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-950 dark:text-white">
                Export Anywhere
              </h2>
            </div>
            <p className="text-sm text-studio-500 dark:text-studio-400 max-w-md font-normal leading-relaxed">
              No server queues, no cloud processing delay, and no watermarks. Your exports are rendered directly in browser memory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* GIF */}
            <div className="p-8 rounded-2xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-forge-500/10 text-forge-500 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-studio-900 dark:text-studio-100">
                  Animated GIF
                </h3>
                <p className="text-xs text-studio-600 dark:text-studio-400 leading-relaxed">
                  Frame-by-frame client-side encoding powered by gifenc. Supports 12 to 30 FPS, custom durations, and true 1-bit alpha transparent background palettes.
                </p>
              </div>
              <div className="pt-6 border-t border-studio-100 dark:border-studio-800 mt-6 flex items-center justify-between text-xs font-mono text-studio-400">
                <span>12 - 30 FPS</span>
                <span>Transparent Alpha</span>
              </div>
            </div>

            {/* Video */}
            <div className="p-8 rounded-2xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                  <Film className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-studio-900 dark:text-studio-100">
                  Crisp Video (WebM / MP4)
                </h3>
                <p className="text-xs text-studio-600 dark:text-studio-400 leading-relaxed">
                  Direct canvas stream capture via MediaRecorder up to 60 FPS. Ideal for video editors, OBS live streams, social media stories, and digital billboards.
                </p>
              </div>
              <div className="pt-6 border-t border-studio-100 dark:border-studio-800 mt-6 flex items-center justify-between text-xs font-mono text-studio-400">
                <span>Up to 60 FPS</span>
                <span>VP9 / AVC1</span>
              </div>
            </div>

            {/* Code */}
            <div className="p-8 rounded-2xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-studio-900 dark:text-studio-100">
                  Production Code
                </h3>
                <p className="text-xs text-studio-600 dark:text-studio-400 leading-relaxed">
                  Clean semantic HTML, pure CSS keyframes, React TSX components, and one-click downloadable standalone HTML files with embedded fonts and styles.
                </p>
              </div>
              <div className="pt-6 border-t border-studio-100 dark:border-studio-800 mt-6 flex items-center justify-between text-xs font-mono text-studio-400">
                <span>React / HTML / CSS</span>
                <span>Zero Deps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PRESETS GALLERY PREVIEW ===================== */}
      <section className="py-24 px-6 sm:px-12 border-t border-studio-200 dark:border-studio-800/80 bg-studio-50/50 dark:bg-studio-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-studio-950 dark:text-white">
                Preset Showcase
              </h2>
            </div>
            <Link
              href="/presets"
              className="flex items-center gap-1.5 text-xs font-bold text-forge-500 hover:text-forge-600 transition-colors"
            >
              <span>Explore All 12 Presets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRESETS.slice(0, 6).map((preset) => (
              <div
                key={preset.id}
                className="rounded-2xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 overflow-hidden shadow-sm flex flex-col justify-between hover:border-forge-500/50 transition-all"
              >
                {/* Visual Preview */}
                <div
                  className="h-32 flex items-center justify-center px-4 overflow-hidden border-b border-studio-200 dark:border-studio-800 relative"
                  style={{
                    backgroundColor:
                      preset.config.background.type === "solid"
                        ? preset.config.background.color
                        : "#0a0b10",
                  }}
                >
                  <span
                    className="font-bold text-center truncate max-w-full"
                    style={{
                      fontFamily: preset.config.typography.fontFamily,
                      fontSize: "24px",
                      color: preset.config.colors.textColor,
                      textTransform: preset.config.typography.textTransform,
                      textShadow: preset.config.effects.glow
                        ? `0 0 10px ${preset.config.effects.glowColor}`
                        : "none",
                    }}
                  >
                    {preset.config.text}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-studio-900 dark:text-studio-100">
                      {preset.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-studio-100 dark:bg-studio-800 text-studio-500 font-medium">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-xs text-studio-500 dark:text-studio-400 line-clamp-2">
                    {preset.description}
                  </p>
                  <Link
                    href="/generator"
                    className="mt-2 text-xs font-bold text-forge-500 hover:text-forge-600 flex items-center gap-1"
                  >
                    <span>Use in Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ SECTION ===================== */}
      <section className="py-24 px-6 sm:px-12 border-t border-studio-200 dark:border-studio-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-studio-950 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-studio-200 dark:divide-studio-800">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left text-sm font-bold text-studio-900 dark:text-studio-100 hover:text-forge-500 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-studio-400 transition-transform duration-200 ${
                      activeFaq === idx ? "rotate-180 text-forge-500" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <p className="pt-3 text-xs text-studio-600 dark:text-studio-400 leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-studio-200 dark:border-studio-800 bg-studio-50 dark:bg-studio-950 px-6 sm:px-12 py-12 text-xs text-studio-500 dark:text-studio-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size={28} showWordmark={true} />
            <span className="text-studio-400">• Create. Customize. Scroll.</span>
          </div>

          <div className="flex items-center gap-8 font-medium">
            <Link href="/generator" className="hover:text-forge-500 transition-colors">
              Studio
            </Link>
            <Link href="/presets" className="hover:text-forge-500 transition-colors">
              Presets
            </Link>
            <Link href="/docs" className="hover:text-forge-500 transition-colors">
              Documentation
            </Link>
            <Link href="/about" className="hover:text-forge-500 transition-colors">
              About
            </Link>
          </div>

          <p className="text-[11px] font-mono">
            Client-side first. No telemetry. 100% private.
          </p>
        </div>
      </footer>
    </div>
  );
}
