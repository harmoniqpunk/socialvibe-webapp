export interface TwitterUser {
  name: string;
  author: string;
  avatar: string;
}

export interface Tweet {
  id: number | string;
  name: string;
  author: string;
  content: string;
  engagement: number;
  likes: number;
  retweets: number;
  replies: number;
  impressions: number;
  timestamp: string | number; // number for latest posts (Date.now()), string for trending
  priority: 'high' | 'medium' | 'low';
  avatar: string;
}

export interface ReplyOption {
  id: string; // Or number
  text: string;
}

export interface Post {
  id: number;
  name: string;
  author: string;
  content: string;
  engagement: number;
  likes: number;
  retweets: number;
  replies: number;
  impressions: number;
  timestamp: number | string;
  priority: 'high' | 'medium' | 'low';
  avatar: string;
}

export interface MockAccount {
  name: string;
  author: string;
  avatar: string;
  contentTemplates: string[];
}

export type ListType = 'latest' | 'trending'; 