import { ScrollConfig } from "../types/scroll";
import { DEFAULT_CONFIG } from "../constants/defaults";

export function encodeConfigToUrl(config: ScrollConfig): string {
  try {
    const jsonStr = JSON.stringify(config);
    // Convert to UTF-8 safe base64
    const utf8Bytes = encodeURIComponent(jsonStr).replace(
      /%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode(parseInt(p1, 16))
    );
    return btoa(utf8Bytes);
  } catch (err) {
    console.error("Failed to encode config to URL", err);
    return "";
  }
}

export function decodeConfigFromUrl(encoded: string): ScrollConfig | null {
  try {
    const binary = atob(encoded);
    const jsonStr = decodeURIComponent(
      Array.from(binary)
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const parsed = JSON.parse(jsonStr);
    // Deep merge with DEFAULT_CONFIG so missing fields get safe defaults
    return {
      ...DEFAULT_CONFIG,
      ...parsed,
      typography: { ...DEFAULT_CONFIG.typography, ...(parsed.typography || {}) },
      colors: { ...DEFAULT_CONFIG.colors, ...(parsed.colors || {}) },
      background: { ...DEFAULT_CONFIG.background, ...(parsed.background || {}) },
      effects: { ...DEFAULT_CONFIG.effects, ...(parsed.effects || {}) },
      canvas: { ...DEFAULT_CONFIG.canvas, ...(parsed.canvas || {}) },
    };
  } catch (err) {
    console.warn("Failed to decode config from URL", err);
    return null;
  }
}
