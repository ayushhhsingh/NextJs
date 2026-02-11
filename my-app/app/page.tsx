import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
              Authentication System
            </h1>
            <div className="flex gap-4">
              <Link
                href="/signin"
                className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-zinc-900 dark:text-white">
            Welcome to <span className="text-blue-600">Authentication System</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            A secure full-stack authentication system built with Next.js, MongoDB, and JWT.
            Production-ready with email verification.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/signin"
              className="px-8 py-3 text-lg font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Secure Auth</h3>
            <p className="text-zinc-600 dark:text-zinc-400">JWT-based authentication with HTTP-only cookies and password hashing.</p>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Email Verification</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Built-in email verification flow with 6-digit codes.</p>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Route Protection</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Middleware-based route protection with automatic redirects.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
