"use client";

import React from "react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  presetColors?: string[];
  className?: string;
}

const DEFAULT_PRESETS = [
  "#ffffff",
  "#000000",
  "#f97316", // Forge orange
  "#ec4899", // Neon pink
  "#22d3ee", // Cyan
  "#facc15", // Electric yellow
  "#4ade80", // Terminal green
  "#a855f7", // Purple
  "#dc2626", // Red
  "#38bdf8", // Sky blue
];

export function ColorPicker({
  label,
  value,
  onChange,
  presetColors = DEFAULT_PRESETS,
  className = "",
}: ColorPickerProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-studio-400 dark:text-studio-300">{label}</span>
        <div className="flex items-center gap-1.5">
          <label className="relative flex items-center justify-center w-6 h-6 rounded cursor-pointer border border-studio-200 dark:border-studio-700 shadow-sm overflow-hidden">
            <span
              className="absolute inset-0"
              style={{ backgroundColor: value }}
            />
            <input
              type="color"
              value={value.startsWith("#") && value.length === 7 ? value : "#ffffff"}
              onChange={(e) => onChange(e.target.value)}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-20 px-1.5 py-0.5 font-mono text-xs uppercase rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500 focus:ring-1 focus:ring-forge-500"
          />
        </div>
      </div>

      {presetColors && presetColors.length > 0 && (
        <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
          {presetColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`w-4 h-4 rounded-sm border transition-transform hover:scale-110 ${
                value.toLowerCase() === color.toLowerCase()
                  ? "ring-1 ring-forge-500 ring-offset-1 border-white dark:border-studio-900"
                  : "border-black/20 dark:border-white/20"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      )}
    </div>
  );
}
