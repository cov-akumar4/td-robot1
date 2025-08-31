import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { InteractiveFigmaCharts } from './InteractiveFigmaCharts'
import { motion, AnimatePresence } from 'motion/react'
import {
  Users,
  AlertTriangle,
  Cpu,
  Clock,
  Lock,
  TrendingUp,
  FileText,
  Download,
  RefreshCw,
  MessageCircle,
  Brain,
  Check,
  X
} from 'lucide-react'
import { useApi } from "../../contexts/ApiContext";

interface Toast {
  id: string
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  duration?: number
}

function ToastNotification({ toast, onClose }: { toast: Toast; onClose: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id)
    }, toast.duration || 3000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onClose])

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <Check className="w-4 h-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'error':
        return <X className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-blue-600" />
    }
  }

  return (
    <div className={`flex items-center space-x-3 p-4 rounded-lg border shadow-lg ${getToastStyles()}`}>
      {getIcon()}
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="opacity-70 hover:opacity-100"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  description: string
  color: string
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'stable'
  onClick?: () => void
}

function MetricCard({ title, value, description, color, icon, trend, onClick }: MetricCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-500" />
    if (trend === 'down') return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
    return null
  }

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-200', glow: 'shadow-green-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-200', glow: 'shadow-orange-200' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-200', glow: 'shadow-blue-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-200', glow: 'shadow-purple-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-200', glow: 'shadow-red-200' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', hover: 'hover:bg-yellow-200', glow: 'shadow-yellow-200' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const colors = getColorClasses(color)

  // Show button if either card or button is hovered
  const showButton = isHovered || buttonHovered

  return (
    <motion.div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="cursor-pointer relative overflow-hidden transition-all duration-300 group-hover:shadow-xl">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />

        <div className="p-6 space-y-4 relative z-10">
          {/* Header with icon */}
          <div className="flex items-center justify-between">
            <motion.div
              className={`p-3 rounded-xl transition-all duration-300 ${colors.bg} ${colors.hover}`}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                className={`w-6 h-6 ${colors.text}`}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {icon}
              </motion.div>
            </motion.div>

            {trend && (
              <motion.div
                className="flex items-center space-x-1"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {getTrendIcon()}
                <span className="text-xs text-muted-foreground">24h</span>
              </motion.div>
            )}
          </div>

          {/* Title */}
          <motion.div
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </motion.div>

          {/* Value */}
          <motion.div
            className="flex items-baseline justify-between"
            animate={{
              y: isHovered ? -4 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className={`text-3xl font-bold ${colors.text}`}>
              {value}
            </span>

            {/* View More Button */}
            <div className="relative">
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className={`${colors.text} border-current transition-all duration-200 shadow-lg z-50 relative pointer-events-auto`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onClick?.()
                      }}
                      onMouseEnter={() => setButtonHovered(true)}
                      onMouseLeave={() => setButtonHovered(false)}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      View More
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Animated border glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-lg border-2 opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${colors.text.replace('text-', 'border-')}`}
          animate={{
            boxShadow: isHovered
              ? `0 0 20px ${colors.text.includes('green') ? '#10b981' :
                colors.text.includes('orange') ? '#f97316' :
                  colors.text.includes('blue') ? '#3b82f6' :
                    colors.text.includes('purple') ? '#8b5cf6' :
                      colors.text.includes('red') ? '#ef4444' : '#eab308'}40`
              : 'none'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Sparkle effects */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${15 + i * 20}%`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}



// Top Threads by CPU Time Chart Component
function TopThreadsByCpuChart() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const { threads } = useApi();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  function createThreadData(threads: any) {
    // Map threads to include blockedTime (default 0) and normalize state
    const threadData = threads
      .map(t => {
        let state = t.state.toUpperCase();
        if (state.includes('WAITING')) state = 'WAITING';
        if (state.includes('TIMED_WAITING')) state = 'TIMED_WAITING';
        if (state.includes('BLOCKED')) state = 'BLOCKED';
        if (state.includes('RUNNABLE')) state = 'RUNNABLE';

        return {
          name: t.name,
          cpuTime: Math.round(t.cpu_ms),
          blockedTime: 0, // default, can modify if you have data
          id: t.id,
          state
        };
      })
      .sort((a, b) => b.cpuTime - a.cpuTime) // sort descending
      .slice(0, 5); // top 5

    // Compute maxTime including blockedTime
    const maxTime = Math.max(...threadData.map(t => t.cpuTime + t.blockedTime));

    return { threadData, maxTime };
  }
  const { threadData, maxTime } = createThreadData(threads || []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-6"
    >
      <Card className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border border-[#c3deff] shadow-xl">
        <div className="p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Top Threads by CPU Time
            </h3>
            <p className="text-sm text-gray-600">
              Analysis of threads with highest CPU consumption and blocking behavior
            </p>
          </motion.div>

          {/* Chart Container */}
          <div className="relative bg-white/50 rounded-lg p-6 border border-gray-100">
            {/* Y-axis labels */}
            <div className="absolute left-2 top-6 h-80 w-16 flex flex-col justify-between py-8 text-xs text-gray-500">
              <span className="font-mono">4000ms</span>
              <span className="font-mono">3000ms</span>
              <span className="font-mono">2000ms</span>
              <span className="font-mono">1000ms</span>
              <span className="font-mono">0ms</span>
            </div>

            {/* Chart area */}
            <div className="ml-20 mr-4 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-8">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-px bg-gray-200/80 w-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isVisible ? 1 : 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                  />
                ))}
              </div>

              {/* Bars */}
              <div className="flex items-end justify-between h-80 px-4 relative">
                {threadData.map((thread, index) => {
                  const cpuHeight = (thread.cpuTime / maxTime) * 240
                  const blockedHeight = (thread.blockedTime / maxTime) * 240
                  const isHovered = hoveredBar === index

                  return (
                    <motion.div
                      key={thread.name}
                      className="flex flex-col items-center space-y-4 group cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.2 }}
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {/* Value tooltip */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap z-10 shadow-lg"
                          >
                            CPU: {thread.cpuTime}ms | Blocked: {thread.blockedTime}ms
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Bar container */}
                      <div className="relative flex flex-col justify-end" style={{ height: '240px' }}>
                        {/* CPU Time Bar */}
                        <motion.div
                          className="relative overflow-hidden rounded-t-md shadow-sm border border-[#8884d8]/20"
                          style={{
                            width: '52px',
                            background: 'linear-gradient(to top, #8884d8, #a29bfc)'
                          }}
                          initial={{ height: 0 }}
                          animate={{
                            height: isVisible ? `${cpuHeight}px` : 0,
                            boxShadow: isHovered ? '0 4px 12px rgba(136, 132, 216, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                          transition={{
                            delay: 1 + index * 0.15,
                            duration: 0.8,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                        >
                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{
                              delay: 1.5 + index * 0.15,
                              duration: 1.2,
                              ease: 'easeInOut'
                            }}
                          />
                        </motion.div>

                        {/* Blocked Time Bar */}
                        <motion.div
                          className="relative overflow-hidden rounded-b-md shadow-sm border border-[#00c49f]/20"
                          style={{
                            width: '52px',
                            background: 'linear-gradient(to top, #00c49f, #00e5b8)'
                          }}
                          initial={{ height: 0 }}
                          animate={{
                            height: isVisible ? `${blockedHeight}px` : 0,
                            boxShadow: isHovered ? '0 4px 12px rgba(0, 196, 159, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                          transition={{
                            delay: 1.2 + index * 0.15,
                            duration: 0.8,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                        >
                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{
                              delay: 1.7 + index * 0.15,
                              duration: 1.2,
                              ease: 'easeInOut'
                            }}
                          />
                        </motion.div>
                      </div>

                      {/* Thread info */}
                      <motion.div
                        className="text-center space-y-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 + index * 0.1 }}
                      >
                        <div className="text-xs font-medium text-gray-700 max-w-[80px] truncate">
                          {thread.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {thread.id}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full text-white ${thread.state === 'RUNNABLE' ? 'bg-green-500' :
                          thread.state === 'BLOCKED' ? 'bg-red-500' :
                            thread.state === 'WAITING' ? 'bg-yellow-500' :
                              'bg-blue-500'
                          }`}>
                          {thread.state}
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>

              {/* X-axis line */}
              <motion.div
                className="h-px bg-gray-400 w-full mt-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isVisible ? 1 : 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              />

              {/* X-axis label */}
              <motion.div
                className="text-center mt-2 text-xs text-gray-500 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              >
                Thread Instances
              </motion.div>
            </div>

            {/* Legend */}
            <motion.div
              className="flex items-center justify-center space-x-8 mt-8 pt-4 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-4 h-4 rounded-sm shadow-sm border border-[#00c49f]/20"
                  style={{ background: 'linear-gradient(to top, #00c49f, #00e5b8)' }}
                  whileHover={{ scale: 1.2 }}
                />
                <span className="text-sm text-[#00c49f] font-medium">
                  Blocked Time (ms)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-4 h-4 rounded-sm shadow-sm border border-[#8884d8]/20"
                  style={{ background: 'linear-gradient(to top, #8884d8, #a29bfc)' }}
                  whileHover={{ scale: 1.2 }}
                />
                <span className="text-sm text-[#8884d8] font-medium">
                  CPU Time (ms)
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </Card>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        <Card className="bg-gradient-to-r from-gray-50 to-blue-50/50 border border-gray-200">
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Analysis Summary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Key Findings:</h5>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span><strong>GC-Thread</strong> shows highest CPU usage (3.6s) indicating potential memory pressure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span><strong>HTTP-Request-Handler</strong> has significant blocking time (320ms) suggesting I/O bottlenecks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span><strong>Database connections</strong> show minimal blocking, indicating efficient connection pooling</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Recommendations:</h5>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Consider tuning JVM heap size and garbage collection parameters</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Investigate HTTP request processing for potential async optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Monitor thread pool sizing for optimal resource utilization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          size="lg"
          className="rounded-full h-16 w-16 bg-yellow-400 hover:bg-yellow-500 text-gray-800 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Brain className="w-8 h-8" />
        </Button>
      </div>

      {/* AI Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl w-96 h-96 p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>×</Button>
            </div>
            <div className="text-center text-gray-600 mt-20">
              <Brain className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <p className="text-lg font-medium">AI Assistant</p>
              <p className="text-sm mt-2">Ask me anything about your thread dump analysis!</p>
              <div className="mt-6 space-y-2">
                <p className="text-xs text-gray-500">Sample questions:</p>
                <p className="text-xs bg-gray-100 rounded-full px-3 py-1 inline-block">What's causing the high CPU usage?</p>
                <p className="text-xs bg-gray-100 rounded-full px-3 py-1 inline-block">Are there any deadlocks?</p>
                <p className="text-xs bg-gray-100 rounded-full px-3 py-1 inline-block">How can I optimize performance?</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const [toasts, setToasts] = useState<Toast[]>([])
  const { threads } = useApi() as { threads: any[] }

  const totalThreads = threads?.length || 0
  const avgCpu = threads?.length
    ? (threads.reduce((sum: number, t: any) => sum + t.cpu_ms, 0) / threads.length).toFixed(1)
    : 0
  const blockedThreads = threads?.filter((t: any) => t.state.includes('WAITING')).length || 0

  useEffect(() => {
    // Simulate loading with faster staged animations
    const timer = setTimeout(() => setIsLoading(false), 400)

    // Faster staggered animation steps
    const animationTimer = setInterval(() => {
      setAnimationStep(prev => prev + 1)
    }, 50)

    return () => {
      clearTimeout(timer)
      clearInterval(animationTimer)
    }
  }, [])

  const addToast = (message: string, type: Toast['type'] = 'info', duration?: number) => {
    const id = Math.random().toString(36).substring(7)
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    addToast('Refreshing analysis data...', 'info')

    // Simulate refresh with realistic delay
    setTimeout(() => {
      setRefreshing(false)
      addToast('Analysis data refreshed successfully!', 'success')
    }, 2000)
  }

  const handleExport = () => {
    addToast('Preparing report export...', 'info')

    // Simulate export process
    setTimeout(() => {
      addToast('PDF report exported successfully!', 'success')
    }, 1500)
  }

  const handleMetricClick = (metricName: string) => {
    addToast(`Navigating to ${metricName} detailed analysis...`, 'info')
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex justify-between items-start animate-pulse">
          <div className="space-y-3">
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-80 animate-shimmer"></div>
            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-96 animate-shimmer"></div>
          </div>
          <div className="flex space-x-3">
            <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-32 animate-shimmer"></div>
            <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-28 animate-shimmer"></div>
          </div>
        </div>

        {/* Metrics Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse transition-all duration-500 ${animationStep > i ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2'
                }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <div className="w-12 h-12 bg-gray-300 rounded-xl animate-pulse"></div>
                  <div className="w-8 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                  <div className="h-3 bg-gray-300 rounded w-32 animate-pulse"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className={`h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse transition-all duration-700 ${animationStep > 8 + i ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
                }`}
            >
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-64 animate-pulse"></div>
                </div>
                <div className="h-64 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Chart Skeleton */}
        <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 rounded w-56 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-72 animate-pulse"></div>
            </div>
            <div className="h-64 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Top Threads Chart Skeleton */}
        <div className="space-y-6">
          <div className="h-[480px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse">
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-80 animate-pulse"></div>
              </div>
              <div className="bg-white/50 rounded-lg p-6 border border-gray-100">
                <div className="flex items-end justify-between h-80 px-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center space-y-3">
                      <div
                        className="bg-gray-300 rounded-sm animate-pulse"
                        style={{
                          width: '52px',
                          height: `${120 + i * 30}px`
                        }}
                      />
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-300 rounded w-16 animate-pulse"></div>
                        <div className="h-2 bg-gray-300 rounded w-12 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-14 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse">
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-5 bg-gray-300 rounded w-32 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-300 rounded w-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-28 animate-pulse"></div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-300 rounded w-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-8 pb-8">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Thread Dump Analysis Results</h2>
            <p className="text-gray-600 mt-1">
              Complete analysis of sample-thread-dump.txt • Found critical performance insights
            </p>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Total Threads"
            value={totalThreads.toString()}
            description="Active Threads Detected"
            color="green"
            icon={<Users className="w-6 h-6" />}
            trend="up"
            onClick={() => handleMetricClick('Total Threads')}
          />

          <MetricCard
            title="Blocked Threads"
            value={blockedThreads.toString()}
            description="Threads Waiting for Resources"
            color="orange"
            icon={<AlertTriangle className="w-6 h-6" />}
            trend="down"
            onClick={() => handleMetricClick('Blocked Threads')}
          />

          <MetricCard
            title="CPU Usage"
            value={avgCpu + '%'}
            description="Current System Load"
            color="blue"
            icon={<Cpu className="w-6 h-6" />}
            trend="stable"
            onClick={() => handleMetricClick('CPU Usage')}
          />

          <MetricCard
            title="Average Wait Time"
            value="156ms"
            description="Thread Wait Duration"
            color="purple"
            icon={<Clock className="w-6 h-6" />}
            trend="down"
            onClick={() => handleMetricClick('Average Wait Time')}
          />

          <MetricCard
            title="Deadlock Count"
            value="2"
            description="Critical Issues Found"
            color="red"
            icon={<Lock className="w-6 h-6" />}
            trend="stable"
            onClick={() => handleMetricClick('Deadlock Count')}
          />

          <MetricCard
            title="Memory Usage"
            value="4.2GB"
            description="Current Memory Consumption"
            color="yellow"
            icon={<TrendingUp className="w-6 h-6" />}
            trend="up"
            onClick={() => handleMetricClick('Memory Usage')}
          />
        </div>

        {/* Interactive Figma Charts */}
        <InteractiveFigmaCharts />

        {/* Top Threads by CPU Time Chart */}
        <TopThreadsByCpuChart />
      </div>

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 space-y-2 z-40">
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            toast={toast}
            onClose={removeToast}
          />
        ))}
      </div>

      <AIAssistantButton />
    </>
  )
}