"use client";

import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";

interface AppBarProps {
    onMenuClick?: () => void;
    showMenuButton?: boolean;
}

export function AppBar({ onMenuClick, showMenuButton = false }: AppBarProps) {
    return (
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-4 transition-colors z-50">
            <div className="flex items-center gap-4">
                {showMenuButton && (
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} className="text-gray-700 dark:text-gray-200" />
                    </button>
                )}
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100" style={{ fontFamily: 'var(--font-funnel-display)' }}>
                    SchoolSuite
                </h1>
            </div>

            <ThemeToggle />
        </header>
    );
}
