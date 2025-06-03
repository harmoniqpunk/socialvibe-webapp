// src/lib/stores/mockDataStore.ts
import { writable, get } from 'svelte/store';
import type { Post, MockAccount } from '$lib/types/twitter';

export interface Post {
  id: number | string;
  name: string;
  author: string;
  content: string;
  engagement: number;
  likes: number;
  retweets: number;
  replies: number;
  impressions: number;
  timestamp: string | number;
  priority: 'high' | 'medium' | 'low' | string;
  avatar: string;
  isReplying?: boolean;
}

export interface Account {
  name: string;
  author: string;
  avatar: string;
  contentTemplates: string[];
}

// Mock data for trending posts (historical, high engagement)
const trendingPostsDataStoreData: Post[] = [
  {
    id: 1,
    name: 'Elon Musk',
    author: '@elonmusk',
    content: 'Just shipped a major update to the Mars colonization timeline. Thoughts?',
    engagement: 15420,
    likes: 8500,
    retweets: 3200,
    replies: 2100,
    impressions: 450000,
    timestamp: '2h ago',
    priority: 'high',
    avatar: '🚀'
  },
  {
    id: 2,
    name: 'Naval Ravikant',
    author: '@naval',
    content: 'The best investment you can make is in yourself. Skills compound faster than money.',
    engagement: 12800,
    likes: 7200,
    retweets: 2800,
    replies: 1900,
    impressions: 380000,
    timestamp: '4h ago',
    priority: 'high',
    avatar: '⚓'
  },
  {
    id: 3,
    name: 'Sam Altman',
    author: '@sama',
    content: 'AI progress is accelerating. What we thought would take 5 years might happen in 2.',
    engagement: 9600,
    likes: 5400,
    retweets: 2100,
    replies: 1400,
    impressions: 290000,
    timestamp: '6h ago',
    priority: 'medium',
    avatar: '🤖'
  },
  {
    id: 4,
    name: 'Marc Andreessen',
    author: '@pmarca',
    content: 'Thread: Why startups should focus on product-market fit before scaling...',
    engagement: 7200,
    likes: 4100,
    retweets: 1800,
    replies: 1100,
    impressions: 220000,
    timestamp: '8h ago',
    priority: 'medium',
    avatar: '💡'
  },
  {
    id: 5,
    name: 'Balaji Srinivasan',
    author: '@balajis',
    content: 'Decentralization is not just about technology. It\'s about human freedom.',
    engagement: 5800,
    likes: 3200,
    retweets: 1400,
    replies: 900,
    impressions: 180000,
    timestamp: '12h ago',
    priority: 'low',
    avatar: '🗽'
  }
];

// Mock data for latest posts (live feed simulation)
const initialLatestPostsDataStoreData: Post[] = [
  {
    id: 101,
    name: 'Elon Musk',
    author: '@elonmusk',
    content: 'Excited to announce a new Starlink milestone!',
    engagement: 1200,
    likes: 800,
    retweets: 200,
    replies: 100,
    impressions: 20000,
    timestamp: Date.now(),
    priority: 'low',
    avatar: '🚀'
  },
  {
    id: 102,
    name: 'Naval Ravikant',
    author: '@naval',
    content: 'Happiness is a choice and a skill. You can cultivate it.',
    engagement: 900,
    likes: 600,
    retweets: 180,
    replies: 80,
    impressions: 15000,
    timestamp: Date.now(),
    priority: 'low',
    avatar: '⚓'
  }
];

// Mock accounts for live feed simulation
const mockAccountsStoreData: MockAccount[] = [
  {
    name: 'Elon Musk',
    author: '@elonmusk',
    avatar: '🚀',
    contentTemplates: [
      'Exciting updates coming to Starlink soon!',
      'Mars mission timeline looking promising.',
      'New Tesla features rolling out next week.',
      'SpaceX just hit another milestone!',
      'Working on sustainable energy solutions.',
    ]
  },
  {
    name: 'Naval Ravikant',
    author: '@naval',
    avatar: '⚓',
    contentTemplates: [
      'The compound effect of small daily habits is incredible.',
      'Building wealth is about creating systems, not goals.',
      'Reading is the ultimate meta-skill.',
      'Peace comes from within. Happiness is a choice.',
      'Leverage is the key to modern wealth creation.',
    ]
  },
  {
    name: 'Sam Altman',
    author: '@sama',
    avatar: '🤖',
    contentTemplates: [
      'AI development continues to exceed expectations.',
      'The future of work will be human-AI collaboration.',
      'OpenAI latest research shows promising results.',
      'Building AGI safely is our top priority.',
      'AI tools are becoming more accessible every day.',
    ]
  },
  {
    name: 'Marc Andreessen',
    author: '@pmarca',
    avatar: '💡',
    contentTemplates: [
      'Software continues to eat the world.',
      'Focus on building products people actually want.',
      'Distribution strategy is often overlooked by startups.',
      'Network effects are the strongest moat.',
      'Technology adoption cycles are accelerating.',
    ]
  },
  {
    name: 'Balaji Srinivasan',
    author: '@balajis',
    avatar: '🗽',
    contentTemplates: [
      'Decentralization is the megatrend of our time.',
      'Crypto enables new forms of digital organization.',
      'The network state concept is gaining traction.',
      'Exit and voice: choosing your digital community.',
      'Building parallel institutions for the future.',
    ]
  }
];

