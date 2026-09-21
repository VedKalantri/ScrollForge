"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Type,
  Move,
  Palette,
  Wand2,
  Image as ImageIcon,
  Maximize2,
  Download,
  Sparkles,
  RotateCcw,
  Play,
  Pause,
  Layers,
} from "lucide-react";
import { useEditor } from "../../context/EditorContext";
import { Slider } from "../ui/Slider";
import { ColorPicker } from "../ui/ColorPicker";
import { FONTS_CATALOG } from "../../constants/fonts";
import { CANVAS_PRESETS, SPEED_PRESETS } from "../../constants/defaults";
import { PRESETS } from "../../constants/presets";
import { Direction } from "../../types/scroll";

type AccordionSection =
  | "text"
  | "motion"
  | "typography"
  | "colors"
  | "effects"
  | "background"
  | "canvas"
  | "presets";

export function MobileEditor() {
  const {
    config,
    updateConfig,
    updateNestedConfig,
    isPlaying,
    togglePlay,
    restartAnimation,
    randomize,
    applyPresetConfig,
    setIsExportOpen,
  } = useEditor();

  const [openSection, setOpenSection] = useState<AccordionSection | null>("text");

  const toggleSection = (section: AccordionSection) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const { typography, colors, effects, background, canvas } = config;

  return (
    <div className="flex flex-col w-full bg-studio-50 dark:bg-studio-950 pb-20 select-none">
      {/* Mobile Top Transport Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-2.5 bg-white/95 dark:bg-studio-900/95 backdrop-blur border-b border-studio-200 dark:border-studio-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="p-2 rounded-lg bg-studio-100 dark:bg-studio-800 text-studio-700 dark:text-studio-200"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current text-forge-500" /> : <Play className="w-4 h-4 fill-current text-forge-500" />}
          </button>
          <button
            type="button"
            onClick={restartAnimation}
            className="p-2 rounded-lg bg-studio-100 dark:bg-studio-800 text-studio-700 dark:text-studio-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={randomize}
            className="p-2 rounded-lg bg-studio-100 dark:bg-studio-800 text-studio-700 dark:text-studio-200"
            title="Randomize"
          >
            <Sparkles className="w-4 h-4 text-forge-500" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsExportOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-forge-500 text-white shadow"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>

      {/* Accordion Controls List */}
      <div className="flex flex-col divide-y divide-studio-200 dark:divide-studio-800 p-3">
        {/* 1. TEXT */}
        <div className="py-2">
          <button
            type="button"
            onClick={() => toggleSection("text")}
            className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-studio-800 dark:text-studio-200"
          >
            <span className="flex items-center gap-2">
              <Type className="w-4 h-4 text-forge-500" />
              Text Content
            </span>
            {openSection === "text" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSection === "text" && (
            <div className="pt-2 flex flex-col gap-3">
              <textarea
                value={config.text}
                onChange={(e) => updateConfig({ text: e.target.value })}
                rows={3}
                placeholder="Enter text..."
                className="w-full p-2.5 text-sm rounded-lg border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-850 text-studio-900 dark:text-studio-100"
              />
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => updateConfig({ text: config.text.toUpperCase() })}
                  className="py-1.5 text-xs rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800"
                >
                  UPPER
                </button>
                <button
                  type="button"
                  onClick={() => updateConfig({ text: config.text.toLowerCase() })}
                  className="py-1.5 text-xs rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800"
                >
                  lower
                </button>
                <button
                  type="button"
                  onClick={() => updateConfig({ text: "" })}
                  className="py-1.5 text-xs rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-red-500"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. MOTION & LAYOUT */}
        <div className="py-2">
          <button
            type="button"
            onClick={() => toggleSection("motion")}
            className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-studio-800 dark:text-studio-200"
          >
            <span className="flex items-center gap-2">
              <Move className="w-4 h-4 text-forge-500" />
              Motion & Direction
            </span>
            {openSection === "motion" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSection === "motion" && (
            <div className="pt-2 flex flex-col gap-4">
              <div className="grid grid-cols-4 gap-1.5">
                {(["left", "right", "up", "down"] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => updateConfig({ direction: dir })}
                    className={`py-2 text-xs font-bold capitalize rounded border ${
                      config.direction === dir
                        ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400"
                        : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800"
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>

              <Slider
                label="Speed"
                value={config.speed}
                min={20}
                max={500}
                step={5}
                unit="px/s"
                onChange={(val) => updateConfig({ speed: val })}
              />

              <Slider
                label="Repeat Gap"
                value={config.repeatGap}
                min={10}
                max={200}
                step={5}
                unit="px"
                onChange={(val) => updateConfig({ repeatGap: val })}
              />
            </div>
          )}
        </div>

        {/* 3. TYPOGRAPHY */}
        <div className="py-2">
          <button
            type="button"
            onClick={() => toggleSection("typography")}
            className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-studio-800 dark:text-studio-200"
          >
            <span className="flex items-center gap-2">
              <Type className="w-4 h-4 text-forge-500" />
              Typography
            </span>
            {openSection === "typography" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSection === "typography" && (
            <div className="pt-2 flex flex-col gap-4">
              <select
                value={typography.fontFamily}
                onChange={(e) => updateNestedConfig("typography", { fontFamily: e.target.value })}
                className="w-full p-2 text-xs rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800"
              >
                {FONTS_CATALOG.map((f) => (
                  <option key={f.name} value={f.name}>{f.name}</option>
                ))}
              </select>

              <Slider
                label="Font Size"
                value={typography.fontSize}
                min={20}
                max={160}
                step={2}
                unit="px"
                onChange={(val) => updateNestedConfig("typography", { fontSize: val })}
              />
              <Slider
                label="Letter Spacing"
                value={typography.letterSpacing}
                min={-2}
                max={20}
                step={1}
                unit="px"
                onChange={(val) => updateNestedConfig("typography", { letterSpacing: val })}
              />
            </div>
          )}
        </div>

        {/* 4. COLORS */}
        <div className="py-2">
          <button
            type="button"
            onClick={() => toggleSection("colors")}
            className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-studio-800 dark:text-studio-200"
          >
            <span className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-forge-500" />
              Colors
            </span>
            {openSection === "colors" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSection === "colors" && (
            <div className="pt-2 flex flex-col gap-4">
              <ColorPicker
                label="Text Color"
                value={colors.textColor}
                onChange={(color) => updateNestedConfig("colors", { textColor: color })}
              />
              <Slider
                label="Opacity"
                value={Math.round((colors.opacity ?? 1) * 100)}
                min={10}
                max={100}
                step={5}
                unit="%"
                onChange={(val) => updateNestedConfig("colors", { opacity: val / 100 })}
              />
            </div>
          )}
        </div>

        {/* 5. EFFECTS */}
        <div className="py-2">
          <button
            type="button"
            onClick={() => toggleSection("effects")}
            className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-studio-800 dark:text-studio-200"
          >
            <span className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-forge-500" />
              Effects
            </span>
            {openSection === "effects" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSection === "effects" && (
            <div className="pt-2 flex flex-col gap-3">
              <label className="flex items-center justify-between p-2 rounded border border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800">
                <span className="text-xs font-medium">Neon Glow</span>
                <input
                  type="checkbox"
                  checked={effects.glow}
                  onChange={(e) => updateNestedConfig("effects", { glow: e.target.checked })}
                  className="w-4 h-4 accent-forge-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded border border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800">
                <span className="text-xs font-medium">Text Outline</span>
                <input
                  type="checkbox"
                  checked={effects.outline}
                  onChange={(e) => updateNestedConfig("effects", { outline: e.target.checked })}
                  className="w-4 h-4 accent-forge-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded border border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800">
                <span className="text-xs font-medium">Scanlines</span>
                <input
                  type="checkbox"
                  checked={effects.scanlines}
                  onChange={(e) => updateNestedConfig("effects", { scanlines: e.target.checked })}
                  className="w-4 h-4 accent-forge-500"
                />
              </label>
            </div>
          )}
        </div>

        {/* 6. BACKGROUND */}
        <div className="py-2">
          <button
            type="button"
            onClick={() => toggleSection("background")}
            className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-studio-800 dark:text-studio-200"
          >
            <span className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-forge-500" />
              Background
            </span>
            {openSection === "background" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSection === "background" && (
            <div className="pt-2 flex flex-col gap-4">
              <ColorPicker
                label="Background Color"
                value={background.color}
                onChange={(color) => updateNestedConfig("background", { color, type: "solid" })}
              />
            </div>
          )}
        </div>

        {/* 7. PRESETS */}
        <div className="py-2">
          <button
            type="button"
            onClick={() => toggleSection("presets")}
            className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-studio-800 dark:text-studio-200"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-forge-500" />
              Presets
            </span>
            {openSection === "presets" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSection === "presets" && (
            <div className="pt-2 grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPresetConfig(p.config)}
                  className="p-2 text-left rounded border border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800"
                >
                  <span className="text-xs font-bold block">{p.name}</span>
                  <span className="text-[10px] text-studio-400 line-clamp-1">{p.description}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
