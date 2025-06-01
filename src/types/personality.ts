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
  posts: RedditPost[];
  comments: RedditComment[];
}

export interface PersonalityWeights {
  creativity: number;
  analytical: number;
  emotional: number;
  social: number;
  technical: number;
  philosophical: number;
}

export interface PersonalityShard {
  username: string;
  weights: PersonalityWeights;
  embedding: number[];
  timestamp: number;
  version: number;
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