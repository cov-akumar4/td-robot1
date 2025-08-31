import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { motion, AnimatePresence } from 'motion/react'
import svgPaths from '../imports/svg-hfk0vj85b2'

interface Thread {
  id: string
  name: string
  state: 'RUNNING' | 'BLOCKED' | 'WAITING' | 'TIMED_WAITING' | 'TERMINATED'
  cpuTime: number
  userTime: number
  blockedTime: number
  waitedTime: number
  priority: number
  daemon: boolean
}

interface ThreadDetail {
  id: string
  name: string
  state: 'RUNNING' | 'BLOCKED' | 'WAITING' | 'TIMED_WAITING' | 'TERMINATED' | 'RUNNABLE'
  priority: number
  daemon: boolean
  cpuTime: number
}

interface ThreadsTableProps {
  isMobile?: boolean
}

// Sort Icon Component
function SortIcon({ isActive, sortOrder, onClick }: { 
  isActive: boolean, 
  sortOrder: 'asc' | 'desc', 
  onClick: () => void 
}) {
  return (
    <motion.button
      onClick={onClick}
      className="ml-2 hover:scale-110 transition-transform"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{
          rotate: isActive && sortOrder === 'desc' ? 180 : 0,
          scale: isActive ? 1.1 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        <svg className="block w-4 h-4" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <path d={svgPaths.p11e38d00} fill={isActive ? "#3b82f6" : "black"} />
        </svg>
      </motion.div>
    </motion.button>
  )
}

// Search Icon Component  
function SearchIcon() {
  return (
    <svg className="block w-4 h-4" fill="none" preserveAspectRatio="none" viewBox="0 0 13 15">
      <path clipRule="evenodd" d={svgPaths.p19dd0380} fill="#8E8E8E" fillRule="evenodd" />
    </svg>
  )
}

// Filter Icon Component
function FilterIcon() {
  return (
    <svg className="block w-[13px] h-[13px]" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
      <g clipPath="url(#clip0_208_2406)">
        <path d={svgPaths.p26739b80} fill="#272727" />
      </g>
      <defs>
        <clipPath id="clip0_208_2406">
          <rect fill="white" height="13" width="13" />
        </clipPath>
      </defs>
    </svg>
  )
}

// Three Dots Menu Icon Component
function ThreeDotsIcon() {
  return (
    <svg className="block w-4 h-4" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <path d={svgPaths.pdd6ac30} fill="black" />
    </svg>
  )
}

export function ThreadsTable({ isMobile = false }: ThreadsTableProps) {
  const [sortBy, setSortBy] = useState<keyof Thread>('cpuTime')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterState, setFilterState] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const itemsPerPage = 5

  // Enhanced mock data matching Figma design
  const threads: Thread[] = [
    {
      id: '5',
      name: 'GC-Thread',
      state: 'RUNNING',
      cpuTime: 3456,
      userTime: 2987,
      blockedTime: 0,
      waitedTime: 12,
      priority: 10,
      daemon: true
    },
    {
      id: '3',
      name: 'HTTP-Request-Handler',
      state: 'BLOCKED',
      cpuTime: 3456,
      userTime: 1876,
      blockedTime: 0,
      waitedTime: 45,
      priority: 10,
      daemon: true
    },
    {
      id: '1',
      name: 'main',
      state: 'RUNNING',
      cpuTime: 3456,
      userTime: 987,
      blockedTime: 0,
      waitedTime: 123,
      priority: 10,
      daemon: true
    },
    {
      id: '2',
      name: 'Thread-pool-Worker-1',
      state: 'WAITING',
      cpuTime: 3456,
      userTime: 743,
      blockedTime: 0,
      waitedTime: 234,
      priority: 10,
      daemon: true
    },
    {
      id: '4',
      name: 'Database-Connection-Pool-1',
      state: 'TIMED_WAITING',
      cpuTime: 3456,
      userTime: 234,
      blockedTime: 0,
      waitedTime: 567,
      priority: 10,
      daemon: true
    }
  ]

  // Detailed threads data for the second section
  const threadDetails: ThreadDetail[] = [
    { id: '1', name: 'Thread-1', state: 'BLOCKED', priority: 10, daemon: false, cpuTime: 5750 },
    { id: '2', name: 'Thread-2', state: 'TIMED_WAITING', priority: 2, daemon: true, cpuTime: 2103 },
    { id: '3', name: 'Thread-3', state: 'RUNNABLE', priority: 7, daemon: false, cpuTime: 9658 },
    { id: '4', name: 'Thread-4', state: 'TERMINATED', priority: 5, daemon: false, cpuTime: 601 },
    { id: '5', name: 'Thread-5', state: 'WAITING', priority: 6, daemon: false, cpuTime: 781 },
    { id: '6', name: 'Thread-6', state: 'RUNNABLE', priority: 5, daemon: false, cpuTime: 3223 },
    { id: '7', name: 'Thread-7', state: 'WAITING', priority: 3, daemon: true, cpuTime: 7744 },
    { id: '8', name: 'Thread-8', state: 'WAITING', priority: 8, daemon: true, cpuTime: 7176 },
    { id: '9', name: 'Thread-9', state: 'RUNNABLE', priority: 2, daemon: false, cpuTime: 3541 },
    { id: '10', name: 'Thread-10', state: 'BLOCKED', priority: 1, daemon: false, cpuTime: 1551 }
  ]

  const handleSort = (column: keyof Thread) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const filteredAndSortedThreads = threads
    .filter(thread => {
      const matchesSearch = thread.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterState === 'all' || thread.state === filterState
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      const multiplier = sortOrder === 'asc' ? 1 : -1
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier
      }
      
      return ((aValue as number) - (bValue as number)) * multiplier
    })

  // Pagination logic
  const totalPages = Math.ceil(threadDetails.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentThreadDetails = threadDetails.slice(startIndex, endIndex)

  const getStateStyle = (state: Thread['state'] | ThreadDetail['state']) => {
    switch (state) {
      case 'RUNNING':
        return {
          bg: 'bg-[#151515]',
          text: 'text-white',
          label: 'RUNNING'
        }
      case 'BLOCKED':
        return {
          bg: 'bg-[#ff0d31]',
          text: 'text-white',
          label: 'BLOCKED'
        }
      case 'WAITING':
        return {
          bg: 'bg-[#e6e6e6]',
          text: 'text-[#151515]',
          label: 'WAITING'
        }
      case 'TIMED_WAITING':
        return {
          bg: 'border border-[#e6e6e6]',
          text: 'text-[#151515]',
          label: 'TIMED-WAITING'
        }
      case 'RUNNABLE':
        return {
          bg: 'bg-[#151515]',
          text: 'text-white',
          label: 'RUNNABLE'
        }
      case 'TERMINATED':
        return {
          bg: 'bg-gray-400',
          text: 'text-white',
          label: 'TERMINATED'
        }
      default:
        return {
          bg: 'bg-gray-200',
          text: 'text-gray-800',
          label: state
        }
    }
  }

  const PriorityBar = ({ priority }: { priority: number }) => {
    const width = (priority / 10) * 100
    return (
      <div className="flex items-center space-x-2">
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gray-800"
            initial={{ width: 0 }}
            animate={{ width: `${width}%` }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </div>
        <span className="text-sm text-gray-600">{priority}</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >

      </motion.div>

      {/* Thread Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        {/* Thread Analysis Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-black">Thread Analysis</h2>
          
          {/* Search and Filter Controls */}
          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <motion.div 
              className="relative"
              whileFocus={{ scale: 1.02 }}
            >
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <SearchIcon />
              </div>
              <Input
                placeholder="Search Threads"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-[227px] h-[37px] bg-neutral-100 border-[#d9d9d9] rounded-lg text-[14px] placeholder:text-[#8e8e8e] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </motion.div>

            {/* Filter Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-[37px] w-[113px] bg-white border-[#d9d9d9] rounded-lg text-[#272727] hover:bg-gray-50 transition-colors duration-200"
                  >
                    <FilterIcon />
                    <span className="ml-2 text-[16px]">Filters</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setFilterState('all')}>
                    All States
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterState('RUNNING')}>
                    Running
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterState('BLOCKED')}>
                    Blocked
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterState('WAITING')}>
                    Waiting
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterState('TIMED_WAITING')}>
                    Timed Waiting
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </div>

        {/* Main Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-[#c3deff] rounded-lg overflow-hidden shadow-lg"
        >
          {/* Table Header */}
          <div className="bg-white px-4 py-4">
            <div className="grid grid-cols-7 gap-4 items-center">
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">Thread Name</span>
                <SortIcon 
                  isActive={sortBy === 'name'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('name')} 
                />
              </div>
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">State</span>
                <SortIcon 
                  isActive={sortBy === 'state'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('state')} 
                />
              </div>
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">CPU Time</span>
                <SortIcon 
                  isActive={sortBy === 'cpuTime'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('cpuTime')} 
                />
              </div>
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">Blocked Time (ms)</span>
                <SortIcon 
                  isActive={sortBy === 'blockedTime'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('blockedTime')} 
                />
              </div>
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">priority</span>
                <SortIcon 
                  isActive={sortBy === 'priority'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('priority')} 
                />
              </div>
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">Daemon</span>
                <SortIcon 
                  isActive={sortBy === 'daemon'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('daemon')} 
                />
              </div>
              <div></div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            <AnimatePresence mode="wait">
              {filteredAndSortedThreads.map((thread, index) => {
                const stateStyle = getStateStyle(thread.state)
                return (
                  <motion.div
                    key={thread.id}
                    className="bg-white hover:bg-gray-50/50 transition-all duration-200 cursor-pointer shadow-[0px_0px_8px_0px_rgba(0,0,0,0.5)] mx-3 my-2 rounded-lg"
                    onMouseEnter={() => setHoveredRow(thread.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.15)"
                    }}
                  >
                    <div className="p-4">
                      <div className="grid grid-cols-7 gap-4 items-center">
                        {/* Thread Name & ID */}
                        <div>
                          <motion.div
                            animate={{
                              x: hoveredRow === thread.id ? 4 : 0
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="font-semibold text-[#151515] text-[14px]">
                              {thread.name}
                            </p>
                            <p className="text-[#8e8e8e] text-[12px] mt-1">
                              ID: {thread.id}
                            </p>
                          </motion.div>
                        </div>

                        {/* State Badge */}
                        <div>
                          <motion.div
                            className={`inline-flex items-center justify-center h-6 rounded-md text-[12px] font-semibold ${stateStyle.bg} ${stateStyle.text}`}
                            whileHover={{ scale: 1.05 }}
                            style={{
                              width: stateStyle.label === 'TIMED-WAITING' ? '113px' : '82px'
                            }}
                          >
                            {stateStyle.label}
                          </motion.div>
                        </div>

                        {/* CPU Time */}
                        <div>
                          <p className="text-[#8e8e8e] text-[14px] font-semibold">
                            {thread.cpuTime.toLocaleString()}
                          </p>
                        </div>

                        {/* Blocked Time */}
                        <div>
                          <p className="text-[#8e8e8e] text-[14px] font-semibold">
                            {thread.blockedTime}
                          </p>
                        </div>

                        {/* Priority */}
                        <div>
                          <p className="text-[#8e8e8e] text-[14px] font-semibold">
                            {thread.priority}
                          </p>
                        </div>

                        {/* Daemon */}
                        <div>
                          <motion.div
                            className="inline-flex items-center justify-center w-[53px] h-6 bg-white border border-[#8f8f8f] rounded-md"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="text-[#151515] text-[14px] font-semibold">
                              Yes
                            </span>
                          </motion.div>
                        </div>

                        {/* Actions Menu */}
                        <div className="flex justify-end">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                                >
                                  <ThreeDotsIcon />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="cursor-pointer">
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  View Stack Trace
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  Export Thread Data
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-red-600">
                                  Kill Thread
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Thread Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6"
      >
        {/* Section Header */}
        <div>
          <h3 className="text-[16px] font-semibold text-black">Thread Details</h3>
          <p className="text-[13px] text-[#8f8f8f] mt-1">
            Click on any thread to view detailed information
          </p>
        </div>

        {/* Detailed Table Container */}
        <div className="border border-[#c3deff] rounded-lg overflow-hidden shadow-lg max-h-[600px] overflow-y-auto">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-4 sticky top-0 z-10">
            <div className="grid grid-cols-6 gap-6 items-center">
              <span className="text-[14px] font-semibold text-gray-700">Thread Name</span>
              <span className="text-[14px] font-semibold text-gray-700">State</span>
              <span className="text-[14px] font-semibold text-gray-700">Priority</span>
              <span className="text-[14px] font-semibold text-gray-700">Daemon</span>
              <span className="text-[14px] font-semibold text-gray-700">CPU Time (ms)</span>
              <span className="text-[14px] font-semibold text-gray-700">Actions</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {currentThreadDetails.map((thread, index) => {
              const stateStyle = getStateStyle(thread.state)
              return (
                <motion.div
                  key={thread.id}
                  className="bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                >
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-6 gap-6 items-center">
                      {/* Thread Name */}
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600">▼</span>
                        <span className="text-[14px] text-gray-900">{thread.name}</span>
                      </div>

                      {/* State Badge */}
                      <div>
                        <motion.div
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-[12px] font-semibold ${stateStyle.bg} ${stateStyle.text}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {stateStyle.label}
                        </motion.div>
                      </div>

                      {/* Priority Bar */}
                      <div>
                        <PriorityBar priority={thread.priority} />
                      </div>

                      {/* Daemon */}
                      <div>
                        <span className="text-[14px] text-gray-600">
                          {thread.daemon ? 'Yes' : 'No'}
                        </span>
                      </div>

                      {/* CPU Time */}
                      <div>
                        <span className="text-[14px] text-gray-900 font-mono">
                          {thread.cpuTime.toLocaleString()}
                        </span>
                      </div>

                      {/* View Details Button */}
                      <div>
                        <motion.button
                          className="text-blue-600 text-[14px] hover:underline"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Footer with Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-[#8f8f8f]">
            Showing {Math.min(5, threadDetails.length)} of {threadDetails.length} threads
          </p>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-1">
            <motion.button
              className="flex items-center justify-center w-4 h-4 text-black hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </motion.button>

            {[1, 2, 3, 4].map((pageNum) => {
              const isActive = pageNum === currentPage
              
              return (
                <motion.button
                  key={pageNum}
                  className={`w-[30px] h-[30px] flex items-center justify-center text-[13px] font-semibold transition-colors duration-200 ${
                    isActive 
                      ? 'bg-[#1976d2] text-white' 
                      : 'bg-[#bddeff] text-black hover:bg-blue-200'
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {pageNum}
                </motion.button>
              )
            })}

            <motion.button
              className="flex items-center justify-center w-4 h-4 text-black hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}