import React from 'react';
import { Clock } from 'lucide-react';
import StatsWidget from '@/components/widgets/StatsWidget';

const PendingHomeworkWidget = () => {
    // In a real app, this would fetch data
    return (
        <StatsWidget
            title="Pending Homework"
            value="3"
            icon={Clock}
            colorClass="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900 text-orange-600 dark:text-orange-400"
        />
    );
};

export default PendingHomeworkWidget;
