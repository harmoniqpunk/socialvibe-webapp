<script lang="ts">
  import type { Post } from '$lib/stores/mockDataStore';
  import PostItem from './PostItem.svelte';
  export let posts: Post[];
</script>

<div class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
  {#each posts as post (post.id)}
    <PostItem {post} />
  {/each}
</div> 