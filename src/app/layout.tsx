import type { Metadata } from "next";
import "./globals.css";
import { EditorProvider } from "../context/EditorContext";

export const metadata: Metadata = {
  title: "ScrollForge — The Ultimate Scrolling Text Generator",
  description:
    "Create fully customizable horizontal, vertical and animated scrolling text. Export it as GIF, video or production-ready code.",
  keywords: [
    "scrolling text generator",
    "scrolling text maker",
    "marquee generator",
    "marquee text generator",
    "animated text generator",
    "GIF text generator",
    "scrolling text GIF",
    "scrolling text video",
    "HTML marquee generator",
    "CSS scrolling text generator",
    "vertical scrolling text generator",
    "horizontal scrolling text generator",
  ],
  authors: [{ name: "ScrollForge" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Fira+Code:wght@400;600&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;800&family=Montserrat:wght@400;700;900&family=Oswald:wght@400;600;700&family=Poppins:wght@400;600;800&family=Roboto:wght@400;700&family=Space+Grotesk:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-studio-50 text-studio-900 dark:bg-studio-950 dark:text-studio-100 selection:bg-forge-500 selection:text-white">
        <EditorProvider>{children}</EditorProvider>
      </body>
    </html>
  );
}
