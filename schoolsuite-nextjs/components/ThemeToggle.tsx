"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const tabs = [
        { id: 'light', label: 'Light', icon: Sun },
        { id: 'dark', label: 'Dark', icon: Moon },
        { id: 'system', label: 'System', icon: Monitor },
    ];

    return (
        <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg border border-gray-200 dark:border-zinc-700 w-fit shadow-sm">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setTheme(tab.id)}
                        title={tab.label}
                        className={`
                            p-2 rounded-md transition-all flex items-center justify-center
                            ${theme === tab.id
                                ? 'bg-white dark:bg-zinc-600 shadow-sm text-blue-600 dark:text-blue-400 font-bold'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}
                        `}
                    >
                        <Icon size={18} />
                    </button>
                );
            })}
        </div>
    );
}
