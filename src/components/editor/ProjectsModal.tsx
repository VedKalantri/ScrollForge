"use client";

import React, { useState } from "react";
import { Folder, Save, Trash2, Clock, Check } from "lucide-react";
import { useEditor } from "../../context/EditorContext";
import { Modal } from "../ui/Modal";

export function ProjectsModal() {
  const {
    isProjectsOpen,
    setIsProjectsOpen,
    savedProjects,
    saveProject,
    loadProject,
    deleteProject,
    currentProjectId,
  } = useEditor();

  const [projectName, setProjectName] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;
    saveProject(projectName.trim());
    setProjectName("");
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <Modal
      isOpen={isProjectsOpen}
      onClose={() => setIsProjectsOpen(false)}
      title="Saved Projects & Creations"
      description="Your motion designs are automatically preserved in browser local storage."
      maxWidth="lg"
    >
      <div className="flex flex-col gap-5">
        {/* Save Current Form */}
        <form onSubmit={handleSave} className="flex gap-2">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name (e.g. Summer Festival Marquee)..."
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-850 text-studio-900 dark:text-studio-100 placeholder:text-studio-400 focus:outline-none focus:border-forge-500"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-forge-500 hover:bg-forge-600 text-white shadow-sm transition-colors shrink-0"
          >
            {justSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Current</span>
              </>
            )}
          </button>
        </form>

        {/* Saved List */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-studio-400">
            Recent Creations ({savedProjects.length})
          </span>

          {savedProjects.length === 0 ? (
            <div className="py-12 text-center text-xs text-studio-400 border border-dashed border-studio-200 dark:border-studio-800 rounded-lg">
              No saved projects yet. Click &quot;Save Current&quot; to save your design!
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
              {savedProjects.map((p) => {
                const isActive = p.id === currentProjectId;
                const dateStr = new Date(p.updatedAt).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={p.id}
                    className={`p-3 rounded-lg border transition-all flex items-center justify-between ${
                      isActive
                        ? "border-forge-500 bg-forge-500/5 dark:bg-forge-500/10"
                        : "border-studio-200 dark:border-studio-800 bg-studio-50/50 dark:bg-studio-850/50 hover:bg-white dark:hover:bg-studio-800"
                    }`}
                  >
                    <div className="flex flex-col gap-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-studio-900 dark:text-studio-100 truncate">
                          {p.name}
                        </span>
                        {isActive && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-forge-500 text-white">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-studio-500 dark:text-studio-400 truncate font-mono">
                        &quot;{p.config.text}&quot;
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-studio-400 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{dateStr}</span>
                        <span>•</span>
                        <span>{p.config.canvas.width}×{p.config.canvas.height}</span>
                        <span>•</span>
                        <span>{p.config.typography.fontFamily}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          loadProject(p.id);
                          setIsProjectsOpen(false);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold rounded-md border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300 hover:border-forge-500 hover:text-forge-500 transition-colors"
                      >
                        Load
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteProject(p.id)}
                        className="p-1.5 text-studio-400 hover:text-red-500 rounded-md hover:bg-studio-100 dark:hover:bg-studio-800 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
