"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
    Form,
    TextField,
    Button,
    Heading,
    Text,
} from "@react-spectrum/s2";
import { toast } from "sonner";
import { Settings as SettingsIcon, Save, School } from "lucide-react";

export default function SettingsPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [schuelerportalEmail, setSchuelerportalEmail] = useState("");
    const [schuelerportalPassword, setSchuelerportalPassword] = useState("");
    const [schuelerportalCode, setSchuelerportalCode] = useState("");

    useEffect(() => {
        async function fetchUserSettings() {
            if (!user) return;

            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    const portalData = data.schuelerportal || {};
                    setSchuelerportalEmail(portalData.email || "");
                    setSchuelerportalPassword(portalData.password || "");
                    setSchuelerportalCode(portalData.code || "");
                }
            } catch (error) {
                console.error("Error fetching user settings:", error);
                toast.error("Failed to load settings");
            } finally {
                setLoading(false);
            }
        }

        fetchUserSettings();
    }, [user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSaving(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, {
                schuelerportal: {
                    email: schuelerportalEmail,
                    password: schuelerportalPassword,
                    code: schuelerportalCode,
                },
                updatedAt: new Date()
            }, { merge: true });

            toast.success("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving user settings:", error);
            toast.error("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Text>Loading settings...</Text>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <SettingsIcon size={28} />
                </div>
                <div>
                    <Heading level={1}>Settings</Heading>
                    <Text slot="description">Manage your application preferences and external accounts.</Text>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/50 flex items-center gap-2">
                    <School size={20} className="text-gray-500" />
                    <Heading level={3}>Schülerportal Integration</Heading>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <p className="block text-gray-600 dark:text-gray-400">
                            Enter your login credentials for the Schülerportal to enable automatic synchronization of your school data.
                        </p>
                    </div>

                    <Form onSubmit={handleSave} validationBehavior="native">
                        <div className="space-y-6 max-w-md">
                            <TextField
                                label="Email"
                                type="email"
                                value={schuelerportalEmail}
                                onChange={setSchuelerportalEmail}
                                isRequired
                                placeholder="name@example.com"
                                autoComplete="off"
                                UNSAFE_style={{ width: '100%' }}
                            />

                            <TextField
                                label="Password"
                                type="password"
                                value={schuelerportalPassword}
                                onChange={setSchuelerportalPassword}
                                isRequired
                                placeholder="••••••••"
                                autoComplete="off"
                                UNSAFE_style={{ width: '100%' }}
                            />

                            <TextField
                                label="Portal Code"
                                value={schuelerportalCode}
                                onChange={setSchuelerportalCode}
                                isRequired
                                placeholder="e.g. SCHOOL-123"
                                autoComplete="off"
                                UNSAFE_style={{ width: '100%' }}
                            />

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    isDisabled={saving}
                                    UNSAFE_className="w-full sm:w-auto flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    <span>{saving ? "Saving..." : "Save Settings"}</span>
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
