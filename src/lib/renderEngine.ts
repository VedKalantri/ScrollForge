import { ScrollConfig } from "../types/scroll";

/**
 * Renders a single frame of the scrolling text onto an HTML5 2D canvas context.
 * Used for GIF export, video canvas stream recording, and offscreen rendering.
 */
export function renderCanvasFrame(
  ctx: CanvasRenderingContext2D,
  config: ScrollConfig,
  progress: number, // 0.0 to 1.0 (represents one loop cycle)
  width: number,
  height: number
) {
  // 1. Clear canvas
  ctx.clearRect(0, 0, width, height);

  // 2. Draw background
  drawBackground(ctx, config, width, height, progress);

  // 3. Setup font styling
  const { typography, colors, effects, direction, angle, repeatGap } = config;
  const rawText = config.text || "Start typing to create your scrolling text";
  const displayText = transformText(rawText, typography.textTransform);

  const fontStyle = typography.italic ? "italic" : "normal";
  const fontWeight = typography.fontWeight || 700;
  const fontSize = typography.fontSize || 64;
  const fontFamily = typography.fontFamily || "Inter, sans-serif";

  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";

  // Measure text
  const metrics = ctx.measureText(displayText);
  const textWidth = metrics.width;
  const totalItemWidth = textWidth + (repeatGap || 80);
  const totalItemHeight = fontSize * (typography.lineHeight || 1.1) + (repeatGap || 80);

  // 4. Calculate movement offsets based on direction & progress
  let offsetX = 0;
  let offsetY = 0;

  if (direction === "left") {
    // Moves right to left: from 0 to -totalItemWidth
    offsetX = -progress * totalItemWidth;
    offsetY = height / 2;
  } else if (direction === "right") {
    // Moves left to right
    offsetX = (progress - 1) * totalItemWidth;
    offsetY = height / 2;
  } else if (direction === "up") {
    offsetX = width / 2;
    offsetY = -progress * totalItemHeight;
    ctx.textAlign = "center";
  } else if (direction === "down") {
    offsetX = width / 2;
    offsetY = (progress - 1) * totalItemHeight;
    ctx.textAlign = "center";
  } else {
    // Custom or diagonal angle
    const effectiveAngle = direction === "top-left" ? 135
      : direction === "bottom-right" ? 315
      : direction === "top-right" ? 45
      : direction === "bottom-left" ? 225
      : angle || 0;

    const rad = (effectiveAngle * Math.PI) / 180;
    offsetX = width / 2 - Math.cos(rad) * progress * totalItemWidth;
    offsetY = height / 2 - Math.sin(rad) * progress * totalItemWidth;
  }

  // 5. Draw text instances to ensure seamless looping
  ctx.save();
  ctx.globalAlpha = colors.opacity ?? 1;

  // Text color / gradient fill
  let fillStyle: string | CanvasGradient = colors.textColor || "#ffffff";
  if (colors.colorMode === "gradient") {
    const grad = ctx.createLinearGradient(
      0,
      offsetY - fontSize / 2,
      Math.cos((colors.gradientAngle * Math.PI) / 180) * width,
      offsetY + fontSize / 2
    );
    grad.addColorStop(0, colors.gradientStart || "#f97316");
    grad.addColorStop(1, colors.gradientEnd || "#ec4899");
    fillStyle = grad;
  }

  // Multi-pass effects setup
  if (effects.glow) {
    ctx.shadowColor = effects.glowColor || "#ffffff";
    ctx.shadowBlur = (effects.glowBlur || 16) * (effects.glowIntensity ? effects.glowIntensity / 3 : 1);
  } else if (effects.shadow) {
    ctx.shadowColor = effects.shadowColor || "rgba(0,0,0,0.5)";
    ctx.shadowOffsetX = effects.shadowX || 4;
    ctx.shadowOffsetY = effects.shadowY || 4;
    ctx.shadowBlur = effects.shadowBlur || 8;
  } else {
    ctx.shadowColor = "transparent";
  }

  // Draw wrapped instances
  if (direction === "up" || direction === "down") {
    const startY = (offsetY % totalItemHeight) - totalItemHeight;
    const lines = displayText.split("\n");
    for (let y = startY; y < height + totalItemHeight * 2; y += totalItemHeight) {
      lines.forEach((line, idx) => {
        const lineY = y + idx * (fontSize * (typography.lineHeight || 1.2));
        drawTextItem(ctx, line, width / 2, lineY, fillStyle, config);
      });
    }
  } else {
    const startX = (offsetX % totalItemWidth) - totalItemWidth;
    for (let x = startX; x < width + totalItemWidth * 2; x += totalItemWidth) {
      drawTextItem(ctx, displayText, x, height / 2, fillStyle, config);
    }
  }

  ctx.restore();

  // 6. Post-processing effects overlays (Scanlines, Glitch, LED dots)
  if (effects.scanlines) {
    drawScanlines(ctx, config, width, height, progress);
  }

  if (effects.led) {
    drawLedMask(ctx, config, width, height);
  }

  if (effects.glitch && Math.random() < (effects.glitchFrequency || 2) * 0.15) {
    drawGlitchGlitchSlice(ctx, width, height, effects.glitchIntensity || 3);
  }
}

