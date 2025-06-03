<script lang="ts">
  import type { Post } from '$lib/types/twitter';
  import PostItem from './PostItem.svelte';
  import { TrendingUp, Clock } from 'lucide-svelte';
  export let posts: Post[];
  export let listType: 'latest' | 'trending';
</script>

<div class="bg-white rounded-r-lg rounded-b-lg shadow-sm">
  <div class="p-4 border-b border-gray-200">
    <h2 class="text-xl font-semibold text-gray-900 flex items-center">
      {#if listType === 'trending'}
        <TrendingUp class="mr-2 h-5 w-5" /> Trending Posts
      {:else}
        <Clock class="mr-2 h-5 w-5" /> Latest Posts
      {/if}
    </h2>
  </div>
  <div class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
    {#each posts as post (post.id)}
      <PostItem {post} {listType} />
    {:else}
      <div class="p-8 text-center text-2xl text-green-600 font-semibold">
        {#if listType === 'trending'}
          ✅ Reply Guy mission accomplished. You will have a new selection of trending posts here in your next session.
        {:else}
          ✅ Reply Guy mission accomplished. I'll notify you when there are new posts to reply to.
        {/if}
      </div>
    {/each}
  </div>
</div> 