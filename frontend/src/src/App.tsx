import { useState } from 'react'
import { SignInPage } from './components/SignInPage'
import { LandingPage } from './components/LandingPage'
import { Sidebar } from './components/Sidebar'
import { DashboardHeader } from './components/DashboardHeader'
import { MetricsOverview } from './components/MetricsOverview'
import { ThreadsTable } from './components/ThreadsTable'
import { AnalyticsCharts } from './components/AnalyticsCharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Button } from './components/ui/button'
import { ArrowLeft, FileText, LogOut } from 'lucide-react'

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

  // Show landing page if user is authenticated but no file uploaded
  if (!showDashboard || !uploadedFile) {
    return (
      <div>
        {/* Top navigation bar for authenticated landing page */}
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h2>Thread Analyzer</h2>
              <div className="text-muted-foreground">
                Welcome, {user.email}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
        <LandingPage onFileUploaded={handleFileUploaded} />
      </div>
    )
  }

  // Show dashboard after file upload
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeView={activeView} setActiveView={setActiveView} user={user} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          uploadedFile={uploadedFile} 
          onUploadNew={handleBackToUpload}
          user={user}
          onSignOut={handleSignOut}
        />
        
        {/* File Info Banner */}
        <div className="bg-muted/50 border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{uploadedFile.file.name}</p>
                <p className="text-muted-foreground">
                  Uploaded on {uploadedFile.uploadedAt.toLocaleDateString()} at {uploadedFile.uploadedAt.toLocaleTimeString()}
                  {' • '}
                  {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                  {' • '}
                  Analysis Status: <span className="text-primary font-medium">Complete</span>
                  {' • '}
                  Analyzed by: {user.email}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleBackToUpload}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Upload New File
            </Button>
          </div>
        </div>
        
        <main className="flex-1 overflow-auto p-6">
          <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="threads">Threads</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="mb-6">
                <h2>Thread Dump Analysis Results</h2>
                <p className="text-muted-foreground">
                  Complete analysis of {uploadedFile.file.name} • Found critical performance insights
                </p>
              </div>
              <MetricsOverview />
              <AnalyticsCharts />
            </TabsContent>
            
            <TabsContent value="threads" className="space-y-6">
              <div className="mb-6">
                <h2>Thread Details</h2>
                <p className="text-muted-foreground">
                  Detailed view of all threads found in {uploadedFile.file.name}
                </p>
              </div>
              <ThreadsTable />
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <div className="mb-6">
                <h2>Performance Analytics</h2>
                <p className="text-muted-foreground">
                  Deep dive into thread performance and bottlenecks from your upload
                </p>
              </div>
              <AnalyticsCharts />
              <MetricsOverview />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h2>Analysis Settings</h2>
                  <p className="text-muted-foreground">Configure your thread analysis preferences and account settings</p>
                </div>
                
                <div className="grid gap-6 max-w-2xl">
                  <div className="space-y-4">
                    <h3>Account Information</h3>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.email}</p>
                          <p className="text-muted-foreground">
                            Signed in on {user.signedInAt.toLocaleDateString()} at {user.signedInAt.toLocaleTimeString()}
                          </p>
                        </div>
                        <Button variant="outline" onClick={handleSignOut}>
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3>Current File</h3>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{uploadedFile.file.name}</p>
                          <p className="text-muted-foreground">
                            {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB • 
                            Uploaded {uploadedFile.uploadedAt.toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="outline" onClick={handleBackToUpload}>
                          Replace File
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3>Analysis Configuration</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Deadlock Detection</p>
                          <p className="text-muted-foreground">Automatically identify potential deadlocks</p>
                        </div>
                        <div className="text-primary font-medium">Enabled</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Performance Analysis</p>
                          <p className="text-muted-foreground">Analyze thread response times and bottlenecks</p>
                        </div>
                        <div className="text-primary font-medium">Enabled</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Lock Contention Analysis</p>
                          <p className="text-muted-foreground">Examine lock contention and blocking</p>
                        </div>
                        <div className="text-primary font-medium">Enabled</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Memory Analysis</p>
                          <p className="text-muted-foreground">Analyze memory usage patterns</p>
                        </div>
                        <div className="text-primary font-medium">Enabled</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3>Export Options</h3>
                    <div className="flex gap-2">
                      <Button variant="outline">Export PDF Report</Button>
                      <Button variant="outline">Export JSON Data</Button>
                      <Button variant="outline">Export CSV</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}