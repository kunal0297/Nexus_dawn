import React, { createContext, useContext, useEffect, useState } from 'react';
import { OracleEvent, subscribeToOracleEvents, fetchRecentOracleEvents } from '../services/supabaseService';

interface OracleEventContextType {
  latestEvent: OracleEvent | null;
  allEvents: OracleEvent[];
}

const OracleEventContext = createContext<OracleEventContextType | undefined>(undefined);

export const OracleEventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [latestEvent, setLatestEvent] = useState<OracleEvent | null>(null);
  const [allEvents, setAllEvents] = useState<OracleEvent[]>([]);

  useEffect(() => {
    fetchRecentOracleEvents().then(events => {
      setAllEvents(events);
      setLatestEvent(events[0] || null);
    });
    const sub = subscribeToOracleEvents((event) => {
      setLatestEvent(event);
      setAllEvents(prev => [event, ...prev].slice(0, 10));
    });
    return () => { sub.unsubscribe(); };
  }, []);

  return (
    <OracleEventContext.Provider value={{ latestEvent, allEvents }}>
      {children}
    </OracleEventContext.Provider>
  );
};

export const useOracleEvent = () => {
  const ctx = useContext(OracleEventContext);
  if (!ctx) throw new Error('useOracleEvent must be used within OracleEventProvider');
  return ctx;
}; 