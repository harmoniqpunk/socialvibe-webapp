<script lang="ts">
  import type { Post } from '$lib/stores/mockDataStore';
  import { Heart, MessageCircle, Repeat2, Eye, Clock } from 'lucide-svelte';
  import { updatePostReplyState } from '$lib/stores/mockDataStore';

  export let post: Post;

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

  function handlePostClick() {
    updatePostReplyState(post.id, true);
  }

  function handleCancelReply() {
    updatePostReplyState(post.id, false);
  }

  function handleSkip() {
    console.log(`Skip button clicked for post ID: ${post.id}`);
  }
</script>

<div class="p-4 border-l-4 {getPriorityColor(post.priority)} cursor-pointer hover:bg-gray-50 transition-colors">
  <div class="flex items-start justify-between">
    <div class="flex-1" on:click={handlePostClick}>
      <div class="flex items-center mb-2">
        <span class="text-2xl mr-2">{post.avatar}</span>
        <span class="font-semibold text-blue-600">{post.name} <span class="text-gray-500 font-normal">{post.author}</span></span>
        <span class="text-gray-500 text-sm ml-2 flex items-center">
          <Clock class="h-4 w-4 mr-1" />
          {post.timestamp}
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
        class="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs font-semibold transition-colors"
        style="align-self: flex-end"
        on:click|stopPropagation={handleSkip}
      >
        Skip
      </button>
    </div>
  </div>
  {#if post.isReplying}
    <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <p class="text-sm text-gray-700 dark:text-gray-300">Replying to post by {post.name}...</p>
      <textarea class="w-full mt-2 p-2 border rounded" placeholder="Write your reply..."></textarea>
      <div class="mt-2 flex justify-end space-x-2">
        <button class="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Reply</button>
        <button on:click={handleCancelReply} class="px-4 py-2 text-sm bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400">Cancel</button>
      </div>
    </div>
  {/if}
</div> 