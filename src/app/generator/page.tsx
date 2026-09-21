"use client";

import React from "react";
import { EditorNavbar } from "../../components/editor/EditorNavbar";
import { ContentPanel } from "../../components/editor/ContentPanel";
import { PreviewCanvas } from "../../components/editor/PreviewCanvas";
import { PropertiesPanel } from "../../components/editor/PropertiesPanel";
import { MobileEditor } from "../../components/editor/MobileEditor";
import { ExportModal } from "../../components/editor/ExportModal";
import { CodeModal } from "../../components/editor/CodeModal";
import { ProjectsModal } from "../../components/editor/ProjectsModal";
import { HelpModal } from "../../components/editor/HelpModal";

export default function GeneratorPage() {
  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-full overflow-hidden bg-studio-50 dark:bg-studio-950 select-none">
      {/* Top Main Navigation Bar */}
      <EditorNavbar />

      {/* Desktop 3-Pane Creative Workstation (screens >= 1024px) - 100% UNCHANGED */}
      <div className="hidden lg:flex flex-1 w-full overflow-hidden">
        {/* Left: Text & Content Panel */}
        <ContentPanel />

        {/* Center: Live Real-Time Canvas Preview */}
        <main className="flex-1 h-full relative overflow-hidden flex flex-col">
          <PreviewCanvas />
        </main>

        {/* Right: Properties & Customization Panel */}
        <PropertiesPanel />
      </div>

      {/* Tablet 2-Pane Workstation (screens 768px to 1023px) */}
      <div className="hidden md:flex lg:hidden flex-1 w-full overflow-hidden">
        {/* Left: Live Preview Canvas (generous size) */}
        <main className="flex-1 h-full relative overflow-hidden flex flex-col">
          <PreviewCanvas />
        </main>

        {/* Right: Full-Featured Tabbed Control Station */}
        <aside className="w-80 sm:w-88 h-full border-l border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 flex flex-col shrink-0 overflow-hidden">
          <MobileEditor />
        </aside>
      </div>

      {/* Mobile Dedicated Responsive Layout (screens < 768px) */}
      <div className="md:hidden flex-1 flex flex-col overflow-hidden">
        {/* Pinned / Top preview with responsive viewport height */}
        <div className="w-full h-[36vh] sm:h-[40vh] shrink-0 border-b border-studio-200 dark:border-studio-800 relative">
          <PreviewCanvas />
        </div>

        {/* Mobile Tabbed Controls with smooth scroll */}
        <div className="flex-1 overflow-hidden bg-white dark:bg-studio-900">
          <MobileEditor />
        </div>
      </div>

      {/* Global Modals */}
      <ExportModal />
      <CodeModal />
      <ProjectsModal />
      <HelpModal />
    </div>
  );
}
