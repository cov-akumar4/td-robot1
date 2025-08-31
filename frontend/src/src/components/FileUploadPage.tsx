import { useState, useRef } from 'react'
import svgPaths from "../../imports/svg-l8hl5kmcxt"
import imgAdobeStock1557906731 from "figma:asset/6e35937e3b22e98725808034c34a71705a4298f6.png"
import imgAdobeStock5383188882 from "figma:asset/bd19d4b00cbe140ef7d818b109358510cbe66062.png"
import { Button } from './ui/button'
import { Upload, FileText, Check, BarChart3, Eye, LogOut, User } from 'lucide-react'

interface User {
  email: string
  signedInAt: Date
}

interface FileUploadPageProps {
  onFileUploaded: (file: File) => void
  user?: User
  onSignOut?: () => void
}

// Feature tag components
function FeatureTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[55px] rounded-[6px] border border-[#173141] bg-transparent shadow-[4px_4px_4px_0px_rgba(0,0,0,0.77)] flex items-center justify-center px-6">
      <p className="text-[#d9d9d9] text-[14px] font-normal whitespace-nowrap">
        {children}
      </p>
    </div>
  )
}

// Upload icon component
function UploadIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 40">
        <g>
          <path d={svgPaths.p2be25ec0} stroke="#315596" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p37f52500} stroke="#315596" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M11 23L16 18L21 23" stroke="#315596" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  )
}

// Feature card components with enhanced hover effects
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group h-[247px] w-full max-w-[378px] bg-[#efefef] rounded-[21px] shadow-sm p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-[#315596]/20 hover:scale-105 hover:bg-gradient-to-br hover:from-[#f8f9fa] hover:to-[#e9ecef] hover:-translate-y-2 relative overflow-hidden">
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#315596]/5 to-[#101b30]/5 rounded-[21px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Icon container with hover animation */}
      <div className="relative z-10 w-12 h-12 mb-6 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out">
        <div className="absolute inset-0 bg-[#315596]/10 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out"></div>
        <div className="relative z-10">
          {icon}
        </div>
      </div>
      
      {/* Title with hover effect */}
      <h3 className="relative z-10 text-[16px] font-medium text-[#101010] mb-4 group-hover:text-[#315596] transition-colors duration-300">
        {title}
      </h3>
      
      {/* Description with hover effect */}
      <p className="relative z-10 text-[15px] text-[#474747] leading-normal group-hover:text-[#333] transition-colors duration-300">
        {description}
      </p>
      
      {/* Subtle border animation */}
      <div className="absolute inset-0 rounded-[21px] border-2 border-transparent group-hover:border-[#315596]/20 transition-all duration-300"></div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 rounded-[21px] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      </div>
    </div>
  )
}

// Performance graph icon with enhanced hover effects
function PerformanceIcon() {
  return (
    <svg className="block w-12 h-12 transition-all duration-300 group-hover:drop-shadow-lg" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
      <g>
        <path 
          clipRule="evenodd" 
          d={svgPaths.pe6e1180} 
          fill="#020202" 
          fillRule="evenodd"
          className="transition-all duration-300 group-hover:fill-[#315596]" 
        />
        <path 
          clipRule="evenodd" 
          d={svgPaths.p269a7c60} 
          fill="#2859C5" 
          fillRule="evenodd"
          className="transition-all duration-300 group-hover:fill-[#4a7bc8]"
        />
        <path 
          clipRule="evenodd" 
          d={svgPaths.p201fbf00} 
          fill="#020202" 
          fillRule="evenodd"
          className="transition-all duration-300 group-hover:fill-[#315596]"
        />
      </g>
    </svg>
  )
}

// Bar chart icon with enhanced hover effects
function BarChartIcon() {
  return (
    <svg className="block w-12 h-12 transition-all duration-300 group-hover:drop-shadow-lg" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
      <g>
        <path 
          d={svgPaths.p1f2ddd80} 
          fill="#8FBFFA"
          className="transition-all duration-300 group-hover:fill-[#b3d1fc]"
        />
        <path 
          d={svgPaths.p20a2a480} 
          fill="#2859C5"
          className="transition-all duration-300 group-hover:fill-[#4a7bc8]"
        />
      </g>
    </svg>
  )
}

// Check icon with enhanced hover effects
function CheckIcon() {
  return (
    <svg className="block w-12 h-12 transition-all duration-300 group-hover:drop-shadow-lg" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
      <g>
        <path 
          d={svgPaths.p945b0e0} 
          stroke="#2859C5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="3"
          className="transition-all duration-300 group-hover:stroke-[#4a7bc8] group-hover:stroke-[4]"
        />
      </g>
    </svg>
  )
}



