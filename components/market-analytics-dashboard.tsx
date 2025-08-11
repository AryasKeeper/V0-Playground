"use client"

import { useState } from "react"
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, BarChart3, Activity } from "lucide-react"
import AgentStatusBar from "./agent-status-bar"

interface MarketAnalyticsDashboardProps {
  onBack: () => void
}

export default function MarketAnalyticsDashboard({ onBack }: MarketAnalyticsDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6m")
  const [selectedSuburb, setSelectedSuburb] = useState("all")

  // Mock data for charts and metrics
  const marketMetrics = {
    medianPrice: "$1,850,000",
    priceChange: "+12.5%",
    priceChangeDirection: "up" as const,
    totalSales: "2,847",
    salesChange: "+8.2%",
    salesChangeDirection: "up" as const,
    daysOnMarket: "28",
    domChange: "-5 days",
    domChangeDirection: "down" as const,
    rentalYield: "3.2%",
    yieldChange: "+0.3%",
    yieldChangeDirection: "up" as const,
  }

  const suburbData = [
    { name: "Bondi Beach", medianPrice: "$2,850,000", change: "+15.2%", direction: "up" as const, sales: 45 },
    { name: "Mosman", medianPrice: "$4,200,000", change: "+8.7%", direction: "up" as const, sales: 32 },
    { name: "Surry Hills", medianPrice: "$1,650,000", change: "+18.3%", direction: "up" as const, sales: 67 },
    { name: "Paddington", medianPrice: "$2,100,000", change: "+11.4%", direction: "up" as const, sales: 28 },
    { name: "Manly", medianPrice: "$2,450,000", change: "-2.1%", direction: "down" as const, sales: 41 },
  ]

  const priceHistoryData = [
    { month: "Jan", price: 1650000 },
    { month: "Feb", price: 1680000 },
    { month: "Mar", price: 1720000 },
    { month: "Apr", price: 1750000 },
    { month: "May", price: 1780000 },
    { month: "Jun", price: 1850000 },
  ]

  const propertyTypeData = [
    { type: "Apartments", percentage: 45, count: 1281 },
    { type: "Houses", percentage: 35, count: 996 },
    { type: "Townhouses", percentage: 15, count: 427 },
    { type: "Villas", percentage: 5, count: 143 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Market Analytics</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Real-time market insights and trends</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Suburb Filter */}
              <select
                value={selectedSuburb}
                onChange={(e) => setSelectedSuburb(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="all">All Suburbs</option>
                <option value="bondi">Bondi Beach</option>
                <option value="mosman">Mosman</option>
                <option value="surry-hills">Surry Hills</option>
                <option value="paddington">Paddington</option>
                <option value="manly">Manly</option>
              </select>

              {/* Timeframe Filter */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {["1m", "3m", "6m", "1y", "2y"].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      selectedTimeframe === timeframe
                        ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  marketMetrics.priceChangeDirection === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {marketMetrics.priceChangeDirection === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {marketMetrics.priceChange}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{marketMetrics.medianPrice}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Median Price</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  marketMetrics.salesChangeDirection === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {marketMetrics.salesChangeDirection === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {marketMetrics.salesChange}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{marketMetrics.totalSales}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Sales</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  marketMetrics.domChangeDirection === "down" ? "text-green-600" : "text-red-600"
                }`}
              >
                {marketMetrics.domChangeDirection === "down" ? (
                  <TrendingDown className="w-4 h-4" />
                ) : (
                  <TrendingUp className="w-4 h-4" />
                )}
                {marketMetrics.domChange}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{marketMetrics.daysOnMarket}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Days on Market</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  marketMetrics.yieldChangeDirection === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {marketMetrics.yieldChangeDirection === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {marketMetrics.yieldChange}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{marketMetrics.rentalYield}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Rental Yield</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Price History Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Price Trends</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">Last 6 months</div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {priceHistoryData.map((data, index) => {
                const height = ((data.price - 1600000) / 300000) * 100
                return (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      ${(data.price / 1000000).toFixed(1)}M
                    </div>
                    <div
                      className="w-full bg-blue-500 rounded-t-sm transition-all duration-500"
                      style={{ height: `${height}%`, minHeight: "20px" }}
                    />
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{data.month}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Property Type Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Property Types</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">Distribution</div>
            </div>
            <div className="space-y-4">
              {propertyTypeData.map((item, index) => {
                const colors = ["bg-blue-500", "bg-green-500", "bg-orange-500", "bg-purple-500"]
                return (
                  <div key={item.type} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-white">{item.type}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {item.percentage}% ({item.count})
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[index]} transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Suburb Performance Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Suburb Performance</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Top performing suburbs in the last 6 months</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Suburb
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Median Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Sales
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {suburbData.map((suburb) => (
                  <tr key={suburb.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{suburb.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900 dark:text-white">{suburb.medianPrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`flex items-center gap-1 ${
                          suburb.direction === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {suburb.direction === "up" ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {suburb.change}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900 dark:text-white">{suburb.sales}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Market Insights</h3>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Strong Growth Momentum:</strong> Sydney's eastern suburbs are experiencing above-average
                    price growth, with Surry Hills leading at +18.3% over 6 months.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Inventory Shortage:</strong> Days on market decreased by 5 days, indicating strong buyer
                    demand and limited supply.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Investment Opportunity:</strong> Rental yields are improving (+0.3%), making it an
                    attractive time for investors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AgentStatusBar position="bottom" />
    </div>
  )
}
