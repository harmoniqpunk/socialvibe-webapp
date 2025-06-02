<script lang="ts">
  import PostList from './PostList.svelte';
  import { onMount } from 'svelte';
  import { trendingPostsData, initialLatestPostsData, mockAccounts, type Post } from '$lib/stores/mockDataStore';
  import { Heart, MessageCircle, Repeat2, Eye, TrendingUp, Clock, Send, X } from 'lucide-svelte';

  // Tabs and posts
  let selectedTab: 'latest' | 'trending' = 'latest';
  let trendingPosts: Post[] = [...trendingPostsData];
  let latestPosts: Post[] = [...initialLatestPostsData];

  // Modal state
  let isModalOpen = false;
  let selectedPost: Post | null = null;
  let newReply: string = '';
  let replies: string[] = [
    "Great insights! Thanks for sharing 🙌",
    "This is exactly what I was looking for. Appreciate the detailed breakdown!",
    "Love this perspective! Have you considered [specific question]?",
    "Bookmarking this for later reference. Excellent thread! 📌",
    "Thanks for the valuable content! This will help many people."
  ];

  // Live feed: add a new post every 10 seconds
  onMount(() => {
    let postIdCounter = 106;
    const generateNewPost = (): Post => {
      const randomAccount = mockAccounts[Math.floor(Math.random() * mockAccounts.length)];
      const randomContent = randomAccount.contentTemplates[Math.floor(Math.random() * randomAccount.contentTemplates.length)];
      const engagement = Math.floor(Math.random() * 1000) + 300;
      return {
        id: postIdCounter++,
        name: randomAccount.name,
        author: randomAccount.author,
        content: randomContent,
        engagement,
        likes: Math.floor(engagement * 0.6),
        retweets: Math.floor(engagement * 0.2),
        replies: Math.floor(engagement * 0.15),
        impressions: engagement * 15,
        timestamp: Date.now(),
        priority: engagement > 800 ? 'medium' : 'low',
        avatar: randomAccount.avatar
      };
    };
    const interval = setInterval(() => {
      const newPost = generateNewPost();
      latestPosts = [newPost, ...latestPosts].slice(0, 20);
    }, 10000);
    return () => clearInterval(interval);
  });

  function formatLatestPostTimestamp(timestamp: number): string {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffMs / 60000);
    if (diffSecs < 5) return 'just now';
    if (diffMins < 1) return `${diffSecs} secs ago`;
    if (diffMins === 1) return '1 min ago';
    return `${diffMins} mins ago`;
  }
  function getPriorityColor(priority: string): string {
    switch(priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  }
  function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }
  function openModal(post: Post) {
    selectedPost = post;
    isModalOpen = true;
  }
  function closeModal() {
    isModalOpen = false;
    selectedPost = null;
    newReply = '';
  }
  function handleReply(replyText: string) {
    if (!selectedPost) return;
    alert(`Reply sent to ${selectedPost.author}: "${replyText}"`);
    if (selectedTab === 'trending') {
      trendingPosts = trendingPosts.filter(post => post.id !== selectedPost!.id);
    } else {
      latestPosts = latestPosts.filter(post => post.id !== selectedPost!.id);
    }
    closeModal();
  }
  function addCustomReply() {
    if (newReply.trim()) {
      replies = [...replies, newReply.trim()];
      newReply = '';
    }
  }
  function handleSkipPost(postId: number | string) {
    if (selectedTab === 'trending') {
      trendingPosts = trendingPosts.filter(post => post.id !== postId);
    } else {
      latestPosts = latestPosts.filter(post => post.id !== postId);
    }
  }

  $: posts = selectedTab === 'trending' ? trendingPosts : latestPosts;
</script>

