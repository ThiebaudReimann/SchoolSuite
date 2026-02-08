"use client";

import { useState } from "react";
import Homework from "@/lib/domain/Homework";
import { Priority } from "@/lib/domain/Priority";
import {
    ChevronLeft,
    ChevronRight,
    CircleDot,
    Calendar as CalendarIcon
} from "lucide-react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    eachDayOfInterval
} from "date-fns";

interface HomeworkCalendarProps {
    homeworks: Homework[];
    onEdit: (homework: Homework) => void;
    onToggleComplete: (homework: Homework) => void;
}

export function HomeworkCalendar({ homeworks, onEdit, onToggleComplete }: HomeworkCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate
    });

    const getPriorityColor = (priority: Priority) => {
        switch (priority) {
            case Priority.URGENT: return 'text-red-500';
            case Priority.HIGH: return 'text-orange-500';
            case Priority.MEDIUM: return 'text-yellow-500';
            case Priority.LOW: return 'text-green-500';
            default: return 'text-gray-400';
        }
    };

    const homeworksOnSelectedDate = homeworks.filter(hw =>
        isSameDay(new Date(hw.dueDate), selectedDate)
    );

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <CalendarIcon size={20} className="text-blue-600 dark:text-blue-400" />
                        {format(currentMonth, 'MMMM yyyy')}
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={prevMonth}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextMonth}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 border-b border-gray-200 dark:border-zinc-800">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="py-2 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7">
                    {calendarDays.map((day, idx) => {
                        const dayHomeworks = homeworks.filter(hw => isSameDay(new Date(hw.dueDate), day));
                        const isSelected = isSameDay(day, selectedDate);
                        const isCurrentMonth = isSameMonth(day, monthStart);
                        const isToday = isSameDay(day, new Date());

                        return (
                            <button
                                key={day.toString()}
                                onClick={() => setSelectedDate(day)}
                                className={`
                                    relative min-h-[80px] sm:min-h-[100px] p-2 border-r border-b border-gray-100 dark:border-zinc-800/50 text-left transition-all
                                    ${!isCurrentMonth ? 'bg-gray-50/50 dark:bg-zinc-950/20 opacity-40' : 'bg-white dark:bg-zinc-900'}
                                    ${isSelected ? 'ring-2 ring-inset ring-blue-500 z-10' : 'hover:bg-blue-50/30 dark:hover:bg-blue-900/10'}
                                    ${idx % 7 === 6 ? 'border-r-0' : ''}
                                `}
                            >
                                <span className={`
                                    inline-flex items-center justify-center w-7 h-7 text-sm rounded-full
                                    ${isToday ? 'bg-blue-600 text-white font-bold' : isSelected ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300'}
                                `}>
                                    {format(day, 'd')}
                                </span>

                                {/* Homework Indicators */}
                                <div className="mt-2 space-y-1">
                                    {dayHomeworks.slice(0, 3).map(hw => (
                                        <div
                                            key={hw.id}
                                            className={`flex items-center gap-1 text-[10px] sm:text-xs truncate ${hw.isCompleted ? 'opacity-50 line-through' : ''}`}
                                        >
                                            <CircleDot size={8} className={`shrink-0 ${getPriorityColor(hw.priority)} fill-current`} />
                                            <span className="truncate text-gray-600 dark:text-gray-400">{hw.subject}</span>
                                        </div>
                                    ))}
                                    {dayHomeworks.length > 3 && (
                                        <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium pl-3">
                                            +{dayHomeworks.length - 3} more
                                        </div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Selected Date Homework Details */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Homework for {format(selectedDate, 'MMMM do, yyyy')}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {homeworksOnSelectedDate.length} {homeworksOnSelectedDate.length === 1 ? 'task' : 'tasks'}
                    </div>
                </div>

                {homeworksOnSelectedDate.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-dotted border-gray-300 dark:border-zinc-700 p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400 italic">No homework due on this day</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {homeworksOnSelectedDate.map(hw => (
                            <div
                                key={hw.id}
                                className={`
                                    bg-white dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800 rounded-xl p-4 flex items-center gap-4 transition-all
                                    ${hw.isCompleted ? 'opacity-60' : 'hover:border-blue-200 dark:hover:border-blue-900 shadow-sm'}
                                `}
                            >
                                <input
                                    type="checkbox"
                                    checked={hw.isCompleted}
                                    onChange={() => onToggleComplete(hw)}
                                    className="w-5 h-5 rounded-md border-2 border-gray-300 dark:border-zinc-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className={`font-semibold text-gray-900 dark:text-gray-100 truncate ${hw.isCompleted ? 'line-through' : ''}`}>
                                        {hw.subject}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{hw.description}</p>
                                </div>
                                <button
                                    onClick={() => onEdit(hw)}
                                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
