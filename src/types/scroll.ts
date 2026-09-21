export type Direction =
  | "left"
  | "right"
  | "up"
  | "down"
  | "top-left"
  | "bottom-right"
  | "top-right"
  | "bottom-left"
  | "custom";

export type LoopMode = "continuous" | "ping-pong" | "restart";

export type EasingFunction =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out";

export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

export type BackgroundType =
  | "solid"
  | "gradient"
  | "image"
  | "video"
  | "transparent"
  | "pattern";

export type PatternType =
  | "none"
  | "grid"
  | "dots"
  | "stripes"
  | "noise"
  | "scanlines";

export interface TypographyConfig {
  fontFamily: string;
  fontSize: number; // in px
  fontWeight: number; // 100 - 900
  letterSpacing: number; // in px
  lineHeight: number; // ratio (e.g. 1.1)
  italic: boolean;
  underline: boolean;
  textTransform: TextTransform;
  textAlign: "left" | "center" | "right";
}

export interface ColorsConfig {
  colorMode: "solid" | "gradient";
  textColor: string;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  opacity: number; // 0 - 1
}

export interface BackgroundConfig {
  type: BackgroundType;
  color: string;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  gradientType: "linear" | "radial";
  image?: string;
  video?: string;
  pattern: PatternType;
  patternOpacity: number;
  patternScale: number;
}

export interface EffectsConfig {
  glow: boolean;
  glowColor: string;
  glowIntensity: number; // 1 - 10
  glowBlur: number; // in px

  outline: boolean;
  outlineColor: string;
  outlineWidth: number; // in px

  shadow: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowColor: string;

  glitch: boolean;
  glitchIntensity: number; // 1 - 10
  glitchFrequency: number;
  glitchOffset: number;

  led: boolean;
  ledDotSize: number;
  ledDotSpacing: number;
  ledBrightness: number;

  scanlines: boolean;
  scanlinesDensity: number;
  scanlinesOpacity: number;
  scanlinesSpeed: number;

  rgbSplit: boolean;
  rgbSplitOffset: number;
  rgbSplitIntensity: number;

  blur: boolean;
  blurAmount: number;
}

export interface CanvasConfig {
  width: number;
  height: number;
  aspectRatio: "16:9" | "9:16" | "1:1" | "4:3" | "custom";
  presetName: string;
}

export interface ScrollConfig {
  text: string;
  direction: Direction;
  angle: number; // 0 - 360
  speed: number; // px per second
  duration?: number;
  delay: number; // seconds
  loop: boolean;
  loopCount: number; // 0 = infinite, 1, 2, 3, 5, etc.
  loopMode: LoopMode;
  easing: EasingFunction;
  pauseOnHover: boolean;
  repeatGap: number; // space between repeating loops in px

  typography: TypographyConfig;
  colors: ColorsConfig;
  background: BackgroundConfig;
  effects: EffectsConfig;
  canvas: CanvasConfig;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  category: "Essential" | "Bold & Neon" | "Broadcast & Retro" | "Display & Tech";
  config: ScrollConfig;
}

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  config: ScrollConfig;
}

export type DeviceMode = "desktop" | "tablet" | "mobile";
export type ZoomLevel = 0.25 | 0.5 | 0.75 | 1 | 1.5 | 2 | "fit";