function drawTextItem(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fill: string | CanvasGradient,
  config: ScrollConfig
) {
  const { effects } = config;

  // RGB split effect
  if (effects.rgbSplit) {
    const offset = effects.rgbSplitOffset || 4;
    ctx.save();
    ctx.fillStyle = "rgba(255, 0, 80, 0.7)";
    ctx.fillText(text, x - offset, y);
    ctx.fillStyle = "rgba(0, 240, 255, 0.7)";
    ctx.fillText(text, x + offset, y);
    ctx.restore();
  }

  // Standard fill
  ctx.fillStyle = fill;
  ctx.fillText(text, x, y);

  // Outline stroke
  if (effects.outline) {
    ctx.save();
    ctx.lineWidth = effects.outlineWidth || 2;
    ctx.strokeStyle = effects.outlineColor || "#f97316";
    ctx.strokeText(text, x, y);
    ctx.restore();
  }
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  config: ScrollConfig,
  width: number,
  height: number,
  progress: number
) {
  const { background } = config;

  if (background.type === "transparent") {
    // Transparent: leave clear
    return;
  }

  if (background.type === "solid") {
    ctx.fillStyle = background.color || "#090a0f";
    ctx.fillRect(0, 0, width, height);
    return;
  }

  if (background.type === "gradient") {
    let grad: CanvasGradient;
    if (background.gradientType === "radial") {
      grad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height) / 2);
    } else {
      const rad = ((background.gradientAngle || 135) * Math.PI) / 180;
      grad = ctx.createLinearGradient(
        width / 2 - (Math.cos(rad) * width) / 2,
        height / 2 - (Math.sin(rad) * height) / 2,
        width / 2 + (Math.cos(rad) * width) / 2,
        height / 2 + (Math.sin(rad) * height) / 2
      );
    }
    grad.addColorStop(0, background.gradientStart || "#0f172a");
    grad.addColorStop(1, background.gradientEnd || "#020617");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    return;
  }

  if (background.type === "pattern") {
    ctx.fillStyle = background.color || "#090a0f";
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, ${background.patternOpacity || 0.15})`;
    const scale = background.patternScale || 20;

    if (background.pattern === "dots") {
      for (let x = scale / 2; x < width; x += scale) {
        for (let y = scale / 2; y < height; y += scale) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (background.pattern === "grid") {
      ctx.strokeStyle = `rgba(255, 255, 255, ${background.patternOpacity || 0.15})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += scale) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += scale) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    } else if (background.pattern === "stripes") {
      ctx.strokeStyle = `rgba(255, 255, 255, ${background.patternOpacity || 0.15})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = -height; x < width + height; x += scale) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
      }
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawScanlines(
  ctx: CanvasRenderingContext2D,
  config: ScrollConfig,
  width: number,
  height: number,
  progress: number
) {
  const density = config.effects.scanlinesDensity || 4;
  const opacity = config.effects.scanlinesOpacity || 0.25;
  const speed = config.effects.scanlinesSpeed || 2;
  const drift = (progress * 100 * speed) % density;

  ctx.save();
  ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
  for (let y = drift; y < height; y += density) {
    ctx.fillRect(0, y, width, density / 2);
  }
  ctx.restore();
}

function drawLedMask(
  ctx: CanvasRenderingContext2D,
  config: ScrollConfig,
  width: number,
  height: number
) {
  const dotSize = config.effects.ledDotSize || 3;
  const spacing = config.effects.ledDotSpacing || 6;
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      ctx.fillRect(x + dotSize, y, spacing - dotSize, spacing);
      ctx.fillRect(x, y + dotSize, spacing, spacing - dotSize);
    }
  }
  ctx.restore();
}

function drawGlitchGlitchSlice(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number
) {
  const sliceHeight = Math.random() * 20 + 5;
  const sliceY = Math.random() * (height - sliceHeight);
  const sliceOffset = (Math.random() - 0.5) * intensity * 8;

  try {
    const sliceData = ctx.getImageData(0, sliceY, width, sliceHeight);
    ctx.putImageData(sliceData, sliceOffset, sliceY);
  } catch {
    // If CORS or tainted canvas prevents getImageData
  }
}

function transformText(text: string, transform?: string): string {
  if (!transform || transform === "none") return text;
  if (transform === "uppercase") return text.toUpperCase();
  if (transform === "lowercase") return text.toLowerCase();
  if (transform === "capitalize") {
    return text.replace(/\b\w/g, (l) => l.toUpperCase());
  }
  return text;
}
