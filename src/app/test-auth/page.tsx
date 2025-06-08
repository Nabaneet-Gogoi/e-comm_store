"use client"

import { useState } from "react"

export default function TestAuth() {
  const [testResults, setTestResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testRegistration = async () => {
    setIsLoading(true)
    addResult("Testing user registration...")
    
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Test User",
          email: `test${Date.now()}@example.com`,
          password: "testpassword123"
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        addResult("✅ Registration successful: " + JSON.stringify(data.user))
      } else {
        addResult("❌ Registration failed: " + data.error)
      }
    } catch (error) {
      addResult("❌ Registration error: " + (error as Error).message)
    }
    
    setIsLoading(false)
  }

  const testDuplicateRegistration = async () => {
    setIsLoading(true)
    addResult("Testing duplicate email registration...")
    
    try {
      const email = "duplicate@example.com"
      
      // First registration
      await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "First User",
          email,
          password: "password123"
        })
      })
      
      // Second registration with same email
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Second User",
          email,
          password: "password456"
        })
      })

      const data = await response.json()
      
      if (response.status === 409) {
        addResult("✅ Duplicate email correctly rejected: " + data.error)
      } else {
        addResult("❌ Duplicate email should have been rejected")
      }
    } catch (error) {
      addResult("❌ Duplicate test error: " + (error as Error).message)
    }
    
    setIsLoading(false)
  }

  const testInvalidData = async () => {
    setIsLoading(true)
    addResult("Testing invalid registration data...")
    
    const testCases = [
      { name: "", email: "test@example.com", password: "password123", expected: "Missing name" },
      { name: "Test", email: "invalid-email", password: "password123", expected: "Invalid email" },
      { name: "Test", email: "test@example.com", password: "123", expected: "Password too short" }
    ]
    
    for (const testCase of testCases) {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(testCase)
        })

        const data = await response.json()
        
        if (response.status === 400) {
          addResult(`✅ Invalid data correctly rejected (${testCase.expected}): ${data.error}`)
        } else {
          addResult(`❌ Invalid data should have been rejected (${testCase.expected})`)
        }
      } catch (error) {
        addResult(`❌ Invalid data test error (${testCase.expected}): ${(error as Error).message}`)
      }
    }
    
    setIsLoading(false)
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Authentication System Test
            </h1>
            
            <div className="space-y-4 mb-8">
              <button
                onClick={testRegistration}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                Test User Registration
              </button>
              
              <button
                onClick={testDuplicateRegistration}
                disabled={isLoading}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                Test Duplicate Email
              </button>
              
              <button
                onClick={testInvalidData}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                Test Invalid Data
              </button>
              
              <button
                onClick={clearResults}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Clear Results
              </button>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Test Results:</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {testResults.length === 0 ? (
                  <p className="text-gray-500">No tests run yet. Click a test button above.</p>
                ) : (
                  testResults.map((result, index) => (
                    <div key={index} className="text-sm font-mono bg-white p-2 rounded border">
                      {result}
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Manual Testing Instructions:
              </h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>1. Run the automated tests above</li>
                <li>2. Try signing up at <a href="/auth/signup" className="underline">/auth/signup</a></li>
                <li>3. Try signing in at <a href="/auth/signin" className="underline">/auth/signin</a></li>
                <li>4. Visit the protected <a href="/dashboard" className="underline">/dashboard</a> page</li>
                <li>5. Test the sign out functionality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 