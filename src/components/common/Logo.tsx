"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export function Logo({ className = "", size = 36, showWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Custom Kinetic Forge Mark */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-studio-900 to-studio-950 dark:from-studio-850 dark:to-studio-950 border border-studio-750/80 p-1.5 shadow-md shadow-black/20 group-hover:border-forge-500/60 transition-colors"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Kinetic Track 1 (Top forward glide) */}
          <path
            d="M5 9C5 7.89543 5.89543 7 7 7H21C23.2091 7 25 8.79086 25 11C25 13.2091 23.2091 15 21 15H11"
            stroke="url(#sf-grad-1)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Kinetic Track 2 (Bottom return glide) */}
          <path
            d="M27 23C27 24.1046 26.1046 25 25 25H11C8.79086 25 7 23.2091 7 21C7 18.7909 8.79086 17 11 17H21"
            stroke="url(#sf-grad-2)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Forge Spark Node */}
          <circle cx="16" cy="16" r="2.5" fill="#f97316" />
          
          <defs>
            <linearGradient id="sf-grad-1" x1="5" y1="11" x2="25" y2="11" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f97316" />
              <stop offset="1" stopColor="#fb923c" />
            </linearGradient>
            <linearGradient id="sf-grad-2" x1="27" y1="21" x2="7" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ea580c" />
              <stop offset="1" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showWordmark && (
        <span className="font-black text-lg tracking-tight leading-none text-studio-950 dark:text-white">
          ScrollForge
        </span>
      )}
    </div>
  );
}
