"use client";

import { useState, useEffect } from "react";
import { AppBar } from "@/components/AppBar";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">SchoolSuite</h1>
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    // If not authenticated, don't render the app layout (redirect will happen)
    if (!user) {
        return null;
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* App Bar */}
            <AppBar
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                showMenuButton={true}
            />

            {/* Main Content Area with Sidebar */}
            <div className="flex-1 flex overflow-hidden">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-950 p-6 transition-colors">
                    {children}
                </main>
            </div>
        </div>
    );
}
