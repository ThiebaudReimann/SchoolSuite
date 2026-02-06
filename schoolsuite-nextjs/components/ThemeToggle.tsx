"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const tabs = [
        { id: 'light', label: 'Light' },
        { id: 'dark', label: 'Dark' },
        { id: 'system', label: 'System' },
    ];

    return (
        <div className="flex bg-gray-200 dark:bg-zinc-800 p-1 rounded-lg border border-gray-300 dark:border-zinc-700 w-fit">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setTheme(tab.id)}
                    className={`
            px-3 py-1.5 rounded-md text-sm font-medium transition-all
            ${theme === tab.id
                            ? 'bg-white dark:bg-zinc-600 shadow-sm text-black dark:text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-gray-200'}
          `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
