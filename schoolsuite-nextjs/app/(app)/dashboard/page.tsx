"use client";

import { useAuth } from "@/context/AuthContext";
import WidgetGrid from "@/components/dashboard/WidgetGrid";
import { WidgetConfig } from "@/lib/widgets/types";
import { useEffect, useState, useRef } from "react";
import { getDashboardLayout, saveDashboardLayout } from "@/lib/services/dashboardService";
import { toast } from "sonner";

const DEFAULT_LAYOUT: WidgetConfig[] = [
    {
        id: "courses-1",
        type: "active-courses",
        title: "Active Courses",
        x: 0,
        y: 0,
        w: 1,
        h: 1
    },
    {
        id: "tasks-1",
        type: "completed-tasks",
        title: "Completed Tasks",
        x: 1,
        y: 0,
        w: 1,
        h: 1
    },
    {
        id: "homework-1",
        type: "pending-homework",
        title: "Pending Homework",
        x: 2,
        y: 0,
        w: 1,
        h: 1
    }
];

export default function DashboardPage() {
    const { user } = useAuth();
    const [layout, setLayout] = useState<WidgetConfig[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (user) {
            loadLayout();
        }
    }, [user]);

    const loadLayout = async () => {
        if (!user) return;

        try {
            setIsLoading(true);
            const savedLayout = await getDashboardLayout(user.uid);
            if (savedLayout && savedLayout.length > 0) {
                setLayout(savedLayout);
            } else {
                setLayout(DEFAULT_LAYOUT);
            }
        } catch (error) {
            console.error("Error loading layout:", error);
            toast.error("Failed to load dashboard layout");
            setLayout(DEFAULT_LAYOUT);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLayoutChange = (newLayout: WidgetConfig[]) => {
        if (!user) return;

        // Update local state immediately for responsive feel
        setLayout(newLayout);

        // Debounce Firestore write
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(async () => {
            try {
                setIsSaving(true);
                await saveDashboardLayout(user.uid, newLayout);
                setIsSaving(false);
            } catch (error) {
                console.error("Error saving layout:", error);
                toast.error("Failed to save layout changes");
                setIsSaving(false);
            }
        }, 2000); // 2 second debounce
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Welcome back, {user?.email?.split('@')[0]}!
                    </p>
                </div>
                {isSaving && (
                    <div className="text-sm text-gray-500 animate-pulse">
                        Saving layout...
                    </div>
                )}
            </div>

            {layout && (
                <WidgetGrid
                    initialLayout={layout}
                    onLayoutChange={handleLayoutChange}
                />
            )}
        </div>
    );
}
