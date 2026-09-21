"use client";

import React from "react";
import { Copy, Trash2, Sparkles, Layers } from "lucide-react";
import { useEditor } from "../../context/EditorContext";
import { PRESETS } from "../../constants/presets";

const EMOJI_INSERTS = ["★", "✦", "⚡", "🚨", "▲", "▼", "🔥", "✨", "🚀", "•", "//", "→", "←"];

export function ContentPanel() {
  const { config, updateConfig, applyPresetConfig } = useEditor();
  const text = config.text;

  const charCount = text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const handleClear = () => {
    updateConfig({ text: "" });
  };

  const handleDuplicate = () => {
    updateConfig({ text: `${text} • ${text}` });
  };

  const handleInsertEmoji = (symbol: string) => {
    updateConfig({ text: `${text} ${symbol} ` });
  };

  const handleTransformCase = (transform: "upper" | "lower" | "title") => {
    if (transform === "upper") {
      updateConfig({ text: text.toUpperCase() });
    } else if (transform === "lower") {
      updateConfig({ text: text.toLowerCase() });
    } else {
      updateConfig({
        text: text.replace(/\b\w/g, (c) => c.toUpperCase()),
      });
    }
  };

  return (
    <aside className="w-80 h-full border-r border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 flex flex-col shrink-0 select-none overflow-y-auto">
      {/* Panel Header */}
      <div className="px-5 py-3.5 border-b border-studio-200 dark:border-studio-800 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-studio-500 dark:text-studio-400">
          Content & Message
        </span>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-studio-400">
          <span>{charCount} chars</span>
          <span>•</span>
          <span>{wordCount} words</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Main Text Area */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-medium text-studio-700 dark:text-studio-200">
            <span>Text Input</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleDuplicate}
                className="p-1 text-studio-400 hover:text-studio-700 dark:hover:text-studio-200 rounded hover:bg-studio-100 dark:hover:bg-studio-800 transition-colors"
                title="Duplicate Text"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-studio-400 hover:text-red-500 rounded hover:bg-studio-100 dark:hover:bg-studio-800 transition-colors"
                title="Clear Text"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => updateConfig({ text: e.target.value })}
            placeholder="Start typing your scrolling text..."
            rows={4}
            className="w-full px-3 py-2.5 text-sm font-sans rounded-lg border border-studio-200 dark:border-studio-700 bg-studio-50 dark:bg-studio-850 text-studio-900 dark:text-studio-100 placeholder:text-studio-400 focus:outline-none focus:border-forge-500 focus:ring-1 focus:ring-forge-500 resize-none leading-relaxed transition-all"
          />
        </div>

        {/* Quick Transform Controls */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-medium text-studio-400">Transform Case</span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleTransformCase("upper")}
              className="py-1 px-2 text-xs font-semibold rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-750 transition-colors"
            >
              UPPER
            </button>
            <button
              type="button"
              onClick={() => handleTransformCase("lower")}
              className="py-1 px-2 text-xs font-semibold rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-750 transition-colors"
            >
              lower
            </button>
            <button
              type="button"
              onClick={() => handleTransformCase("title")}
              className="py-1 px-2 text-xs font-semibold rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-750 transition-colors"
            >
              Title
            </button>
          </div>
        </div>

        {/* Quick Symbols & Emojis */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-medium text-studio-400">Quick Symbols</span>
          <div className="flex flex-wrap gap-1.5">
            {EMOJI_INSERTS.map((sym) => (
              <button
                key={sym}
                type="button"
                onClick={() => handleInsertEmoji(sym)}
                className="w-7 h-7 flex items-center justify-center text-xs font-mono rounded border border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300 hover:border-forge-500 hover:text-forge-500 transition-colors"
              >
                {sym}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[1px] bg-studio-200 dark:bg-studio-800" />

        {/* Quick Presets Carousel / Shelf */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-studio-500 dark:text-studio-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-forge-500" />
              Quick Presets
            </span>
            <span className="text-[10px] text-studio-400">{PRESETS.length} Available</span>
          </div>

          <div className="flex flex-col gap-1.5 max-h-[360px] overflow-y-auto pr-1">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPresetConfig(preset.config)}
                className="text-left p-2.5 rounded-lg border border-studio-200 dark:border-studio-800 hover:border-forge-500/60 dark:hover:border-forge-500/60 bg-studio-50/50 dark:bg-studio-850/50 hover:bg-white dark:hover:bg-studio-800 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-studio-800 dark:text-studio-200 group-hover:text-forge-500 transition-colors">
                    {preset.name}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-studio-200/60 dark:bg-studio-750 text-studio-500 dark:text-studio-400">
                    {preset.config.direction}
                  </span>
                </div>
                <p className="text-[11px] text-studio-500 dark:text-studio-400 line-clamp-1">
                  {preset.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
