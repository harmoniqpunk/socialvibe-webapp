<script lang="ts">
    import type { Comment } from '$lib/types';
    
    export let comments: Comment[];
</script>

<div class="mt-3 space-y-3 pl-4">
    {#each comments as comment}
        <div class="bg-light-positive-muted/5 dark:bg-dark-positive-muted/5 p-2 rounded-lg">
            <div class="flex items-center mb-2">
                <div class="w-6 h-6 rounded-full bg-light-positive-muted dark:bg-dark-positive-muted"></div>
                <div class="ml-2">
                    <p class="text-light-positive-text dark:text-dark-positive-text font-semibold text-xs">{comment.author}</p>
                    <p class="text-light-positive-muted dark:text-dark-positive-muted text-xs">{comment.timestamp}</p>
                </div>
            </div>
            <p class="text-light-positive-text dark:text-dark-positive-text text-sm">{comment.content}</p>
        </div>
    {/each}
</div> 