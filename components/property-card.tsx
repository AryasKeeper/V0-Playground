import { MapPin, Bed, Bath, Car, TrendingUp, Calendar } from "lucide-react"

interface PropertyData {
  id: string
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

interface PropertyCardProps {
  property: PropertyData
  variant?: "default" | "compact"
}

export default function PropertyCard({ property, variant = "default" }: PropertyCardProps) {
  const isCompact = variant === "compact"

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow ${isCompact ? "max-w-sm" : "max-w-md"}`}
    >
      {/* Property Image */}
      <div className={`relative ${isCompact ? "h-32" : "h-48"}`}>
        <img
          src={property.imageUrl || "/placeholder.svg"}
          alt={property.address}
          className="w-full h-full object-cover"
        />
        {property.priceChange && (
          <div
            className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
              property.priceChange.direction === "up"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            <TrendingUp
              className={`w-3 h-3 inline mr-1 ${property.priceChange.direction === "down" ? "rotate-180" : ""}`}
            />
            {property.priceChange.amount}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className={`p-${isCompact ? "3" : "4"} space-y-3`}>
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className={`font-bold text-gray-900 dark:text-white ${isCompact ? "text-lg" : "text-xl"}`}>
            {property.price}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{property.propertyType}</span>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className={`${isCompact ? "text-sm" : "text-base"}`}>
            <div className="font-medium text-gray-900 dark:text-white">{property.address}</div>
            <div className="text-gray-500 dark:text-gray-400">{property.suburb}</div>
          </div>
        </div>

        {/* Property Features */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Car className="w-4 h-4" />
            <span>{property.parking}</span>
          </div>
          {property.landSize && <div className="text-xs">{property.landSize}</div>}
        </div>

        {/* Listing Date */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="w-3 h-3" />
          <span>Listed {property.listingDate}</span>
        </div>

        {/* AI Insights */}
        {property.insights && property.insights.length > 0 && !isCompact && (
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">AI Insights</div>
            <div className="space-y-1">
              {property.insights.slice(0, 2).map((insight, index) => (
                <div key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
