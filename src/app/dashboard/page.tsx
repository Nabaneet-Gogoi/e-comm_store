"use client"

import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Welcome to your Dashboard
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                  Account Information
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Name:</span> {user?.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">User ID:</span> {(user as any)?.id}
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-green-900 mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    View Orders
                  </button>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Update Profile
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    View Wishlist
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-900 mb-4">
                Authentication Status
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">
                  Successfully authenticated
                </span>
              </div>
              <p className="text-gray-600 mt-2">
                You are logged in and can access protected content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 