import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsWidgetProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    colorClass: string;
}

const StatsWidget: React.FC<StatsWidgetProps> = ({ title, value, icon: Icon, colorClass }) => {
    return (
        <div className={`h-full w-full p-4 rounded-lg border flex flex-col justify-between ${colorClass}`}>
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium opacity-80">{title}</div>
                <Icon size={20} />
            </div>
            <div className="text-2xl font-bold mt-2">{value}</div>
        </div>
    );
};

export default StatsWidget;
