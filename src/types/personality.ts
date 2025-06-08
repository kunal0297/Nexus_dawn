export interface RedditPost {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  subreddit: string;
  score: number;
}

export interface RedditComment {
  id: string;
  content: string;
  timestamp: number;
  subreddit: string;
  score: number;
}

export interface UserActivity {
  type: 'post' | 'comment';
  content: string;
  timestamp: number;
  subreddit?: string;
  karma?: number;
}

export interface PersonalityWeights {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface PersonalityShard {
  id: string;
  content: string;
  traits: string[];
  emotionalWeight: number;
  timestamp: number;
}

export interface PersonalityEvolution {
  previousShard: PersonalityShard;
  newShard: PersonalityShard;
  changes: {
    dimension: keyof PersonalityWeights;
    oldValue: number;
    newValue: number;
    percentageChange: number;
  }[];
} 