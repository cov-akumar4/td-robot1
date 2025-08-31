export interface ThreadData {
  cpu_ms: number
  elapsed_s: number
  id: string
  memory: string
  name: string
  nid: string
  os_priority: string
  priority: string
  state: string
  status: string
  tid: string
}

// 1️ Thread state counts
export const getThreadStateData = (threads: ThreadData[]) => {
  const counts: Record<string, number> = {}
  threads.forEach(t => {
    const state = t.state.split(' ')[0] // get main state like RUNNABLE, WAITING
    counts[state] = (counts[state] || 0) + 1
  })
  return Object.entries(counts).map(([name, count]) => ({ name, value: count, count }))
}

// 2️ Performance over time (simplified example)
export const getPerformanceOverTime = (threads: ThreadData[]) => {
  // Assuming each thread has elapsed_s and cpu_ms, we can group by some time interval
  // Here we just simulate time intervals for demo purposes
  const intervals = ['00:00','00:15','00:30','00:45','01:00','01:15','01:30']
  return intervals.map((time, i) => {
    const thread = threads[i % threads.length]
    return {
      time,
      cpu: Math.round(thread.cpu_ms),
      memory: Math.floor(Math.random() * 100), // placeholder for memory %
      threads: threads.length
    }
  })
}

// 3️ Top threads by CPU time
export const getTopThreadsByCpuTime = (threads: ThreadData[], topN = 5) => {
  return [...threads]
    .sort((a, b) => b.cpu_ms - a.cpu_ms)
    .slice(0, topN)
    .map(t => ({ name: t.name, cpuTime: Math.round(t.cpu_ms), blockedTime: 0 })) // blockedTime can be computed if available
}

// 4️ Simplified threadStateData (RUNNING, WAITING, BLOCKED, TIMED_WAITING)
export const getThreadStateSummary = (threads: ThreadData[]) => {
  const summary: Record<string, number> = { RUNNING: 0, WAITING: 0, BLOCKED: 0, TIMED_WAITING: 0, TERMINATED: 0 }
  threads.forEach(t => {
    const state = t.state.split(' ')[0].toUpperCase()
    if (summary[state] !== undefined) summary[state] += 1
  })
  return Object.entries(summary).map(([name, count]) => ({ name, value: count, count }))
}

// 5️ Performance data (CPU & Memory for charts)
export const getPerformanceData = (threads: ThreadData[]) => {
  return threads.map(t => ({
    time: `00:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    cpu: Math.round(t.cpu_ms),
    memory: Math.floor(Math.random() * 100)
  }))
}

// 6️ Top threads data (simpler version for charts)
export const getTopThreadsData = (threads: ThreadData[], topN = 5) => {
  return [...threads]
    .sort((a, b) => b.cpu_ms - a.cpu_ms)
    .slice(0, topN)
    .map(t => ({ name: t.name, cpuTime: Math.round(t.cpu_ms) }))
}
