import { useState, useEffect } from 'react'
import { SignInPage } from './src/components/SignInPage'
import { FileUploadPage } from './src/components/FileUploadPage'
import { NewSidebar } from './src/components/NewSidebar'
import { InteractiveToggle } from './src/components/InteractiveToggle'
import { DashboardOverview } from './src/components/DashboardOverview'
import { MetricsOverview } from './src/components/MetricsOverview'
import { ThreadsTable } from './src/components/ThreadsTable'
import { AnalyticsCharts } from './src/components/AnalyticsCharts'
import { SettingsPage } from './src/components/SettingsPage'
import { Button } from './src/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './src/components/ui/dropdown-menu'
import { FileText, Upload, RefreshCw, Download, User, Bell, Menu, X, Brain, Settings, LogOut, UserCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface UploadedFile {
  file: File
  uploadedAt: Date
}

interface User {
  email: string
  signedInAt: Date
}

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [activeView, setActiveView] = useState('overview')
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [showDashboard, setShowDashboard] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSignIn = (email: string) => {
    setUser({
      email,
      signedInAt: new Date()
    })
  }

  const handleSignOut = () => {
    setUser(null)
    setUploadedFile(null)
    setShowDashboard(false)
    setActiveView('overview')
  }

  const handleFileUploaded = (file: File) => {
    setUploadedFile({
      file,
      uploadedAt: new Date()
    })
    setShowDashboard(true)
  }

  const handleBackToUpload = () => {
    setShowDashboard(false)
    setUploadedFile(null)
    setActiveView('overview')
  }

  // Show sign-in page if user is not authenticated
  if (!user) {
    return <SignInPage onSignIn={handleSignIn} />
  }

  // Show file upload page if user is authenticated but no file uploaded
  if (!showDashboard || !uploadedFile) {
    return <FileUploadPage onFileUploaded={handleFileUploaded} user={user} onSignOut={handleSignOut} />
  }

  // Show dashboard after file upload
  return (
    <div className="flex h-screen bg-white relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`${
          isMobile 
            ? 'fixed left-0 top-0 h-full z-50 transform transition-transform duration-300' 
            : 'relative'
        } ${
          isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        initial={false}
        animate={{
          x: isMobile && !sidebarOpen ? '-100%' : '0%'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <NewSidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          user={user}
          isMobile={isMobile}
          onClose={() => setSidebarOpen(false)}
        />
      </motion.div>
      
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 relative">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                {/* Mobile Menu Button */}
                {isMobile && (
                  <motion.button
                    className="p-2 rounded-lg border border-gray-200 bg-white shadow-sm md:hidden"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {sidebarOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="w-5 h-5 text-gray-600" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="w-5 h-5 text-gray-600" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )}
                
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black mb-1 md:mb-2 truncate">
                    Thread Analyzer Dashboard
                  </h1>
                  <p className="text-sm md:text-base text-[#363636] truncate">
                    Analyzing sample-thread-dump.txt
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
                {/* Desktop Action Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" className="border-[#315596] text-[#315596] hover:bg-[#315596]/10 transition-all duration-300">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Analysis
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" className="border-[#315596] text-[#315596] hover:bg-[#315596]/10 transition-all duration-300">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                  </motion.div>
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex md:hidden items-center space-x-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" className="border-[#315596] text-[#315596] hover:bg-[#315596]/10 transition-all duration-300 px-2">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" className="border-[#315596] text-[#315596] hover:bg-[#315596]/10 transition-all duration-300 px-2">
                      <Download className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="relative cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bell className="w-5 h-5 text-[#315596]" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div 
                        className="w-[29px] h-[29px] bg-gradient-to-br from-[#315596] to-[#2a4a82] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 relative group"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <User className="w-4 h-4 text-white" />
                        
                        {/* Hover glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-[#315596]/50 to-[#2a4a82]/50 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent 
                      align="end" 
                      className="w-48 bg-white border border-gray-200 shadow-xl rounded-lg p-1 mt-2"
                      sideOffset={5}
                    >
                      {/* User Info Header */}
                      <div className="px-3 py-2 border-b border-gray-100">
                        <motion.div 
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-[#315596] to-[#2a4a82] rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.email.split('@')[0]}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Menu Items */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <DropdownMenuItem 
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200"
                          onClick={() => setActiveView('settings')}
                        >
                          <UserCircle className="w-4 h-4 text-gray-500" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem 
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200"
                          onClick={() => setActiveView('settings')}
                        >
                          <Settings className="w-4 h-4 text-gray-500" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </motion.div>

                      <DropdownMenuSeparator className="my-1 border-gray-100" />
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                        <DropdownMenuItem 
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer transition-colors duration-200"
                          onClick={handleSignOut}
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </motion.div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            
            {/* File Info */}
            <div className="bg-[#eef2f8] border border-[#bddeff] rounded p-4 md:p-6">
              <div className="flex items-start space-x-3">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#151515] mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base text-[#151515] font-medium truncate mb-2">
                    {uploadedFile.file.name}
                  </p>
                  
                  {/* Desktop File Details */}
                  <div className="hidden md:flex items-center text-sm text-[#363636] space-x-4 flex-wrap">
                    <span>Uploaded on {uploadedFile.uploadedAt.toLocaleDateString()} at {uploadedFile.uploadedAt.toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <span>•</span>
                    <span>Analysis Status: <span className="text-[#151515] font-semibold">Complete</span></span>
                    <span>•</span>
                    <span>Analyzed by: tdbotthreadanalyser.com</span>
                  </div>

                  {/* Mobile File Details */}
                  <div className="md:hidden space-y-1 text-xs text-[#363636]">
                    <div className="flex items-center space-x-2">
                      <span>{uploadedFile.uploadedAt.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <div>
                      Analysis Status: <span className="text-[#151515] font-semibold">Complete</span>
                    </div>
                  </div>
                </div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
                  <Button 
                    className="bg-[#315596] text-white hover:bg-[#2a4a82] transition-all duration-300 shadow-lg hover:shadow-xl"
                    size={isMobile ? "sm" : "default"}
                    onClick={handleBackToUpload}
                  >
                    <Upload className="w-4 h-4 mr-0 md:mr-2" />
                    <span className="hidden md:inline">Upload New File</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            {/* Interactive Toggle Navigation */}
            <div className="mb-6 md:mb-8">
              <InteractiveToggle 
                activeTab={activeView} 
                onTabChange={(tab) => {
                  setActiveView(tab)
                  if (isMobile) setSidebarOpen(false)
                }}
                isMobile={isMobile}
              />
            </div>
            
            {/* Content based on active view */}
            <motion.div 
              className="space-y-6"
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeView === 'overview' && (
                <DashboardOverview />
              )}
              
              {activeView === 'threads' && (
                <div className="space-y-4 md:space-y-6">
                  <div className="mb-4 md:mb-6">
                    <h2 className="text-lg md:text-xl font-medium">Thread Details</h2>
                    <p className="text-gray-600 text-sm">
                      Detailed view of all threads found in {uploadedFile.file.name}
                    </p>
                  </div>
                  <ThreadsTable isMobile={isMobile} />
                </div>
              )}
              
              {activeView === 'analytics' && (
                <div className="space-y-4 md:space-y-6">
                  <div className="mb-4 md:mb-6">
                    <h2 className="text-lg md:text-xl font-medium">Performance Analytics</h2>
                    <p className="text-gray-600 text-sm">
                      Deep dive into thread performance and bottlenecks from your upload
                    </p>
                  </div>
                  <AnalyticsCharts isMobile={isMobile} />
                  <MetricsOverview isMobile={isMobile} />
                </div>
              )}
              
              {activeView === 'settings' && (
                <SettingsPage
                  user={user}
                  uploadedFile={uploadedFile}
                  onSignOut={handleSignOut}
                  onBackToUpload={handleBackToUpload}
                />
              )}
            </motion.div>
          </div>
        </main>

        {/* Floating AI Assistant Button */}
        <motion.div 
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Enhanced background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-full blur-xl opacity-40"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Secondary glow ring */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-600 rounded-full blur-lg opacity-30"
              animate={{
                scale: [1.2, 1.5, 1.2],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            <Button
              size={isMobile ? "default" : "lg"}
              className={`relative ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-800 text-white rounded-full shadow-2xl border-2 border-emerald-400/50 transition-all duration-300 group-hover:shadow-3xl group-hover:border-emerald-300/70`}
            >
              {/* AI Robot icon with enhanced animations */}
              <motion.div
                className="relative"
                animate={{ 
                  y: [0, -2, 0],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Brain className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                
                {/* Active status indicator */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Thinking particles */}
                <motion.div
                  className="absolute -top-2 -left-2 w-1 h-1 bg-white/80 rounded-full"
                  animate={{
                    y: [-4, -8, -4],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <motion.div
                  className="absolute -top-1 -left-3 w-0.5 h-0.5 bg-white/60 rounded-full"
                  animate={{
                    y: [-2, -6, -2],
                    opacity: [0, 0.8, 0],
                    scale: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8
                  }}
                />
              </motion.div>
            </Button>

            {/* Hover text tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                AI Assistant
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}