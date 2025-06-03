<script lang="ts">
  import { X, Send, User } from 'lucide-svelte';
  import { isReplyModalOpen, selectedPostForReply, quickReplies, addQuickReply, removePost } from '$lib/stores/mockDataStore';
  import { formatNumber } from '$lib/utils/formatters';
  import { get } from 'svelte/store';
  import type { Post } from '$lib/types/twitter';

  let customReplyText = '';
  let currentSelectedPost: Post | null = null;

  $: currentSelectedPost = $selectedPostForReply;

  function closeModal() {
    isReplyModalOpen.set(false);
    selectedPostForReply.set(null);
    customReplyText = '';
  }

  function determineListType(postId: number | string): 'latest' | 'trending' {
    // For demo: trending IDs are <= 100, latest are > 100
    return Number(postId) > 100 ? 'latest' : 'trending';
  }

  function handleSendReply(replyText: string) {
    if (!currentSelectedPost) return;
    alert(`Reply sent to ${currentSelectedPost.author}: "${replyText}"`);
    removePost(currentSelectedPost.id, determineListType(currentSelectedPost.id));
    closeModal();
  }

  function handleSaveReplyAsTemplate() {
    if (customReplyText.trim()) {
      addQuickReply(customReplyText);
      customReplyText = '';
    }
  }
</script>

{#if $isReplyModalOpen && $selectedPostForReply}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" on:click={closeModal} aria-label="Close">
        <X class="w-6 h-6" />
      </button>
      <h2 class="text-xl font-bold mb-4 flex items-center">
        <User class="w-5 h-5 mr-2" /> Reply to {currentSelectedPost?.name} <span class="ml-2 text-gray-500">{currentSelectedPost?.author}</span>
      </h2>
      <div class="mb-4 p-3 rounded bg-gray-100 dark:bg-gray-800">
        <div class="flex items-center mb-2">
          <span class="text-2xl mr-2">{currentSelectedPost?.avatar}</span>
          <span class="font-semibold text-blue-600">{currentSelectedPost?.name}</span>
          <span class="text-gray-500 text-sm ml-2">{currentSelectedPost?.author}</span>
        </div>
        <div class="text-gray-800 dark:text-gray-200 mb-1">{currentSelectedPost?.content}</div>
        <div class="flex items-center space-x-4 text-xs text-gray-500">
          <span>Likes: {formatNumber(currentSelectedPost?.likes ?? 0)}</span>
          <span>Replies: {formatNumber(currentSelectedPost?.replies ?? 0)}</span>
          <span>Retweets: {formatNumber(currentSelectedPost?.retweets ?? 0)}</span>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-semibold mb-2">Quick Replies</div>
        <div class="flex flex-wrap gap-2 mb-2">
          {#each $quickReplies as reply}
            <button class="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition" on:click={() => handleSendReply(reply)}>{reply}</button>
          {/each}
        </div>
        <div class="flex items-center gap-2">
          <input type="text" class="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring" placeholder="Write a custom reply..." bind:value={customReplyText} on:keydown={(e) => e.key === 'Enter' && handleSendReply(customReplyText)} />
          <button class="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition" on:click={() => handleSendReply(customReplyText)} aria-label="Send">
            <Send class="w-5 h-5" />
          </button>
        </div>
        <button class="mt-2 text-xs text-gray-500 hover:text-gray-700 underline" on:click={handleSaveReplyAsTemplate}>Save as Quick Reply</button>
      </div>
    </div>
  </div>
{/if} 