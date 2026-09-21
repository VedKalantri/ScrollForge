"use client";

import React, { useState, useEffect, useRef } from "react";
import { Download, Film, Image as ImageIcon, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useEditor } from "../../context/EditorContext";
import { Modal } from "../ui/Modal";
import { exportToGif } from "../../lib/gifExporter";
import { exportToVideo, getSupportedVideoFormats } from "../../lib/videoExporter";

type ExportType = "gif" | "video";

export function ExportModal() {
  const { config, isExportOpen, setIsExportOpen } = useEditor();
  const [activeType, setActiveType] = useState<ExportType>("gif");

  // GIF state
  const [gifFps, setGifFps] = useState<number>(20);
  const [gifDuration, setGifDuration] = useState<number>(3);
  const [gifScale, setGifScale] = useState<number>(0.75);
  const [gifTransparent, setGifTransparent] = useState<boolean>(
    config.background.type === "transparent"
  );

  // Video state
  const [videoFps, setVideoFps] = useState<number>(30);
  const [videoDuration, setVideoDuration] = useState<number>(4);
  const [videoScale, setVideoScale] = useState<number>(1);
  const [supportedCodecs, setSupportedCodecs] = useState<{
    webm: boolean;
    mp4: boolean;
    preferredMime: string;
  }>({ webm: true, mp4: false, preferredMime: "video/webm" });

  // Progress state
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [progressPct, setProgressPct] = useState<number>(0);
  const [progressText, setProgressText] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSupportedCodecs(getSupportedVideoFormats());
    }
  }, []);

  // Reset modal state on open
  useEffect(() => {
    if (isExportOpen) {
      setIsExporting(false);
      setProgressPct(0);
      setProgressText("");
      setDownloadUrl(null);
      setErrorMessage(null);
      setGifTransparent(config.background.type === "transparent");
    }
  }, [isExportOpen, config.background.type]);

  const handleStartGifExport = async () => {
    setIsExporting(true);
    setProgressPct(0);
    setProgressText("Initializing GIF engine...");
    setDownloadUrl(null);
    setErrorMessage(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const blob = await exportToGif(config, {
        fps: gifFps,
        duration: gifDuration,
        scale: gifScale,
        transparent: gifTransparent,
        signal: controller.signal,
        onProgress: (pct, current, total) => {
          setProgressPct(pct);
          setProgressText(`Rendering GIF... Frame ${current} / ${total}`);
        },
      });

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadFilename(`scrollforge-${Date.now()}.gif`);
      setProgressText("GIF Generated Successfully!");
    } catch (err: any) {
      if (err.message?.includes("cancelled")) {
        setProgressText("Export cancelled.");
      } else {
        setErrorMessage(err.message || "Failed to export GIF");
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleStartVideoExport = async () => {
    setIsExporting(true);
    setProgressPct(0);
    setProgressText("Initializing video capture...");
    setDownloadUrl(null);
    setErrorMessage(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const result = await exportToVideo(config, {
        fps: videoFps,
        duration: videoDuration,
        scale: videoScale,
        signal: controller.signal,
        onProgress: (pct, remainingSec) => {
          setProgressPct(pct);
          setProgressText(`Rendering Video... ${pct}% (${remainingSec}s remaining)`);
        },
      });

      const url = URL.createObjectURL(result.blob);
      setDownloadUrl(url);
      setDownloadFilename(result.filename);
      setProgressText("Video Rendered Successfully!");
    } catch (err: any) {
      if (err.message?.includes("cancelled")) {
        setProgressText("Export cancelled.");
      } else {
        setErrorMessage(err.message || "Failed to export video");
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsExporting(false);
  };

  return (
    <Modal
      isOpen={isExportOpen}
      onClose={() => {
        if (isExporting) handleCancel();
        setIsExportOpen(false);
      }}
      title="Export Scrolling Text"
      description="Render client-side animated GIF or high-definition video directly in your browser."
      maxWidth="lg"
    >
      <div className="flex flex-col gap-6">
        {/* Type Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-studio-100 dark:bg-studio-800 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setActiveType("gif");
              setDownloadUrl(null);
            }}
            disabled={isExporting}
            className={`py-2 px-3 flex items-center justify-center gap-2 rounded-md text-xs font-bold transition-all ${
              activeType === "gif"
                ? "bg-white dark:bg-studio-700 text-studio-900 dark:text-white shadow-sm"
                : "text-studio-500 hover:text-studio-900 dark:hover:text-white"
            }`}
          >
            <ImageIcon className="w-4 h-4 text-forge-500" />
            <span>Animated GIF</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveType("video");
              setDownloadUrl(null);
            }}
            disabled={isExporting}
            className={`py-2 px-3 flex items-center justify-center gap-2 rounded-md text-xs font-bold transition-all ${
              activeType === "video"
                ? "bg-white dark:bg-studio-700 text-studio-900 dark:text-white shadow-sm"
                : "text-studio-500 hover:text-studio-900 dark:hover:text-white"
            }`}
          >
            <Film className="w-4 h-4 text-forge-500" />
            <span>Video (WebM / MP4)</span>
          </button>
        </div>

        {/* ==================== GIF CONTROLS ==================== */}
        {activeType === "gif" && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                  Resolution Scale
                </label>
                <select
                  value={gifScale}
                  disabled={isExporting}
                  onChange={(e) => setGifScale(parseFloat(e.target.value))}
                  className="px-2.5 py-1.5 text-xs rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500 font-mono"
                >
                  <option value={1}>100% ({config.canvas.width}×{config.canvas.height})</option>
                  <option value={0.75}>75% ({Math.round(config.canvas.width * 0.75)}×{Math.round(config.canvas.height * 0.75)})</option>
                  <option value={0.5}>50% ({Math.round(config.canvas.width * 0.5)}×{Math.round(config.canvas.height * 0.5)})</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                  Frame Rate (FPS)
                </label>
                <select
                  value={gifFps}
                  disabled={isExporting}
                  onChange={(e) => setGifFps(parseInt(e.target.value))}
                  className="px-2.5 py-1.5 text-xs rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500 font-mono"
                >
                  <option value={12}>12 FPS (Lightweight)</option>
                  <option value={15}>15 FPS (Standard)</option>
                  <option value={20}>20 FPS (Smooth)</option>
                  <option value={24}>24 FPS (Cinema)</option>
                  <option value={30}>30 FPS (Crisp)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                  Duration (Seconds)
                </label>
                <select
                  value={gifDuration}
                  disabled={isExporting}
                  onChange={(e) => setGifDuration(parseInt(e.target.value))}
                  className="px-2.5 py-1.5 text-xs rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500 font-mono"
                >
                  <option value={2}>2 Seconds</option>
                  <option value={3}>3 Seconds</option>
                  <option value={4}>4 Seconds</option>
                  <option value={6}>6 Seconds</option>
                  <option value={8}>8 Seconds</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={gifTransparent}
                disabled={isExporting}
                onChange={(e) => setGifTransparent(e.target.checked)}
                className="w-4 h-4 rounded text-forge-500 accent-forge-500"
              />
              <span className="text-xs font-medium text-studio-700 dark:text-studio-300">
                Transparent Background (1-bit alpha GIF palette)
              </span>
            </label>

            <p className="text-[11px] text-studio-400">
              Total frames to render: <strong className="font-mono">{gifFps * gifDuration} frames</strong>. Renders frame-by-frame client side using the unified rendering engine.
            </p>
          </div>
        )}

        {/* ==================== VIDEO CONTROLS ==================== */}
        {activeType === "video" && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                  Resolution Scale
                </label>
                <select
                  value={videoScale}
                  disabled={isExporting}
                  onChange={(e) => setVideoScale(parseFloat(e.target.value))}
                  className="px-2.5 py-1.5 text-xs rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500 font-mono"
                >
                  <option value={1}>100% ({config.canvas.width}×{config.canvas.height})</option>
                  <option value={0.75}>75% ({Math.round(config.canvas.width * 0.75)}×{Math.round(config.canvas.height * 0.75)})</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                  Frame Rate (FPS)
                </label>
                <select
                  value={videoFps}
                  disabled={isExporting}
                  onChange={(e) => setVideoFps(parseInt(e.target.value))}
                  className="px-2.5 py-1.5 text-xs rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500 font-mono"
                >
                  <option value={24}>24 FPS</option>
                  <option value={30}>30 FPS (Default)</option>
                  <option value={60}>60 FPS (Ultra Smooth)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-studio-700 dark:text-studio-300">
                  Duration (Seconds)
                </label>
                <select
                  value={videoDuration}
                  disabled={isExporting}
                  onChange={(e) => setVideoDuration(parseInt(e.target.value))}
                  className="px-2.5 py-1.5 text-xs rounded border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-900 dark:text-studio-100 focus:outline-none focus:border-forge-500 font-mono"
                >
                  <option value={3}>3 Seconds</option>
                  <option value={5}>5 Seconds</option>
                  <option value={8}>8 Seconds</option>
                  <option value={10}>10 Seconds</option>
                </select>
              </div>
            </div>

            {/* Codec notice */}
            <div className="p-3 rounded-lg border border-studio-200 dark:border-studio-800 bg-studio-50 dark:bg-studio-850 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-studio-500 shrink-0 mt-0.5" />
              <div className="text-xs text-studio-600 dark:text-studio-400 leading-relaxed">
                {supportedCodecs.mp4 ? (
                  <span>Browser supports direct <strong>MP4</strong> and <strong>WebM</strong> encoding.</span>
                ) : (
                  <span>
                    Your browser does not support direct MP4 export. High-definition <strong>WebM</strong> (VP9/VP8) is available instead, compatible with all modern browsers, video editors, and media players.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Progress & Status */}
        {isExporting && (
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-studio-50 dark:bg-studio-850 border border-studio-200 dark:border-studio-800">
            <div className="flex items-center justify-between text-xs font-medium text-studio-700 dark:text-studio-300">
              <div className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-forge-500" />
                <span>{progressText}</span>
              </div>
              <span className="font-mono font-bold text-forge-500">{progressPct}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-studio-200 dark:bg-studio-750 overflow-hidden">
              <div
                className="h-full bg-forge-500 transition-all duration-150"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleCancel}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Cancel Export
              </button>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Download ready button */}
        {downloadUrl && (
          <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{downloadFilename} is ready!</span>
            </div>
            <a
              href={downloadUrl}
              download={downloadFilename}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow transition-transform hover:scale-105"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </a>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-studio-200 dark:border-studio-800">
          <button
            type="button"
            onClick={() => setIsExportOpen(false)}
            className="px-4 py-2 text-xs font-medium rounded-lg text-studio-600 dark:text-studio-400 hover:bg-studio-100 dark:hover:bg-studio-800 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={activeType === "gif" ? handleStartGifExport : handleStartVideoExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-lg bg-forge-500 hover:bg-forge-600 disabled:opacity-50 text-white shadow transition-all hover:scale-[1.02]"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Rendering...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Start {activeType === "gif" ? "GIF" : "Video"} Export</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
