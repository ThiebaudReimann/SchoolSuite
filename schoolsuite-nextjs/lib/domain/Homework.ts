import { Priority } from "./Priority";

export default class Homework {
    id: string;
    subject: string;
    description: string;
    dueDate: Date;
    priority: Priority;
    isCompleted: boolean;

    constructor(id: string, subject: string, description: string, dueDate: Date, priority: Priority, isCompleted: boolean) {
        this.id = id;
        this.subject = subject;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = isCompleted;
    }
}