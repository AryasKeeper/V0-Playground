"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Home, DollarSign, Bed, Bath, Car, Calendar } from "lucide-react"
import PropertyCard from "./property-card"

interface SearchFilters {
  location: string
  priceMin: string
  priceMax: string
  propertyType: string
  bedrooms: string
  bathrooms: string
  parking: string
  keywords: string
}

interface PropertySearchProps {
  onPropertySelect?: (property: any) => void
}

export default function PropertySearch({ onPropertySelect }: PropertySearchProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    priceMin: "",
    priceMax: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    keywords: "",
  })

  // Mock search results
  const searchResults = [
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
      insights: [
        "Property value increased 5.6% above suburb average",
        "High rental yield potential in this location",
        "Beach proximity adds 15% premium to market value",
      ],
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
      insights: [
        "Harbour views command 25% premium in this area",
        "School catchment area highly sought after",
        "Recent comparable sales suggest strong growth potential",
      ],
    },
    {
      id: "3",
      address: "88 Crown Street",
      suburb: "Surry Hills, NSW 2010",
      price: "$1,650,000",
      priceChange: {
        amount: "+$75k",
        direction: "up" as const,
        period: "6 months",
      },
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      propertyType: "Apartment",
      listingDate: "1 week ago",
      imageUrl: "/modern-inner-city-apartment.png",
      insights: [
        "Inner city location with excellent transport links",
        "Growing arts and dining precinct",
        "Strong rental demand from young professionals",
      ],
    },
  ]

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Search Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find Your Perfect Property</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Search through thousands of properties with AI-powered insights
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by suburb, address, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 rounded-xl border transition-colors flex items-center gap-2 ${
              showFilters
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="">Any Location</option>
                <option value="bondi">Bondi Beach</option>
                <option value="mosman">Mosman</option>
                <option value="surry-hills">Surry Hills</option>
                <option value="paddington">Paddington</option>
                <option value="manly">Manly</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Home className="w-4 h-4" />
                Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="">Any Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="townhouse">Townhouse</option>
                <option value="villa">Villa</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price Range
              </label>
              <div className="flex gap-2">
                <select
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange("priceMin", e.target.value)}
                  className="flex-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm"
                >
                  <option value="">Min</option>
                  <option value="500000">$500k</option>
                  <option value="1000000">$1M</option>
                  <option value="2000000">$2M</option>
                  <option value="3000000">$3M</option>
                </select>
                <select
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange("priceMax", e.target.value)}
                  className="flex-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm"
                >
                  <option value="">Max</option>
                  <option value="1000000">$1M</option>
                  <option value="2000000">$2M</option>
                  <option value="3000000">$3M</option>
                  <option value="5000000">$5M+</option>
                </select>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Bed className="w-4 h-4" />
                Bedrooms
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          {/* Additional Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Bath className="w-4 h-4" />
                Bathrooms
              </label>
              <select
                value={filters.bathrooms}
                onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Car className="w-4 h-4" />
                Parking
              </label>
              <select
                value={filters.parking}
                onChange={(e) => handleFilterChange("parking", e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Listed
              </label>
              <select className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white">
                <option value="">Any time</option>
                <option value="1">Last 24 hours</option>
                <option value="7">Last week</option>
                <option value="30">Last month</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600 dark:text-gray-400">
          Found <span className="font-semibold text-gray-900 dark:text-white">{searchResults.length}</span> properties
        </div>
        <select className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white">
          <option>Sort by: Relevance</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((property) => (
          <div key={property.id} onClick={() => onPropertySelect?.(property)} className="cursor-pointer">
            <PropertyCard property={property} variant="compact" />
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Load More Properties
        </button>
      </div>
    </div>
  )
}
