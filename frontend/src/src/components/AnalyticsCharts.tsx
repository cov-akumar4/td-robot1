import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import {
  getThreadStateData,
  getPerformanceData,
  getTopThreadsData
} from '../../utils/threadHelper'
import { useApi } from "../../contexts/ApiContext";

interface AnalyticsChartsProps {
  isMobile?: boolean
}

export function AnalyticsCharts({ isMobile = false }: AnalyticsChartsProps) {
  const { threads } = useApi() as { threads: any[] }

  function processThreadData(threads: any[], interval: number = 30, topN: number = 5): any {
    // --- 1. Normalize thread states ---
    const normalizeState = (state: string): string => {
      if (state.includes('RUNNABLE')) return 'RUNNING';
      if (state.includes('WAITING')) return 'WAITING';
      if (state.includes('BLOCKED')) return 'BLOCKED';
      if (state.includes('TIMED_WAITING')) return 'TIMED_WAITING';
      return 'OTHER';
    };

    // --- 2. Thread state summary ---
    const threadStateData: any[] = Object.values(
      threads.reduce((acc: any, thread: any) => {
        const state = normalizeState(thread.state);
        if (!acc[state]) acc[state] = { name: state, value: 0 };
        acc[state].value += 1;
        return acc;
      }, {})
    );

    // --- 2. Performance summary with at least `performancePoints` elements ---
    const performanceData: any[] = [];
    const chunkSize = Math.ceil(threads.length / topN);

    for (let i = 0; i < topN; i++) {
      const chunk = threads.slice(i * chunkSize, (i + 1) * chunkSize);
      if (chunk.length === 0) continue;

      const totalCpu = chunk.reduce((sum, th) => sum + th.cpu_ms, 0);
      const totalMemory = chunk.reduce((sum, th) => sum + parseInt(th.memory, 16), 0);

      // Simulate time labels
      const minutes = Math.floor(i * 0.5).toString().padStart(2, '0'); // 30s intervals
      const seconds = (i * 30 % 60).toString().padStart(2, '0');

      performanceData.push({
        time: `${minutes}:${seconds}`,
        cpu: parseFloat((totalCpu / chunk.length).toFixed(2)),
        memory: parseFloat((totalMemory / chunk.length).toFixed(2))
      });
    }

    // --- 4. Top threads by CPU time ---
    const topThreadsData: any[] = threads
      .map((thread: any) => ({ name: thread.name, cpuTime: thread.cpu_ms }))
      .sort((a: any, b: any) => b.cpuTime - a.cpuTime)
      .slice(0, topN);

    return { threadStateData, performanceData, topThreadsData };
  }



  const { threadStateData, performanceData, topThreadsData } = processThreadData(threads);
  console.log({ threadStateData, performanceData, topThreadsData });

  const COLORS = ['#315596', '#2a4a82', '#3d6bb3', '#4a7bc8']

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-4 md:gap-6`}>
      {/* Thread States Distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg">Thread States</CardTitle>
          <CardDescription className="text-sm">Thread state distribution</CardDescription>
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

      {/* Performance Over Time */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg">Performance Metrics</CardTitle>
          <CardDescription className="text-sm">CPU and Memory over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 280}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} axisLine={{ stroke: '#d0d0d0' }} />
              <YAxis tick={{ fontSize: 12 }} axisLine={{ stroke: '#d0d0d0' }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <Line type="monotone" dataKey="cpu" stroke="#315596" strokeWidth={2} dot={{ fill: '#315596', r: 3 }} name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#2a4a82" strokeWidth={2} dot={{ fill: '#2a4a82', r: 3 }} name="Memory %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Threads by CPU Time */}
      <Card className={isMobile ? '' : 'lg:col-span-2'}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg">Top Threads by CPU Time</CardTitle>
          <CardDescription className="text-sm">Highest CPU consuming threads</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 280}>
            <BarChart data={topThreadsData} margin={{ top: 20, right: 30, left: 20, bottom: isMobile ? 60 : 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={isMobile ? 80 : 60}
                tick={{ fontSize: 10 }}
                axisLine={{ stroke: '#d0d0d0' }}
              />
              <YAxis tick={{ fontSize: 12 }} axisLine={{ stroke: '#d0d0d0' }} />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }} formatter={(value) => [`${value} ms`, 'CPU Time']} />
              <Bar dataKey="cpuTime" fill="#315596" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
