import React from 'react';
import { Library } from 'lucide-react';
import StatsWidget from '@/components/widgets/StatsWidget';

const ActiveCoursesWidget = () => {
    return (
        <StatsWidget
            title="Active Courses"
            value="5"
            icon={Library}
            colorClass="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400"
        />
    );
};

export default ActiveCoursesWidget;
