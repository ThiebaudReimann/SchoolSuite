"use client";

import React from 'react';
import { useHomeworks } from '@/hooks/useHomeworks';
import { Calendar, AlertCircle, CircleDot } from 'lucide-react';
import { Priority } from '@/lib/domain/Priority';

const HomeworkPreviewWidget = () => {
    const { homeworks, loading } = useHomeworks();

    const pendingHomeworks = homeworks
        .filter(h => !h.isCompleted)
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 3);

    const getPriorityColor = (priority: Priority) => {
        switch (priority) {
            case Priority.URGENT: return 'text-red-500';
            case Priority.HIGH: return 'text-orange-500';
            case Priority.MEDIUM: return 'text-yellow-500';
            case Priority.LOW: return 'text-green-500';
            default: return 'text-gray-500';
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const isOverdue = (dueDate: Date) => {
        return new Date() > new Date(dueDate);
    };

    if (loading) {
        return (
            <div className="h-full w-full p-4 rounded-lg border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 flex items-center justify-center">
                <p className="text-sm text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="h-full w-full p-4 rounded-lg border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Homework</div>
                <Calendar size={16} className="text-gray-400" />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
                {pendingHomeworks.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-xs text-gray-400 italic">No pending homework</p>
                    </div>
                ) : (
                    pendingHomeworks.map((hw) => (
                        <div key={hw.id} className="flex items-center gap-2 p-2 rounded-md bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50">
                            <CircleDot size={12} className={getPriorityColor(hw.priority)} />
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold truncate text-gray-900 dark:text-gray-100">{hw.subject}</div>
                                <div className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    {isOverdue(hw.dueDate) ? (
                                        <span className="text-red-500 flex items-center gap-0.5">
                                            <AlertCircle size={10} />
                                            Overdue
                                        </span>
                                    ) : (
                                        <span>Due {formatDate(hw.dueDate)}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomeworkPreviewWidget;
