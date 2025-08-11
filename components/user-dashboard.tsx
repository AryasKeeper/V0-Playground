"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Search, Trash2, Calendar, MapPin, DollarSign } from "lucide-react"
import PropertyCard from "./property-card"
import AgentStatusBar from "./agent-status-bar"

interface UserDashboardProps {
  user: any
  onBack: () => void
  onLogout: () => void
}

export default function UserDashboard({ user, onBack, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<"properties" | "searches">("properties")

  // Mock saved properties
  const savedProperties = [
    {
      id: "1",
      address: "45 Ocean Street",
      suburb: "Bondi Beach, NSW 2026",
      price: "$2,850,000",
      priceChange: {
        amount: "+$150k",
        direction: "up" as const,
        period: "3 months",
      },
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      propertyType: "Apartment",
      listingDate: "5 days ago",
      imageUrl: "/modern-bondi-apartment.png",
      savedDate: "2 days ago",
      insights: ["Property value increased 5.6% above suburb average", "High rental yield potential in this location"],
    },
    {
      id: "2",
      address: "12 Harbour View Terrace",
      suburb: "Mosman, NSW 2088",
      price: "$4,200,000",
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      propertyType: "House",
      landSize: "650m²",
      listingDate: "2 weeks ago",
      imageUrl: "/luxury-mosman-house.png",
      savedDate: "1 week ago",
      insights: ["Harbour views command 25% premium in this area", "School catchment area highly sought after"],
    },
  ]

  // Mock saved searches
  const savedSearches = [
    {
      id: "1",
      name: "Bondi Beach Apartments",
      criteria: {
        location: "Bondi Beach",
        propertyType: "Apartment",
        priceMax: "$3,000,000",
        bedrooms: "2+",
      },
      alertsEnabled: true,
      createdDate: "1 week ago",
      lastResults: 12,
    },
    {
      id: "2",
      name: "Eastern Suburbs Houses",
      criteria: {
        location: "Eastern Suburbs",
        propertyType: "House",
        priceMin: "$2,000,000",
        bedrooms: "3+",
      },
      alertsEnabled: false,
      createdDate: "3 days ago",
      lastResults: 8,
    },
    {
      id: "3",
      name: "Investment Properties",
      criteria: {
        location: "Inner West",
        propertyType: "Any",
        priceMax: "$1,500,000",
        bedrooms: "1+",
      },
      alertsEnabled: true,
      createdDate: "2 weeks ago",
      lastResults: 24,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-6">
            <button
              onClick={() => setActiveTab("properties")}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === "properties"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Saved Properties ({savedProperties.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab("searches")}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === "searches"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Saved Searches ({savedSearches.length})
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {activeTab === "properties" ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Properties</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {savedProperties.length} {savedProperties.length === 1 ? "property" : "properties"} saved
              </p>
            </div>

            {savedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property) => (
                  <div key={property.id} className="relative group">
                    <PropertyCard property={property} variant="compact" />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Saved {property.savedDate}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No saved properties yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Start exploring properties and save your favorites to see them here.
                </p>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Browse Properties
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Searches</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {savedSearches.length} {savedSearches.length === 1 ? "search" : "searches"} saved
              </p>
            </div>

            {savedSearches.length > 0 ? (
              <div className="space-y-4">
                {savedSearches.map((search) => (
                  <div
                    key={search.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{search.name}</h3>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              search.alertsEnabled
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {search.alertsEnabled ? "Alerts On" : "Alerts Off"}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>{search.criteria.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <DollarSign className="w-4 h-4" />
                            <span>
                              {search.criteria.priceMin && `${search.criteria.priceMin} - `}
                              {search.criteria.priceMax || "No max"}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Type: {search.criteria.propertyType}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Beds: {search.criteria.bedrooms}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Created {search.createdDate}
                          </div>
                          <div>{search.lastResults} properties found</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                          View Results
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No saved searches yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Create custom searches and save them to get notified of new properties.
                </p>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create Search
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <AgentStatusBar position="bottom" />
    </div>
  )
}
