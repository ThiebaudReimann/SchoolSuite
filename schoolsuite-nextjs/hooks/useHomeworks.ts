"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Homework from "@/lib/domain/Homework";
import * as homeworkService from "@/lib/services/homeworkService";
import { toast } from "sonner";

export function useHomeworks() {
    const { user } = useAuth();
    const [homeworks, setHomeworks] = useState<Homework[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Subscribe to real-time updates
    useEffect(() => {
        if (!user) {
            setHomeworks([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const unsubscribe = homeworkService.subscribeToHomeworks(
            user.uid,
            (updatedHomeworks) => {
                setHomeworks(updatedHomeworks);
                setLoading(false);
                setError(null);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
                toast.error("Failed to load homeworks");
            }
        );

        return () => unsubscribe();
    }, [user]);

    const addHomework = async (homework: Omit<Homework, 'id'>) => {
        if (!user) {
            toast.error("You must be logged in");
            return;
        }

        try {
            await homeworkService.addHomework(user.uid, homework);
            toast.success("Homework added successfully");
        } catch (err) {
            toast.error("Failed to add homework");
            throw err;
        }
    };

    const updateHomework = async (homeworkId: string, updates: Partial<Omit<Homework, 'id'>>) => {
        try {
            await homeworkService.updateHomework(homeworkId, updates);
            toast.success("Homework updated successfully");
        } catch (err) {
            toast.error("Failed to update homework");
            throw err;
        }
    };

    const deleteHomework = async (homeworkId: string) => {
        try {
            await homeworkService.deleteHomework(homeworkId);
            toast.success("Homework deleted successfully");
        } catch (err) {
            toast.error("Failed to delete homework");
            throw err;
        }
    };

    const toggleComplete = async (homework: Homework) => {
        try {
            await homeworkService.toggleHomeworkComplete(homework.id, homework.isCompleted);
        } catch (err) {
            toast.error("Failed to update homework status");
            throw err;
        }
    };

    return {
        homeworks,
        loading,
        error,
        addHomework,
        updateHomework,
        deleteHomework,
        toggleComplete
    };
}
