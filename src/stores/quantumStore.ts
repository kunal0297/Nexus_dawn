import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuantumSnapshot {
  id: string;
  timestamp: string;
  parentId: string | null;
  state: {
    memories: Memory[];
    storyChoices: StoryChoice[];
    currentView: string;
    messages: Message[];
  };
  metadata: {
    description: string;
    tags: string[];
    branchName?: string;
  };
}

interface QuantumState {
  snapshots: QuantumSnapshot[];
  currentSnapshotId: string | null;
  addSnapshot: (snapshot: Omit<QuantumSnapshot, 'id' | 'timestamp'>) => void;
  forkFromSnapshot: (snapshotId: string, newState: Partial<QuantumSnapshot['state']>) => void;
  deleteSnapshot: (snapshotId: string) => void;
  setCurrentSnapshot: (snapshotId: string) => void;
}

export const useQuantumStore = create<QuantumState>()(
  persist(
    (set) => ({
      snapshots: [],
      currentSnapshotId: null,

      addSnapshot: (snapshot) => set((state) => {
        const newSnapshot: QuantumSnapshot = {
          ...snapshot,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        };
        return {
          snapshots: [...state.snapshots, newSnapshot],
          currentSnapshotId: newSnapshot.id,
        };
      }),

      forkFromSnapshot: (snapshotId, newState) => set((state) => {
        const parentSnapshot = state.snapshots.find(s => s.id === snapshotId);
        if (!parentSnapshot) return state;

        const newSnapshot: QuantumSnapshot = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          parentId: snapshotId,
          state: {
            ...parentSnapshot.state,
            ...newState,
          },
          metadata: {
            ...parentSnapshot.metadata,
            branchName: `${parentSnapshot.metadata.branchName || 'main'}-${Date.now()}`,
          },
        };

        return {
          snapshots: [...state.snapshots, newSnapshot],
          currentSnapshotId: newSnapshot.id,
        };
      }),

      deleteSnapshot: (snapshotId) => set((state) => ({
        snapshots: state.snapshots.filter(s => s.id !== snapshotId),
        currentSnapshotId: state.currentSnapshotId === snapshotId ? null : state.currentSnapshotId,
      })),

      setCurrentSnapshot: (snapshotId) => set(() => ({
        currentSnapshotId: snapshotId,
      })),
    }),
    {
      name: 'quantum-storage',
    }
  )
); 