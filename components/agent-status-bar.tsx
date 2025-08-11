"use client"

import { useState, useEffect } from "react"
import { Wifi, Activity, Clock } from "lucide-react"

interface AgentStatusBarProps {
  position: "top" | "bottom"
}

export default function AgentStatusBar({ position }: AgentStatusBarProps) {
  const [status, setStatus] = useState<"online" | "processing" | "offline">("online")
  const [responseTime, setResponseTime] = useState("2.3s")
  const [uptime, setUptime] = useState("99.9%")

  useEffect(() => {
    // Simulate status updates
    const interval = setInterval(() => {
      const statuses: Array<"online" | "processing" | "offline"> = ["online", "processing"]
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      setStatus(randomStatus)

      // Update response time occasionally
      if (Math.random() > 0.8) {
        const times = ["2.1s", "2.3s", "2.5s", "1.9s"]
        setResponseTime(times[Math.floor(Math.random() * times.length)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "processing":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "online":
        return "Agent Online"
      case "processing":
        return "Processing"
      case "offline":
        return "Agent Offline"
      default:
        return "Unknown"
    }
  }

  return (
    <div
      className={`w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 ${
        position === "top" ? "border-b" : "border-t"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}>
                {status === "processing" && <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>}
              </div>
              <span className="text-gray-600 dark:text-gray-400 font-medium">{getStatusText()}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Response: {responseTime}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
              <Activity className="w-3 h-3" />
              <span>Uptime: {uptime}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
              <Wifi className="w-3 h-3" />
              <span>Connected</span>
            </div>

            <div className="text-xs text-gray-400 dark:text-gray-600">Sydney Real Estate Intelligence</div>
          </div>
        </div>
      </div>
    </div>
  )
}
