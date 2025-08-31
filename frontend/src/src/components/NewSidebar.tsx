import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Search, Filter, BarChart3, MessageSquare, Settings, Users, Brain, Bell, User } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface User {
  email: string
  signedInAt: Date
}

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  user: User
  isMobile?: boolean
  onClose?: () => void
}

const navigationItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: BarChart3,
    isActive: true
  },
  {
    id: 'threads',
    label: 'Threads',
    icon: MessageSquare,
    isActive: false
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    isActive: false
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    isActive: false
  }
]

const proTips = [
  "💡 Use filters to quickly find blocked threads",
  "🚀 Export reports for team analysis",
  "⚡ Click metrics cards for detailed views",
  "🎯 Monitor deadlocks in real-time",
  "📊 Compare performance across dumps"
]

export function NewSidebar({ activeView, setActiveView, user, isMobile = false, onClose }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showProTip, setShowProTip] = useState(true)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(true)

  const cycleTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % proTips.length)
  }

  return (
    <motion.div 
      className="bg-[#151515] h-full w-[303px] flex flex-col relative overflow-hidden"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#151515] via-[#1a1a1a] to-[#151515] opacity-50"></div>
      
      {/* Header */}
      <motion.div 
        className="relative p-[18px] border-b border-gray-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-white text-[30px] font-normal leading-normal font-['Italiana'] mb-1">
          TDBOT
        </h1>
        <p className="text-white text-[14px] leading-normal opacity-80">
          Thread Dump Analyzer
        </p>
      </motion.div>

      {/* Search Section */}
      <motion.div 
        className="relative p-[15px] space-y-3"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Search Input */}
        <motion.div 
          className="relative group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Input
            type="text"
            placeholder="Search Threads"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white h-[37px] rounded-[8px] pl-10 pr-4 text-[14px] border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20"
          />
          <motion.div
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-[8px] border-2 border-transparent group-hover:border-blue-500/30 group-focus-within:border-blue-500/50"
            initial={false}
            animate={{ 
              opacity: searchQuery ? 1 : 0,
              borderColor: searchQuery ? 'rgba(59, 130, 246, 0.5)' : 'transparent'
            }}
            transition={{ duration: 0.2 }}
          />
          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-[8px] opacity-0 group-hover:opacity-100"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatDelay: 2,
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* Filters Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            className="bg-[#272727] h-[37px] w-full rounded-[8px] text-white text-[16px] border-0 hover:bg-[#333333] transition-all duration-300 hover:shadow-lg"
          >
            <Filter className="w-3 h-3 mr-2" />
            Filters
          </Button>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <motion.div 
        className="flex-1 px-1 py-4 space-y-1"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {navigationItems.map((item, index) => {
          const isActive = activeView === item.id
          const isHovered = hoveredItem === item.id
          
          return (
            <motion.div
              key={item.id}
              className="relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <motion.button
                onClick={() => setActiveView(item.id)}
                className={`w-full h-[52px] rounded-[8px] flex items-center px-6 text-[16px] transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? 'bg-white text-[#272727] shadow-lg' 
                    : 'bg-transparent text-white hover:bg-[rgba(39,39,39,0.3)]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                {/* Enhanced Active indicator */}
                {isActive && (
                  <>
                    <motion.div
                      className="absolute right-[282px] top-[-8px] w-[19px] h-[75px]"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <svg className="w-full h-full" viewBox="0 0 18 69" fill="none">
                        <defs>
                          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="50%" stopColor="#f0f9ff" />
                            <stop offset="100%" stopColor="#dbeafe" />
                          </linearGradient>
                        </defs>
                        <path d="M0 53.5V17C10.8 14.6 16 4.66667 17.5 0V69C13.9 59.4 4.16667 54.6667 0 53.5Z" fill="url(#activeGradient)" />
                      </svg>
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          boxShadow: [
                            "0 0 8px rgba(255,255,255,0.3)",
                            "0 0 16px rgba(255,255,255,0.5)",
                            "0 0 8px rgba(255,255,255,0.3)"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                    
                    {/* Left border accent */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-r"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
                    />
                  </>
                )}

                {/* Hover glow effect */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-[8px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon with subtle scale animation */}
                <motion.div
                  className="mr-4"
                  animate={{ 
                    scale: isActive ? 1.1 : 1 
                  }}
                  transition={{ 
                    scale: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>

                {/* Label with slide effect */}
                <motion.span
                  animate={{ x: isActive ? 5 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {item.label}
                </motion.span>

                {/* Shimmer effect for active state */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatDelay: 3,
                      ease: "easeInOut" 
                    }}
                  />
                )}
              </motion.button>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Pro Tips Section */}
      <AnimatePresence>
        {showProTip && (
          <motion.div
            className="mx-4 mb-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between mb-2">
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Brain className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-blue-400 text-sm font-medium">Pro Tip</span>
              </motion.div>
              <button
                onClick={() => setShowProTip(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <motion.p 
              className="text-white text-xs leading-relaxed"
              key={currentTipIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {proTips[currentTipIndex]}
            </motion.p>
            <motion.button
              onClick={cycleTip}
              className="text-blue-400 text-xs mt-2 hover:text-blue-300 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Tip →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Account Section */}
      <motion.div 
        className="p-4 border-t border-gray-800 bg-[#1a1a1a]/50"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#272727]/50 transition-all duration-300 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
        >
          {/* Avatar with notification dot */}
          <div className="relative">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>
            {showNotification && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#151515]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, delay: 1 }}
              />
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <motion.p 
              className="text-white text-sm font-medium truncate group-hover:text-blue-400 transition-colors duration-300"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {user.email.split('@')[0]}
            </motion.p>
            <motion.p 
              className="text-gray-400 text-xs truncate"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Active • Online
            </motion.p>
          </div>

          {/* Notification Bell */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className={`w-4 h-4 transition-colors duration-300 ${showNotification ? 'text-blue-400' : 'text-gray-400'}`} />
            {showNotification && (
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        </motion.div>

        {/* User Actions */}
        <motion.div 
          className="mt-2 flex space-x-2"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        >
          <motion.button
            className="flex-1 py-2 px-3 text-xs text-gray-400 hover:text-white hover:bg-[#272727] rounded transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Profile
          </motion.button>
          <motion.button
            className="flex-1 py-2 px-3 text-xs text-gray-400 hover:text-white hover:bg-[#272727] rounded transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Settings
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}