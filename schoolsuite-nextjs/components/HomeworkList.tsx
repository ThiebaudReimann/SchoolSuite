"use client";

import { useState } from "react";
import Homework from "@/lib/domain/Homework";
import { Priority } from "@/lib/domain/Priority";

interface HomeworkListProps {
    homeworks: Homework[];
    onEdit: (homework: Homework) => void;
    onDelete: (homeworkId: string) => void;
    onToggleComplete: (homework: Homework) => void;
}

export function HomeworkList({ homeworks, onEdit, onDelete, onToggleComplete }: HomeworkListProps) {
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

    const filteredHomeworks = homeworks.filter(hw => {
        if (filter === 'pending') return !hw.isCompleted;
        if (filter === 'completed') return hw.isCompleted;
        return true;
    });

    const getPriorityConfig = (priority: Priority) => {
        switch (priority) {
            case Priority.URGENT:
                return {
                    emoji: "🔴",
                    label: "Urgent",
                    bgColor: 'bg-red-100 dark:bg-red-950/50',
                    textColor: 'text-red-700 dark:text-red-400',
                    borderColor: 'border-red-300 dark:border-red-800'
                };
            case Priority.HIGH:
                return {
                    emoji: "🟠",
                    label: "High",
                    bgColor: 'bg-orange-100 dark:bg-orange-950/50',
                    textColor: 'text-orange-700 dark:text-orange-400',
                    borderColor: 'border-orange-300 dark:border-orange-800'
                };
            case Priority.MEDIUM:
                return {
                    emoji: "🟡",
                    label: "Medium",
                    bgColor: 'bg-yellow-100 dark:bg-yellow-950/50',
                    textColor: 'text-yellow-700 dark:text-yellow-400',
                    borderColor: 'border-yellow-300 dark:border-yellow-800'
                };
            case Priority.LOW:
                return {
                    emoji: "🟢",
                    label: "Low",
                    bgColor: 'bg-green-100 dark:bg-green-950/50',
                    textColor: 'text-green-700 dark:text-green-400',
                    borderColor: 'border-green-300 dark:border-green-800'
                };
        }
    };

    const isOverdue = (dueDate: Date, isCompleted: boolean) => {
        return !isCompleted && new Date() > new Date(dueDate);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-4">
            {/* Filter Tabs - Mobile optimized */}
            <div className="flex gap-1 sm:gap-2 border-b border-gray-200 dark:border-zinc-800 overflow-x-auto">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-3 sm:px-4 py-2 font-medium text-sm sm:text-base transition-all whitespace-nowrap ${filter === 'all'
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                >
                    All ({homeworks.length})
                </button>
                <button
                    onClick={() => setFilter('pending')}
                    className={`px-3 sm:px-4 py-2 font-medium text-sm sm:text-base transition-all whitespace-nowrap ${filter === 'pending'
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                >
                    Pending ({homeworks.filter(h => !h.isCompleted).length})
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    className={`px-3 sm:px-4 py-2 font-medium text-sm sm:text-base transition-all whitespace-nowrap ${filter === 'completed'
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                >
                    Completed ({homeworks.filter(h => h.isCompleted).length})
                </button>
            </div>

            {/* Empty State or List */}
            {filteredHomeworks.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 text-center transition-colors">
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                        {filter === 'completed' ? 'No completed homework yet' :
                            filter === 'pending' ? 'No pending homework' :
                                'No homework assignments. Add one to get started!'}
                    </p>
                </div>
            ) : (
                /* Homework List */
                <div className="space-y-3">
                    {filteredHomeworks.map((homework) => {
                        const isCompleted = homework.isCompleted;
                        const overdueStatus = isOverdue(homework.dueDate, homework.isCompleted);
                        const priorityConfig = getPriorityConfig(homework.priority);

                        return (
                            <div
                                key={homework.id}
                                className={`
                                    bg-white dark:bg-zinc-900 
                                    border-2 border-gray-200 dark:border-zinc-800 
                                    rounded-xl p-4 sm:p-5 
                                    transition-all duration-200
                                    hover:shadow-lg hover:border-gray-300 dark:hover:border-zinc-700
                                    ${isCompleted ? 'opacity-60' : ''}
                                `}
                            >
                                <div className="flex items-start gap-3 sm:gap-4">
                                    {/* Checkbox - larger touch target on mobile */}
                                    <div className="pt-0.5">
                                        <input
                                            type="checkbox"
                                            checked={isCompleted}
                                            onChange={() => onToggleComplete(homework)}
                                            className="w-6 h-6 sm:w-5 sm:h-5 rounded-md border-2 border-gray-300 dark:border-zinc-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all hover:scale-110"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Title and Actions */}
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3">
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 break-words ${isCompleted ? 'line-through' : ''
                                                    }`}>
                                                    {homework.subject}
                                                </h3>
                                                <p className={`text-sm text-gray-600 dark:text-gray-400 mt-1 break-words ${isCompleted ? 'line-through' : ''
                                                    }`}>
                                                    {homework.description}
                                                </p>
                                            </div>
                                            {/* Action buttons - stack on mobile */}
                                            <div className="flex gap-2 sm:gap-2 flex-shrink-0">
                                                <button
                                                    onClick={() => onEdit(homework)}
                                                    className="flex-1 sm:flex-none px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all touch-manipulation"
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    onClick={() => onDelete(homework.id)}
                                                    className="flex-1 sm:flex-none px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all touch-manipulation"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </div>

                                        {/* Tags - wrap on mobile */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`
                                                inline-flex items-center gap-1.5
                                                text-xs font-medium px-2.5 sm:px-3 py-1.5 
                                                rounded-full border-2
                                                ${priorityConfig.bgColor} 
                                                ${priorityConfig.textColor} 
                                                ${priorityConfig.borderColor}
                                                transition-all
                                            `}>
                                                <span className="text-sm">{priorityConfig.emoji}</span>
                                                <span>{priorityConfig.label}</span>
                                            </span>
                                            <span className={`
                                                inline-flex items-center gap-1.5
                                                text-xs font-medium px-2.5 sm:px-3 py-1.5 
                                                rounded-full
                                                ${overdueStatus
                                                    ? 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 border-2 border-red-300 dark:border-red-800'
                                                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-400 border-2 border-gray-300 dark:border-zinc-700'
                                                }
                                                transition-all
                                            `}>
                                                {overdueStatus ? (
                                                    <>
                                                        <span className="text-sm">⚠️</span>
                                                        <span>Overdue</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-sm">📅</span>
                                                        <span className="whitespace-nowrap">{formatDate(homework.dueDate)}</span>
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
