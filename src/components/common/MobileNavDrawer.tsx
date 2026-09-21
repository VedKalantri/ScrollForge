"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Layers, BookOpen, Info, Sliders } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/generator", label: "Studio", icon: Sliders },
    { href: "/presets", label: "Presets", icon: Layers },
    { href: "/docs", label: "Documentation", icon: BookOpen },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <div className="md:hidden flex items-center gap-2">
      <ThemeToggle />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl border border-studio-200 dark:border-studio-800 bg-white dark:bg-studio-900 text-studio-700 dark:text-studio-300 hover:text-studio-950 dark:hover:text-white transition-colors"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Slide-down Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full bg-white dark:bg-studio-950 border-b border-studio-200 dark:border-studio-800 p-6 shadow-2xl flex flex-col gap-5 animate-in slide-in-from-top-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-forge-500/10 text-forge-600 dark:text-forge-400 border border-forge-500/20"
                        : "text-studio-700 dark:text-studio-300 hover:bg-studio-100 dark:hover:bg-studio-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-forge-500" />
                      <span>{label}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-studio-400" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-studio-200 dark:border-studio-800 flex flex-col gap-3">
              <Link
                href="/generator"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 px-5 text-center text-xs font-bold rounded-xl bg-forge-500 hover:bg-forge-600 text-white shadow-md shadow-forge-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Creative Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
