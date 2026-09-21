"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useEditor } from "../../context/EditorContext";

export function PreviewCanvas() {
  const { config, isPlaying, animationKey, zoom, deviceMode } = useEditor();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 500 });

  // Update container size on resize for "fit" zoom calculation
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const {
    text,
    direction,
    angle,
    speed,
    loopMode,
    pauseOnHover,
    repeatGap,
    typography,
    colors,
    background,
    effects,
    canvas: canvasConfig,
  } = config;

  const isTransparent = background.type === "transparent";
  const rawText = text !== "" ? text : "Start typing to create your scrolling text";
  const isEmpty = text === "";

  // Device mode frame constraints
  const deviceWidth = useMemo(() => {
    if (deviceMode === "mobile") return 375;
    if (deviceMode === "tablet") return 768;
    return canvasConfig.width || 1200;
  }, [deviceMode, canvasConfig.width]);

  const deviceHeight = useMemo(() => {
    if (deviceMode === "mobile") return 667;
    if (deviceMode === "tablet") return 1024;
    return canvasConfig.height || 400;
  }, [deviceMode, canvasConfig.height]);

  // Compute zoom scale
  const scale = useMemo(() => {
    if (zoom !== "fit") return zoom;
    const padding = 60;
    const availW = Math.max(100, containerSize.width - padding);
    const availH = Math.max(100, containerSize.height - padding);
    const scaleX = availW / deviceWidth;
    const scaleY = availH / deviceHeight;
    return Math.min(1, Math.min(scaleX, scaleY));
  }, [zoom, containerSize, deviceWidth, deviceHeight]);

  // Compute duration in seconds based on speed and canvas dimension
  const baseDim = direction === "up" || direction === "down" ? deviceHeight : deviceWidth;
  const durationSec = Math.max(1, (baseDim * 1.5) / Math.max(speed, 10));

  // Determine keyframe translation
  const isVertical = direction === "up" || direction === "down";
  const isReverse = direction === "right" || direction === "down";

  // Build animation CSS rule
  const animationName = useMemo(() => {
    if (direction === "left") return "sf-anim-left";
    if (direction === "right") return "sf-anim-right";
    if (direction === "up") return "sf-anim-up";
    if (direction === "down") return "sf-anim-down";
    return `sf-anim-angle-${Math.round(angle)}`;
  }, [direction, angle]);

  // Background styling
  const bgStyle = useMemo(() => {
    if (isTransparent) {
      return {};
    }
    if (background.type === "solid") {
      return { backgroundColor: background.color };
    }
    if (background.type === "gradient") {
      if (background.gradientType === "radial") {
        return {
          background: `radial-gradient(circle at center, ${background.gradientStart}, ${background.gradientEnd})`,
        };
      }
      return {
        background: `linear-gradient(${background.gradientAngle}deg, ${background.gradientStart}, ${background.gradientEnd})`,
      };
    }
    if (background.type === "pattern") {
      const scale = background.patternScale || 20;
      const op = background.patternOpacity || 0.15;
      if (background.pattern === "dots") {
        return {
          backgroundColor: background.color,
          backgroundImage: `radial-gradient(rgba(255, 255, 255, ${op}) 1.5px, transparent 1.5px)`,
          backgroundSize: `${scale}px ${scale}px`,
        };
      }
      if (background.pattern === "grid") {
        return {
          backgroundColor: background.color,
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, ${op}) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, ${op}) 1px, transparent 1px)`,
          backgroundSize: `${scale}px ${scale}px`,
        };
      }
      if (background.pattern === "stripes") {
        return {
          backgroundColor: background.color,
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255, 255, 255, ${op}), rgba(255, 255, 255, ${op}) 2px, transparent 2px, transparent ${scale}px)`,
        };
      }
      return { backgroundColor: background.color };
    }
    return { backgroundColor: "#090a0f" };
  }, [background, isTransparent]);

  // Text color & gradients
  const textStyle = useMemo(() => {
    const style: React.CSSProperties = {
      fontFamily: typography.fontFamily,
      fontSize: `${typography.fontSize}px`,
      fontWeight: typography.fontWeight,
      letterSpacing: `${typography.letterSpacing}px`,
      lineHeight: typography.lineHeight,
      textTransform: typography.textTransform,
      fontStyle: typography.italic ? "italic" : "normal",
      textDecoration: typography.underline ? "underline" : "none",
      textAlign: typography.textAlign,
      opacity: colors.opacity ?? 1,
    };

    if (colors.colorMode === "gradient") {
      style.backgroundImage = `linear-gradient(${colors.gradientAngle}deg, ${colors.gradientStart}, ${colors.gradientEnd})`;
      style.WebkitBackgroundClip = "text";
      style.WebkitTextFillColor = "transparent";
    } else {
      style.color = colors.textColor;
    }

    // Text shadows & glows
    const shadows: string[] = [];
    if (effects.glow) {
      const gBlur = effects.glowBlur || 16;
      const intensity = effects.glowIntensity || 3;
      shadows.push(`0 0 ${gBlur}px ${effects.glowColor}`);
      if (intensity > 2) shadows.push(`0 0 ${gBlur * 2}px ${effects.glowColor}`);
      if (intensity > 5) shadows.push(`0 0 ${gBlur * 3}px ${effects.glowColor}`);
    }
    if (effects.shadow) {
      shadows.push(
        `${effects.shadowX}px ${effects.shadowY}px ${effects.shadowBlur}px ${effects.shadowColor}`
      );
    }
    if (shadows.length > 0) {
      style.textShadow = shadows.join(", ");
    }

    // Outline
    if (effects.outline) {
      style.WebkitTextStroke = `${effects.outlineWidth}px ${effects.outlineColor}`;
    }

    // Blur
    if (effects.blur) {
      style.filter = `blur(${effects.blurAmount || 2}px)`;
    }

    return style;
  }, [typography, colors, effects]);

  // Dynamic CSS keyframes for custom angles
  const dynamicKeyframes = useMemo(() => {
    if (direction === "custom" || direction.includes("-")) {
      const effectiveAngle =
        direction === "top-left"
          ? 135
          : direction === "bottom-right"
          ? 315
          : direction === "top-right"
          ? 45
          : direction === "bottom-left"
          ? 225
          : angle;
      const rad = (effectiveAngle * Math.PI) / 180;
      const moveX = Math.round(Math.cos(rad) * 100);
      const moveY = Math.round(Math.sin(rad) * 100);

      return `
        @keyframes ${animationName} {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-${moveX}%, -${moveY}%, 0); }
        }
      `;
    }
    return "";
  }, [direction, angle, animationName]);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 h-full w-full bg-studio-100 dark:bg-studio-950 flex flex-col items-center justify-center overflow-hidden p-3 sm:p-6 select-none"
    >
      {/* Dynamic Keyframes */}
      <style>{`
        @keyframes sf-anim-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes sf-anim-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes sf-anim-up {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -50%, 0); }
        }
        @keyframes sf-anim-down {
          0% { transform: translate3d(0, -50%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        ${dynamicKeyframes}
      `}</style>

      {/* Top Status Bar: Static indicator & Dimensions */}
      <div className="absolute top-2.5 sm:top-4 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between text-xs font-mono pointer-events-none z-20">
        {/* Subtle static indicator */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white/80 dark:bg-studio-900/80 backdrop-blur border border-studio-200 dark:border-studio-800 text-studio-700 dark:text-studio-300 shadow-sm text-[10px] sm:text-[11px]">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold tracking-wide">Live Preview</span>
        </div>

        {/* Canvas dimensions readout */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white/80 dark:bg-studio-900/80 backdrop-blur border border-studio-200 dark:border-studio-800 text-studio-600 dark:text-studio-400 shadow-sm text-[10px] sm:text-xs">
          <span>{deviceWidth} × {deviceHeight}</span>
          <span className="text-studio-400 hidden sm:inline">•</span>
          <span className="uppercase hidden sm:inline">{canvasConfig.presetName || "Custom"}</span>
          <span className="text-studio-400">•</span>
          <span>{Math.round(scale * 100)}%</span>
        </div>
      </div>

      {/* Scaled Canvas Container */}
      <div
        style={{
          width: `${deviceWidth}px`,
          height: `${deviceHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          transition: "transform 0.15s ease-out",
        }}
        className="relative shadow-2xl rounded-sm border border-studio-300/60 dark:border-studio-700/60 overflow-hidden flex items-center justify-center shrink-0"
      >
        {/* Conditional Transparency Checkerboard: ONLY rendered when transparent */}
        {isTransparent && (
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `linear-gradient(45deg, #181920 25%, transparent 25%), 
                                linear-gradient(-45deg, #181920 25%, transparent 25%), 
                                linear-gradient(45deg, transparent 75%, #181920 75%), 
                                linear-gradient(-45deg, transparent 75%, #181920 75%)`,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              backgroundColor: "#111218",
            }}
          />
        )}

        {/* Main Canvas Background */}
        <div
          className="absolute inset-0 z-1"
          style={bgStyle}
        />

        {/* Scanlines Effect Overlay */}
        {effects.scanlines && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `repeating-linear-gradient(to bottom, rgba(0,0,0,${effects.scanlinesOpacity || 0.25}) 0px, rgba(0,0,0,${effects.scanlinesOpacity || 0.25}) ${effects.scanlinesDensity / 2}px, transparent ${effects.scanlinesDensity / 2}px, transparent ${effects.scanlinesDensity}px)`,
            }}
          />
        )}

        {/* LED Matrix Effect Overlay */}
        {effects.led && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `radial-gradient(circle, transparent ${effects.ledDotSize}px, rgba(0,0,0,0.5) ${effects.ledDotSize + 1}px)`,
              backgroundSize: `${effects.ledDotSpacing * 2}px ${effects.ledDotSpacing * 2}px`,
            }}
          />
        )}

        {/* RGB Split Overlay */}
        {effects.rgbSplit && (
          <div
            className="absolute inset-0 pointer-events-none z-10 mix-blend-screen opacity-50"
            style={{
              transform: `translate(${effects.rgbSplitOffset || 4}px, 0)`,
              filter: "hue-rotate(90deg)",
            }}
          />
        )}

        {/* Scrolling Track Container */}
        <div
          key={`${animationKey}-${direction}-${speed}-${loopMode}`}
          className={`relative z-5 w-full h-full flex items-center justify-center overflow-hidden ${
            pauseOnHover ? "hover:[&_.sf-track]:[animation-play-state:paused]" : ""
          }`}
        >
          <div
            className="sf-track flex items-center"
            style={{
              flexDirection: isVertical ? "column" : "row",
              width: isVertical ? "100%" : "max-content",
              height: isVertical ? "max-content" : "100%",
              whiteSpace: "nowrap",
              willChange: "transform",
              animationName: animationName,
              animationDuration: `${durationSec}s`,
              animationTimingFunction: config.easing,
              animationIterationCount: config.loop
                ? config.loopCount === 0
                  ? "infinite"
                  : config.loopCount
                : 1,
              animationDirection: loopMode === "ping-pong" ? "alternate" : "normal",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            {/* Instance 1 */}
            <div
              className={`inline-block ${
                isEmpty ? "italic text-studio-400 dark:text-studio-500" : ""
              }`}
              style={{
                ...textStyle,
                paddingRight: isVertical ? 0 : `${repeatGap}px`,
                paddingBottom: isVertical ? `${repeatGap}px` : 0,
              }}
            >
              {rawText.split("\n").map((line, i) => (
                <div key={i}>{line || "\u00A0"}</div>
              ))}
            </div>

            {/* Seamless Instance 2 (Clone) */}
            <div
              aria-hidden="true"
              className={`inline-block ${
                isEmpty ? "italic text-studio-400 dark:text-studio-500" : ""
              }`}
              style={{
                ...textStyle,
                paddingRight: isVertical ? 0 : `${repeatGap}px`,
                paddingBottom: isVertical ? `${repeatGap}px` : 0,
              }}
            >
              {rawText.split("\n").map((line, i) => (
                <div key={i}>{line || "\u00A0"}</div>
              ))}
            </div>

            {/* Extra Clone for ultra-wide canvases */}
            <div
              aria-hidden="true"
              className={`inline-block ${
                isEmpty ? "italic text-studio-400 dark:text-studio-500" : ""
              }`}
              style={{
                ...textStyle,
                paddingRight: isVertical ? 0 : `${repeatGap}px`,
                paddingBottom: isVertical ? `${repeatGap}px` : 0,
              }}
            >
              {rawText.split("\n").map((line, i) => (
                <div key={i}>{line || "\u00A0"}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
