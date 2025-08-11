"use client"

import { useState } from "react"
import { ChevronRight, Search, BarChart3, Map, User } from "lucide-react"
import AgentStatusBar from "@/components/agent-status-bar"
import EnhancedChatInterface from "@/components/enhanced-chat-interface"
import SearchPage from "@/components/search-page"
import MarketAnalyticsDashboard from "@/components/market-analytics-dashboard"
import PropertyMap from "@/components/property-map"
import AuthModal from "@/components/auth-modal"
import UserDashboard from "@/components/user-dashboard"
import dynamic from "next/dynamic"

const GridBackground = dynamic(() => import("@/components/effects/grid-background"), {
  ssr: false,
})

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"hero" | "chat" | "search" | "analytics" | "map" | "dashboard">("hero")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState<any>(null)

  const handleAuthSuccess = (userData: any) => {
    setUser(userData)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView("hero")
  }

  return (
    <div className="min-h-screen">
      {currentView === "hero" ? (
        // Hero Section - Apple-inspired minimalism
        <div className="relative flex flex-col min-h-screen">
          {/* Decorative background */}
          <GridBackground />

          {/* Added user authentication button in top right */}
          <div className="absolute top-6 right-6 z-10">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Subtle badge */}
              <div className="inline-block">
                <span className="text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-white/60">
                  Sydney Real Estate Intelligence
                </span>
              </div>

              {/* Strong headline */}
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight [text-wrap:balance]">
                Intelligence that sees
                <span className="block text-gray-400 dark:text-white/40">tomorrow's market today</span>
              </h1>

              {/* Clear value prop */}
              <p className="text-xl text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
                ReAgent analyzes millions of data points to give professionals an unfair advantage in real estate.
              </p>

              <div className="pt-8 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setCurrentView("chat")}
                    className="group inline-flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    Start Conversation
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => setCurrentView("search")}
                    className="group inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    Search Properties
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setCurrentView("analytics")}
                    className="group inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Market Analytics
                  </button>
                  <button
                    onClick={() => setCurrentView("map")}
                    className="group inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Map className="w-4 h-4" />
                    Property Map
                  </button>
                </div>
              </div>

              {/* Trust metrics */}
              <div className="flex justify-center gap-12 pt-16 text-sm text-gray-500 dark:text-white/60">
                <div>
                  <div className="text-2xl font-semibold">2.3s</div>
                  <div>Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">94%</div>
                  <div>Match Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">24/7</div>
                  <div>Monitoring</div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Status Bar - Minimal */}
          <AgentStatusBar position="bottom" />
        </div>
      ) : currentView === "chat" ? (
        // Chat Interface
        <div className="h-screen flex flex-col">
          <AgentStatusBar position="top" />
          <EnhancedChatInterface onBack={() => setCurrentView("hero")} />
        </div>
      ) : currentView === "search" ? (
        // Search Interface
        <SearchPage onBack={() => setCurrentView("hero")} />
      ) : currentView === "analytics" ? (
        // Analytics Dashboard
        <MarketAnalyticsDashboard onBack={() => setCurrentView("hero")} />
      ) : currentView === "map" ? (
        // Property Map
        <PropertyMap onBack={() => setCurrentView("hero")} />
      ) : (
        // Added user dashboard view
        // User Dashboard
        <UserDashboard user={user} onBack={() => setCurrentView("hero")} onLogout={handleLogout} />
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onAuthSuccess={handleAuthSuccess} />
    </div>
  )
}
