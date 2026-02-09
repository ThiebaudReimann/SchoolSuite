import { widgetRegistry } from "./registry";
import ActiveCoursesWidget from "@/app/(app)/dashboard/widgets/ActiveCoursesWidget";
import CompletedTasksWidget from "@/app/(app)/dashboard/widgets/CompletedTasksWidget";
import PendingHomeworkWidget from "@/app/(app)/homework/widgets/PendingHomeworkWidget";
import HomeworkQuickActionsWidget from "@/app/(app)/homework/widgets/HomeworkQuickActionsWidget";
import HomeworkPreviewWidget from "@/app/(app)/homework/widgets/HomeworkPreviewWidget";

export function initWidgets() {
    widgetRegistry.register({
        type: "active-courses",
        title: "Active Courses",
        component: ActiveCoursesWidget,
        defaultSize: { w: 1, h: 1 }
    });

    widgetRegistry.register({
        type: "completed-tasks",
        title: "Completed Tasks",
        component: CompletedTasksWidget,
        defaultSize: { w: 1, h: 1 }
    });

    widgetRegistry.register({
        type: "pending-homework",
        title: "Pending Homework",
        component: PendingHomeworkWidget,
        defaultSize: { w: 1, h: 1 }
    });

    widgetRegistry.register({
        type: "homework-quick-actions",
        title: "Homework Quick Actions",
        component: HomeworkQuickActionsWidget,
        defaultSize: { w: 1, h: 1 }
    });

    widgetRegistry.register({
        type: "homework-preview",
        title: "Homework Preview",
        component: HomeworkPreviewWidget,
        defaultSize: { w: 1, h: 2 }
    });
}
