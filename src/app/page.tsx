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
  CheckCircle2,
  Sliders,
  Palette,
  ExternalLink,
} from "lucide-react";
import { PRESETS } from "../constants/presets";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq((prev) => (prev === idx ? null : idx));
  };

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
    <div className="min-h-screen flex flex-col bg-white dark:bg-studio-950 text-studio-900 dark:text-studio-100 selection:bg-forge-500 selection:text-white">
      {/* ===================== NAVBAR ===================== */}
      <header className="sticky top-0 z-40 h-16 border-b border-studio-200 dark:border-studio-800/80 bg-white/90 dark:bg-studio-950/90 backdrop-blur-md px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-forge-500 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-sm">
            SF
          </div>
          <span className="font-extrabold text-base tracking-tight">
            ScrollForge
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-studio-600 dark:text-studio-300">
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
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/generator"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-forge-500 hover:bg-forge-600 text-white shadow transition-all hover:scale-[1.02]"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-16 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-studio-200 dark:border-studio-800 bg-studio-100/80 dark:bg-studio-900/80 text-studio-700 dark:text-studio-300 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-forge-500" />
          <span>The Ultimate Scrolling Text Generator</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-studio-950 dark:text-white max-w-4xl leading-[1.08] mb-6">
          Scrolling Text, Without the Hassle.
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-studio-600 dark:text-studio-400 max-w-2xl font-normal leading-relaxed mb-10">
          Create fully customizable horizontal, vertical and animated scrolling text. Export it as GIF, video or production-ready code.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="/generator"
            className="flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-xl bg-forge-500 hover:bg-forge-600 text-white shadow-lg shadow-forge-500/20 transition-all hover:scale-[1.02]"
          >
            <span>Start Creating</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/presets"
            className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl border border-studio-300 dark:border-studio-700 bg-white dark:bg-studio-900 text-studio-800 dark:text-studio-200 hover:bg-studio-100 dark:hover:bg-studio-850 transition-colors"
          >
            <span>Explore Presets</span>
          </Link>
        </div>

        {/* REAL ANIMATED MARQUEE SHOWCASE (No static image!) */}
        <div className="w-full rounded-2xl border border-studio-300 dark:border-studio-800 bg-studio-950 shadow-2xl overflow-hidden relative group">
          {/* Workstation Top Chrome */}
          <div className="px-4 py-2.5 bg-studio-900 border-b border-studio-800 flex items-center justify-between text-xs font-mono text-studio-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 font-medium text-studio-300">ScrollForge Live Engine</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                60 FPS
              </span>
              <span className="hidden sm:inline">1920 × 400 PX</span>
            </div>
          </div>

          {/* Actual Animated Scrolling Banner */}
          <div className="py-12 px-4 bg-gradient-to-r from-studio-950 via-[#0a0c14] to-studio-950 overflow-hidden flex items-center">
            <div className="sf-landing-marquee flex items-center whitespace-nowrap will-change-transform">
              <span className="inline-block text-3xl sm:text-5xl md:text-6xl font-black tracking-widest text-white uppercase px-8">
                ← WELCOME TO SCROLLFORGE ← CREATE. CUSTOMIZE. SCROLL. ← EXPORT AS GIF, VIDEO &amp; CODE ←
              </span>
              <span aria-hidden="true" className="inline-block text-3xl sm:text-5xl md:text-6xl font-black tracking-widest text-white uppercase px-8">
                ← WELCOME TO SCROLLFORGE ← CREATE. CUSTOMIZE. SCROLL. ← EXPORT AS GIF, VIDEO &amp; CODE ←
              </span>
            </div>
          </div>

          {/* Overlay CTA inside preview */}
          <div className="p-3 bg-studio-900/90 border-t border-studio-800 flex items-center justify-between text-xs font-mono">
            <span className="text-studio-400">Continuous 150px/sec • Inter 700 • Subtle Glow</span>
            <Link
              href="/generator"
              className="text-forge-400 hover:text-forge-300 font-bold flex items-center gap-1"
            >
              Open in Studio →
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes landingScroll {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .sf-landing-marquee {
            animation: landingScroll 18s linear infinite;
          }
        `}</style>
      </section>

      {/* ===================== EVERYTHING YOU CONTROL ===================== */}
      <section className="py-20 px-6 border-t border-studio-200 dark:border-studio-800/80 bg-studio-50/50 dark:bg-studio-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-forge-500 mb-2">
              Deep Customization
            </h2>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-studio-950 dark:text-white">
              Everything You Control
            </p>
            <p className="text-sm text-studio-500 dark:text-studio-400 max-w-xl mt-3">
              Full control over every aspect of animated typography. Real-time changes with zero lag.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Move,
                title: "Direction & Angles",
                desc: "Left, right, vertical credits, diagonals, or custom 0°–360° vector headings.",
              },
              {
                icon: Sliders,
                title: "Precise Velocity",
                desc: "Variable velocity from relaxed 40px/s reading pace to 500px/s high-alert broadcast.",
              },
              {
                icon: Type,
                title: "Font Library",
                desc: "Inter, Anton, Bebas Neue, Oswald, JetBrains Mono, Space Grotesk, and serif typefaces.",
              },
              {
                icon: Palette,
                title: "Colors & Gradients",
                desc: "Multi-stop linear text fills, background colors, custom angles, and opacity channels.",
              },
              {
                icon: Wand2,
                title: "Visual Effects",
                desc: "Neon glow, outline stroke, drop shadow, CRT scanlines, LED matrix, and RGB split.",
              },
              {
                icon: Layers,
                title: "Pattern Backgrounds",
                desc: "Geometric dot matrix, grid blueprints, diagonal stripes, and alpha transparency.",
              },
              {
                icon: Sparkles,
                title: "Seamless Looping",
                desc: "Continuous gapless looping, ping-pong oscillation, and pause-on-hover triggers.",
              },
              {
                icon: Code2,
                title: "Instant Code Generation",
                desc: "Production-ready HTML, pure CSS keyframes, React components, and standalone files.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 flex flex-col gap-3 shadow-sm hover:border-forge-500/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-studio-100 dark:bg-studio-800 flex items-center justify-center text-forge-500">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-studio-900 dark:text-studio-100">
                  {title}
                </h3>
                <p className="text-xs text-studio-500 dark:text-studio-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== EXPORT ANYWHERE ===================== */}
      <section className="py-20 px-6 border-t border-studio-200 dark:border-studio-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-forge-500 mb-2">
              Zero-Friction Deliverables
            </h2>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-studio-950 dark:text-white">
              Export Anywhere
            </p>
            <p className="text-sm text-studio-500 dark:text-studio-400 max-w-xl mt-3">
              Generate native assets directly in your browser. No server queue or watermark.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* GIF */}
            <div className="p-8 rounded-2xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-forge-500 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-studio-900 dark:text-studio-100">
                  Animated GIF
                </h3>
                <p className="text-xs text-studio-600 dark:text-studio-400 leading-relaxed">
                  High-speed client-side frame rendering with customizable FPS (12–30) and 1-bit transparent palette support. Ideal for emails, banners, and GitHub readmes.
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
                  Native browser canvas recording supporting 60 FPS smooth video. Perfect for video editors, TikTok, Instagram Reels, YouTube Shorts, and stream overlays.
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
                  Production-grade HTML, pure CSS keyframes, React TSX components, and standalone downloadable HTML files. Zero external dependencies required.
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

      {/* ===================== PRESETS SHOWCASE ===================== */}
      <section className="py-20 px-6 border-t border-studio-200 dark:border-studio-800/80 bg-studio-50/50 dark:bg-studio-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-forge-500 mb-1">
                Curated Styles
              </h2>
              <p className="text-3xl font-black tracking-tight text-studio-950 dark:text-white">
                Preset Showcase
              </p>
            </div>
            <Link
              href="/presets"
              className="flex items-center gap-1 text-xs font-bold text-forge-500 hover:text-forge-600"
            >
              <span>View All 12 Presets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRESETS.slice(0, 6).map((preset) => (
              <div
                key={preset.id}
                className="rounded-xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 overflow-hidden shadow-sm flex flex-col justify-between"
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
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-studio-100 dark:bg-studio-800 text-studio-500">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-xs text-studio-500 dark:text-studio-400">
                    {preset.description}
                  </p>
                  <Link
                    href="/generator"
                    className="mt-2 text-xs font-bold text-forge-500 hover:text-forge-600 flex items-center gap-1"
                  >
                    <span>Use Preset in Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ SECTION ===================== */}
      <section className="py-20 px-6 border-t border-studio-200 dark:border-studio-800/80">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-forge-500 mb-2">
              Common Questions
            </h2>
            <p className="text-3xl font-black tracking-tight text-studio-950 dark:text-white">
              Frequently Asked Questions
            </p>
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
                    className={`w-4 h-4 text-studio-400 transition-transform ${
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
      <footer className="border-t border-studio-200 dark:border-studio-800 bg-studio-50 dark:bg-studio-950 px-6 py-12 text-xs text-studio-500 dark:text-studio-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-forge-500 flex items-center justify-center text-white font-black text-xs">
              SF
            </div>
            <span className="font-extrabold text-studio-900 dark:text-white">
              ScrollForge
            </span>
            <span className="text-studio-400">• Create. Customize. Scroll.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link href="/generator" className="hover:text-forge-500">
              Studio
            </Link>
            <Link href="/presets" className="hover:text-forge-500">
              Presets
            </Link>
            <Link href="/docs" className="hover:text-forge-500">
              Documentation
            </Link>
            <Link href="/about" className="hover:text-forge-500">
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
