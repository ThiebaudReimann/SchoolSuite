import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import StatsWidget from '@/components/widgets/StatsWidget';

const CompletedTasksWidget = () => {
    return (
        <StatsWidget
            title="Completed Tasks"
            value="12"
            icon={CheckCircle2}
            colorClass="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 text-green-600 dark:text-green-400"
        />
    );
};

export default CompletedTasksWidget;
