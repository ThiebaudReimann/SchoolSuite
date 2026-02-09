import { widgetRegistry } from "./registry";
import ActiveCoursesWidget from "@/app/(app)/dashboard/widgets/ActiveCoursesWidget";
import CompletedTasksWidget from "@/app/(app)/dashboard/widgets/CompletedTasksWidget";
import PendingHomeworkWidget from "@/app/(app)/homework/widgets/PendingHomeworkWidget";

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
}
