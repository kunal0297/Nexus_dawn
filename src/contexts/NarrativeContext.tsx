import React, { createContext, useContext, useState, useEffect } from 'react';
import { narrativeService } from '../services/NarrativeService';
import { NarrativeContext as INarrativeContext, NarrativeState, NarrativeChoice } from '../types/narrative';

const NarrativeContext = createContext<INarrativeContext | null>(null);

export const useNarrative = () => {
  const context = useContext(NarrativeContext);
  if (!context) {
    throw new Error('useNarrative must be used within a NarrativeProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
  userId: string;
}

export const NarrativeProvider: React.FC<Props> = ({ children, userId }) => {
  const [state, setState] = useState<NarrativeState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNarrative();
  }, [userId]);

  const loadNarrative = async () => {
    try {
      setLoading(true);
      setError(null);
      const narrativeState = await narrativeService.getNarrativeState(userId);
      
      if (!narrativeState) {
        // Initialize new narrative if none exists
        const newState = await narrativeService.initializeNarrative(userId);
        setState(newState);
      } else {
        setState(narrativeState);
      }
    } catch (err) {
      setError('Failed to load narrative state');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const makeChoice = async (choice: NarrativeChoice) => {
    if (!state) return;

    try {
      setLoading(true);
      setError(null);
      const newFork = await narrativeService.createNarrativeFork(state, choice);
      
      setState(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentForkId: newFork.id,
          forks: [...prev.forks, newFork],
          worldState: {
            ...prev.worldState,
            ...newFork.worldState
          },
          lastUpdated: Date.now()
        };
      });
    } catch (err) {
      setError('Failed to make choice');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetNarrative = async () => {
    try {
      setLoading(true);
      setError(null);
      const newState = await narrativeService.initializeNarrative(userId);
      setState(newState);
    } catch (err) {
      setError('Failed to reset narrative');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const value: INarrativeContext = {
    state,
    loading,
    error,
    makeChoice,
    resetNarrative
  };

  return (
    <NarrativeContext.Provider value={value}>
      {children}
    </NarrativeContext.Provider>
  );
}; 