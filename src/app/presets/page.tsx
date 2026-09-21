"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Layers, Sparkles } from "lucide-react";
import { PRESETS } from "../../constants/presets";
import { useEditor } from "../../context/EditorContext";
import { ThemeToggle } from "../../components/common/ThemeToggle";

type Category = "All" | "Essential" | "Bold & Neon" | "Broadcast & Retro" | "Display & Tech";

export default function PresetsPage() {
  const router = useRouter();
  const { applyPresetConfig } = useEditor();
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filtered = selectedCategory === "All"
    ? PRESETS
    : PRESETS.filter((p) => p.category === selectedCategory);

  const handleUsePreset = (config: any) => {
    applyPresetConfig(config);
    router.push("/generator");
  };

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
          <h1 className="text-sm sm:text-base font-extrabold flex items-center gap-2 mb-0">
            <Layers className="w-4 h-4 text-forge-500 shrink-0" />
            <span>Motion Presets</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/generator"
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-bold rounded-lg bg-forge-500 hover:bg-forge-600 text-white shadow transition-transform hover:scale-[1.02] shrink-0"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Header */}
      <div className="pt-12 pb-8 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
          Curated Motion Presets
        </h2>
        <div className="h-1.5 w-20 bg-gradient-to-r from-forge-500 to-amber-500 rounded-full mx-auto mb-6" />
        <p className="text-sm text-studio-500 dark:text-studio-400 max-w-lg mx-auto mb-8">
          Explore ready-to-use scrolling text configurations designed for high visual impact. Click any preset to load it instantly into the live editor.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(["All", "Essential", "Bold & Neon", "Broadcast & Retro", "Display & Tech"] as Category[]).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  selectedCategory === cat
                    ? "border-forge-500 bg-forge-500 text-white shadow-sm"
                    : "border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 text-studio-600 dark:text-studio-400 hover:border-studio-300 dark:hover:border-studio-700"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Grid of Presets */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((preset) => {
            const { config } = preset;
            return (
              <div
                key={preset.id}
                className="rounded-xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 overflow-hidden shadow-sm flex flex-col justify-between hover:border-forge-500/50 transition-all group"
              >
                {/* Live Preview Box */}
                <div
                  className="h-36 flex items-center justify-center px-4 overflow-hidden border-b border-studio-200 dark:border-studio-800 relative cursor-pointer"
                  onClick={() => handleUsePreset(config)}
                  style={{
                    backgroundColor:
                      config.background.type === "solid" ? config.background.color : "#090a10",
                  }}
                >
                  <div className="text-center font-bold px-2 truncate max-w-full">
                    <span
                      style={{
                        fontFamily: config.typography.fontFamily,
                        fontSize: "26px",
                        color: config.colors.textColor,
                        textTransform: config.typography.textTransform,
                        textShadow: config.effects.glow
                          ? `0 0 12px ${config.effects.glowColor}`
                          : "none",
                        WebkitTextStroke: config.effects.outline
                          ? `${config.effects.outlineWidth}px ${config.effects.outlineColor}`
                          : "none",
                      }}
                    >
                      {config.text}
                    </span>
                  </div>
                </div>

                {/* Info & Action */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-studio-900 dark:text-studio-100 group-hover:text-forge-500 transition-colors mb-0">
                      {preset.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-studio-100 dark:bg-studio-800 text-studio-500">
                      {preset.category}
                    </span>
                  </div>

                  <p className="text-xs text-studio-500 dark:text-studio-400 line-clamp-2">
                    {preset.description}
                  </p>

                  <div className="flex items-center gap-2 pt-2 border-t border-studio-100 dark:border-studio-800 text-[10px] font-mono text-studio-400">
                    <span>{config.direction.toUpperCase()}</span>
                    <span>•</span>
                    <span>{config.speed} PX/S</span>
                    <span>•</span>
                    <span>{config.typography.fontFamily}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleUsePreset(config)}
                    className="w-full mt-2 py-2 px-3 text-xs font-bold rounded-lg border border-forge-500 text-forge-500 hover:bg-forge-500 hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Use in Editor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
