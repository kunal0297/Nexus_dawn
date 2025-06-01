import React, { createContext, useContext, useState, useCallback } from 'react';

interface Memory {
  timestamp: string;
  mood: 'happy' | 'sad' | 'angry' | 'fearful' | 'neutral';
  intensity: number;
  content: string;
}

interface StoryChoice {
  timestamp: string;
  impact: number;
  description: string;
}

interface PsychologicalStateContextType {
  memories: Memory[];
  storyChoices: StoryChoice[];
  addMemory: (memory: Omit<Memory, 'timestamp'>) => void;
  addStoryChoice: (choice: Omit<StoryChoice, 'timestamp'>) => void;
}

const PsychologicalStateContext = createContext<PsychologicalStateContextType | undefined>(undefined);

export const PsychologicalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [storyChoices, setStoryChoices] = useState<StoryChoice[]>([]);

  const addMemory = useCallback((memory: Omit<Memory, 'timestamp'>) => {
    setMemories(prev => [...prev, { ...memory, timestamp: new Date().toISOString() }]);
  }, []);

  const addStoryChoice = useCallback((choice: Omit<StoryChoice, 'timestamp'>) => {
    setStoryChoices(prev => [...prev, { ...choice, timestamp: new Date().toISOString() }]);
  }, []);

  return (
    <PsychologicalStateContext.Provider value={{ memories, storyChoices, addMemory, addStoryChoice }}>
      {children}
    </PsychologicalStateContext.Provider>
  );
};

export const usePsychologicalState = () => {
  const context = useContext(PsychologicalStateContext);
  if (context === undefined) {
    throw new Error('usePsychologicalState must be used within a PsychologicalStateProvider');
  }
  return context;
}; 