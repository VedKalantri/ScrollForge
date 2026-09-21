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
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-studio-50 dark:bg-studio-950">
      {/* Top Main Navigation Bar */}
      <EditorNavbar />

      {/* Desktop 3-Pane Creative Workstation */}
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

      {/* Mobile Dedicated Responsive Layout */}
      <div className="lg:hidden flex-1 flex flex-col overflow-y-auto">
        {/* Pinned / Top preview */}
        <div className="w-full h-64 shrink-0 border-b border-studio-200 dark:border-studio-800">
          <PreviewCanvas />
        </div>

        {/* Mobile Accordion Controls */}
        <MobileEditor />
      </div>

      {/* Global Modals */}
      <ExportModal />
      <CodeModal />
      <ProjectsModal />
      <HelpModal />
    </div>
  );
}
