"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    BookOpen,
    User,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

export function Sidebar({
    isOpen = true,
    onClose,
    isCollapsed = false,
    onToggleCollapse
}: SidebarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Homework", path: "/homework", icon: BookOpen },
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
                    bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800
                    transform transition-all duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    ${isCollapsed ? 'w-20' : 'w-64'}
                `}
            >
                <div className="flex flex-col h-full overflow-hidden">
                    {/* Collapse Toggle Button (Desktop only) */}
                    <div className="hidden lg:flex justify-end p-4">
                        <button
                            onClick={onToggleCollapse}
                            className="p-1.5 rounded-lg bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-500 dark:text-gray-400 transition-colors"
                            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={onClose}
                                title={isCollapsed ? item.name : undefined}
                                className={`
                                    flex items-center gap-3 px-3 py-3 rounded-lg transition-all
                                    ${isActive(item.path)
                                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                                    }
                                    ${isCollapsed ? 'justify-center' : ''}
                                `}
                            >
                                <item.icon size={24} className="shrink-0" />
                                {!isCollapsed && <span className="truncate">{item.name}</span>}
                            </Link>
                        ))}
                    </nav>

                    {/* Bottom Section - Account & Settings */}
                    <div className={`p-4 border-t border-gray-200 dark:border-zinc-800 space-y-2 ${isCollapsed ? 'items-center' : ''}`}>
                        <button
                            title={isCollapsed ? "Account" : undefined}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <User size={24} className="shrink-0" />
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium truncate">Account</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {user?.email}
                                    </div>
                                </div>
                            )}
                        </button>

                        <Link
                            href="/settings"
                            onClick={onClose}
                            title={isCollapsed ? "Settings" : undefined}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <Settings size={24} className="shrink-0" />
                            {!isCollapsed && <span className="truncate">Settings</span>}
                        </Link>

                        <button
                            onClick={() => logout()}
                            title={isCollapsed ? "Sign Out" : undefined}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <LogOut size={24} className="shrink-0" />
                            {!isCollapsed && <span className="truncate">Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
