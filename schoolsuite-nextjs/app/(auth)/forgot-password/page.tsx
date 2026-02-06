"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { toast } from "sonner";
import { getFirebaseErrorMessage } from "@/lib/firebase-errors";
import {
    Form,
    TextField,
    Button,
    Heading,
    Text
} from "@react-spectrum/s2";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const { resetPassword } = useAuth();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await resetPassword(email);
            toast.success("Check your email for password reset instructions");
        } catch (err: any) {
            toast.error(getFirebaseErrorMessage(err.code));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 relative flex flex-col items-center justify-center transition-colors">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-gray-200 dark:border-zinc-800 w-full max-w-md shadow-sm transition-colors">
                <div className="flex flex-col gap-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold bg-[var(--font-funnel-display)] text-gray-900 dark:text-gray-100 mb-1">Reset your password</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Enter your email to receive a reset link
                        </p>
                    </div>

                    <Form onSubmit={handleReset}>
                        <div className="flex flex-col gap-4">
                            <TextField
                                label="Email address"
                                type="email"
                                value={email}
                                onChange={setEmail}
                                isRequired
                                autoComplete="email"
                                UNSAFE_style={{ width: '100%' }}
                            />

                            <Button type="submit" variant="primary" UNSAFE_style={{ width: '100%', marginTop: '8px' }}>
                                Send Reset Link
                            </Button>
                        </div>
                    </Form>

                    <div className="flex justify-center mt-2">
                        <Link href="/login" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
