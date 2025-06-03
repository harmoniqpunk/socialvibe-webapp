<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { trendingPosts, latestPosts, addLatestPost } from '$lib/stores/mockDataStore';
  import PostList from './PostList.svelte';
  import ReplyModal from './ReplyModal.svelte';
  import { TrendingUp, Clock } from 'lucide-svelte';
  import { get } from 'svelte/store';

  let selectedTab: 'latest' | 'trending' = 'latest';
  let intervalId: ReturnType<typeof setInterval>;

  onMount(() => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (selectedTab === 'latest') addLatestPost();
    }, 10000);
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
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
    {#if selectedTab === 'latest'}
      <PostList posts={$latestPosts} listType="latest" />
    {:else}
      <PostList posts={$trendingPosts} listType="trending" />
    {/if}

    <!-- Reply Modal -->
    <ReplyModal />
  </div>
</div> 