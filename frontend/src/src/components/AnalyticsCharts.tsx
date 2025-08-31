import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

interface AnalyticsChartsProps {
  isMobile?: boolean
}

export function AnalyticsCharts({ isMobile = false }: AnalyticsChartsProps) {
  // Simple mock data for charts - Version 12 style
  const threadStateData = [
    { name: 'RUNNING', value: 45 },
    { name: 'WAITING', value: 89 },
    { name: 'BLOCKED', value: 23 },
    { name: 'TIMED_WAITING', value: 67 }
  ]

  const performanceData = [
    { time: '00:00', cpu: 45, memory: 67 },
    { time: '00:30', cpu: 52, memory: 71 },
    { time: '01:00', cpu: 48, memory: 69 },
    { time: '01:30', cpu: 61, memory: 73 },
    { time: '02:00', cpu: 58, memory: 75 }
  ]

  const topThreadsData = [
    { name: 'GC-Thread', cpuTime: 3456 },
    { name: 'HTTP-Handler', cpuTime: 2341 },
    { name: 'main', cpuTime: 1234 },
    { name: 'Worker-1', cpuTime: 856 },
    { name: 'DB-Pool', cpuTime: 456 }
  ]

  const COLORS = ['#315596', '#2a4a82', '#3d6bb3', '#4a7bc8']

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-4 md:gap-6`}>
      {/* Thread States Distribution - Simplified */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg">Thread States</CardTitle>
          <CardDescription className="text-sm">
            Thread state distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 280}>
            <PieChart>
              <Pie
                data={threadStateData}
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 60 : 80}
                fill="#315596"
                dataKey="value"
              >
                {threadStateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} threads`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Simple legend */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
            {threadStateData.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Over Time - Simplified */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg">Performance Metrics</CardTitle>
          <CardDescription className="text-sm">
            CPU and Memory over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 280}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#d0d0d0' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#d0d0d0' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke="#315596" 
                strokeWidth={2}
                dot={{ fill: '#315596', strokeWidth: 0, r: 3 }}
                name="CPU %"
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke="#2a4a82" 
                strokeWidth={2}
                dot={{ fill: '#2a4a82', strokeWidth: 0, r: 3 }}
                name="Memory %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Threads by CPU Time - Simplified */}
      <Card className={isMobile ? '' : 'lg:col-span-2'}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg">Top Threads by CPU Time</CardTitle>
          <CardDescription className="text-sm">
            Highest CPU consuming threads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 280}>
            <BarChart 
              data={topThreadsData} 
              margin={{ top: 20, right: 30, left: 20, bottom: isMobile ? 60 : 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={isMobile ? 80 : 60}
                tick={{ fontSize: 10 }}
                axisLine={{ stroke: '#d0d0d0' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#d0d0d0' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                formatter={(value) => [`${value} ms`, 'CPU Time']}
              />
              <Bar 
                dataKey="cpuTime" 
                fill="#315596" 
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}