import {
    doc,
    setDoc,
    getDoc,
    onSnapshot,
    DocumentData
} from "firebase/firestore";
import { db } from "@/firebase";
import { WidgetConfig } from "@/lib/widgets/types";

const COLLECTION_NAME = "dashboards";

export async function saveDashboardLayout(userId: string, layout: WidgetConfig[]): Promise<void> {
    try {
        const docRef = doc(db, COLLECTION_NAME, userId);
        await setDoc(docRef, {
            layout,
            updatedAt: new Date()
        });
    } catch (error) {
        console.error("Error saving dashboard layout:", error);
        throw new Error("Failed to save dashboard layout");
    }
}

export async function getDashboardLayout(userId: string): Promise<WidgetConfig[] | null> {
    try {
        const docRef = doc(db, COLLECTION_NAME, userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().layout as WidgetConfig[];
        }
        return null;
    } catch (error) {
        console.error("Error fetching dashboard layout:", error);
        throw new Error("Failed to fetch dashboard layout");
    }
}

export function subscribeToDashboardLayout(
    userId: string,
    onUpdate: (layout: WidgetConfig[]) => void,
    onError?: (error: Error) => void
): () => void {
    const docRef = doc(db, COLLECTION_NAME, userId);

    return onSnapshot(
        docRef,
        (docSnap) => {
            if (docSnap.exists()) {
                onUpdate(docSnap.data().layout as WidgetConfig[]);
            } else {
                onUpdate([]);
            }
        },
        (error) => {
            console.error("Error in dashboard layout subscription:", error);
            if (onError) {
                onError(new Error("Failed to subscribe to dashboard layout"));
            }
        }
    );
}
