"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import PropertySearch from "./property-search"
import AgentStatusBar from "./agent-status-bar"

interface SearchPageProps {
  onBack: () => void
}

export default function SearchPage({ onBack }: SearchPageProps) {
  const [selectedProperty, setSelectedProperty] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Property Search</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Find properties with AI-powered insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Interface */}
      <div className="py-8">
        <PropertySearch onPropertySelect={setSelectedProperty} />
      </div>

      {/* Agent Status */}
      <AgentStatusBar position="bottom" />
    </div>
  )
}
