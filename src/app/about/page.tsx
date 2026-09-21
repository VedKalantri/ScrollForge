"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Cpu, Palette } from "lucide-react";
import { ThemeToggle } from "../../components/common/ThemeToggle";

export default function AboutPage() {
  return (
    <div className="page-transition min-h-screen flex flex-col bg-white dark:bg-studio-950 text-studio-900 dark:text-studio-100 select-none">
      {/* Top Navbar */}
      <header className="h-16 sm:h-20 border-b border-studio-200 dark:border-studio-800 bg-white/95 dark:bg-studio-950/95 backdrop-blur px-4 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-studio-600 dark:text-studio-400 hover:text-forge-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <div className="h-5 w-[1px] bg-studio-200 dark:bg-studio-800" />
          <h1 className="text-sm sm:text-base font-extrabold mb-0">About ScrollForge</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/generator"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold rounded-xl bg-forge-500 hover:bg-forge-600 text-white shadow transition-all hover:scale-[1.02] shrink-0"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-16">
        <div className="flex flex-col gap-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-studio-200 dark:border-studio-800 bg-studio-100 dark:bg-studio-900 text-studio-700 dark:text-studio-300 text-xs font-medium mb-4">
              <span>Philosophy &amp; Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
              Motion Typography, Reimagined as a Creative Tool.
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-forge-500 to-amber-500 rounded-full mb-6" />
            <p className="text-base text-studio-600 dark:text-studio-400 leading-relaxed max-w-2xl">
              ScrollForge is purpose-built as a creative workstation for motion typography. We rejected generic dashboard patterns and AI-slop design to deliver a focused, high-contrast tool for creators, developers, and broadcast designers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-900/40 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-forge-500/10 text-forge-500 flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-studio-900 dark:text-studio-100 mb-2">
                Creative Studio Identity
              </h3>
              <p className="text-xs text-studio-600 dark:text-studio-400 leading-relaxed">
                The workstation maintains a crisp, dark or light studio atmosphere. Selecting expressive styles like Cyberpunk or Neon transforms the canvas output without polluting the application UI.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-900/40 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-studio-900 dark:text-studio-100 mb-2">
                100% Client-Side Privacy
              </h3>
              <p className="text-xs text-studio-600 dark:text-studio-400 leading-relaxed">
                No accounts required. Your typography, designs, and exports are generated locally in browser memory and persisted in browser storage. Nothing is sent to third-party tracking servers.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-900/40 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-studio-900 dark:text-studio-100 mb-2">
                Zero Debounce Real-Time Pipeline
              </h3>
              <p className="text-xs text-studio-600 dark:text-studio-400 leading-relaxed">
                Every keystroke is linked directly through React state to CSS hardware-accelerated transforms. Zero artificial delay between typing and seeing the animation move.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-900/40 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-studio-900 dark:text-studio-100 mb-2">
                Built with Modern Standards
              </h3>
              <p className="text-xs text-studio-600 dark:text-studio-400 leading-relaxed">
                Engineered with Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide Icons, and <code className="font-mono">gifenc</code>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
