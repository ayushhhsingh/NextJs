"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  email: string;
  isAcceptingMessage: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();

        if (!response.ok) {
          router.push("/signin");
          return;
        }

        setUser(data.user);
      } catch {
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSignout = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Signout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <nav className="bg-white dark:bg-zinc-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
              Dashboard
            </h1>
            <button
              onClick={handleSignout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
            Welcome, {user?.username}!
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-600 dark:text-zinc-400">Username</span>
              <span className="font-medium text-zinc-900 dark:text-white">{user?.username}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-600 dark:text-zinc-400">Email</span>
              <span className="font-medium text-zinc-900 dark:text-white">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-600 dark:text-zinc-400">User ID</span>
              <span className="font-mono text-sm text-zinc-900 dark:text-white">{user?.id}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-zinc-600 dark:text-zinc-400">Accepting Messages</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user?.isAcceptingMessage 
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }`}>
                {user?.isAcceptingMessage ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
