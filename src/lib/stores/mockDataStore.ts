// src/lib/stores/mockDataStore.ts
import { writable, get } from 'svelte/store';

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

export const trendingPostsData: Post[] = [
  { id: 1, name: 'Elon Musk', author: '@elonmusk', content: 'Just shipped a major update to the Mars colonization timeline. Thoughts?', engagement: 15420, likes: 8500, retweets: 3200, replies: 2100, impressions: 450000, timestamp: '2h ago', priority: 'high', avatar: '🚀' },
  { id: 2, name: 'Naval Ravikant', author: '@naval', content: 'The best investment you can make is in yourself. Skills compound faster than money.', engagement: 12800, likes: 7200, retweets: 2800, replies: 1900, impressions: 380000, timestamp: '4h ago', priority: 'high', avatar: '⚓' },
  { id: 3, name: 'Sam Altman', author: '@sama', content: 'AI progress is accelerating. What we thought would take 5 years might happen in 2.', engagement: 9600, likes: 5400, retweets: 2100, replies: 1400, impressions: 290000, timestamp: '6h ago', priority: 'medium', avatar: '🤖' },
  { id: 4, name: 'Marc Andreessen', author: '@pmarca', content: 'Thread: Why startups should focus on product-market fit before scaling...', engagement: 7200, likes: 4100, retweets: 1800, replies: 1100, impressions: 220000, timestamp: '8h ago', priority: 'medium', avatar: '💡' },
  { id: 5, name: 'Balaji Srinivasan', author: '@balajis', content: 'Decentralization is not just about technology. It\'s about human freedom.', engagement: 5800, likes: 3200, retweets: 1400, replies: 900, impressions: 180000, timestamp: '12h ago', priority: 'low', avatar: '🗽' },
  { id: 6, name: 'Elon Musk', author: '@elonmusk', content: 'Tesla Cybertruck production ramping up faster than expected. Manufacturing at scale!', engagement: 11200, likes: 6800, retweets: 2400, replies: 1600, impressions: 340000, timestamp: '14h ago', priority: 'high', avatar: '🚀' },
  { id: 7, name: 'Sam Altman', author: '@sama', content: 'GPT-5 will fundamentally change how we interact with computers. The future is closer than you think.', engagement: 8900, likes: 5100, retweets: 1900, replies: 1300, impressions: 270000, timestamp: '16h ago', priority: 'medium', avatar: '🤖' },
  { id: 8, name: 'Naval Ravikant', author: '@naval', content: 'Meditation is not about stopping thoughts. It\'s about observing them without attachment.', engagement: 6400, likes: 3800, retweets: 1500, replies: 800, impressions: 195000, timestamp: '18h ago', priority: 'medium', avatar: '⚓' },
  { id: 9, name: 'Marc Andreessen', author: '@pmarca', content: 'The next billion-dollar startup will be built by someone reading this tweet right now.', engagement: 5600, likes: 3300, retweets: 1200, replies: 700, impressions: 165000, timestamp: '20h ago', priority: 'low', avatar: '💡' },
  { id: 10, name: 'Balaji Srinivasan', author: '@balajis', content: 'Code is becoming law. Smart contracts are the constitution of the digital world.', engagement: 4800, likes: 2900, retweets: 1000, replies: 600, impressions: 145000, timestamp: '22h ago', priority: 'low', avatar: '🗽' }
];

export const initialLatestPostsData: Post[] = [
  { id: 101, name: 'Elon Musk', author: '@elonmusk', content: 'Excited to announce a new Starlink milestone!', engagement: 1200, likes: 800, retweets: 200, replies: 100, impressions: 20000, timestamp: 'Just now', priority: 'low', avatar: '🚀' },
  { id: 102, name: 'Naval Ravikant', author: '@naval', content: 'Happiness is a choice and a skill. You can cultivate it.', engagement: 900, likes: 600, retweets: 180, replies: 80, impressions: 15000, timestamp: '1m ago', priority: 'low', avatar: '⚓' }
];

export const mockAccounts: Account[] = [
  { name: 'Elon Musk', author: '@elonmusk', avatar: '🚀', contentTemplates: [ 'Exciting updates coming to Starlink soon!', 'Mars mission timeline looking promising.', 'New Tesla features rolling out next week.', 'SpaceX just hit another milestone!', 'Working on sustainable energy solutions.' ] },
  { name: 'Naval Ravikant', author: '@naval', avatar: '⚓', contentTemplates: [ 'The compound effect of small daily habits is incredible.', 'Building wealth is about creating systems, not goals.', 'Reading is the ultimate meta-skill.', 'Peace comes from within. Happiness is a choice.', 'Leverage is the key to modern wealth creation.' ] },
  { name: 'Sam Altman', author: '@sama', avatar: '🤖', contentTemplates: [ 'AI development continues to exceed expectations.', 'The future of work will be human-AI collaboration.', 'OpenAI latest research shows promising results.', 'Building AGI safely is our top priority.', 'AI tools are becoming more accessible every day.' ] },
  { name: 'Marc Andreessen', author: '@pmarca', avatar: '💡', contentTemplates: [ 'Software continues to eat the world.', 'Focus on building products people actually want.', 'Distribution strategy is often overlooked by startups.', 'Network effects are the strongest moat.', 'Technology adoption cycles are accelerating.' ] },
  { name: 'Balaji Srinivasan', author: '@balajis', avatar: '🗽', contentTemplates: [ 'Decentralization is the megatrend of our time.', 'Crypto enables new forms of digital organization.', 'The network state concept is gaining traction.', 'Exit and voice: choosing your digital community.', 'Building parallel institutions for the future.' ] }
];

export const allPosts = writable<Post[]>([...trendingPostsData, ...initialLatestPostsData]);
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