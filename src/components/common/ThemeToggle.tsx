"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useEditor } from "../../context/EditorContext";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { uiTheme, toggleUiTheme } = useEditor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 flex items-center justify-center text-studio-400 ${className}`}
        aria-hidden="true"
      >
        <span className="w-4 h-4" />
      </div>
    );
  }

  const isDark = uiTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleUiTheme}
      className={`relative p-2 rounded-xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 text-studio-700 dark:text-studio-300 hover:text-studio-950 dark:hover:text-white hover:border-studio-300 dark:hover:border-studio-700 hover:bg-studio-50 dark:hover:bg-studio-850 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forge-500/20 ${className}`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45 duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-studio-700 transition-transform hover:-rotate-12 duration-300" />
      )}
    </button>
  );
}
