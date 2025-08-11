"use client"

import { useState } from "react"
import { ArrowLeft, Filter, Layers, Search, Home, DollarSign } from "lucide-react"
import PropertyCard from "./property-card"
import AgentStatusBar from "./agent-status-bar"

interface PropertyMapProps {
  onBack: () => void
}

interface MapProperty {
  id: string
  lat: number
  lng: number
  address: string
  suburb: string
  price: string
  priceChange?: {
    amount: string
    direction: "up" | "down"
    period: string
  }
  bedrooms: number
  bathrooms: number
  parking: number
  propertyType: string
  landSize?: string
  listingDate: string
  imageUrl: string
  insights?: string[]
}

export default function PropertyMap({ onBack }: PropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<MapProperty | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [mapStyle, setMapStyle] = useState("standard")
  const [priceFilter, setPriceFilter] = useState("all")
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all")

  // Mock property data with coordinates (Sydney area)
  const mapProperties: MapProperty[] = [
    {
      id: "1",
      lat: -33.8915,
      lng: 151.2767,
      address: "45 Ocean Street",
      suburb: "Bondi Beach, NSW 2026",
      price: "$2,850,000",
      priceChange: {
        amount: "+$150k",
        direction: "up",
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
      lat: -33.8298,
      lng: 151.2417,
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
      lat: -33.883,
      lng: 151.2093,
      address: "88 Crown Street",
      suburb: "Surry Hills, NSW 2010",
      price: "$1,650,000",
      priceChange: {
        amount: "+$75k",
        direction: "up",
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
    {
      id: "4",
      lat: -33.8688,
      lng: 151.2093,
      address: "156 Oxford Street",
      suburb: "Paddington, NSW 2021",
      price: "$2,100,000",
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      propertyType: "Townhouse",
      landSize: "120m²",
      listingDate: "3 days ago",
      imageUrl: "/heritage-paddington-terrace.png",
      insights: [
        "Heritage character with modern renovations",
        "Prime shopping and dining location",
        "Strong capital growth history",
      ],
    },
    {
      id: "5",
      lat: -33.7969,
      lng: 151.284,
      address: "23 The Corso",
      suburb: "Manly, NSW 2095",
      price: "$2,450,000",
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      propertyType: "Apartment",
      listingDate: "1 week ago",
      imageUrl: "/beachside-manly-apartment.png",
      insights: [
        "Beachfront lifestyle with city connectivity",
        "Tourist area with strong rental potential",
        "Limited supply drives premium pricing",
      ],
    },
  ]

  const getMarkerColor = (property: MapProperty) => {
    const price = Number.parseInt(property.price.replace(/[$,]/g, ""))
    if (price > 3000000) return "bg-red-500"
    if (price > 2000000) return "bg-orange-500"
    if (price > 1500000) return "bg-yellow-500"
    return "bg-green-500"
  }

  const filteredProperties = mapProperties.filter((property) => {
    if (priceFilter !== "all") {
      const price = Number.parseInt(property.price.replace(/[$,]/g, ""))
      switch (priceFilter) {
        case "under-1m":
          if (price >= 1000000) return false
          break
        case "1m-2m":
          if (price < 1000000 || price >= 2000000) return false
          break
        case "2m-3m":
          if (price < 2000000 || price >= 3000000) return false
          break
        case "over-3m":
          if (price < 3000000) return false
          break
      }
    }
    if (propertyTypeFilter !== "all" && property.propertyType.toLowerCase() !== propertyTypeFilter) {
      return false
    }
    return true
  })

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-20 relative">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Property Map</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{filteredProperties.length} properties found</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Map Style Toggle */}
            <select
              value={mapStyle}
              onChange={(e) => setMapStyle(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-white"
            >
              <option value="standard">Standard</option>
              <option value="satellite">Satellite</option>
              <option value="terrain">Terrain</option>
            </select>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                showFilters
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-white"
                >
                  <option value="all">All Prices</option>
                  <option value="under-1m">Under $1M</option>
                  <option value="1m-2m">$1M - $2M</option>
                  <option value="2m-3m">$2M - $3M</option>
                  <option value="over-3m">Over $3M</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-gray-500" />
                <select
                  value={propertyTypeFilter}
                  onChange={(e) => setPropertyTypeFilter(e.target.value)}
                  className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartments</option>
                  <option value="house">Houses</option>
                  <option value="townhouse">Townhouses</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900">
          {/* Map Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Sydney Harbour Representation */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-blue-300 dark:bg-blue-700 rounded-full opacity-60" />
          <div className="absolute top-1/3 left-1/3 w-48 h-24 bg-blue-300 dark:bg-blue-700 rounded-full opacity-40" />

          {/* Property Markers */}
          {filteredProperties.map((property) => {
            const x = ((property.lng - 151.1) / 0.3) * 100
            const y = ((property.lat + 33.7) / 0.2) * 100

            return (
              <div
                key={property.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${Math.max(10, Math.min(90, x))}%`,
                  top: `${Math.max(10, Math.min(90, y))}%`,
                }}
                onClick={() => setSelectedProperty(property)}
              >
                {/* Marker */}
                <div
                  className={`w-6 h-6 ${getMarkerColor(
                    property,
                  )} rounded-full border-2 border-white shadow-lg group-hover:scale-125 transition-transform relative z-10`}
                >
                  <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20"></div>
                </div>

                {/* Hover Tooltip */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{property.address}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{property.suburb}</div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">{property.price}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    {property.bedrooms} bed • {property.bathrooms} bath • {property.propertyType}
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Layers className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Price Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Under $1.5M</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">$1.5M - $2M</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">$2M - $3M</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Over $3M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details Sidebar */}
      {selectedProperty && (
        <div className="absolute top-0 right-0 w-96 h-full bg-white dark:bg-gray-800 shadow-xl z-30 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Property Details</h3>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            <PropertyCard property={selectedProperty} />
            <div className="mt-6 space-y-4">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Contact Agent
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Save Property
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Schedule Inspection
              </button>
            </div>
          </div>
        </div>
      )}

      <AgentStatusBar position="bottom" />
    </div>
  )
}
