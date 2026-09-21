"use client";

import React, { useState } from "react";
import {
  Type,
  Move,
  Palette,
  Wand2,
  Image as ImageIcon,
  Maximize2,
  Layers,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Check,
  Code2,
  Download,
} from "lucide-react";
import { useEditor } from "../../context/EditorContext";
import { Slider } from "../ui/Slider";
import { ColorPicker } from "../ui/ColorPicker";
import { FONTS_CATALOG } from "../../constants/fonts";
import { CANVAS_PRESETS, SPEED_PRESETS } from "../../constants/defaults";
import { PRESETS } from "../../constants/presets";
import { Direction } from "../../types/scroll";

const EMOJI_INSERTS = ["★", "✦", "⚡", "🚨", "▲", "▼", "🔥", "✨", "🚀", "•", "//", "→", "←"];

type TabKey =
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
    applyPresetConfig,
    setIsExportOpen,
    setIsCodeOpen,
  } = useEditor();

  const [activeTab, setActiveTab] = useState<TabKey>("text");

  const { typography, colors, effects, background, canvas } = config;
  const text = config.text;

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "text", label: "Text", icon: Type },
    { key: "motion", label: "Motion", icon: Move },
    { key: "typography", label: "Type", icon: Type },
    { key: "colors", label: "Color", icon: Palette },
    { key: "effects", label: "FX", icon: Wand2 },
    { key: "background", label: "Bg", icon: ImageIcon },
    { key: "canvas", label: "Canvas", icon: Maximize2 },
    { key: "presets", label: "Presets", icon: Layers },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-studio-900 select-none overflow-hidden">
      {/* Scrollable Tab Bar at the top */}
      <div className="flex items-center gap-1.5 p-1.5 sm:p-2 border-b border-studio-200 dark:border-studio-800 bg-studio-50/90 dark:bg-studio-950/90 overflow-x-auto scrollbar-none shrink-0">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold shrink-0 transition-all ${
                isActive
                  ? "bg-forge-500 text-white shadow-sm"
                  : "text-studio-600 dark:text-studio-400 hover:bg-studio-100 dark:hover:bg-studio-800 hover:text-studio-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        {/* ==================== 1. TEXT TAB ==================== */}
        {activeTab === "text" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-studio-400">
                Text &amp; Message
              </span>
              <div className="flex items-center gap-1 text-[11px] font-mono text-studio-400">
                <span>{text.length} chars</span>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => updateConfig({ text: e.target.value })}
              placeholder="Start typing your scrolling text..."
              rows={3}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-studio-200 dark:border-studio-700 bg-studio-50 dark:bg-studio-850 text-studio-900 dark:text-studio-100 placeholder:text-studio-400 focus:outline-none focus:border-forge-500 resize-none leading-relaxed"
            />

            {/* Actions: Duplicate, Clear, Case Transforms */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => updateConfig({ text: `${text} • ${text}` })}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
              >
                <Copy className="w-3 h-3 text-forge-500" />
                <span>Duplicate</span>
              </button>
              <button
                type="button"
                onClick={() => updateConfig({ text: "" })}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
              <button
                type="button"
                onClick={() => updateConfig({ text: text.toUpperCase() })}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
              >
                UPPER
              </button>
              <button
                type="button"
                onClick={() => updateConfig({ text: text.toLowerCase() })}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
              >
                lower
              </button>
              <button
                type="button"
                onClick={() => updateConfig({ text: text.replace(/\b\w/g, (c) => c.toUpperCase()) })}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
              >
                Title
              </button>
            </div>

            {/* Quick Symbol Inserts */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-studio-100 dark:border-studio-800">
              <span className="text-[11px] font-medium text-studio-400">Quick Symbols &amp; Glyphs</span>
              <div className="flex flex-wrap gap-1">
                {EMOJI_INSERTS.map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => updateConfig({ text: `${text} ${sym} ` })}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-xs font-bold hover:border-forge-500"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. MOTION TAB ==================== */}
        {activeTab === "motion" && (
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Direction &amp; Speed
            </h4>

            {/* Direction Grid */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                Direction
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { dir: "left", label: "Left", icon: ArrowLeft },
                  { dir: "right", label: "Right", icon: ArrowRight },
                  { dir: "up", label: "Up", icon: ArrowUp },
                  { dir: "down", label: "Down", icon: ArrowDown },
                ].map(({ dir, label, icon: Icon }) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => updateConfig({ direction: dir as Direction })}
                    className={`py-2 flex flex-col items-center justify-center gap-1 rounded-lg border text-xs font-medium transition-colors ${
                      config.direction === dir
                        ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                        : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[10px]">{label}</span>
                  </button>
                ))}
              </div>

              {/* Diagonals & Custom */}
              <div className="grid grid-cols-3 gap-1.5 mt-1">
                {[
                  { dir: "top-left", label: "↖ 135°" },
                  { dir: "bottom-right", label: "↘ 315°" },
                  { dir: "custom", label: "Custom °" },
                ].map(({ dir, label }) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => updateConfig({ direction: dir as Direction })}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      config.direction === dir
                        ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                        : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {config.direction === "custom" && (
              <Slider
                label="Custom Vector Angle"
                value={config.angle}
                min={0}
                max={360}
                step={1}
                unit="°"
                onChange={(val) => updateConfig({ angle: val })}
              />
            )}

            <Slider
              label="Velocity / Speed"
              value={config.speed}
              min={20}
              max={600}
              step={5}
              unit="px/s"
              onChange={(val) => updateConfig({ speed: val })}
            />

            {/* Quick Speed Pills */}
            <div className="flex flex-wrap gap-1.5">
              {SPEED_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => updateConfig({ speed: p.value })}
                  className={`px-2 py-1 text-[11px] rounded-lg border transition-colors ${
                    config.speed === p.value
                      ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                      : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-600 dark:text-studio-400"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <Slider
              label="Repeat Gap"
              value={config.repeatGap}
              min={0}
              max={300}
              step={5}
              unit="px"
              onChange={(val) => updateConfig({ repeatGap: val })}
            />

            {/* Loop Modes */}
            <div className="flex flex-col gap-2 pt-2 border-t border-studio-100 dark:border-studio-800">
              <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                Loop Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateConfig({ loopMode: "continuous" })}
                  className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                    config.loopMode === "continuous"
                      ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                      : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                  }`}
                >
                  Continuous
                </button>
                <button
                  type="button"
                  onClick={() => updateConfig({ loopMode: "ping-pong" })}
                  className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                    config.loopMode === "ping-pong"
                      ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                      : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                  }`}
                >
                  Ping-Pong
                </button>
              </div>

              <label className="flex items-center justify-between p-2.5 rounded-lg border border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 cursor-pointer mt-1">
                <span className="text-xs font-medium text-studio-700 dark:text-studio-300">
                  Pause on Hover
                </span>
                <input
                  type="checkbox"
                  checked={config.pauseOnHover}
                  onChange={(e) => updateConfig({ pauseOnHover: e.target.checked })}
                  className="w-4 h-4 accent-forge-500 rounded"
                />
              </label>
            </div>
          </div>
        )}

        {/* ==================== 3. TYPOGRAPHY TAB ==================== */}
        {activeTab === "typography" && (
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Font &amp; Typographic Rhythm
            </h4>

            {/* Font Family Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                Font Family
              </label>
              <select
                value={typography.fontFamily}
                onChange={(e) => updateNestedConfig("typography", { fontFamily: e.target.value })}
                className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500"
              >
                {FONTS_CATALOG.map((f) => (
                  <option key={f.name} value={f.name}>
                    {f.name} ({f.category})
                  </option>
                ))}
              </select>
            </div>

            <Slider
              label="Font Size"
              value={typography.fontSize}
              min={16}
              max={220}
              step={1}
              unit="px"
              onChange={(val) => updateNestedConfig("typography", { fontSize: val })}
            />

            <Slider
              label="Font Weight"
              value={typography.fontWeight}
              min={100}
              max={900}
              step={100}
              onChange={(val) => updateNestedConfig("typography", { fontWeight: val })}
            />

            <Slider
              label="Letter Spacing"
              value={typography.letterSpacing}
              min={-5}
              max={40}
              step={1}
              unit="px"
              onChange={(val) => updateNestedConfig("typography", { letterSpacing: val })}
            />

            <Slider
              label="Line Height"
              value={typography.lineHeight}
              min={0.8}
              max={3.0}
              step={0.1}
              onChange={(val) => updateNestedConfig("typography", { lineHeight: val })}
            />

            {/* Transform / Italic */}
            <div className="flex flex-col gap-2 pt-2 border-t border-studio-100 dark:border-studio-800">
              <span className="text-xs font-medium text-studio-700 dark:text-studio-300">
                Text Transformation
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(["none", "uppercase", "lowercase"] as const).map((tr) => (
                  <button
                    key={tr}
                    type="button"
                    onClick={() => updateNestedConfig("typography", { textTransform: tr })}
                    className={`py-1.5 text-xs font-medium capitalize rounded-lg border ${
                      typography.textTransform === tr
                        ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                        : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                    }`}
                  >
                    {tr}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() =>
                    updateNestedConfig("typography", { italic: !typography.italic })
                  }
                  className={`py-2 px-3 text-xs font-semibold italic rounded-lg border transition-colors ${
                    typography.italic
                      ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400"
                      : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                  }`}
                >
                  Italic
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateNestedConfig("typography", { underline: !typography.underline })
                  }
                  className={`py-2 px-3 text-xs font-semibold underline rounded-lg border transition-colors ${
                    typography.underline
                      ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400"
                      : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                  }`}
                >
                  Underline
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 4. COLOR TAB ==================== */}
        {activeTab === "colors" && (
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Text Fill &amp; Gradients
            </h4>

            {/* Fill Mode */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateNestedConfig("colors", { colorMode: "solid" })}
                className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                  colors.colorMode === "solid"
                    ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                    : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                }`}
              >
                Solid Color
              </button>
              <button
                type="button"
                onClick={() => updateNestedConfig("colors", { colorMode: "gradient" })}
                className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                  colors.colorMode === "gradient"
                    ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                    : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                }`}
              >
                Linear Gradient
              </button>
            </div>

            {colors.colorMode === "solid" ? (
              <ColorPicker
                label="Text Color"
                value={colors.textColor}
                onChange={(color) => updateNestedConfig("colors", { textColor: color })}
              />
            ) : (
              <div className="flex flex-col gap-3">
                <ColorPicker
                  label="Gradient Start"
                  value={colors.gradientStart}
                  onChange={(color) => updateNestedConfig("colors", { gradientStart: color })}
                />
                <ColorPicker
                  label="Gradient End"
                  value={colors.gradientEnd}
                  onChange={(color) => updateNestedConfig("colors", { gradientEnd: color })}
                />
                <Slider
                  label="Gradient Angle"
                  value={colors.gradientAngle}
                  min={0}
                  max={360}
                  step={5}
                  unit="°"
                  onChange={(val) => updateNestedConfig("colors", { gradientAngle: val })}
                />
              </div>
            )}

            <Slider
              label="Text Opacity"
              value={Math.round((colors.opacity ?? 1) * 100)}
              min={10}
              max={100}
              step={5}
              unit="%"
              onChange={(val) => updateNestedConfig("colors", { opacity: val / 100 })}
            />
          </div>
        )}

        {/* ==================== 5. EFFECTS TAB ==================== */}
        {activeTab === "effects" && (
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Visual Effects Engine
            </h4>

            {/* Neon Glow */}
            <div className="p-3 rounded-xl border border-studio-200 dark:border-studio-750 bg-studio-50/50 dark:bg-studio-850/50 flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-studio-900 dark:text-studio-100">
                  Neon Glow
                </span>
                <input
                  type="checkbox"
                  checked={effects.glow}
                  onChange={(e) => updateNestedConfig("effects", { glow: e.target.checked })}
                  className="w-4 h-4 accent-forge-500 rounded"
                />
              </label>

              {effects.glow && (
                <div className="flex flex-col gap-3 pt-2 border-t border-studio-200 dark:border-studio-750">
                  <ColorPicker
                    label="Glow Color"
                    value={effects.glowColor}
                    onChange={(color) => updateNestedConfig("effects", { glowColor: color })}
                  />
                  <Slider
                    label="Glow Radius"
                    value={effects.glowBlur}
                    min={2}
                    max={60}
                    step={1}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { glowBlur: val })}
                  />
                </div>
              )}
            </div>

            {/* Outline Stroke */}
            <div className="p-3 rounded-xl border border-studio-200 dark:border-studio-750 bg-studio-50/50 dark:bg-studio-850/50 flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-studio-900 dark:text-studio-100">
                  Outline Contour
                </span>
                <input
                  type="checkbox"
                  checked={effects.outline}
                  onChange={(e) => updateNestedConfig("effects", { outline: e.target.checked })}
                  className="w-4 h-4 accent-forge-500 rounded"
                />
              </label>

              {effects.outline && (
                <div className="flex flex-col gap-3 pt-2 border-t border-studio-200 dark:border-studio-750">
                  <Slider
                    label="Stroke Width"
                    value={effects.outlineWidth}
                    min={1}
                    max={12}
                    step={1}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { outlineWidth: val })}
                  />
                  <ColorPicker
                    label="Stroke Color"
                    value={effects.outlineColor}
                    onChange={(color) => updateNestedConfig("effects", { outlineColor: color })}
                  />
                </div>
              )}
            </div>

            {/* CRT Scanlines */}
            <div className="p-3 rounded-xl border border-studio-200 dark:border-studio-750 bg-studio-50/50 dark:bg-studio-850/50 flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-studio-900 dark:text-studio-100">
                  CRT Scanlines
                </span>
                <input
                  type="checkbox"
                  checked={effects.scanlines}
                  onChange={(e) => updateNestedConfig("effects", { scanlines: e.target.checked })}
                  className="w-4 h-4 accent-forge-500 rounded"
                />
              </label>

              {effects.scanlines && (
                <div className="flex flex-col gap-3 pt-2 border-t border-studio-200 dark:border-studio-750">
                  <Slider
                    label="Line Density"
                    value={effects.scanlinesDensity}
                    min={2}
                    max={20}
                    step={1}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { scanlinesDensity: val })}
                  />
                </div>
              )}
            </div>

            {/* LED Matrix */}
            <div className="p-3 rounded-xl border border-studio-200 dark:border-studio-750 bg-studio-50/50 dark:bg-studio-850/50 flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-studio-900 dark:text-studio-100">
                  LED Dot Matrix
                </span>
                <input
                  type="checkbox"
                  checked={effects.led}
                  onChange={(e) => updateNestedConfig("effects", { led: e.target.checked })}
                  className="w-4 h-4 accent-forge-500 rounded"
                />
              </label>

              {effects.led && (
                <div className="flex flex-col gap-3 pt-2 border-t border-studio-200 dark:border-studio-750">
                  <Slider
                    label="Dot Radius"
                    value={effects.ledDotSize}
                    min={1}
                    max={6}
                    step={0.5}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { ledDotSize: val })}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== 6. BACKGROUND TAB ==================== */}
        {activeTab === "background" && (
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Canvas Background &amp; Patterns
            </h4>

            <div className="grid grid-cols-3 gap-1.5">
              {[
                { type: "solid", label: "Solid" },
                { type: "gradient", label: "Gradient" },
                { type: "transparent", label: "Transparent" },
              ].map(({ type, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateNestedConfig("background", { type: type as any })}
                  className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                    background.type === type
                      ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                      : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {background.type === "solid" && (
              <ColorPicker
                label="Background Color"
                value={background.color}
                onChange={(color) => updateNestedConfig("background", { color })}
              />
            )}

            {background.type === "gradient" && (
              <div className="flex flex-col gap-3">
                <ColorPicker
                  label="Gradient Start"
                  value={background.gradientStart}
                  onChange={(color) => updateNestedConfig("background", { gradientStart: color })}
                />
                <ColorPicker
                  label="Gradient End"
                  value={background.gradientEnd}
                  onChange={(color) => updateNestedConfig("background", { gradientEnd: color })}
                />
                <Slider
                  label="Gradient Angle"
                  value={background.gradientAngle}
                  min={0}
                  max={360}
                  step={5}
                  unit="°"
                  onChange={(val) => updateNestedConfig("background", { gradientAngle: val })}
                />
              </div>
            )}
          </div>
        )}

        {/* ==================== 7. CANVAS TAB ==================== */}
        {activeTab === "canvas" && (
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Canvas Dimensions &amp; Ratio
            </h4>

            {/* Presets */}
            <div className="grid grid-cols-2 gap-2">
              {CANVAS_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() =>
                    updateNestedConfig("canvas", {
                      width: p.width,
                      height: p.height,
                      presetName: p.name,
                    })
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    canvas.width === p.width && canvas.height === p.height
                      ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                      : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                  }`}
                >
                  <span className="text-xs font-bold block">{p.name}</span>
                  <span className="text-[10px] font-mono text-studio-400">
                    {p.width} × {p.height}
                  </span>
                </button>
              ))}
            </div>

            <Slider
              label="Canvas Width"
              value={canvas.width}
              min={300}
              max={1920}
              step={10}
              unit="px"
              onChange={(val) => updateNestedConfig("canvas", { width: val, presetName: "Custom" })}
            />

            <Slider
              label="Canvas Height"
              value={canvas.height}
              min={80}
              max={1080}
              step={10}
              unit="px"
              onChange={(val) => updateNestedConfig("canvas", { height: val, presetName: "Custom" })}
            />
          </div>
        )}

        {/* ==================== 8. PRESETS TAB ==================== */}
        {activeTab === "presets" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
                Curated Presets Library
              </h4>
              <span className="text-[11px] font-mono text-studio-400">12 Ready-to-Use</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPresetConfig(preset.config)}
                  className="p-3 rounded-xl border border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-left hover:border-forge-500/60 transition-all flex flex-col gap-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-studio-900 dark:text-studio-100 group-hover:text-forge-500 transition-colors">
                      {preset.name}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-studio-100 dark:bg-studio-700 text-studio-500">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-studio-500 dark:text-studio-400 line-clamp-1">
                    {preset.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Persistent Mobile Bottom Action Bar */}
      <div className="p-2.5 sm:p-3 border-t border-studio-200 dark:border-studio-800 bg-white/95 dark:bg-studio-900/95 backdrop-blur flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setIsCodeOpen(true)}
          className="flex-1 py-2 sm:py-2.5 px-3 rounded-xl border border-studio-200 dark:border-studio-700 bg-studio-100 dark:bg-studio-800 text-studio-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-studio-200 dark:hover:bg-studio-750 active:scale-98 transition-all"
        >
          <Code2 className="w-3.5 h-3.5 text-forge-500" />
          <span>Get Code</span>
        </button>
        <button
          type="button"
          onClick={() => setIsExportOpen(true)}
          className="flex-[1.4] py-2 sm:py-2.5 px-3 rounded-xl bg-forge-500 hover:bg-forge-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-forge-500/20 active:scale-98 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Media</span>
        </button>
      </div>
    </div>
  );
}
