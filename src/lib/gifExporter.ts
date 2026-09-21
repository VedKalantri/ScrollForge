import { GIFEncoder, quantize, applyPalette } from "gifenc";
import { ScrollConfig } from "../types/scroll";
import { renderCanvasFrame } from "./renderEngine";

export interface GifExportOptions {
  fps?: number; // 12, 15, 24, 30
  duration?: number; // in seconds (e.g. 2 - 6)
  scale?: number; // 0.5, 0.75, 1
  transparent?: boolean;
  onProgress?: (progress: number, currentFrame: number, totalFrames: number) => void;
  signal?: AbortSignal;
}

export async function exportToGif(
  config: ScrollConfig,
  options: GifExportOptions = {}
): Promise<Blob> {
  const fps = options.fps || 20;
  const duration = options.duration || 3;
  const scale = options.scale || 0.75; // good default for sharp yet fast GIF
  const isTransparent = options.transparent || config.background.type === "transparent";

  const totalFrames = Math.max(1, Math.round(fps * duration));
  const delayMs = Math.round(1000 / fps);

  const canvasWidth = Math.round((config.canvas.width || 1200) * scale);
  const canvasHeight = Math.round((config.canvas.height || 400) * scale);

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Could not initialize 2D canvas context for GIF export");

  const gif = GIFEncoder();
  const format = isTransparent ? "rgba4444" : "rgb565";

  // Render frame by frame
  for (let f = 0; f < totalFrames; f++) {
    if (options.signal?.aborted) {
      throw new Error("GIF export cancelled by user");
    }

    const progress = f / totalFrames;

    // Render frame via unified engine
    ctx.save();
    ctx.scale(scale, scale);
    renderCanvasFrame(ctx, config, progress, config.canvas.width, config.canvas.height);
    ctx.restore();

    // Quantize & encode
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const data = imageData.data;

    let palette: number[][];
    let index: Uint8Array;
    let transparentIndex = 0;

    if (isTransparent) {
      palette = quantize(data, 256, { format: "rgba4444", oneBitAlpha: true });
      index = applyPalette(data, palette, "rgba4444");
      // Find the transparent color index in the palette
      transparentIndex = palette.findIndex((col) => col[3] === 0);
      if (transparentIndex < 0) transparentIndex = 0;
    } else {
      palette = quantize(data, 256, { format: "rgb565" });
      index = applyPalette(data, palette, "rgb565");
    }

    gif.writeFrame(index, canvasWidth, canvasHeight, {
      palette,
      delay: delayMs,
      repeat: config.loop ? 0 : -1,
      transparent: isTransparent,
      transparentIndex: isTransparent ? transparentIndex : undefined,
    });

    // Notify progress
    const pct = Math.round(((f + 1) / totalFrames) * 100);
    options.onProgress?.(pct, f + 1, totalFrames);

    // Yield to keep UI responsive
    if (f % 2 === 0) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  gif.finish();
  const bytes = gif.bytes();
  return new Blob([bytes as any], { type: "image/gif" });
}
