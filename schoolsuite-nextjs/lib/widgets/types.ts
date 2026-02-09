import { ReactNode } from "react";

export interface WidgetConfig {
    id: string;
    type: string;
    title: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    minH?: number;
    props?: any;
}

export interface WidgetDefinition {
    type: string;
    title: string;
    description?: string;
    component: React.ComponentType<any>;
    defaultSize: { w: number; h: number };
}
