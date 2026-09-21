"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { ScrollConfig, Project, DeviceMode, ZoomLevel } from "../types/scroll";
import { DEFAULT_CONFIG } from "../constants/defaults";
import { FONTS_CATALOG } from "../constants/fonts";
import { encodeConfigToUrl, decodeConfigFromUrl } from "../lib/shareUrl";

interface EditorContextType {
  config: ScrollConfig;
  updateConfig: (patch: Partial<ScrollConfig> | ((prev: ScrollConfig) => ScrollConfig)) => void;
  updateNestedConfig: <K extends keyof ScrollConfig>(key: K, patch: Partial<ScrollConfig[K]>) => void;
  
  // Playback
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  restartAnimation: () => void;
  animationKey: number;

  // Viewport / Studio
  zoom: ZoomLevel;
  setZoom: (zoom: ZoomLevel) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  uiTheme: "dark" | "light";
  toggleUiTheme: () => void;

  // History (Undo / Redo)
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;

  // Randomize & Presets
  randomize: () => void;
  applyPresetConfig: (presetConfig: ScrollConfig) => void;
  resetToDefault: () => void;

  // Persistence & Projects
  savedProjects: Project[];
  currentProjectId: string | null;
  saveProject: (name?: string) => Project;
  loadProject: (id: string) => void;
  deleteProject: (id: string) => void;

  // Sharing
  getShareUrl: () => string;

  // Modals
  isExportOpen: boolean;
  setIsExportOpen: (open: boolean) => void;
  isCodeOpen: boolean;
  setIsCodeOpen: (open: boolean) => void;
  isProjectsOpen: boolean;
  setIsProjectsOpen: (open: boolean) => void;
  isHelpOpen: boolean;
  setIsHelpOpen: (open: boolean) => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

const STORAGE_KEY_CURRENT = "scrollforge_current_state";
const STORAGE_KEY_PROJECTS = "scrollforge_saved_projects";
const STORAGE_KEY_THEME = "scrollforge_ui_theme";

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ScrollConfig>(DEFAULT_CONFIG);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const [zoom, setZoom] = useState<ZoomLevel>("fit");
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [uiTheme, setUiTheme] = useState<"dark" | "light">("dark");

