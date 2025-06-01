export interface NarrativeChoice {
  id: string;
  text: string;
  impact: string;
}

export interface StoryFork {
  id: string;
  parentId: string | null;
  description: string;
  choices: NarrativeChoice[];
  worldState: Record<string, any>;
  timestamp: number;
}

export interface NarrativeState {
  userId: string;
  currentForkId: string;
  forks: StoryFork[];
  worldState: Record<string, any>;
  createdAt: number;
  lastUpdated: number;
}

export interface TimelineNode {
  id: string;
  parentId: string | null;
  description: string;
  timestamp: number;
  x: number;
  y: number;
  children: TimelineNode[];
}

export interface NarrativeContext {
  state: NarrativeState | null;
  loading: boolean;
  error: string | null;
  makeChoice: (choice: NarrativeChoice) => Promise<void>;
  resetNarrative: () => Promise<void>;
} 