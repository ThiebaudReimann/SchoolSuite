"use client";

import React from 'react';
import { Clock } from 'lucide-react';
import StatsWidget from '@/components/widgets/StatsWidget';
import { useHomeworks } from '@/hooks/useHomeworks';

const PendingHomeworkWidget = () => {
    const { homeworks, loading } = useHomeworks();
    const pendingCount = homeworks.filter(h => !h.isCompleted).length;

    return (
        <StatsWidget
            title="Pending Homework"
            value={loading ? "..." : pendingCount.toString()}
            icon={Clock}
            colorClass="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900 text-orange-600 dark:text-orange-400"
        />
    );
};

export default PendingHomeworkWidget;