  const [savedProjects, setSavedProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  // Modals
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Undo / Redo history
  const undoStackRef = useRef<ScrollConfig[]>([]);
  const redoStackRef = useRef<ScrollConfig[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const historyDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial configuration from URL or LocalStorage
  useEffect(() => {
    // 1. Check URL query params for ?config=...
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get("config");
      if (encoded) {
        const decoded = decodeConfigFromUrl(encoded);
        if (decoded) {
          setConfig(decoded);
          return;
        }
      }

      // 2. Check localStorage for last state
      try {
        const storedConfig = localStorage.getItem(STORAGE_KEY_CURRENT);
        if (storedConfig) {
          const parsed = JSON.parse(storedConfig);
          setConfig((prev) => ({
            ...prev,
            ...parsed,
            typography: { ...prev.typography, ...(parsed.typography || {}) },
            colors: { ...prev.colors, ...(parsed.colors || {}) },
            background: { ...prev.background, ...(parsed.background || {}) },
            effects: { ...prev.effects, ...(parsed.effects || {}) },
            canvas: { ...prev.canvas, ...(parsed.canvas || {}) },
          }));
        }

        const storedProjects = localStorage.getItem(STORAGE_KEY_PROJECTS);
        if (storedProjects) {
          setSavedProjects(JSON.parse(storedProjects));
        }

        const storedTheme = localStorage.getItem(STORAGE_KEY_THEME) as "dark" | "light" | null;
        if (storedTheme) {
          setUiTheme(storedTheme);
          if (storedTheme === "light") {
            document.documentElement.classList.remove("dark");
          } else {
            document.documentElement.classList.add("dark");
          }
        }
      } catch (err) {
        console.warn("Could not load from localStorage", err);
      }
    }
  }, []);

  // Update theme class
  const toggleUiTheme = useCallback(() => {
    setUiTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_THEME, next);
        if (next === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      return next;
    });
  }, []);

  // Commit state to history stack (debounced so keystrokes group into meaningful steps)
  const pushToHistory = useCallback((prevConfig: ScrollConfig) => {
    if (historyDebounceRef.current) {
      clearTimeout(historyDebounceRef.current);
    }
    historyDebounceRef.current = setTimeout(() => {
      undoStackRef.current.push(prevConfig);
      if (undoStackRef.current.length > 30) {
        undoStackRef.current.shift();
      }
      redoStackRef.current = [];
      setCanUndo(true);
      setCanRedo(false);
    }, 400);
  }, []);

  // Immediate state update (NO debounce on text rendering)
  const updateConfig = useCallback(
    (patch: Partial<ScrollConfig> | ((prev: ScrollConfig) => ScrollConfig)) => {
      setConfig((prev) => {
        pushToHistory(prev);
        const next = typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
        // Save current to localStorage
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(next));
          } catch {}
        }
        return next;
      });
    },
    [pushToHistory]
  );

  const updateNestedConfig = useCallback(
    <K extends keyof ScrollConfig>(key: K, patch: Partial<ScrollConfig[K]>) => {
      setConfig((prev) => {
        pushToHistory(prev);
        const next = {
          ...prev,
          [key]: {
            ...(prev[key] as object),
            ...patch,
          },
        };
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(next));
          } catch {}
        }
        return next;
      });
    },
    [pushToHistory]
  );

  // Undo / Redo
  const undo = useCallback(() => {
    if (undoStackRef.current.length === 0) return;
    const previous = undoStackRef.current.pop()!;
    redoStackRef.current.push(config);
    setConfig(previous);
    setCanUndo(undoStackRef.current.length > 0);
    setCanRedo(true);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(previous));
      } catch {}
    }
  }, [config]);

  const redo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;
    const next = redoStackRef.current.pop()!;
    undoStackRef.current.push(config);
    setConfig(next);
    setCanUndo(true);
    setCanRedo(redoStackRef.current.length > 0);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(next));
      } catch {}
    }
  }, [config]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const restartAnimation = useCallback(() => {
    setAnimationKey((prev) => prev + 1);
  }, []);

  const applyPresetConfig = useCallback(
    (presetConfig: ScrollConfig) => {
      pushToHistory(config);
      setConfig(presetConfig);
      restartAnimation();
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(presetConfig));
        } catch {}
      }
    },
    [config, pushToHistory, restartAnimation]
  );

  const resetToDefault = useCallback(() => {
    pushToHistory(config);
    setConfig(DEFAULT_CONFIG);
    setCurrentProjectId(null);
    restartAnimation();
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(DEFAULT_CONFIG));
      } catch {}
    }
  }, [config, pushToHistory, restartAnimation]);

  // Randomize generator with aesthetic motion studio pairings
  const randomize = useCallback(() => {
    pushToHistory(config);

    const fonts = ["Inter", "Anton", "Bebas Neue", "Oswald", "Space Grotesk", "Poppins", "JetBrains Mono"];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];

    const palettes = [
      { text: "#ffffff", bg: "#090a0f", glow: "#ffffff" },
      { text: "#f97316", bg: "#0c0d14", glow: "#f97316" },
      { text: "#22d3ee", bg: "#040814", glow: "#06b6d4" },
      { text: "#facc15", bg: "#0d0f17", glow: "#eab308" },
      { text: "#a855f7", bg: "#0f071a", glow: "#9333ea" },
      { text: "#4ade80", bg: "#05140b", glow: "#22c55e" },
      { text: "#0f172a", bg: "#f8fafc", glow: "#94a3b8" },
    ];
    const pal = palettes[Math.floor(Math.random() * palettes.length)];

    const directions: ScrollConfig["direction"][] = ["left", "right", "up", "left"];
    const randDir = directions[Math.floor(Math.random() * directions.length)];
    const randSpeed = Math.floor(Math.random() * 200) + 80;
    const hasGlow = Math.random() > 0.4;
    const hasGlitch = Math.random() > 0.75;
    const hasOutline = Math.random() > 0.7;

    const randomizedConfig: ScrollConfig = {
      ...config,
      direction: randDir,
      speed: randSpeed,
      typography: {
        ...config.typography,
        fontFamily: randomFont,
        fontSize: Math.floor(Math.random() * 32) + 52,
        fontWeight: Math.random() > 0.5 ? 700 : 400,
        letterSpacing: Math.floor(Math.random() * 6) + 1,
      },
      colors: {
        ...config.colors,
        textColor: pal.text,
        colorMode: "solid",
      },
      background: {
        ...config.background,
        type: "solid",
        color: pal.bg,
      },
      effects: {
        ...config.effects,
        glow: hasGlow,
        glowColor: pal.glow,
        glowIntensity: Math.floor(Math.random() * 4) + 2,
        outline: hasOutline,
        outlineColor: pal.text,
        outlineWidth: 2,
        glitch: hasGlitch,
      },
    };

    setConfig(randomizedConfig);
    restartAnimation();
  }, [config, pushToHistory, restartAnimation]);

  // Project persistence
  const saveProject = useCallback(
    (name?: string): Project => {
      const projName = name || `Project ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      const newProj: Project = {
        id: currentProjectId || `sf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name: projName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        config,
      };

      setSavedProjects((prev) => {
        const filtered = prev.filter((p) => p.id !== newProj.id);
        const updated = [newProj, ...filtered];
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
          } catch {}
        }
        return updated;
      });

      setCurrentProjectId(newProj.id);
      return newProj;
    },
    [config, currentProjectId]
  );

  const loadProject = useCallback((id: string) => {
    const proj = savedProjects.find((p) => p.id === id);
    if (proj) {
      pushToHistory(config);
      setConfig(proj.config);
      setCurrentProjectId(proj.id);
      restartAnimation();
    }
  }, [savedProjects, config, pushToHistory, restartAnimation]);

  const deleteProject = useCallback((id: string) => {
    setSavedProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });
    if (currentProjectId === id) {
      setCurrentProjectId(null);
    }
  }, [currentProjectId]);

  const getShareUrl = useCallback(() => {
    const encoded = encodeConfigToUrl(config);
    if (typeof window !== "undefined") {
      return `${window.location.origin}/generator?config=${encoded}`;
    }
    return `/generator?config=${encoded}`;
  }, [config]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing when user is typing inside input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Undo: Ctrl/Cmd + Z
      if (cmdOrCtrl && !e.shiftKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
        return;
      }

      // Redo: Ctrl/Cmd + Shift + Z or Ctrl + Y
      if ((cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === "z") || (cmdOrCtrl && e.key.toLowerCase() === "y")) {
        e.preventDefault();
        redo();
        return;
      }

      // Play/Pause: Space
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
        return;
      }

      // Restart: R
      if (e.key.toLowerCase() === "r" && !cmdOrCtrl) {
        e.preventDefault();
        restartAnimation();
        return;
      }

      // Save: Ctrl/Cmd + S
      if (cmdOrCtrl && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveProject();
        return;
      }

      // Export: Ctrl/Cmd + Shift + E
      if (cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setIsExportOpen(true);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, togglePlay, restartAnimation, saveProject]);

  return (
    <EditorContext.Provider
      value={{
        config,
        updateConfig,
        updateNestedConfig,
        isPlaying,
        setIsPlaying,
        togglePlay,
        restartAnimation,
        animationKey,
        zoom,
        setZoom,
        deviceMode,
        setDeviceMode,
        uiTheme,
        toggleUiTheme,
        canUndo,
        canRedo,
        undo,
        redo,
        randomize,
        applyPresetConfig,
        resetToDefault,
        savedProjects,
        currentProjectId,
        saveProject,
        loadProject,
        deleteProject,
        getShareUrl,
        isExportOpen,
        setIsExportOpen,
        isCodeOpen,
        setIsCodeOpen,
        isProjectsOpen,
        setIsProjectsOpen,
        isHelpOpen,
        setIsHelpOpen,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
