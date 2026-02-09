"use client";

import React from 'react';
import { Plus, List } from 'lucide-react';
import { Button } from '@react-spectrum/s2';
import { useRouter } from 'next/navigation';

const HomeworkQuickActionsWidget = () => {
    const router = useRouter();

    return (
        <div className="h-full w-full p-4 rounded-lg border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 flex flex-col justify-between">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Homework Actions</div>
            <div className="flex flex-col gap-2 flex-1 justify-center">
                <Button
                    variant="primary"
                    onPress={() => router.push('/homework')}
                    UNSAFE_className="w-full flex items-center justify-center gap-2"
                >
                    <Plus size={18} />
                    <span>Add Homework</span>
                </Button>
                <Button
                    variant="secondary"
                    onPress={() => router.push('/homework')}
                    UNSAFE_className="w-full flex items-center justify-center gap-2"
                >
                    <List size={18} />
                    <span>View All</span>
                </Button>
            </div>
        </div>
    );
};

export default HomeworkQuickActionsWidget;
