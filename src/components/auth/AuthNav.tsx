"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function AuthNav() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
      </div>
    )
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">
          Welcome, {user.name || user.email}
        </span>
        <button
          onClick={signOut}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/auth/signin"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Sign In
      </Link>
      <Link
        href="/auth/signup"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Sign Up
      </Link>
    </div>
  )
} 