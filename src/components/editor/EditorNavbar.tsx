"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Undo2,
  Redo2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Share2,
  FolderOpen,
  Code2,
  Download,
  Sun,
  Moon,
  Laptop,
  Tablet,
  Smartphone,
  Check,
  FilePlus,
  HelpCircle,
  Layers,
} from "lucide-react";
import { useEditor } from "../../context/EditorContext";
import { ZoomLevel, DeviceMode } from "../../types/scroll";
import { Logo } from "../common/Logo";

export function EditorNavbar() {
  const {
    isPlaying,
    togglePlay,
    restartAnimation,
    canUndo,
    canRedo,
    undo,
    redo,
    zoom,
    setZoom,
    deviceMode,
    setDeviceMode,
    uiTheme,
    toggleUiTheme,
    randomize,
    resetToDefault,
    savedProjects,
    setIsExportOpen,
    setIsCodeOpen,
    setIsProjectsOpen,
    setIsHelpOpen,
    getShareUrl,
  } = useEditor();

  const [copiedShare, setCopiedShare] = useState(false);
  const [showConfirmNew, setShowConfirmNew] = useState(false);

  const handleShare = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch {
      // Fallback prompt
      window.prompt("Copy this share URL:", url);
    }
  };

  const handleNew = () => {
    resetToDefault();
    setShowConfirmNew(false);
  };

  return (
    <header className="h-14 border-b border-studio-200 dark:border-studio-800 bg-white/95 dark:bg-studio-900/95 backdrop-blur-md px-4 flex items-center justify-between z-30 select-none">
      {/* Brand & File Actions */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo size={32} showWordmark={true} />
        </Link>

        <div className="h-5 w-[1px] bg-studio-200 dark:bg-studio-800 mx-1" />

        {/* New / Reset */}
        <div className="relative">
          <button
            onClick={() => setShowConfirmNew(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md text-studio-600 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-800 transition-colors"
            title="Create New Project"
          >
            <FilePlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New</span>
          </button>

          {showConfirmNew && (
            <div className="absolute top-full left-0 mt-1 w-52 p-3 bg-white dark:bg-studio-850 border border-studio-200 dark:border-studio-700 rounded-lg shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
              <p className="text-xs font-medium text-studio-800 dark:text-studio-200 mb-2">
                Reset current canvas to default?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowConfirmNew(false)}
                  className="px-2 py-1 text-[11px] rounded text-studio-500 hover:bg-studio-100 dark:hover:bg-studio-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNew}
                  className="px-2.5 py-1 text-[11px] font-medium rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* History Undo / Redo */}
        <div className="flex items-center">
          <button
            onClick={undo}
            disabled={!canUndo}
            className={`p-1.5 rounded-md transition-colors ${
              canUndo
                ? "text-studio-700 dark:text-studio-200 hover:bg-studio-100 dark:hover:bg-studio-800"
                : "text-studio-300 dark:text-studio-600 cursor-not-allowed"
            }`}
            title="Undo (Ctrl+Z)"
            aria-label="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className={`p-1.5 rounded-md transition-colors ${
              canRedo
                ? "text-studio-700 dark:text-studio-200 hover:bg-studio-100 dark:hover:bg-studio-800"
                : "text-studio-300 dark:text-studio-600 cursor-not-allowed"
            }`}
            title="Redo (Ctrl+Shift+Z)"
            aria-label="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Studio Transport Controls */}
      <div className="hidden md:flex items-center gap-2">
        <div className="flex items-center bg-studio-100 dark:bg-studio-800 p-0.5 rounded-lg border border-studio-200 dark:border-studio-750">
          <button
            onClick={togglePlay}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              isPlaying
                ? "bg-white dark:bg-studio-700 text-studio-900 dark:text-white shadow-sm"
                : "text-studio-600 dark:text-studio-400 hover:text-studio-900 dark:hover:text-white"
            }`}
            title="Play/Pause (Space)"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-forge-500 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-forge-500 fill-current" />
                <span>Play</span>
              </>
            )}
          </button>
          <button
            onClick={restartAnimation}
            className="p-1.5 text-studio-600 dark:text-studio-400 hover:text-studio-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-studio-700 rounded-md transition-colors"
            title="Restart (R)"
            aria-label="Restart Animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Device Preview Toggle */}
        <div className="flex items-center bg-studio-100 dark:bg-studio-800 p-0.5 rounded-lg border border-studio-200 dark:border-studio-750">
          <button
            onClick={() => setDeviceMode("desktop")}
            className={`p-1.5 rounded-md transition-colors ${
              deviceMode === "desktop"
                ? "bg-white dark:bg-studio-700 text-forge-500 shadow-sm"
                : "text-studio-400 hover:text-studio-700 dark:hover:text-studio-200"
            }`}
            title="Desktop View"
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode("tablet")}
            className={`p-1.5 rounded-md transition-colors ${
              deviceMode === "tablet"
                ? "bg-white dark:bg-studio-700 text-forge-500 shadow-sm"
                : "text-studio-400 hover:text-studio-700 dark:hover:text-studio-200"
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode("mobile")}
            className={`p-1.5 rounded-md transition-colors ${
              deviceMode === "mobile"
                ? "bg-white dark:bg-studio-700 text-forge-500 shadow-sm"
                : "text-studio-400 hover:text-studio-700 dark:hover:text-studio-200"
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zoom Selector */}
        <div className="flex items-center">
          <select
            value={zoom}
            onChange={(e) => {
              const val = e.target.value === "fit" ? "fit" : parseFloat(e.target.value);
              setZoom(val as ZoomLevel);
            }}
            className="text-xs font-mono font-medium py-1 px-2 rounded-lg bg-studio-100 dark:bg-studio-800 text-studio-700 dark:text-studio-300 border border-studio-200 dark:border-studio-750 focus:outline-none focus:border-forge-500"
            aria-label="Canvas Zoom"
          >
            <option value="fit">Fit View</option>
            <option value="0.25">25%</option>
            <option value="0.5">50%</option>
            <option value="0.75">75%</option>
            <option value="1">100%</option>
            <option value="1.5">150%</option>
            <option value="2">200%</option>
          </select>
        </div>
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center gap-2">
        {/* Randomize */}
        <button
          onClick={randomize}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-studio-100 dark:bg-studio-800 hover:bg-studio-200 dark:hover:bg-studio-750 text-studio-700 dark:text-studio-200 transition-colors border border-studio-200 dark:border-studio-700"
          title="Generate Random Visually Striking Combination"
        >
          <Sparkles className="w-3.5 h-3.5 text-forge-500" />
          <span className="hidden lg:inline">Randomize</span>
        </button>

        {/* Presets Gallery Link */}
        <Link
          href="/presets"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-studio-600 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-800 transition-colors"
          title="Browse Curated Presets"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Presets</span>
        </Link>

        {/* Saved Projects */}
        <button
          onClick={() => setIsProjectsOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-studio-600 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-800 transition-colors"
          title="Saved Projects & Recent Creations"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Projects</span>
          {savedProjects.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-forge-500/10 text-forge-600 dark:text-forge-400 font-bold">
              {savedProjects.length}
            </span>
          )}
        </button>

        {/* Share Link */}
        <button
          onClick={handleShare}
          className="p-1.5 text-studio-600 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-800 rounded-lg transition-colors"
          title="Copy Shareable Link"
          aria-label="Share Configuration"
        >
          {copiedShare ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
        </button>

        {/* Code Generator */}
        <button
          onClick={() => setIsCodeOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-studio-100 dark:bg-studio-800 hover:bg-studio-200 dark:hover:bg-studio-750 text-studio-800 dark:text-studio-200 border border-studio-200 dark:border-studio-700 transition-colors"
          title="View & Download Production Code"
        >
          <Code2 className="w-3.5 h-3.5 text-forge-500" />
          <span className="hidden md:inline">Code</span>
        </button>

        {/* UI Theme Toggle */}
        <button
          onClick={toggleUiTheme}
          className="p-1.5 text-studio-600 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-800 rounded-lg transition-colors"
          title={`Switch to ${uiTheme === "dark" ? "Light" : "Dark"} Mode`}
          aria-label="Toggle Theme"
        >
          {uiTheme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        {/* Help */}
        <button
          onClick={() => setIsHelpOpen(true)}
          className="p-1.5 text-studio-400 hover:text-studio-600 dark:hover:text-studio-200 rounded-lg hover:bg-studio-100 dark:hover:bg-studio-800 transition-colors"
          title="Keyboard Shortcuts & Help"
          aria-label="Help"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Main Export Action */}
        <button
          onClick={() => setIsExportOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-forge-500 hover:bg-forge-600 text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
}
