"use client";

import React from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
  className?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  className = "",
}: SliderProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-studio-700 dark:text-studio-300">{label}</span>
        <div className="flex items-center gap-1">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              const num = parseFloat(e.target.value);
              if (!isNaN(num)) {
                onChange(Math.min(max, Math.max(min, num)));
              }
            }}
            className="w-14 px-1.5 py-0.5 text-right font-mono text-xs rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500 focus:ring-1 focus:ring-forge-500"
          />
          {unit && <span className="text-studio-500 text-[11px] font-mono">{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-studio-200 dark:bg-studio-750 rounded-lg appearance-none cursor-pointer accent-forge-500 focus:outline-none"
      />
    </div>
  );
}
