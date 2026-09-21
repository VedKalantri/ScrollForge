import { ScrollConfig } from "../types/scroll";
import { renderCanvasFrame } from "./renderEngine";

export interface VideoExportOptions {
  fps?: number; // 24, 30, 60
  duration?: number; // seconds
  scale?: number; // 0.75, 1
  bitrate?: number; // bps
  preferFormat?: "webm" | "mp4";
  onProgress?: (progress: number, secondsRemaining: number) => void;
  signal?: AbortSignal;
}

export interface VideoExportResult {
  blob: Blob;
  mimeType: string;
  format: "webm" | "mp4";
  filename: string;
}

/**
 * Returns supported video MIME types on the current browser.
 */
export function getSupportedVideoFormats(): { webm: boolean; mp4: boolean; preferredMime: string } {
  if (typeof window === "undefined" || !window.MediaRecorder) {
    return { webm: false, mp4: false, preferredMime: "" };
  }

  const mp4Types = ["video/mp4;codecs=avc1.42E01E,mp4a.40.2", "video/mp4;codecs=avc1", "video/mp4"];
  const webmTypes = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];

  const hasMp4 = mp4Types.some((t) => MediaRecorder.isTypeSupported(t));
  const hasWebm = webmTypes.some((t) => MediaRecorder.isTypeSupported(t));

  let preferredMime = "video/webm";
  for (const t of webmTypes) {
    if (MediaRecorder.isTypeSupported(t)) {
      preferredMime = t;
      break;
    }
  }

  return { webm: hasWebm, mp4: hasMp4, preferredMime };
}

export async function exportToVideo(
  config: ScrollConfig,
  options: VideoExportOptions = {}
): Promise<VideoExportResult> {
  if (typeof window === "undefined" || !window.MediaRecorder) {
    throw new Error("MediaRecorder API is not supported in this browser environment.");
  }

  const fps = options.fps || 30;
  const duration = options.duration || 4; // seconds
  const scale = options.scale || 1;
  const bitrate = options.bitrate || 5_000_000; // 5 Mbps

  const canvasWidth = Math.round((config.canvas.width || 1200) * scale);
  const canvasHeight = Math.round((config.canvas.height || 400) * scale);

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not initialize 2D canvas context for video export");

  // Determine codec
  const supported = getSupportedVideoFormats();
  let mimeType = supported.preferredMime;
  let format: "webm" | "mp4" = "webm";

  if (options.preferFormat === "mp4" && supported.mp4) {
    mimeType = "video/mp4";
    format = "mp4";
  } else if (!supported.webm && supported.mp4) {
    mimeType = "video/mp4";
    format = "mp4";
  }

  // Draw initial frame
  ctx.save();
  ctx.scale(scale, scale);
  renderCanvasFrame(ctx, config, 0, config.canvas.width, config.canvas.height);
  ctx.restore();

  // Create stream & recorder
  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: bitrate,
  });

  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  return new Promise<VideoExportResult>((resolve, reject) => {
    recorder.onerror = (err) => reject(err);

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      const filename = `scrollforge-${Date.now()}.${format}`;
      resolve({ blob, mimeType, format, filename });
    };

    recorder.start(100);

    const totalFrames = Math.round(fps * duration);
    const frameIntervalMs = 1000 / fps;
    let currentFrame = 0;
    const startTime = performance.now();

    function renderNext() {
      if (options.signal?.aborted) {
        recorder.stop();
        reject(new Error("Video export cancelled by user"));
        return;
      }

      if (currentFrame >= totalFrames) {
        // Complete
        setTimeout(() => {
          recorder.stop();
        }, 150);
        return;
      }

      const progress = currentFrame / totalFrames;
      ctx!.save();
      ctx!.scale(scale, scale);
      renderCanvasFrame(ctx!, config, progress, config.canvas.width, config.canvas.height);
      ctx!.restore();

      currentFrame++;
      const pct = Math.min(99, Math.round((currentFrame / totalFrames) * 100));
      const elapsedSec = (performance.now() - startTime) / 1000;
      const remainingSec = Math.max(0, Math.round(duration - elapsedSec));
      options.onProgress?.(pct, remainingSec);

      setTimeout(renderNext, frameIntervalMs);
    }

    renderNext();
  });
}
