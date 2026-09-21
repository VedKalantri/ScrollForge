import { ScrollConfig } from "../types/scroll";

export const DEFAULT_CONFIG: ScrollConfig = {
  text: "WELCOME TO SCROLLFORGE",
  direction: "left", // right -> left movement
  angle: 0,
  speed: 150, // px/sec
  delay: 0,
  loop: true,
  loopCount: 0, // infinite
  loopMode: "continuous",
  easing: "linear",
  pauseOnHover: false,
  repeatGap: 80,

  typography: {
    fontFamily: "Inter",
    fontSize: 64,
    fontWeight: 700,
    letterSpacing: 2,
    lineHeight: 1.1,
    italic: false,
    underline: false,
    textTransform: "uppercase",
    textAlign: "left",
  },

  colors: {
    colorMode: "solid",
    textColor: "#ffffff",
    gradientStart: "#f97316",
    gradientEnd: "#ec4899",
    gradientAngle: 90,
    opacity: 1,
  },

  background: {
    type: "solid",
    color: "#0c0d12",
    gradientStart: "#0f172a",
    gradientEnd: "#020617",
    gradientAngle: 135,
    gradientType: "linear",
    pattern: "none",
    patternOpacity: 0.15,
    patternScale: 20,
  },

  effects: {
    glow: true,
    glowColor: "#ffffff",
    glowIntensity: 2,
    glowBlur: 16,

    outline: false,
    outlineColor: "#f97316",
    outlineWidth: 2,

    shadow: false,
    shadowX: 4,
    shadowY: 4,
    shadowBlur: 10,
    shadowSpread: 0,
    shadowColor: "rgba(0, 0, 0, 0.6)",

    glitch: false,
    glitchIntensity: 3,
    glitchFrequency: 2,
    glitchOffset: 5,

    led: false,
    ledDotSize: 3,
    ledDotSpacing: 6,
    ledBrightness: 0.9,

    scanlines: false,
    scanlinesDensity: 4,
    scanlinesOpacity: 0.25,
    scanlinesSpeed: 2,

    rgbSplit: false,
    rgbSplitOffset: 4,
    rgbSplitIntensity: 0.8,

    blur: false,
    blurAmount: 2,
  },

  canvas: {
    width: 1920,
    height: 400,
    aspectRatio: "custom",
    presetName: "Website Banner",
  },
};

export const CANVAS_PRESETS = [
  { name: "Website Banner", width: 1920, height: 400, aspect: "custom" },
  { name: "Full HD (16:9)", width: 1920, height: 1080, aspect: "16:9" },
  { name: "HD Ready (16:9)", width: 1280, height: 720, aspect: "16:9" },
  { name: "Story / Reel (9:16)", width: 1080, height: 1920, aspect: "9:16" },
  { name: "Square Post (1:1)", width: 1080, height: 1080, aspect: "1:1" },
  { name: "Standard (4:3)", width: 800, height: 600, aspect: "4:3" },
  { name: "Compact (4:3)", width: 640, height: 480, aspect: "4:3" },
] as const;

export const SPEED_PRESETS = [
  { label: "Very Slow", value: 40 },
  { label: "Slow", value: 80 },
  { label: "Normal", value: 150 },
  { label: "Fast", value: 280 },
  { label: "Very Fast", value: 450 },
] as const;
