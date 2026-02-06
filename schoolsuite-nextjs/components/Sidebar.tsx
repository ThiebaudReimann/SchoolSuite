"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: "🏠" },
        { name: "Homework", path: "/homework", icon: "📝" },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Navigation Items */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={onClose}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive(item.path)
                                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                                    }
                `}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Bottom Section - Account & Settings */}
                    <div className="p-4 border-t border-gray-200 dark:border-zinc-800 space-y-2">
                        <button
                            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <span className="text-xl">👤</span>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">Account</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {user?.email}
                                </div>
                            </div>
                        </button>

                        <button
                            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <span className="text-xl">⚙️</span>
                            <span>Settings</span>
                        </button>

                        <button
                            onClick={() => logout()}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        >
                            <span className="text-xl">🚪</span>
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
