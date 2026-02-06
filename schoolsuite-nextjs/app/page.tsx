"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  // Show loading state while checking auth
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 flex flex-col items-center justify-center transition-colors">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-gray-200 dark:border-zinc-800 w-full max-w-md shadow-sm transition-colors">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">SchoolSuite</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {loading ? "Loading..." : "Redirecting..."}
          </p>
        </div>
      </div>
    </div>
  );
}
