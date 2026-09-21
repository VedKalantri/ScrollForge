import { ScrollConfig } from "../types/scroll";

export function generateHTML(config: ScrollConfig): string {
  const safeText = config.text || "Start typing to create your scrolling text";
  return `<!-- ScrollForge Marquee Component -->
<div class="sf-container">
  <div class="sf-track">
    <span class="sf-content">${escapeHtml(safeText)}</span>
    <span class="sf-content sf-clone" aria-hidden="true">${escapeHtml(safeText)}</span>
  </div>
</div>`;
}

export function generateCSS(config: ScrollConfig): string {
  const { typography, colors, background, effects, direction, angle, speed, pauseOnHover, repeatGap } = config;
  
  // Calculate duration from speed and typical width
  const baseWidth = config.canvas.width || 1200;
  const duration = Math.max(1, Math.round(baseWidth / Math.max(speed, 10)));

  // Text color & gradients
  let textColorStyle = `color: ${colors.textColor};`;
  if (colors.colorMode === "gradient") {
    textColorStyle = `background: linear-gradient(${colors.gradientAngle}deg, ${colors.gradientStart}, ${colors.gradientEnd});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;`;
  }

  // Text effects
  const textShadows: string[] = [];
  if (effects.glow) {
    textShadows.push(`0 0 ${effects.glowBlur}px ${effects.glowColor}`);
    textShadows.push(`0 0 ${effects.glowBlur * 2}px ${effects.glowColor}`);
  }
  if (effects.shadow) {
    textShadows.push(`${effects.shadowX}px ${effects.shadowY}px ${effects.shadowBlur}px ${effects.shadowColor}`);
  }
  const textShadowStyle = textShadows.length > 0 ? `text-shadow: ${textShadows.join(", ")};` : "";

  // Webkit stroke
  const strokeStyle = effects.outline ? `-webkit-text-stroke: ${effects.outlineWidth}px ${effects.outlineColor};` : "";

  // Background styling
  let bgStyle = "";
  if (background.type === "solid") {
    bgStyle = `background-color: ${background.color};`;
  } else if (background.type === "gradient") {
    bgStyle = `background: ${background.gradientType}-gradient(${
      background.gradientType === "linear" ? `${background.gradientAngle}deg, ` : ""
    }${background.gradientStart}, ${background.gradientEnd});`;
  } else if (background.type === "transparent") {
    bgStyle = `background: transparent;`;
  } else if (background.type === "pattern") {
    bgStyle = `background-color: ${background.color};
  background-image: radial-gradient(rgba(255,255,255,${background.patternOpacity}) 1px, transparent 1px);
  background-size: ${background.patternScale}px ${background.patternScale}px;`;
  }

  // Animation direction translation
  let animKeyframe = "";
  let trackFlex = "row";
  if (direction === "left") {
    animKeyframe = `@keyframes sf-scroll {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}`;
  } else if (direction === "right") {
    animKeyframe = `@keyframes sf-scroll {
  from { transform: translate3d(-50%, 0, 0); }
  to { transform: translate3d(0, 0, 0); }
}`;
  } else if (direction === "up") {
    trackFlex = "column";
    animKeyframe = `@keyframes sf-scroll {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, -50%, 0); }
}`;
  } else if (direction === "down") {
    trackFlex = "column";
    animKeyframe = `@keyframes sf-scroll {
  from { transform: translate3d(0, -50%, 0); }
  to { transform: translate3d(0, 0, 0); }
}`;
  } else {
    // Custom angle
    const rad = (angle * Math.PI) / 180;
    const moveX = Math.round(Math.cos(rad) * 100);
    const moveY = Math.round(Math.sin(rad) * 100);
    animKeyframe = `@keyframes sf-scroll {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-${moveX}%, -${moveY}%, 0); }
}`;
  }

  return `/* ScrollForge Styles */
.sf-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  ${bgStyle}
  padding: 24px 0;
  box-sizing: border-box;
}

.sf-track {
  display: flex;
  flex-direction: ${trackFlex};
  width: max-content;
  white-space: nowrap;
  will-change: transform;
  animation: sf-scroll ${duration}s linear infinite;
  ${pauseOnHover ? "&:hover { animation-play-state: paused; }" : ""}
}

.sf-content {
  display: inline-block;
  font-family: ${typography.fontFamily};
  font-size: ${typography.fontSize}px;
  font-weight: ${typography.fontWeight};
  letter-spacing: ${typography.letterSpacing}px;
  line-height: ${typography.lineHeight};
  text-transform: ${typography.textTransform};
  font-style: ${typography.italic ? "italic" : "normal"};
  text-decoration: ${typography.underline ? "underline" : "none"};
  padding-right: ${repeatGap}px;
  ${textColorStyle}
  ${textShadowStyle}
  ${strokeStyle}
}

${pauseOnHover ? `.sf-container:hover .sf-track { animation-play-state: paused; }` : ""}

${animKeyframe}`;
}

export function generateReactComponent(config: ScrollConfig): string {
  const htmlCode = generateHTML(config);
  const cssCode = generateCSS(config);

  return `import React from 'react';

export default function ScrollingText() {
  return (
    <>
      <style>{\`
        ${cssCode}
      \`}</style>
      <div className="sf-container">
        <div className="sf-track">
          <span className="sf-content">${escapeJsx(config.text)}</span>
          <span className="sf-content sf-clone" aria-hidden="true">${escapeJsx(config.text)}</span>
        </div>
      </div>
    </>
  );
}`;
}

export function generateIframe(config: ScrollConfig): string {
  const fullHtml = generateStandaloneHTML(config);
  const encoded = encodeURIComponent(fullHtml);
  return `<iframe 
  src="data:text/html;charset=utf-8,${encoded}" 
  width="${config.canvas.width}" 
  height="${config.canvas.height}" 
  style="border: none; max-width: 100%;" 
  title="ScrollForge Scrolling Text"
  loading="lazy">
</iframe>`;
}

export function generateStandaloneHTML(config: ScrollConfig): string {
  const html = generateHTML(config);
  const css = generateCSS(config);
  const font = config.typography.fontFamily.replace(/['"]/g, "").split(",")[0].trim();
  const googleFontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;600;700;800;900&display=swap`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ScrollForge — ${escapeHtml(config.text)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${googleFontUrl}" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #090a0f;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }
    ${css}
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeJsx(str: string): string {
  return str.replace(/{/g, "&#123;").replace(/}/g, "&#125;");
}
