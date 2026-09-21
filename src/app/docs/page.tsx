"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Code2, Film, Layers, Move, Type, Wand2 } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="page-transition min-h-screen flex flex-col bg-white dark:bg-studio-950 text-studio-900 dark:text-studio-100 select-none">
      {/* Top Navbar */}
      <header className="h-20 border-b border-studio-200 dark:border-studio-800 bg-white/95 dark:bg-studio-950/95 backdrop-blur px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-studio-600 dark:text-studio-400 hover:text-forge-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="h-5 w-[1px] bg-studio-200 dark:bg-studio-800" />
          <h1 className="text-base font-extrabold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-forge-500" />
            Documentation
          </h1>
        </div>

        <Link
          href="/generator"
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-forge-500 hover:bg-forge-600 text-white shadow transition-all hover:scale-[1.02]"
        >
          <span>Open Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Documentation Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12">
        <div className="flex flex-col gap-12">
          {/* Section 1: Overview & Fundamentals */}
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-studio-950 dark:text-white">
              Getting Started with ScrollForge
            </h2>
            <p className="text-sm text-studio-600 dark:text-studio-400 leading-relaxed">
              ScrollForge is a real-time motion typography workstation designed to eliminate the friction of building animated scrolling text. The core paradigm is instant visual feedback: as you type or adjust motion controls, changes are immediately reflected in the live preview canvas without page reloads or debounces.
            </p>
            <div className="p-4 rounded-xl border border-studio-200 dark:border-studio-800 bg-studio-50 dark:bg-studio-900 flex flex-col gap-2 font-mono text-xs">
              <span className="font-bold text-forge-500">THE FUNDAMENTAL WORKFLOW:</span>
              <span className="text-studio-700 dark:text-studio-300">
                Type Text → Live Synchronization → Customize Motion &amp; Effects → Export Asset (GIF / Video / Code)
              </span>
            </div>
          </section>

          {/* Section 2: Directions & Angles */}
          <section className="flex flex-col gap-4 border-t border-studio-200 dark:border-studio-800 pt-8">
            <div className="flex items-center gap-2 text-forge-500">
              <Move className="w-5 h-5" />
              <h3 className="text-lg font-bold text-studio-950 dark:text-white">
                Motion Vectors &amp; Velocity
              </h3>
            </div>
            <p className="text-sm text-studio-600 dark:text-studio-400 leading-relaxed">
              ScrollForge supports multidirectional movement:
            </p>
            <ul className="list-disc pl-5 text-xs text-studio-600 dark:text-studio-400 flex flex-col gap-2 leading-relaxed">
              <li><strong>Horizontal (Left / Right):</strong> Continuous endless marquee motion with seamless clone tracking.</li>
              <li><strong>Vertical (Up / Down):</strong> Optimized for film end credits, terminal outputs, and vertical social content.</li>
              <li><strong>Diagonals:</strong> 45°, 135°, 225°, and 315° angles for high-energy editorial banners.</li>
              <li><strong>Custom Vector (0°–360°):</strong> Use the angle slider to steer motion toward any arbitrary degree vector.</li>
            </ul>
          </section>

          {/* Section 3: Visual Effects */}
          <section className="flex flex-col gap-4 border-t border-studio-200 dark:border-studio-800 pt-8">
            <div className="flex items-center gap-2 text-forge-500">
              <Wand2 className="w-5 h-5" />
              <h3 className="text-lg font-bold text-studio-950 dark:text-white">
                Text Effects Engine
              </h3>
            </div>
            <p className="text-sm text-studio-600 dark:text-studio-400 leading-relaxed">
              Each effect is calculated both in CSS for real-time browser preview and in the unified HTML5 Canvas 2D engine for export:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50 dark:bg-studio-900">
                <strong className="block text-studio-900 dark:text-studio-100 mb-1">Neon Glow</strong>
                Multi-pass luminous bloom with color picking, radius blur, and intensity multipliers.
              </div>
              <div className="p-3.5 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50 dark:bg-studio-900">
                <strong className="block text-studio-900 dark:text-studio-100 mb-1">Outline Stroke</strong>
                High-contrast typographic stroke contour with custom width and color.
              </div>
              <div className="p-3.5 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50 dark:bg-studio-900">
                <strong className="block text-studio-900 dark:text-studio-100 mb-1">CRT Scanlines</strong>
                Animated retro raster scanline texture with customizable line density and opacity.
              </div>
              <div className="p-3.5 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50 dark:bg-studio-900">
                <strong className="block text-studio-900 dark:text-studio-100 mb-1">LED Matrix</strong>
                Electronic dot matrix grid overlay simulating stadium and subway arrival boards.
              </div>
            </div>
          </section>

          {/* Section 4: Export Engine */}
          <section className="flex flex-col gap-4 border-t border-studio-200 dark:border-studio-800 pt-8">
            <div className="flex items-center gap-2 text-forge-500">
              <Film className="w-5 h-5" />
              <h3 className="text-lg font-bold text-studio-950 dark:text-white">
                Export Pipelines &amp; Transparency
              </h3>
            </div>
            <p className="text-sm text-studio-600 dark:text-studio-400 leading-relaxed">
              All rendering takes place client-side inside your browser:
            </p>
            <div className="flex flex-col gap-3 text-xs text-studio-600 dark:text-studio-400">
              <p>
                <strong>GIF Export:</strong> Uses <code className="font-mono bg-studio-100 dark:bg-studio-800 px-1 py-0.5 rounded">gifenc</code> to quantize colors down to a 256-color palette frame by frame. Supports 1-bit alpha transparency for transparent GIFs.
              </p>
              <p>
                <strong>Video Export:</strong> Captures the canvas stream via browser <code className="font-mono bg-studio-100 dark:bg-studio-800 px-1 py-0.5 rounded">MediaRecorder</code> API with runtime codec detection for WebM (VP9/VP8) and MP4 (AVC1).
              </p>
              <p>
                <strong>Code Export:</strong> Generates semantic HTML with zero-dependency CSS keyframes, or drop-in React components.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
