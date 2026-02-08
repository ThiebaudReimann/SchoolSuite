"use client";

import { useState } from "react";
import { useHomeworks } from "@/hooks/useHomeworks";
import { HomeworkForm } from "@/components/HomeworkForm";
import { HomeworkList } from "@/components/HomeworkList";
import Homework from "@/lib/domain/Homework";
import { Plus, X } from "lucide-react";

export default function HomeworkPage() {
    const { homeworks, loading, addHomework, updateHomework, deleteHomework, toggleComplete } = useHomeworks();
    const [editingHomework, setEditingHomework] = useState<Homework | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleAdd = async (homework: Omit<Homework, 'id'>) => {
        await addHomework(homework);
        setShowForm(false);
    };

    const handleEdit = async (homework: Omit<Homework, 'id'>) => {
        if (editingHomework) {
            await updateHomework(editingHomework.id, homework);
            setEditingHomework(null);
        }
    };

    const handleDelete = async (homeworkId: string) => {
        if (confirm("Are you sure you want to delete this homework?")) {
            await deleteHomework(homeworkId);
        }
    };

    const handleCancelEdit = () => {
        setEditingHomework(null);
        setShowForm(false);
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">Loading homework...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Homework
                </h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingHomework(null);
                    }}
                    className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                        ${showForm
                            ? 'bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-700'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'}
                    `}
                >
                    {showForm ? (
                        <>
                            <X size={18} />
                            <span>Cancel</span>
                        </>
                    ) : (
                        <>
                            <Plus size={18} />
                            <span>Add Homework</span>
                        </>
                    )}
                </button>
            </div>

            {/* Form */}
            {(showForm || editingHomework) && (
                <HomeworkForm
                    onSubmit={editingHomework ? handleEdit : handleAdd}
                    onCancel={handleCancelEdit}
                    initialData={editingHomework || undefined}
                    submitLabel={editingHomework ? "Save Changes" : "Add Homework"}
                />
            )}

            {/* List */}
            <HomeworkList
                homeworks={homeworks}
                onEdit={(homework) => {
                    setEditingHomework(homework);
                    setShowForm(false);
                    // Scroll to top to see edit form
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onDelete={handleDelete}
                onToggleComplete={toggleComplete}
            />
        </div>
    );
}
