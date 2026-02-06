"use client";

import { useState, useEffect } from "react";
import { Form, TextField, Button, DatePicker } from "@react-spectrum/s2";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import type { DateValue } from "@react-types/calendar";
import { Priority } from "@/lib/domain/Priority";
import Homework from "@/lib/domain/Homework";

interface HomeworkFormProps {
    onSubmit: (homework: Omit<Homework, 'id'>) => Promise<void>;
    onCancel?: () => void;
    initialData?: Homework;
    submitLabel?: string;
}

const priorityOptions = [
    {
        value: Priority.LOW,
        label: "Low",
        emoji: "🟢",
        color: "border-green-500 bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-900/40",
        activeColor: "border-green-600 bg-green-100 dark:bg-green-900/50 ring-2 ring-green-500"
    },
    {
        value: Priority.MEDIUM,
        label: "Medium",
        emoji: "🟡",
        color: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/40",
        activeColor: "border-yellow-600 bg-yellow-100 dark:bg-yellow-900/50 ring-2 ring-yellow-500"
    },
    {
        value: Priority.HIGH,
        label: "High",
        emoji: "🟠",
        color: "border-orange-500 bg-orange-50 dark:bg-orange-950/30 hover:bg-orange-100 dark:hover:bg-orange-900/40",
        activeColor: "border-orange-600 bg-orange-100 dark:bg-orange-900/50 ring-2 ring-orange-500"
    },
    {
        value: Priority.URGENT,
        label: "Urgent",
        emoji: "🔴",
        color: "border-red-500 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40",
        activeColor: "border-red-600 bg-red-100 dark:bg-red-900/50 ring-2 ring-red-500"
    }
];

// Helper to convert Date to DateValue (YYYY-MM-DD format)
function dateToDateValue(date: Date): DateValue {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return parseDate(`${year}-${month}-${day}`);
}

// Helper to convert DateValue to Date
function dateValueToDate(dateValue: DateValue): Date {
    return new Date(dateValue.year, dateValue.month - 1, dateValue.day);
}

export function HomeworkForm({ onSubmit, onCancel, initialData, submitLabel = "Add Homework" }: HomeworkFormProps) {
    const [subject, setSubject] = useState(initialData?.subject || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [dueDate, setDueDate] = useState<DateValue>(
        initialData?.dueDate
            ? dateToDateValue(initialData.dueDate)
            : today(getLocalTimeZone())
    );
    const [priority, setPriority] = useState<Priority>(initialData?.priority || Priority.MEDIUM);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setSubject(initialData.subject);
            setDescription(initialData.description);
            setDueDate(dateToDateValue(initialData.dueDate));
            setPriority(initialData.priority);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await onSubmit({
                subject,
                description,
                dueDate: dateValueToDate(dueDate),
                priority,
                isCompleted: initialData?.isCompleted || false
            } as Omit<Homework, 'id'>);

            // Reset form if not editing
            if (!initialData) {
                setSubject("");
                setDescription("");
                setDueDate(today(getLocalTimeZone()));
                setPriority(Priority.MEDIUM);
            }
        } catch (error) {
            console.error("Error submitting homework:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-4 sm:p-6 shadow-sm transition-all">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
                {initialData ? "✏️ Edit Homework" : "➕ Add New Homework"}
            </h2>

            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:gap-5">
                    <TextField
                        label="Subject"
                        value={subject}
                        onChange={setSubject}
                        isRequired
                        UNSAFE_style={{ width: '100%' }}
                    />

                    <TextField
                        label="Description"
                        value={description}
                        onChange={setDescription}
                        isRequired
                        UNSAFE_style={{ width: '100%' }}
                    />

                    <DatePicker
                        label="Due Date"
                        value={dueDate}
                        onChange={(value) => value && setDueDate(value)}
                        isRequired
                        UNSAFE_style={{ width: '100%' }}
                    />

                    {/* Playful Priority Selection - Mobile optimized */}
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Priority Level
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                            {priorityOptions.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setPriority(opt.value)}
                                    className={`
                                        flex flex-col items-center justify-center
                                        p-3 sm:p-4 rounded-xl border-2 
                                        transition-all duration-200
                                        ${priority === opt.value ? opt.activeColor : opt.color}
                                        transform active:scale-95 sm:hover:scale-105
                                        touch-manipulation min-h-[80px] sm:min-h-0
                                    `}
                                >
                                    <span className="text-2xl sm:text-3xl mb-1">{opt.emoji}</span>
                                    <span className={`text-xs sm:text-sm font-medium ${priority === opt.value
                                            ? 'text-gray-900 dark:text-gray-100'
                                            : 'text-gray-700 dark:text-gray-300'
                                        }`}>
                                        {opt.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            isDisabled={submitting}
                            UNSAFE_style={{ flex: 1 }}
                            UNSAFE_className="min-h-[44px] touch-manipulation"
                        >
                            {submitting ? "Saving..." : submitLabel}
                        </Button>
                        {onCancel && (
                            <Button
                                onPress={onCancel}
                                variant="secondary"
                                isDisabled={submitting}
                                UNSAFE_style={{ flex: 1 }}
                                UNSAFE_className="min-h-[44px] touch-manipulation"
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </div>
            </Form>
        </div>
    );
}
