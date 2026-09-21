"use client";

import React, { useState } from "react";
import { Copy, Check, Download, Code2 } from "lucide-react";
import { useEditor } from "../../context/EditorContext";
import { Modal } from "../ui/Modal";
import {
  generateHTML,
  generateCSS,
  generateReactComponent,
  generateIframe,
  generateStandaloneHTML,
} from "../../lib/codeGenerator";

type CodeTab = "html" | "css" | "react" | "iframe" | "fullHtml";

export function CodeModal() {
  const { config, isCodeOpen, setIsCodeOpen } = useEditor();
  const [activeTab, setActiveTab] = useState<CodeTab>("html");
  const [copied, setCopied] = useState(false);

  // Generate current snippets live
  const htmlSnippet = generateHTML(config);
  const cssSnippet = generateCSS(config);
  const reactSnippet = generateReactComponent(config);
  const iframeSnippet = generateIframe(config);
  const fullHtmlSnippet = generateStandaloneHTML(config);

  const getActiveCode = () => {
    switch (activeTab) {
      case "html":
        return htmlSnippet;
      case "css":
        return cssSnippet;
      case "react":
        return reactSnippet;
      case "iframe":
        return iframeSnippet;
      case "fullHtml":
        return fullHtmlSnippet;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getActiveCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy code:", getActiveCode());
    }
  };

  const handleDownloadStandalone = () => {
    const blob = new Blob([fullHtmlSnippet], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scrollforge-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={isCodeOpen}
      onClose={() => setIsCodeOpen(false)}
      title="Generated Production Code"
      description="Zero-dependency, high-performance CSS and HTML animated marquee components."
      maxWidth="2xl"
    >
      <div className="flex flex-col gap-4">
        {/* Code Tabs */}
        <div className="flex items-center justify-between border-b border-studio-200 dark:border-studio-800 pb-2">
          <div className="flex items-center gap-1">
            {[
              { id: "html", label: "HTML" },
              { id: "css", label: "CSS" },
              { id: "react", label: "React (TSX)" },
              { id: "iframe", label: "Embed (iframe)" },
              { id: "fullHtml", label: "Full Standalone HTML" },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id as CodeTab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === id
                    ? "bg-forge-500 text-white shadow-sm"
                    : "text-studio-600 dark:text-studio-400 hover:bg-studio-100 dark:hover:bg-studio-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadStandalone}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-studio-200 dark:border-studio-700 bg-white dark:bg-studio-800 text-studio-700 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-750 transition-colors"
              title="Download runnable standalone .html file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download HTML</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md bg-studio-900 text-white dark:bg-white dark:text-studio-900 hover:opacity-90 transition-opacity"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="relative rounded-lg bg-studio-950 border border-studio-800 p-4 overflow-hidden">
          <pre className="font-mono text-xs text-studio-200 overflow-x-auto max-h-96 leading-relaxed select-text">
            <code>{getActiveCode()}</code>
          </pre>
        </div>

        <p className="text-[11px] text-studio-400">
          The code automatically updates as you adjust typography, speed, colors, and motion settings in the editor.
        </p>
      </div>
    </Modal>
  );
}
