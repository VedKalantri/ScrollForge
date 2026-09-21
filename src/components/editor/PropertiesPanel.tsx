"use client";

import React, { useState } from "react";
import {
  Type,
  Move,
  Palette,
  Wand2,
  Image as ImageIcon,
  Maximize2,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Compass,
} from "lucide-react";
import { useEditor } from "../../context/EditorContext";
import { Slider } from "../ui/Slider";
import { ColorPicker } from "../ui/ColorPicker";
import { FONTS_CATALOG } from "../../constants/fonts";
import { CANVAS_PRESETS, SPEED_PRESETS } from "../../constants/defaults";
import { Direction } from "../../types/scroll";

type TabId = "typography" | "motion" | "colors" | "effects" | "background" | "canvas";

export function PropertiesPanel() {
  const { config, updateConfig, updateNestedConfig } = useEditor();
  const [activeTab, setActiveTab] = useState<TabId>("typography");

  const { typography, colors, effects, background, canvas } = config;

  return (
    <aside className="w-80 h-full border-l border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 flex flex-col shrink-0 select-none overflow-hidden">
      {/* Tab Navigation Header */}
      <div className="grid grid-cols-6 border-b border-studio-200 dark:border-studio-800 bg-studio-50/70 dark:bg-studio-850/70">
        <button
          onClick={() => setActiveTab("typography")}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 transition-colors ${
            activeTab === "typography"
              ? "border-forge-500 text-forge-500 font-bold bg-white dark:bg-studio-900"
              : "border-transparent text-studio-400 hover:text-studio-700 dark:hover:text-studio-200"
          }`}
          title="Typography"
        >
          <Type className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTab("motion")}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 transition-colors ${
            activeTab === "motion"
              ? "border-forge-500 text-forge-500 font-bold bg-white dark:bg-studio-900"
              : "border-transparent text-studio-400 hover:text-studio-700 dark:hover:text-studio-200"
          }`}
          title="Motion & Direction"
        >
          <Move className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTab("colors")}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 transition-colors ${
            activeTab === "colors"
              ? "border-forge-500 text-forge-500 font-bold bg-white dark:bg-studio-900"
              : "border-transparent text-studio-400 hover:text-studio-700 dark:hover:text-studio-200"
          }`}
          title="Colors & Text Fill"
        >
          <Palette className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTab("effects")}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 transition-colors ${
            activeTab === "effects"
              ? "border-forge-500 text-forge-500 font-bold bg-white dark:bg-studio-900"
              : "border-transparent text-studio-400 hover:text-studio-700 dark:hover:text-studio-200"
          }`}
          title="Visual Effects"
        >
          <Wand2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTab("background")}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 transition-colors ${
            activeTab === "background"
              ? "border-forge-500 text-forge-500 font-bold bg-white dark:bg-studio-900"
              : "border-transparent text-studio-400 hover:text-studio-700 dark:hover:text-studio-200"
          }`}
          title="Background & Patterns"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTab("canvas")}
          className={`py-3 flex flex-col items-center justify-center gap-1 border-b-2 transition-colors ${
            activeTab === "canvas"
              ? "border-forge-500 text-forge-500 font-bold bg-white dark:bg-studio-900"
              : "border-transparent text-studio-400 hover:text-studio-700 dark:hover:text-studio-200"
          }`}
          title="Canvas Dimensions"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* ===================== TYPOGRAPHY TAB ===================== */}
        {activeTab === "typography" && (
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Typography Controls
            </h4>

            {/* Font Family */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                Font Family
              </label>
              <select
                value={typography.fontFamily}
                onChange={(e) => updateNestedConfig("typography", { fontFamily: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs font-medium rounded-lg border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500"
              >
                {FONTS_CATALOG.map((f) => (
                  <option key={f.name} value={f.name}>
                    {f.name} ({f.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <Slider
              label="Font Size"
              value={typography.fontSize}
              min={16}
              max={220}
              step={1}
              unit="px"
              onChange={(val) => updateNestedConfig("typography", { fontSize: val })}
            />

            {/* Font Weight */}
            <Slider
              label="Font Weight"
              value={typography.fontWeight}
              min={100}
              max={900}
              step={100}
              onChange={(val) => updateNestedConfig("typography", { fontWeight: val })}
            />

            {/* Letter Spacing */}
            <Slider
              label="Letter Spacing"
              value={typography.letterSpacing}
              min={-5}
              max={40}
              step={1}
              unit="px"
              onChange={(val) => updateNestedConfig("typography", { letterSpacing: val })}
            />

            {/* Line Height */}
            <Slider
              label="Line Height"
              value={typography.lineHeight}
              min={0.8}
              max={3.0}
              step={0.1}
              onChange={(val) => updateNestedConfig("typography", { lineHeight: val })}
            />

            {/* Text Transform & Style Toggles */}
            <div className="flex flex-col gap-2 pt-2 border-t border-studio-200 dark:border-studio-800">
              <span className="text-xs font-medium text-studio-700 dark:text-studio-300">
                Styling & Cases
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    updateNestedConfig("typography", { italic: !typography.italic })
                  }
                  className={`py-1.5 px-3 text-xs font-semibold italic rounded border transition-colors ${
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
                  className={`py-1.5 px-3 text-xs font-semibold underline rounded border transition-colors ${
                    typography.underline
                      ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400"
                      : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                  }`}
                >
                  Underline
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1.5 mt-1">
                {(["none", "uppercase", "lowercase"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateNestedConfig("typography", { textTransform: mode })}
                    className={`py-1 text-[11px] font-semibold capitalize rounded border transition-colors ${
                      typography.textTransform === mode
                        ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400"
                        : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-600 dark:text-studio-400"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================== MOTION & DIRECTION TAB ===================== */}
        {activeTab === "motion" && (
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Direction & Animation
            </h4>

            {/* Direction Grid */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                Scroll Direction
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
                    className={`py-2 flex flex-col items-center justify-center gap-1 rounded border text-xs font-medium transition-colors ${
                      config.direction === dir
                        ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                        : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-750"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[10px]">{label}</span>
                  </button>
                ))}
              </div>

              {/* Diagonal & Custom Angle */}
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
                    className={`py-1.5 text-xs font-medium rounded border transition-colors ${
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

            {/* Custom Angle Slider */}
            {config.direction === "custom" && (
              <Slider
                label="Custom Angle"
                value={config.angle}
                min={0}
                max={360}
                step={1}
                unit="°"
                onChange={(val) => updateConfig({ angle: val })}
              />
            )}

            {/* Speed Slider */}
            <Slider
              label="Scroll Speed"
              value={config.speed}
              min={20}
              max={600}
              step={5}
              unit="px/s"
              onChange={(val) => updateConfig({ speed: val })}
            />

            {/* Speed Presets */}
            <div className="flex flex-wrap gap-1.5">
              {SPEED_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => updateConfig({ speed: p.value })}
                  className={`px-2 py-1 text-[11px] rounded border transition-colors ${
                    config.speed === p.value
                      ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                      : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-600 dark:text-studio-400"
                  }`}
                >
                  {p.label} ({p.value})
                </button>
              ))}
            </div>

            {/* Repeat Spacing */}
            <Slider
              label="Loop Repeat Spacing"
              value={config.repeatGap}
              min={0}
              max={300}
              step={10}
              unit="px"
              onChange={(val) => updateConfig({ repeatGap: val })}
            />

            {/* Loop Mode */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-studio-200 dark:border-studio-800">
              <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                Loop Mode
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(["continuous", "ping-pong"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateConfig({ loopMode: mode })}
                    className={`py-1.5 text-xs font-semibold capitalize rounded border transition-colors ${
                      config.loopMode === mode
                        ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                        : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Pause on hover */}
            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={config.pauseOnHover}
                onChange={(e) => updateConfig({ pauseOnHover: e.target.checked })}
                className="w-4 h-4 rounded text-forge-500 focus:ring-forge-500 accent-forge-500"
              />
              <span className="text-xs font-medium text-studio-700 dark:text-studio-300">
                Pause on hover
              </span>
            </label>
          </div>
        )}

        {/* ===================== COLORS TAB ===================== */}
        {activeTab === "colors" && (
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Colors & Text Fill
            </h4>

            {/* Fill Mode */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateNestedConfig("colors", { colorMode: "solid" })}
                className={`py-1.5 text-xs font-semibold rounded border transition-colors ${
                  colors.colorMode === "solid"
                    ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400"
                    : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                }`}
              >
                Solid Color
              </button>
              <button
                type="button"
                onClick={() => updateNestedConfig("colors", { colorMode: "gradient" })}
                className={`py-1.5 text-xs font-semibold rounded border transition-colors ${
                  colors.colorMode === "gradient"
                    ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400"
                    : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300"
                }`}
              >
                Gradient Fill
              </button>
            </div>

            {colors.colorMode === "solid" ? (
              <ColorPicker
                label="Text Color"
                value={colors.textColor}
                onChange={(color) => updateNestedConfig("colors", { textColor: color })}
              />
            ) : (
              <div className="flex flex-col gap-4">
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

            {/* Opacity */}
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

        {/* ===================== EFFECTS TAB ===================== */}
        {activeTab === "effects" && (
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Visual Effects
            </h4>

            {/* Neon Glow */}
            <div className="p-3 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-850/50 flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-studio-800 dark:text-studio-200">
                  Neon Glow
                </span>
                <input
                  type="checkbox"
                  checked={effects.glow}
                  onChange={(e) => updateNestedConfig("effects", { glow: e.target.checked })}
                  className="w-4 h-4 rounded text-forge-500 accent-forge-500"
                />
              </label>

              {effects.glow && (
                <div className="flex flex-col gap-3 pt-2 border-t border-studio-200 dark:border-studio-800">
                  <ColorPicker
                    label="Glow Color"
                    value={effects.glowColor}
                    onChange={(color) => updateNestedConfig("effects", { glowColor: color })}
                  />
                  <Slider
                    label="Glow Intensity"
                    value={effects.glowIntensity}
                    min={1}
                    max={10}
                    step={1}
                    onChange={(val) => updateNestedConfig("effects", { glowIntensity: val })}
                  />
                  <Slider
                    label="Glow Blur"
                    value={effects.glowBlur}
                    min={4}
                    max={60}
                    step={2}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { glowBlur: val })}
                  />
                </div>
              )}
            </div>

            {/* Outline Stroke */}
            <div className="p-3 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-850/50 flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-studio-800 dark:text-studio-200">
                  Text Outline Stroke
                </span>
                <input
                  type="checkbox"
                  checked={effects.outline}
                  onChange={(e) => updateNestedConfig("effects", { outline: e.target.checked })}
                  className="w-4 h-4 rounded text-forge-500 accent-forge-500"
                />
              </label>

              {effects.outline && (
                <div className="flex flex-col gap-3 pt-2 border-t border-studio-200 dark:border-studio-800">
                  <ColorPicker
                    label="Outline Color"
                    value={effects.outlineColor}
                    onChange={(color) => updateNestedConfig("effects", { outlineColor: color })}
                  />
                  <Slider
                    label="Stroke Width"
                    value={effects.outlineWidth}
                    min={1}
                    max={12}
                    step={1}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { outlineWidth: val })}
                  />
                </div>
              )}
            </div>

            {/* Drop Shadow */}
            <div className="p-3 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-850/50 flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-studio-800 dark:text-studio-200">
                  Drop Shadow
                </span>
                <input
                  type="checkbox"
                  checked={effects.shadow}
                  onChange={(e) => updateNestedConfig("effects", { shadow: e.target.checked })}
                  className="w-4 h-4 rounded text-forge-500 accent-forge-500"
                />
              </label>

              {effects.shadow && (
                <div className="flex flex-col gap-3 pt-2 border-t border-studio-200 dark:border-studio-800">
                  <Slider
                    label="Offset X"
                    value={effects.shadowX}
                    min={-30}
                    max={30}
                    step={1}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { shadowX: val })}
                  />
                  <Slider
                    label="Offset Y"
                    value={effects.shadowY}
                    min={-30}
                    max={30}
                    step={1}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { shadowY: val })}
                  />
                  <Slider
                    label="Shadow Blur"
                    value={effects.shadowBlur}
                    min={0}
                    max={40}
                    step={1}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { shadowBlur: val })}
                  />
                </div>
              )}
            </div>

            {/* Scanlines Effect */}
            <div className="p-3 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-850/50 flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-studio-800 dark:text-studio-200">
                  CRT Scanlines
                </span>
                <input
                  type="checkbox"
                  checked={effects.scanlines}
                  onChange={(e) => updateNestedConfig("effects", { scanlines: e.target.checked })}
                  className="w-4 h-4 rounded text-forge-500 accent-forge-500"
                />
              </label>

              {effects.scanlines && (
                <div className="flex flex-col gap-3 pt-2 border-t border-studio-200 dark:border-studio-800">
                  <Slider
                    label="Density"
                    value={effects.scanlinesDensity}
                    min={2}
                    max={10}
                    step={1}
                    onChange={(val) => updateNestedConfig("effects", { scanlinesDensity: val })}
                  />
                  <Slider
                    label="Opacity"
                    value={Math.round(effects.scanlinesOpacity * 100)}
                    min={5}
                    max={80}
                    step={5}
                    unit="%"
                    onChange={(val) => updateNestedConfig("effects", { scanlinesOpacity: val / 100 })}
                  />
                </div>
              )}
            </div>

            {/* LED Matrix Effect */}
            <div className="p-3 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-850/50 flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-studio-800 dark:text-studio-200">
                  LED Matrix Mask
                </span>
                <input
                  type="checkbox"
                  checked={effects.led}
                  onChange={(e) => updateNestedConfig("effects", { led: e.target.checked })}
                  className="w-4 h-4 rounded text-forge-500 accent-forge-500"
                />
              </label>

              {effects.led && (
                <div className="flex flex-col gap-3 pt-2 border-t border-studio-200 dark:border-studio-800">
                  <Slider
                    label="Dot Spacing"
                    value={effects.ledDotSpacing}
                    min={4}
                    max={16}
                    step={1}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { ledDotSpacing: val })}
                  />
                </div>
              )}
            </div>

            {/* RGB Split */}
            <div className="p-3 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-850/50 flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-studio-800 dark:text-studio-200">
                  RGB Split Aberration
                </span>
                <input
                  type="checkbox"
                  checked={effects.rgbSplit}
                  onChange={(e) => updateNestedConfig("effects", { rgbSplit: e.target.checked })}
                  className="w-4 h-4 rounded text-forge-500 accent-forge-500"
                />
              </label>

              {effects.rgbSplit && (
                <div className="flex flex-col gap-3 pt-2 border-t border-studio-200 dark:border-studio-800">
                  <Slider
                    label="Split Offset"
                    value={effects.rgbSplitOffset}
                    min={1}
                    max={15}
                    step={1}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { rgbSplitOffset: val })}
                  />
                </div>
              )}
            </div>

            {/* Motion Blur */}
            <div className="p-3 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-850/50 flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-studio-800 dark:text-studio-200">
                  Blur Effect
                </span>
                <input
                  type="checkbox"
                  checked={effects.blur}
                  onChange={(e) => updateNestedConfig("effects", { blur: e.target.checked })}
                  className="w-4 h-4 rounded text-forge-500 accent-forge-500"
                />
              </label>

              {effects.blur && (
                <div className="flex flex-col gap-3 pt-2 border-t border-studio-200 dark:border-studio-800">
                  <Slider
                    label="Blur Amount"
                    value={effects.blurAmount}
                    min={1}
                    max={20}
                    step={1}
                    unit="px"
                    onChange={(val) => updateNestedConfig("effects", { blurAmount: val })}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== BACKGROUND TAB ===================== */}
        {activeTab === "background" && (
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Background System
            </h4>

            {/* Background Types */}
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { type: "solid", label: "Solid Color" },
                { type: "gradient", label: "Gradient" },
                { type: "pattern", label: "Pattern" },
                { type: "transparent", label: "Transparent" },
              ].map(({ type, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateNestedConfig("background", { type: type as any })}
                  className={`py-2 text-xs font-semibold rounded border transition-colors ${
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
              <div className="flex flex-col gap-4">
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

            {background.type === "pattern" && (
              <div className="flex flex-col gap-4">
                <ColorPicker
                  label="Base Color"
                  value={background.color}
                  onChange={(color) => updateNestedConfig("background", { color })}
                />
                <div className="grid grid-cols-3 gap-1.5">
                  {(["dots", "grid", "stripes"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => updateNestedConfig("background", { pattern: p })}
                      className={`py-1.5 text-xs font-semibold capitalize rounded border transition-colors ${
                        background.pattern === p
                          ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400"
                          : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-600 dark:text-studio-400"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <Slider
                  label="Pattern Scale"
                  value={background.patternScale}
                  min={8}
                  max={60}
                  step={2}
                  unit="px"
                  onChange={(val) => updateNestedConfig("background", { patternScale: val })}
                />
                <Slider
                  label="Pattern Opacity"
                  value={Math.round(background.patternOpacity * 100)}
                  min={5}
                  max={60}
                  step={5}
                  unit="%"
                  onChange={(val) => updateNestedConfig("background", { patternOpacity: val / 100 })}
                />
              </div>
            )}

            {background.type === "transparent" && (
              <div className="p-3 text-xs rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50 dark:bg-studio-850 text-studio-600 dark:text-studio-400 leading-relaxed">
                Background will be transparent in GIF export (supported) and embedded HTML/CSS components. Note that standard video codecs (WebM/MP4) encode with black background.
              </div>
            )}
          </div>
        )}

        {/* ===================== CANVAS TAB ===================== */}
        {activeTab === "canvas" && (
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-400">
              Canvas Dimensions
            </h4>

            {/* Presets */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                Preset Sizes
              </label>
              <div className="flex flex-col gap-1 max-h-56 overflow-y-auto pr-1">
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
                    className={`py-2 px-3 text-left rounded border transition-colors flex items-center justify-between ${
                      canvas.width === p.width && canvas.height === p.height
                        ? "border-forge-500 bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold"
                        : "border-studio-200 dark:border-studio-750 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-750"
                    }`}
                  >
                    <span className="text-xs">{p.name}</span>
                    <span className="text-[11px] font-mono text-studio-400">
                      {p.width} × {p.height}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Width & Height */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-studio-200 dark:border-studio-800">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={canvas.width}
                  onChange={(e) =>
                    updateNestedConfig("canvas", {
                      width: Math.max(200, parseInt(e.target.value) || 200),
                      presetName: "Custom",
                    })
                  }
                  className="px-2.5 py-1.5 text-xs font-mono rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={canvas.height}
                  onChange={(e) =>
                    updateNestedConfig("canvas", {
                      height: Math.max(100, parseInt(e.target.value) || 100),
                      presetName: "Custom",
                    })
                  }
                  className="px-2.5 py-1.5 text-xs font-mono rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
