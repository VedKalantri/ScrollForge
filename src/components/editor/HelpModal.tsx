"use client";

import React from "react";
import { Command, Keyboard } from "lucide-react";
import { useEditor } from "../../context/EditorContext";
import { Modal } from "../ui/Modal";

export function HelpModal() {
  const { isHelpOpen, setIsHelpOpen } = useEditor();

  const shortcuts = [
    { key: "Space", desc: "Play / Pause live animation" },
    { key: "R", desc: "Restart animation from the beginning" },
    { key: "Ctrl / ⌘ + Z", desc: "Undo last property change" },
    { key: "Ctrl / ⌘ + Shift + Z", desc: "Redo last property change" },
    { key: "Ctrl / ⌘ + S", desc: "Save project to local storage" },
    { key: "Ctrl / ⌘ + Shift + E", desc: "Open Export dialog (GIF & Video)" },
    { key: "Esc", desc: "Close active modal / dialog" },
  ];

  return (
    <Modal
      isOpen={isHelpOpen}
      onClose={() => setIsHelpOpen(false)}
      title="Keyboard Shortcuts & Workflow"
      description="Work faster with studio keyboard shortcuts and gestures."
      maxWidth="md"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {shortcuts.map((sc) => (
            <div
              key={sc.key}
              className="flex items-center justify-between py-2 border-b border-studio-100 dark:border-studio-800/60 text-xs"
            >
              <span className="text-studio-600 dark:text-studio-300 font-medium">
                {sc.desc}
              </span>
              <kbd className="px-2 py-1 font-mono font-bold text-[11px] rounded bg-studio-100 dark:bg-studio-800 text-studio-800 dark:text-studio-200 border border-studio-200 dark:border-studio-700 shadow-sm">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg bg-studio-50 dark:bg-studio-850 border border-studio-200 dark:border-studio-800 text-xs text-studio-600 dark:text-studio-400 leading-relaxed">
          <strong className="text-studio-800 dark:text-studio-200 block mb-1">
            Studio Rule: Zero Latency Editing
          </strong>
          Every keystroke and slider change is immediately reflected on the canvas. Keyboard shortcuts are automatically disabled while typing in text areas.
        </div>
      </div>
    </Modal>
  );
}
