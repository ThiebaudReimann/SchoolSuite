"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
    Form,
    TextField,
    Button,
    Heading,
    Text,
} from "@react-spectrum/s2";
import { toast } from "sonner";
import { User as UserIcon, Mail, ShieldCheck, LogOut, Trash2, Save, BarChart3, BookOpen, CheckCircle } from "lucide-react";
import { getHomeworks } from "@/lib/services/homeworkService";

export default function AccountPage() {
    const { user, logout, resetPassword, updateUserProfile, deleteAccount } = useAuth();
    const [displayName, setDisplayName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || "");
            fetchStats();
        }
    }, [user]);

    const fetchStats = async () => {
        if (!user) return;
        try {
            const homeworks = await getHomeworks(user.uid);
            const total = homeworks.length;
            const completed = homeworks.filter(h => h.isCompleted).length;
            const pending = total - completed;
            setStats({ total, completed, pending });
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSaving(true);
        try {
            await updateUserProfile(displayName);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    const handleResetPassword = async () => {
        if (!user?.email) return;

        setIsResetting(true);
        try {
            await resetPassword(user.email);
            toast.success("Password reset email sent!");
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error("Failed to send reset email");
        } finally {
            setIsResetting(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!user) return;

        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This action is permanent and all your data will be lost."
        );

        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            await deleteAccount();
            toast.success("Account deleted successfully.");
            // Redirection is handled by AuthProvider's onAuthStateChanged
        } catch (error: any) {
            console.error("Error deleting account:", error);
            if (error.code === 'auth/requires-recent-login') {
                toast.error("For security reasons, please sign out and sign in again before deleting your account.");
            } else {
                toast.error("Failed to delete account. Please try again later.");
            }
        } finally {
            setIsDeleting(false);
        }
    };

    if (!user) {
        return null; // Layout handles redirection
    }

    const initials = displayName
        ? displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
        : user.email?.[0].toUpperCase() || 'U';

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <UserIcon size={28} />
                </div>
                <div>
                    <Heading level={1}>Account</Heading>
                    <Text slot="description">Manage your profile and security settings.</Text>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <Text UNSAFE_className="text-gray-500 dark:text-gray-400 text-sm">Total Tasks</Text>
                        <Heading level={2} UNSAFE_className="m-0 leading-tight">{stats.total}</Heading>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <Text UNSAFE_className="text-gray-500 dark:text-gray-400 text-sm">Completed</Text>
                        <Heading level={2} UNSAFE_className="m-0 leading-tight">{stats.completed}</Heading>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <Text UNSAFE_className="text-gray-500 dark:text-gray-400 text-sm">Pending</Text>
                        <Heading level={2} UNSAFE_className="m-0 leading-tight">{stats.pending}</Heading>
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/50 flex items-center gap-2">
                    <UserIcon size={20} className="text-gray-500" />
                    <Heading level={3}>Profile Information</Heading>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                            {initials}
                        </div>
                        <div>
                            <Text UNSAFE_className="font-semibold text-lg">{displayName || "No Name Set"}</Text>
                            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                <Mail size={14} />
                                <Text size="S">{user.email}</Text>
                            </div>
                        </div>
                    </div>

                    <Form onSubmit={handleUpdateProfile} validationBehavior="native">
                        <div className="space-y-4 max-w-md">
                            <TextField
                                label="Display Name"
                                value={displayName}
                                onChange={setDisplayName}
                                placeholder="Enter your name"
                                autoComplete="name"
                                UNSAFE_style={{ width: '100%' }}
                            />

                            <TextField
                                label="Email Address"
                                value={user.email || ""}
                                isReadOnly
                                isDisabled
                                UNSAFE_style={{ width: '100%' }}
                            />

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    isDisabled={isSaving || displayName === user.displayName}
                                    UNSAFE_className="flex items-center gap-2"
                                >
                                    <Save size={18} />
                                    <span>{isSaving ? "Saving..." : "Update Profile"}</span>
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>

            {/* Security Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/50 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-gray-500" />
                    <Heading level={3}>Security</Heading>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <Heading level={4} UNSAFE_className="mb-1">Password</Heading>
                        <Text>Change your password by receiving a reset link via email.</Text>
                        <div className="mt-4">
                            <Button
                                variant="secondary"
                                onPress={handleResetPassword}
                                isDisabled={isResetting}
                                UNSAFE_className="flex items-center gap-2"
                            >
                                <Mail size={18} />
                                <span>{isResetting ? "Sending..." : "Send Reset Link"}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50/50 dark:bg-red-950/10 rounded-xl border border-red-100 dark:border-red-900/30 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 flex items-center gap-2">
                    <Trash2 size={20} className="text-red-600 dark:text-red-400" />
                    <Heading level={3} UNSAFE_className="text-red-600 dark:text-red-400">Danger Zone</Heading>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <Heading level={4} UNSAFE_className="mb-1">Delete Account</Heading>
                            <Text>Permanently remove your account and all associated data.</Text>
                        </div>
                        <Button
                            variant="accent"
                            isDisabled={isDeleting}
                            UNSAFE_className="bg-red-600 hover:bg-red-700 text-white border-none"
                            onPress={handleDeleteAccount}
                        >
                            {isDeleting ? "Deleting..." : "Delete Account"}
                        </Button>
                    </div>

                    <div className="pt-4 border-t border-red-100 dark:border-red-900/30 flex justify-end">
                        <Button
                            variant="secondary"
                            onPress={() => logout()}
                            UNSAFE_className="flex items-center gap-2 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50"
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
