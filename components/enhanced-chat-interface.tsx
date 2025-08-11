"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, ArrowLeft, Mic, Paperclip, MoreVertical } from "lucide-react"
import PropertyCard from "./property-card"

interface Message {
  id: string
  type: "user" | "agent"
  content: string
  timestamp: Date
  properties?: PropertyData[]
  isTyping?: boolean
}

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

interface EnhancedChatInterfaceProps {
  onBack: () => void
}

export default function EnhancedChatInterface({ onBack }: EnhancedChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "agent",
      content:
        "Hi! I'm ReAgent, your AI real estate assistant. I can help you find properties, analyze market trends, and provide insights. What are you looking for today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response with property data
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content:
          "I found some great properties that match your criteria. Here are the top recommendations based on current market analysis:",
        timestamp: new Date(),
        properties: [
          {
            id: "1",
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
        ],
      }

      setMessages((prev) => [...prev, agentResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">ReAgent</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI Real Estate Assistant</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                }`}
              >
                {message.content}
              </div>

              {/* Property Cards */}
              {message.properties && (
                <div className="mt-3 space-y-3">
                  {message.properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}

              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-end gap-3">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about properties, market trends, or get insights..."
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              rows={1}
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>

          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <Mic className="w-5 h-5" />
          </button>

          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
