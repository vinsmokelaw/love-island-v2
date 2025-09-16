"use client";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function Navbar() {
  const { signOut, user } = useAuth();
  return (
    <nav className="relative z-50 bg-gradient-to-r from-pink-500 to-red-500 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200/50 dark:border-gray-700/50 shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              Love Island
            </span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/matches"
                className="text-white hover:text-pink-200 font-medium transition-colors duration-200"
              >
                Discover
              </Link>
              <Link
                href="/matches/list"
                className="text-white hover:text-pink-200 font-medium transition-colors duration-200"
              >
                Matches
              </Link>
              <Link
                href="/chat"
                className="text-white hover:text-pink-200 font-medium transition-colors duration-200"
              >
                Messages
              </Link>
              <Link
                href="/profile"
                className="text-white hover:text-pink-200 font-medium transition-colors duration-200"
              >
                Profile
              </Link>
            </div>
          )}

          {user ? (
            <button
              onClick={signOut}
              className="inline-flex items-center px-4 py-2 bg-white text-pink-500 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth"
              className="inline-flex items-center px-4 py-2 bg-white text-pink-500 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
