"use client";

import { useAuth } from "@/context/AuthContext";
import { Library, CheckCircle2, Clock } from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Dashboard
            </h1>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 transition-colors">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Welcome back, {user?.email?.split('@')[0]}!
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    This is your dashboard. Here you can see an overview of your school activities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                        <div className="text-blue-600 dark:text-blue-400 mb-2">
                            <Library size={24} />
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Active Courses</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">5</div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
                        <div className="text-green-600 dark:text-green-400 mb-2">
                            <CheckCircle2 size={24} />
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Completed Tasks</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</div>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg p-4">
                        <div className="text-orange-600 dark:text-orange-400 mb-2">
                            <Clock size={24} />
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Pending Homework</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