export function FileUploadPage({ onFileUploaded, user, onSignOut }: FileUploadPageProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const validExtensions = ['.txt', '.log', '.dump']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    
    if (!validExtensions.includes(fileExtension)) {
      alert('Please upload a valid thread dump file (.txt, .log, or .dump)')
      return
    }

    setIsUploading(true)
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      onFileUploaded(file)
    }, 2000)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="bg-white relative w-full min-h-screen">
      {/* Hero Section with Background */}
      <div 
        className="relative h-[612px] bg-gradient-to-r from-[#315596] to-[#101b30] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${imgAdobeStock1557906731}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Top Navigation Bar */}
        {user && onSignOut && (
          <div className="absolute top-0 left-0 right-0 z-30 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <div className="flex items-center space-x-3 text-white bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2">
                <User className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-medium truncate max-w-[200px] sm:max-w-none">Welcome, {user.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onSignOut}
                className="text-white border-white bg-white/20 hover:bg-white/30 hover:text-white hover:border-white backdrop-blur-sm transition-all duration-200 font-medium text-xs md:text-sm"
              >
                <LogOut className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-[60px] font-normal text-white mb-4" style={{ fontFamily: 'Italiana, serif' }}>
            TDBOT
          </h1>
          <h2 className="text-[26px] font-normal text-white mb-8">
            Thread Dump Analyzer
          </h2>
          <p className="text-[20px] text-white text-center max-w-4xl leading-normal mb-12">
            Analyze your Java thread dumps with ease, Upload your thread dump files and get detailed insights
            <br />
            into thread states, performance bottlenecks, and application behavior.
          </p>
          
          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-4">
            <FeatureTag>Java Thread Dumps</FeatureTag>
            <FeatureTag>Performance Analysis</FeatureTag>
            <FeatureTag>Deadlock Detection</FeatureTag>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-[#ecf0f3] py-20">
        <div className="max-w-[835px] mx-auto px-6">
          <div className="bg-[#ecf0f3] rounded-[40px] shadow-[0.5px_0.5px_4px_0px_rgba(0,0,0,0.1),-0.5px_-0.5px_1px_0px_rgba(0,0,0,0.05),-10px_-10px_25px_0px_#ffffff,10px_10px_25px_0px_rgba(0,0,0,0.25)] p-6 md:p-12">
            <h2 className="text-[18px] font-normal text-[#101010] text-center mb-12">
              Upload thread Dump
            </h2>
            
            {/* Upload Area */}
            <div 
              className={`h-[244px] rounded-[30px] border border-[rgba(255,255,255,0.84)] bg-[#ecf0f3] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 ${
                isDragOver ? 'shadow-inner bg-blue-50' : 'shadow-[-0.5px_-0.5px_4px_0px_rgba(0,0,0,0.05),-10px_-10px_22px_0px_#ffffff,6px_6px_16px_0px_rgba(0,0,0,0.25)]'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={openFileDialog}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-[#315596] border-t-transparent rounded-full animate-spin" />
                  <p className="text-[16px] text-[#101010]">Uploading...</p>
                </div>
              ) : (
                <>
                  <p className="text-[16px] font-normal text-[#101010] mb-2">
                    Drop your thread dump file here
                  </p>
                  <p className="text-[16px] text-[#8e8e8e] mb-4">or</p>
                  <UploadIcon />
                </>
              )}
            </div>

            {/* File Input and Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="relative w-full max-w-[661px]">
                <div className="bg-[#ecf0f3] h-[45px] w-full rounded-[35px] border border-white shadow-[-1px_-1px_8px_0px_rgba(0,0,0,0.16),1px_1px_8px_0px_rgba(0,0,0,0.16)] flex items-center overflow-hidden">
                  <Button 
                    onClick={openFileDialog}
                    className="relative z-10 ml-4 h-[35px] px-6 rounded-[35px] bg-[#ecf0f3] text-[#101010] text-[16px] font-medium border-0 shadow-[-4px_-4px_5px_0px_rgba(255,255,255,0.88),4px_4px_12px_0px_rgba(0,0,0,0.25)] hover:shadow-[-2px_-2px_3px_0px_rgba(255,255,255,0.88),2px_2px_8px_0px_rgba(0,0,0,0.25)] hover:bg-[#e6eaf0] active:shadow-[inset_2px_2px_5px_0px_rgba(0,0,0,0.2)] transition-all duration-200 flex-shrink-0"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Choose File'}
                  </Button>
                  <span className="ml-4 mr-4 text-[14px] text-[#8e8e8e] font-normal truncate">
                    Supports .txt, .log, and .dump files
                  </span>
                </div>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.log,.dump"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Why Choose TDBOT Section */}
      <div className="bg-gradient-to-r from-[#315596] to-[#101b30] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[30px] font-semibold text-white text-center mb-16">
            Why Choose TDBOT?
          </h2>
          
          {/* Enhanced single-line layout with responsive behavior and staggered animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 justify-items-center">
            <div className="animate-in slide-in-from-bottom-4 duration-700 delay-100">
              <FeatureCard
                icon={<PerformanceIcon />}
                title="Comprehensive Analysis"
                description="Get detailed insights into thread states, CPU usage, and performance metrics."
              />
            </div>
            <div className="animate-in slide-in-from-bottom-4 duration-700 delay-300">
              <FeatureCard
                icon={<BarChartIcon />}
                title="Visual Dashboard"
                description="Interactive charts and graphs make it easy to understand your application's behavior."
              />
            </div>
            <div className="animate-in slide-in-from-bottom-4 duration-700 delay-500">
              <FeatureCard
                icon={<CheckIcon />}
                title="Easy to Use"
                description="Simply upload your thread dump and get instant analysis results."
              />
            </div>
          </div>
          
          {/* Optional decorative elements */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* What you need to know Section - Redesigned */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#315596]/5 to-[#101b30]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-blue-100/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#315596]/3 to-[#101b30]/3 rounded-full blur-[100px] -z-10"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6">
              <div className="bg-gradient-to-r from-[#315596] to-[#101b30] text-white px-6 py-2 rounded-full">
                <span className="text-[14px] font-medium">Essential Information</span>
              </div>
            </div>
            <h2 className="text-[36px] font-semibold text-gray-900 mb-4">
              What you need to know?
            </h2>
            <p className="text-[18px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive thread dump analysis made simple with powerful insights and professional reporting capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            {/* Left side - Enhanced Feature List */}
            <div className="lg:col-span-3 space-y-6">
              <div className="animate-in slide-in-from-left-4 duration-500 delay-100">
                <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-white/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#315596]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-[#315596] to-[#101b30] rounded-xl flex items-center justify-center shadow-lg">
                      <Upload className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[20px] font-semibold text-gray-900 mb-3">Upload Thread Dump Files</h3>
                      <p className="text-[16px] text-gray-600 leading-relaxed">Easily upload one or multiple thread dump files for comprehensive analysis and insights with our advanced processing engine.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-in slide-in-from-left-4 duration-500 delay-200">
                <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-white/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#315596]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-[#315596] to-[#101b30] rounded-xl flex items-center justify-center shadow-lg">
                      <Eye className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[20px] font-semibold text-gray-900 mb-3">Instant Analysis</h3>
                      <p className="text-[16px] text-gray-600 leading-relaxed">Receive detailed insights within seconds of uploading, with automatic parsing, processing, and intelligent pattern recognition.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-in slide-in-from-left-4 duration-500 delay-300">
                <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-white/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#315596]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-[#315596] to-[#101b30] rounded-xl flex items-center justify-center shadow-lg">
                      <BarChart3 className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[20px] font-semibold text-gray-900 mb-3">Interactive Report Viewer</h3>
                      <p className="text-[16px] text-gray-600 leading-relaxed">Navigate through comprehensive, user-friendly analysis reports with visual charts, metrics, and detailed breakdowns.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-in slide-in-from-left-4 duration-500 delay-400">
                <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-white/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#315596]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-[#315596] to-[#101b30] rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[20px] font-semibold text-gray-900 mb-3">Thread Status Segmentation</h3>
                      <p className="text-[16px] text-gray-600 leading-relaxed">View each thread status in dedicated windows for better clarity, detailed examination, and organized analysis.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-in slide-in-from-left-4 duration-500 delay-500">
                <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-white/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#315596]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-[#315596] to-[#101b30] rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[20px] font-semibold text-gray-900 mb-3">Export to PDF</h3>
                      <p className="text-[16px] text-gray-600 leading-relaxed">Download complete analysis reports in professionally formatted PDF documents for sharing and documentation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Sophisticated Illustration */}
            <div className="lg:col-span-2 flex justify-center animate-in slide-in-from-right-4 duration-700 delay-300">
              <div className="relative">
                {/* Main illustration container with sophisticated shadows */}
                <div className="relative">
                  {/* Multiple layered shadows for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#315596]/10 to-[#101b30]/5 rounded-3xl blur-xl transform rotate-1 scale-105"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-blue-200/20 to-transparent rounded-3xl blur-2xl transform -rotate-1 scale-110"></div>
                  
                  {/* Image container */}
                  <div className="relative bg-white rounded-3xl p-6 shadow-2xl shadow-gray-300/30">
                    {/* Header section */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#315596] to-[#101b30] rounded-full mb-3 shadow-lg">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-[16px] font-semibold text-gray-900 mb-2">Thread Analysis Dashboard</h4>
                      <p className="text-[13px] text-gray-600 leading-relaxed max-w-sm mx-auto">
                        Real-time visualization of thread states, performance metrics, and comprehensive system insights
                      </p>
                    </div>
                    
                    {/* Main illustration */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src={imgAdobeStock5383188882} 
                        alt="Interactive thread analysis dashboard showing real-time metrics, thread state visualizations, performance charts, deadlock detection results, and comprehensive system monitoring interfaces used by Java developers for debugging and performance optimization"
                        className="w-full h-auto max-w-[450px] lg:max-w-[500px] min-h-[300px] lg:min-h-[400px] object-cover"
                      />
                      
                      {/* Overlay gradient for better text visibility if needed */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                    </div>
                    
                    {/* Bottom description */}
                    <div className="mt-6 text-center">
                      <p className="text-[12px] text-gray-500 leading-relaxed max-w-md mx-auto">
                        Advanced dashboard displays comprehensive thread dump analysis including performance bottlenecks, 
                        deadlock detection, and detailed system metrics for optimal Java application monitoring.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Floating feature badges */}
                <div className="absolute -top-4 -left-6 animate-in slide-in-from-left-4 duration-700 delay-700">
                  <div className="bg-white shadow-xl shadow-gray-200/50 rounded-full px-4 py-2 border border-gray-100">
                    <span className="text-[11px] font-medium text-[#315596]">Real-time Analysis</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-6 animate-in slide-in-from-right-4 duration-700 delay-900">
                  <div className="bg-white shadow-xl shadow-gray-200/50 rounded-full px-4 py-2 border border-gray-100">
                    <span className="text-[11px] font-medium text-[#315596]">Performance Insights</span>
                  </div>
                </div>
                
                <div className="absolute top-1/3 -left-8 animate-in slide-in-from-left-4 duration-700 delay-800 hidden xl:block">
                  <div className="bg-white shadow-xl shadow-gray-200/50 rounded-full px-4 py-2 border border-gray-100">
                    <span className="text-[11px] font-medium text-[#315596]">Thread Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-[#315596] to-[#101b30] py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h3 className="text-[32px] font-normal text-white mb-2" style={{ fontFamily: 'Italiana, serif' }}>
              TDBOT
            </h3>
            <p className="text-[16px] text-white">Thread Dump Analyzer</p>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-[7px] h-[7px] bg-white rounded-full" />
              <span className="text-[16px] text-white">Java Thread Dumps</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[7px] h-[7px] bg-white rounded-full" />
              <span className="text-[16px] text-white">Performance Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[7px] h-[7px] bg-white rounded-full" />
              <span className="text-[16px] text-white">Deadlock Detection</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 mb-8" />

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-12 mb-8">
            <span className="text-[16px] text-white hover:text-gray-300 cursor-pointer transition-colors duration-200">About Us</span>
            <span className="text-[16px] text-white hover:text-gray-300 cursor-pointer transition-colors duration-200">Contact Us</span>
            <span className="text-[16px] text-white hover:text-gray-300 cursor-pointer transition-colors duration-200">Services</span>
            <span className="text-[16px] text-white hover:text-gray-300 cursor-pointer transition-colors duration-200">Support</span>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 mb-8">
            {/* Facebook */}
            <div className="w-[30px] h-[30px] cursor-pointer hover:scale-110 transition-transform">
              <svg viewBox="0 0 30 30" fill="white">
                <path d={svgPaths.p156b2100} />
              </svg>
            </div>
            {/* Twitter */}
            <div className="w-[30px] h-[30px] cursor-pointer hover:scale-110 transition-transform">
              <svg viewBox="0 0 30 30" fill="white">
                <path d={svgPaths.p2d014900} />
              </svg>
            </div>
            {/* LinkedIn */}
            <div className="w-[30px] h-[30px] cursor-pointer hover:scale-110 transition-transform">
              <svg viewBox="0 0 30 30" fill="white">
                <path d={svgPaths.p82e2400} />
              </svg>
            </div>
            {/* YouTube */}
            <div className="w-[30px] h-[30px] cursor-pointer hover:scale-110 transition-transform">
              <svg viewBox="0 0 30 30" fill="white">
                <path d={svgPaths.p21209800} />
              </svg>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex justify-center gap-4 mb-6">
            <span className="text-[16px] text-white hover:text-gray-300 cursor-pointer">Terms & Conditions</span>
            <span className="text-[16px] text-white">|</span>
            <span className="text-[16px] text-white hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="text-[16px] text-white">|</span>
            <span className="text-[16px] text-white hover:text-gray-300 cursor-pointer">Disclosures</span>
          </div>

          {/* Copyright */}
          <div className="flex justify-center items-center gap-2">
            <div className="w-4 h-4">
              <svg viewBox="0 0 16 16" fill="white">
                <path d={svgPaths.p2a476d40} />
                <path d={svgPaths.p37ab0b80} />
              </svg>
            </div>
            <span className="text-[14px] text-white">2025 WIPRO LTD. All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  )
}