// Svelte stores
export const trendingPosts = writable<Post[]>(trendingPostsDataStoreData);
export const latestPosts = writable<Post[]>(initialLatestPostsDataStoreData.map(p => ({...p, timestamp: Date.now() })));
export const selectedPostForReply = writable<Post | null>(null);
export const isReplyModalOpen = writable<boolean>(false);
export const quickReplies = writable<string[]>([
  "Great insights! Thanks for sharing 🙌",
  "This is exactly what I was looking for. Appreciate the detailed breakdown!",
  "Love this perspective! Have you considered [specific question]?",
  "Bookmarking this for later reference. Excellent thread! 📌",
  "Thanks for the valuable content! This will help many people."
]);

// Post ID counter for generating new posts
let postIdCounter = Math.max(...initialLatestPostsDataStoreData.map(p => p.id), 0) + 1;

// Generate a new post for the live feed
export function generateNewLatestPost(): Post {
  const randomAccount = mockAccountsStoreData[Math.floor(Math.random() * mockAccountsStoreData.length)];
  const randomContent = randomAccount.contentTemplates[Math.floor(Math.random() * randomAccount.contentTemplates.length)];
  const engagement = Math.floor(Math.random() * 1000) + 300; // Random engagement between 300-1300
  
  return {
    id: postIdCounter++,
    name: randomAccount.name,
    author: randomAccount.author,
    content: randomContent,
    engagement: engagement,
    likes: Math.floor(engagement * 0.6),
    retweets: Math.floor(engagement * 0.2),
    replies: Math.floor(engagement * 0.15),
    impressions: engagement * 15,
    timestamp: Date.now(),
    priority: engagement > 800 ? 'medium' : 'low',
    avatar: randomAccount.avatar
  };
}

// Add a new post to the latest posts feed
export function addLatestPost() {
  const newPost = generateNewLatestPost();
  latestPosts.update(current => [newPost, ...current].slice(0, 20));
}

// Remove a post from either trending or latest posts
export function removePost(postId: number, fromList: 'trending' | 'latest') {
  if (fromList === 'trending') {
    trendingPosts.update(posts => posts.filter(p => p.id !== postId));
  } else {
    latestPosts.update(posts => posts.filter(p => p.id !== postId));
  }
}

// Add a new quick reply template
export function addQuickReply(replyText: string) {
  if (replyText.trim()) {
    quickReplies.update(replies => [...replies, replyText.trim()]);
  }
}

export const allPosts = writable<Post[]>([...trendingPostsDataStoreData, ...initialLatestPostsDataStoreData]);
export const displayedPosts = writable<Post[]>([]);
export const nextPostIndex = writable<number>(0);

export function addNextPost() {
  const currentAllPosts = get(allPosts);
  const currentNextIndex = get(nextPostIndex);

  if (currentNextIndex >= currentAllPosts.length) {
    console.log("All mock posts have been displayed.");
    return;
  }

  const newPost = { ...currentAllPosts[currentNextIndex], isReplying: false };

  displayedPosts.update(currentDisplay => {
    let newDisplay = [...currentDisplay, newPost];
    if (newDisplay.length > 20) {
      newDisplay.shift();
    }
    return newDisplay;
  });
  nextPostIndex.set(currentNextIndex + 1);
}

export function updatePostReplyState(postId: number | string, isReplying: boolean) {
  displayedPosts.update(posts =>
    posts.map(p => (p.id === postId ? { ...p, isReplying } : p))
  );
  allPosts.update(posts =>
    posts.map(p => (p.id === postId ? { ...p, isReplying } : p))
  );
} 