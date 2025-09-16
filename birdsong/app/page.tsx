"use client";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-600 via-fuchsia-500 to-pink-700">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-yellow-300"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-600 via-fuchsia-500 to-pink-700 dark:from-fuchsia-900 dark:to-pink-900 flex items-center justify-center">
      {/* Hero Section - Full Page */}
      <section className="relative overflow-hidden w-full">
        <div className="relative container mx-auto px-6 py-20 lg:py-32 text-center">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6">
            Set out and Explore
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
              Love Island
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-pink-100 mb-8 leading-relaxed">
            Bold colors for bold connections. Meet new people, share stories, and
            spark genuine relationships.
          </p>

          {user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/matches"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-300 to-pink-400 text-gray-900 font-bold rounded-full shadow-xl hover:scale-105 transition-transform"
              >
                Start Discovering
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center px-8 py-4 border-2 border-yellow-300 text-yellow-300 text-lg font-semibold rounded-full hover:bg-yellow-300 hover:text-pink-700 transition-all duration-300"
              >
                View Profile
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white font-bold rounded-full shadow-xl hover:scale-105 transition-transform"
              >
                Get Started
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/matches"
                className="inline-flex items-center px-8 py-4 border-2 border-fuchsia-400 text-fuchsia-200 text-lg font-semibold rounded-full hover:bg-fuchsia-500 hover:text-white transition-all duration-300"
              >
                Explore
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
