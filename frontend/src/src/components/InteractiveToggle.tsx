import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface Tab {
  id: string
  label: string
  isActive?: boolean
}

interface InteractiveToggleProps {
  activeTab: string
  onTabChange: (tabId: string) => void
  tabs?: Tab[]
  isMobile?: boolean
}

const defaultTabs: Tab[] = [
  { id: 'overview', label: 'Overview', isActive: true },
  { id: 'threads', label: 'Threads' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings', label: 'Settings' }
]

export function InteractiveToggle({ activeTab, onTabChange, tabs = defaultTabs, isMobile = false }: InteractiveToggleProps) {

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const containerRef = useRef<HTMLDivElement>(null)

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab]
    const containerElement = containerRef.current
    
    if (activeTabElement && containerElement) {
      const containerRect = containerElement.getBoundingClientRect()
      const activeTabRect = activeTabElement.getBoundingClientRect()
      
      setIndicatorStyle({
        left: activeTabRect.left - containerRect.left,
        width: activeTabRect.width
      })
    }
  }, [activeTab])

  return (
    <div className={`flex ${isMobile ? 'justify-start overflow-x-auto' : 'justify-center'} mb-6 md:mb-8`}>
      <motion.div
        ref={containerRef}
        className={`relative bg-[#bddeff] rounded-[31px] p-1.5 shadow-lg ${isMobile ? 'min-w-max' : ''}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
      >
        {/* Animated background indicator */}
        <motion.div
          className="absolute bg-[#315596] rounded-[31px] shadow-[0px_0px_12px_0px_rgba(49,85,150,0.4)] border-[0.2px] border-[rgba(0,0,0,0.55)]"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            height: 32,
            top: 4
          }}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
        >
          {/* Active indicator glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#315596] to-[#4a6bb8] rounded-[31px] opacity-80"
            animate={{
              boxShadow: [
                "0 0 8px rgba(49,85,150,0.3)",
                "0 0 16px rgba(49,85,150,0.5)",
                "0 0 8px rgba(49,85,150,0.3)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Tab buttons */}
        <div className="flex relative z-10">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id


            return (
              <motion.button
                key={tab.id}
                ref={(el) => { tabRefs.current[tab.id] = el }}
                onClick={() => onTabChange(tab.id)}

                className={`relative ${isMobile ? 'px-4 md:px-[95px]' : 'px-[95px]'} py-2.5 ${isMobile ? 'text-sm md:text-base' : 'text-base'} transition-all duration-300 rounded-[31px] font-semibold whitespace-nowrap ${
                  isActive 
                    ? 'text-white' 
                    : 'text-[#151515]'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileTap={{ scale: 0.97 }}
              >


                {/* Enhanced active effects */}
                {isActive && (
                  <>
                    {/* Continuous shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-[31px]"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        repeatDelay: 3,
                        ease: "easeInOut" 
                      }}
                    />
                    
                    {/* Subtle pulsing glow */}
                    <motion.div
                      className="absolute inset-0 bg-white/5 rounded-[31px]"
                      animate={{ 
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </>
                )}

                {/* Label with enhanced typography */}
                <motion.span
                  className="relative z-10"
                  animate={{ 
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: isActive ? '0.025em' : '0em'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.label}
                </motion.span>




              </motion.button>
            )
          })}
        </div>

        {/* Advanced Tech-Themed Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[31px]">
          {/* Floating Hexagonal Tech Elements */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`hex-${i}`}
              className="absolute"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + (i % 2) * 40}%`
              }}
              animate={{
                y: [-8, 8, -8],
                rotate: [0, 180, 360],
                opacity: [0.15, 0.35, 0.15]
              }}
              transition={{
                duration: 6 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#315596]">
                <polygon 
                  points="6,1 10.39,3.5 10.39,8.5 6,11 1.61,8.5 1.61,3.5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5"
                  opacity="0.6"
                />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" opacity="0.3" />
              </svg>
            </motion.div>
          ))}

          {/* Data Stream Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`stream-${i}`}
              className="absolute w-1 h-1 bg-[#315596]/25 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`
              }}
              animate={{
                x: [-30, 30, -30],
                y: [-15, 15, -15],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4
              }}
            />
          ))}

          {/* Energy Pulse Rings */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute border border-[#315596]/20 rounded-full"
              style={{
                left: `${25 + i * 50}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px'
              }}
              animate={{
                scale: [1, 3, 1],
                opacity: [0.4, 0, 0.4],
                borderWidth: ['1px', '0.5px', '1px']
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1.5
              }}
            />
          ))}

          {/* Dynamic Connecting Lines */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M10,20 Q30,10 50,20 T90,20"
              fill="none"
              stroke="#315596"
              strokeWidth="0.3"
              opacity="0.2"
              strokeDasharray="2,2"
              animate={{
                strokeDashoffset: [0, -10, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.path
              d="M20,30 Q40,15 60,25 T85,30"
              fill="none"
              stroke="#315596"
              strokeWidth="0.2"
              opacity="0.15"
              strokeDasharray="1,3"
              animate={{
                strokeDashoffset: [0, 8, 0],
                opacity: [0.05, 0.2, 0.05]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "linear",
                delay: 1
              }}
            />
          </motion.svg>

          {/* Floating Circuit Nodes */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`circuit-${i}`}
              className="absolute w-2 h-2 border border-[#315596]/25 rounded-sm bg-[#315596]/10"
              style={{
                left: `${15 + i * 25}%`,
                top: `${25 + (i % 2) * 50}%`
              }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 90, 0],
                opacity: [0.2, 0.5, 0.2],
                borderColor: ['rgba(49,85,150,0.25)', 'rgba(49,85,150,0.4)', 'rgba(49,85,150,0.25)']
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6
              }}
            >
              {/* Inner core */}
              <motion.div
                className="absolute inset-1 bg-[#315596]/30 rounded-full"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            </motion.div>
          ))}

          {/* Quantum Data Flow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#315596]/8 to-transparent rounded-[31px]"
            animate={{
              x: ['-120%', '120%'],
              scaleY: [1, 1.2, 1]
            }}
            transition={{
              x: { 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 2
              },
              scaleY: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />

          {/* Energy Field Distortion */}
          <motion.div
            className="absolute inset-2 border border-[#315596]/15 rounded-[25px]"
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.1, 0.25, 0.1],
              borderRadius: ['25px', '20px', '25px']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        {/* Dynamic corner accents */}
        {[
          { position: 'top-left', corners: 'border-l border-t', rounded: 'rounded-tl-md', coords: [-1, -1], delay: 0.8 },
          { position: 'top-right', corners: 'border-r border-t', rounded: 'rounded-tr-md', coords: [-1, -1], delay: 0.9 },
          { position: 'bottom-left', corners: 'border-l border-b', rounded: 'rounded-bl-md', coords: [-1, -1], delay: 1.0 },
          { position: 'bottom-right', corners: 'border-r border-b', rounded: 'rounded-br-md', coords: [-1, -1], delay: 1.1 }
        ].map((corner, i) => (
          <motion.div
            key={corner.position}
            className={`absolute ${corner.position === 'top-left' ? '-top-1 -left-1' : 
                                 corner.position === 'top-right' ? '-top-1 -right-1' : 
                                 corner.position === 'bottom-left' ? '-bottom-1 -left-1' : 
                                 '-bottom-1 -right-1'} 
                       w-4 h-4 ${corner.corners} border-[#315596]/20 ${corner.rounded}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [1, 0.3, 1],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              opacity: { duration: 3, repeat: Infinity, delay: corner.delay },
              scale: { duration: 3, repeat: Infinity, delay: corner.delay },
              initial: { delay: corner.delay, duration: 0.5 }
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}