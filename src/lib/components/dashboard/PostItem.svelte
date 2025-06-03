<script lang="ts">
  import type { Post, ListType } from '$lib/types/twitter';
  import { Heart, MessageCircle, Repeat2, Eye, Clock } from 'lucide-svelte';
  import { selectedPostForReply, isReplyModalOpen, removePost } from '$lib/stores/mockDataStore';
  import { formatNumber, getPriorityColor, formatLatestPostTimestamp } from '$lib/utils/formatters';

  export let post: Post;
  export let listType: ListType;

  function handlePostClick() {
    selectedPostForReply.set(post);
    isReplyModalOpen.set(true);
  }

  function handleSkip(e: Event) {
    e.stopPropagation();
    removePost(post.id, listType);
  }
</script>

<button
  type="button"
  class="w-full text-left p-4 border-l-4 {getPriorityColor(post.priority)} cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
  on:click={handlePostClick}
>
  <div class="flex items-start justify-between">
    <div class="flex-1">
      <div class="flex items-center mb-2">
        <span class="text-2xl mr-2">{post.avatar}</span>
        <span class="font-semibold text-blue-600">{post.name} <span class="text-gray-500 font-normal">{post.author}</span></span>
        <span class="text-gray-500 text-sm ml-2 flex items-center">
          <Clock class="h-4 w-4 mr-1" />
          {listType === 'latest' && typeof post.timestamp === 'number' ? formatLatestPostTimestamp(post.timestamp) : post.timestamp}
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
        on:click={handleSkip}
      >
        Skip
      </button>
    </div>
  </div>
</button> 