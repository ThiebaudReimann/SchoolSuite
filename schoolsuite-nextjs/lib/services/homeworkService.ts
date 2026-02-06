import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    getDocs,
    Timestamp,
    onSnapshot,
    QuerySnapshot,
    DocumentData
} from "firebase/firestore";
import { db } from "@/firebase";
import Homework from "@/lib/domain/Homework";
import { Priority } from "@/lib/domain/Priority";

const COLLECTION_NAME = "homeworks";

/**
 * Convert Firestore document to Homework domain object
 */
function docToHomework(id: string, data: DocumentData): Homework {
    return new Homework(
        id,
        data.subject,
        data.description,
        data.dueDate.toDate(), // Convert Firestore Timestamp to Date
        data.priority as Priority,
        data.isCompleted
    );
}

/**
 * Convert Homework domain object to Firestore data
 */
function homeworkToDoc(homework: Omit<Homework, 'id'>, userId: string) {
    return {
        userId,
        subject: homework.subject,
        description: homework.description,
        dueDate: Timestamp.fromDate(homework.dueDate),
        priority: homework.priority,
        isCompleted: homework.isCompleted
    };
}

/**
 * Fetch all homeworks for a specific user
 */
export async function getHomeworks(userId: string): Promise<Homework[]> {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("userId", "==", userId),
            orderBy("dueDate", "asc")
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => docToHomework(doc.id, doc.data()));
    } catch (error) {
        console.error("Error fetching homeworks:", error);
        throw new Error("Failed to fetch homeworks");
    }
}

/**
 * Subscribe to real-time homework updates for a user
 */
export function subscribeToHomeworks(
    userId: string,
    onUpdate: (homeworks: Homework[]) => void,
    onError?: (error: Error) => void
): () => void {
    const q = query(
        collection(db, COLLECTION_NAME),
        where("userId", "==", userId),
        orderBy("dueDate", "asc")
    );

    return onSnapshot(
        q,
        (snapshot: QuerySnapshot<DocumentData>) => {
            const homeworks = snapshot.docs.map(doc => docToHomework(doc.id, doc.data()));
            onUpdate(homeworks);
        },
        (error) => {
            console.error("Error in homework subscription:", error);
            if (onError) {
                onError(new Error("Failed to subscribe to homeworks"));
            }
        }
    );
}

/**
 * Add a new homework for a user
 */
export async function addHomework(
    userId: string,
    homework: Omit<Homework, 'id'>
): Promise<string> {
    try {
        const docRef = await addDoc(
            collection(db, COLLECTION_NAME),
            homeworkToDoc(homework, userId)
        );
        return docRef.id;
    } catch (error) {
        console.error("Error adding homework:", error);
        throw new Error("Failed to add homework");
    }
}

/**
 * Update an existing homework
 */
export async function updateHomework(
    homeworkId: string,
    updates: Partial<Omit<Homework, 'id'>>
): Promise<void> {
    try {
        const docRef = doc(db, COLLECTION_NAME, homeworkId);
        const updateData: any = { ...updates };

        // Convert Date to Timestamp if dueDate is being updated
        if (updates.dueDate) {
            updateData.dueDate = Timestamp.fromDate(updates.dueDate);
        }

        await updateDoc(docRef, updateData);
    } catch (error) {
        console.error("Error updating homework:", error);
        throw new Error("Failed to update homework");
    }
}

/**
 * Delete a homework
 */
export async function deleteHomework(homeworkId: string): Promise<void> {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, homeworkId));
    } catch (error) {
        console.error("Error deleting homework:", error);
        throw new Error("Failed to delete homework");
    }
}

/**
 * Toggle the completion status of a homework
 */
export async function toggleHomeworkComplete(homeworkId: string, currentStatus: boolean): Promise<void> {
    try {
        const docRef = doc(db, COLLECTION_NAME, homeworkId);
        await updateDoc(docRef, {
            isCompleted: !currentStatus
        });
    } catch (error) {
        console.error("Error toggling homework completion:", error);
        throw new Error("Failed to toggle homework completion");
    }
}
