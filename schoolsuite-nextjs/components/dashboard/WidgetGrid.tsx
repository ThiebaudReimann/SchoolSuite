"use client";

import React, { useState } from 'react';
import { Responsive, Layout, useContainerWidth } from 'react-grid-layout';
import { WidgetConfig } from '@/lib/widgets/types';
import { widgetRegistry } from '@/lib/widgets/registry';
import { initWidgets } from '@/lib/widgets/registry-init';

// Import CSS for react-grid-layout
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Ensure widgets are registered
initWidgets();

interface WidgetGridProps {
    initialLayout: WidgetConfig[];
    onLayoutChange?: (layout: WidgetConfig[]) => void;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ initialLayout, onLayoutChange }) => {
    const [currentConfigs, setCurrentConfigs] = useState<WidgetConfig[]>(initialLayout);
    const { width, containerRef, mounted } = useContainerWidth();

    const layouts = {
        lg: currentConfigs.map(w => ({
            i: w.id,
            x: w.x,
            y: w.y,
            w: w.w,
            h: w.h,
            minW: w.minW || 1,
            minH: w.minH || 1
        }))
    };

    const handleLayoutChange = (currentLayout: Layout) => {
        const newConfigs = currentLayout.map(l => {
            const original = currentConfigs.find(w => w.id === l.i);
            return {
                ...original!,
                x: l.x,
                y: l.y,
                w: l.w,
                h: l.h,
            };
        });

        // Only update if something actually changed to avoid infinite loops
        const hasChanged = JSON.stringify(newConfigs) !== JSON.stringify(currentConfigs);
        if (hasChanged) {
            setCurrentConfigs(newConfigs);
            if (onLayoutChange) {
                onLayoutChange(newConfigs);
            }
        }
    };

    return (
        <div className="w-full" ref={containerRef}>
            {mounted && (
                <Responsive
                    className="layout"
                    layouts={layouts}
                    width={width}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
                    rowHeight={120}
                    dragConfig={{ handle: ".drag-handle" }}
                    onLayoutChange={handleLayoutChange}
                    margin={[16, 16]}
                >
                    {currentConfigs.map(widgetConfig => {
                        const definition = widgetRegistry.get(widgetConfig.type);
                        if (!definition) return <div key={widgetConfig.id}>Unknown widget type: {widgetConfig.type}</div>;

                        const WidgetComponent = definition.component;
                        return (
                            <div key={widgetConfig.id} className="relative bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden group">
                                <div className="drag-handle absolute top-2 right-2 p-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/80 dark:bg-zinc-800/80 rounded-md">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                        <polyline points="5 9 2 12 5 15"></polyline>
                                        <polyline points="9 5 12 2 15 5"></polyline>
                                        <polyline points="15 19 12 22 9 19"></polyline>
                                        <polyline points="19 9 22 12 19 15"></polyline>
                                        <line x1="2" y1="12" x2="22" y2="12"></line>
                                        <line x1="12" y1="2" x2="12" y2="22"></line>
                                    </svg>
                                </div>
                                <div className="h-full w-full">
                                    <WidgetComponent {...widgetConfig.props} />
                                </div>
                            </div>
                        );
                    })}
                </Responsive>
            )}
        </div>
    );
};

export default WidgetGrid;
