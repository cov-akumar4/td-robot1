import React, { createContext, useContext, useState, ReactNode } from "react";

// Thread type
export type Thread = {
  cpu_ms: number;
  elapsed_s: number;
  id: string;
  name: string;
  state: string;
  status: string;
  tid: string;
  memory: string;
  priority: string;
};

// Context type
type ApiContextType = {
  threads: Thread[];
  threadCount: number;
  setThreadsData: (data: { threads: Thread[]; threadCount: number }) => void;
};

// Create context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Provider
export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [threadCount, setThreadCount] = useState<number>(0);

  const setThreadsData = ({ threads, threadCount }: { threads: Thread[]; threadCount: number }) => {
    setThreads(threads);
    setThreadCount(threadCount);
  };

  return (
    <ApiContext.Provider value={{ threads, threadCount, setThreadsData }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useApi must be used within ApiProvider");
  return context;
};