<div class="bg-gray-100" style="height:50px;"></div>
<div class="min-h-screen bg-gray-100 pb-4">
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">🎯 Reply Guy Command Center</h1>
      <p class="text-gray-600">High-priority posts from your curated list</p>
      <div class="mt-4 flex items-center space-x-4 text-sm text-gray-500">
        <div class="flex items-center">
          <div class="w-3 h-3 bg-red-500 rounded mr-2"></div>
          High Priority (10K+ engagement)
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
          Medium Priority (5K-10K)
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 bg-green-500 rounded mr-2"></div>
          Low Priority (&lt;5K)
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex space-x-2">
      <button
        class={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-colors ${selectedTab === 'latest' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'bg-gray-200 text-gray-600'}`}
        on:click={() => selectedTab = 'latest'}
      >
        <Clock class="inline-block mr-1 h-5 w-5" /> Latest Posts
      </button>
      <button
        class={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-colors ${selectedTab === 'trending' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'bg-gray-200 text-gray-600'}`}
        on:click={() => selectedTab = 'trending'}
      >
        <TrendingUp class="inline-block mr-1 h-5 w-5" /> Trending Posts
      </button>
    </div>

    <!-- Posts List -->
    {#if posts.length > 0}
      <div class="bg-white rounded-r-lg rounded-b-lg shadow-sm">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            {#if selectedTab === 'trending'}
              <TrendingUp class="mr-2 h-5 w-5" /> Trending Posts
            {:else}
              <Clock class="mr-2 h-5 w-5" /> Latest Posts
            {/if}
          </h2>
        </div>
        <div class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {#each posts as post (post.id)}
            <div 
              class={`p-4 border-l-4 ${getPriorityColor(post.priority)} cursor-pointer hover:bg-gray-50 transition-colors`}
              on:click={() => openModal(post)}
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <span class="text-2xl mr-2">{post.avatar}</span>
                    <span class="font-semibold text-blue-600">{post.name} <span class="text-gray-500 font-normal">{post.author}</span></span>
                    <span class="text-gray-500 text-sm ml-2 flex items-center">
                      <Clock class="h-4 w-4 mr-1" />
                      {selectedTab === 'latest' ? formatLatestPostTimestamp(typeof post.timestamp === 'number' ? post.timestamp : Date.now()) : post.timestamp}
                    </span>
                  </div>
                  <p class="text-gray-800 mb-3">{post.content}</p>
                  <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <div class="flex items-center">
                      <Heart class="h-4 w-4 mr-1 text-red-500" />
                      {formatNumber(post.likes)}
                    </div>
                    <div class="flex items-center">
                      <Repeat2 class="h-4 w-4 mr-1 text-green-500" />
                      {formatNumber(post.retweets)}
                    </div>
                    <div class="flex items-center">
                      <MessageCircle class="h-4 w-4 mr-1 text-blue-500" />
                      {formatNumber(post.replies)}
                    </div>
                    <div class="flex items-center">
                      <Eye class="h-4 w-4 mr-1 text-purple-500" />
                      {formatNumber(post.impressions)}
                    </div>
                  </div>
                </div>
                <div class="ml-4 text-right flex flex-col items-end justify-between h-full">
                  <div>
                    <div class="text-lg font-bold text-gray-900">
                      {formatNumber(post.engagement)}
                    </div>
                    <div class="text-xs text-gray-500">Total Engagements</div>
                  </div>
                  <button
                    on:click|stopPropagation={() => handleSkipPost(post.id)}
                    class="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs font-semibold transition-colors"
                    style="align-self: flex-end"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="bg-white rounded-lg shadow-sm p-8 text-center text-2xl text-green-600 font-semibold">
        {#if selectedTab === 'trending'}
          ✅ Reply Guy mission accomplished. You will have a new selection of trending posts here in your next session.
        {:else}
          ✅ Reply Guy mission accomplished. I'll notify you when there are new posts to reply to.
        {/if}
      </div>
    {/if}

    <!-- Reply Modal -->
    {#if isModalOpen}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8 max-h-none">
          <!-- Modal Header -->
          <div class="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 class="text-xl font-semibold text-gray-900 flex items-center">
              <MessageCircle class="mr-2 h-5 w-5" />
              Reply to Post
            </h3>
            <button
              on:click={closeModal}
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X class="h-6 w-6" />
            </button>
          </div>

          <!-- Modal Content -->
          <div class="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {#if selectedPost}
              <!-- Original Post -->
              <div class="bg-gray-50 p-4 rounded-lg mb-6 border">
                <div class="flex items-center mb-3">
                  <span class="text-2xl mr-3">{selectedPost.avatar}</span>
                  <div>
                    <span class="font-semibold text-blue-600">{selectedPost.name} <span class="text-gray-500 font-normal">{selectedPost.author}</span></span>
                    <div class="text-sm text-gray-500">{selectedPost.timestamp}</div>
                  </div>
                </div>
                <p class="text-gray-800 mb-3">{selectedPost.content}</p>
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                  <div class="flex items-center">
                    <Heart class="h-4 w-4 mr-1 text-red-500" />
                    {formatNumber(selectedPost.likes)}
                  </div>
                  <div class="flex items-center">
                    <Repeat2 class="h-4 w-4 mr-1 text-green-500" />
                    {formatNumber(selectedPost.retweets)}
                  </div>
                  <div class="flex items-center">
                    <Eye class="h-4 w-4 mr-1 text-purple-500" />
                    {formatNumber(selectedPost.impressions)}
                  </div>
                </div>
              </div>

              <!-- Quick Replies -->
              <div class="mb-6">
                <h4 class="font-semibold text-gray-900 mb-4">Quick Replies:</h4>
                <div class="space-y-2">
                  {#each replies as reply, index}
                    <button
                      class="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm transition-colors border border-blue-200 hover:border-blue-300"
                      on:click={() => handleReply(reply)}
                    >
                      {reply}
                    </button>
                  {/each}
                </div>
              </div>

              <!-- Custom Reply -->
              <div class="border-t pt-6">
                <h4 class="font-semibold text-gray-900 mb-4">Custom Reply:</h4>
                <textarea
                  bind:value={newReply}
                  placeholder="Write your custom reply..."
                  class="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                />
                <div class="flex mt-4 space-x-3">
                  <button
                    on:click={addCustomReply}
                    disabled={!newReply.trim()}
                    class="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Save as Template
                  </button>
                  <button
                    on:click={() => handleReply(newReply)}
                    disabled={!newReply.trim()}
                    class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <Send class="h-4 w-4 mr-2" />
                    Send Reply
                  </button>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div> 