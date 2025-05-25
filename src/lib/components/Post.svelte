<script lang="ts">
    import type { Post } from '$lib/types';
    import Comments from './Comments.svelte';
    import PostInteractionButton from './PostInteractionButton.svelte';
    
    export let post: Post;
    export let isLast: boolean = false;
    
    let showComments = false;

    function toggleLike() {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
    }

    function toggleRepost() {
        post.isReposted = !post.isReposted;
        post.reposts += post.isReposted ? 1 : -1;
    }
</script>

<div class="p-3">
    <div class="flex items-center mb-3">
        <div class="w-8 h-8 rounded-full bg-light-positive-muted dark:bg-dark-positive-muted"></div>
        <div class="ml-2">
            <p class="text-light-positive-text dark:text-dark-positive-text font-semibold text-sm">{post.author}</p>
            <p class="text-light-positive-text dark:text-dark-positive-text text-xs">{post.timestamp}</p>
        </div>
    </div>
    
    <p class="text-light-positive-text dark:text-dark-positive-text text-sm mb-3">{post.content}</p>
    
    {#if post.youtubeUrl}
        <div class="aspect-video mb-3">
            <iframe
                class="w-full h-full rounded-lg"
                src={post.youtubeUrl}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
    {/if}
    
    <div class="flex justify-between mt-2">
        <PostInteractionButton 
            count={post.comments.length}
            on:click={() => showComments = !showComments}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" class="text-light-positive-primary dark:text-dark-positive-primary">
                <path fill="currentColor" d="M12.36 4C6.58 4 2.644 9.857 4.824 15.21l.933 2.288a.5.5 0 0 1-.15.579L3.634 19.66a.5.5 0 0 0 .313.89h7.82a8.73 8.73 0 0 0 8.733-8.732C20.5 7.5 17 4 12.682 4z" />
            </svg>
        </PostInteractionButton>
        
        <PostInteractionButton 
            count={post.reposts}
            isActive={post.isReposted}
            on:click={toggleRepost}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 21 21" 
                class={post.isReposted ? 'text-light-positive-secondary dark:text-dark-positive-secondary' : 'text-light-positive-primary dark:text-dark-positive-primary'}
            >
                <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m13.5 13.5l3 3l3-3" />
                    <path d="M9.5 4.5h3a4 4 0 0 1 4 4v8m-9-9l-3-3l-3 3" />
                    <path d="M11.5 16.5h-3a4 4 0 0 1-4-4v-8" />
                </g>
            </svg>
        </PostInteractionButton>
        
        <PostInteractionButton 
            count={post.likes}
            isActive={post.isLiked}
            on:click={toggleLike}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 48 48" 
                class={post.isLiked ? 'text-light-positive-secondary dark:text-dark-positive-secondary' : 'text-light-positive-primary dark:text-dark-positive-primary'}
            >
                <path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8" />
            </svg>
        </PostInteractionButton>

        <PostInteractionButton 
            count={0}
            on:click={() => {/* Handle buy action */}}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 48 48" 
                class="text-light-positive-primary dark:text-dark-positive-primary"
            >
                <defs>
                    <mask id="ipSBuy0">
                        <g fill="none" stroke-width="4">
                            <path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linejoin="round" d="M6 15h36l-2 27H8z" clip-rule="evenodd" />
                            <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" d="M16 19V6h16v13" />
                            <path stroke="#000" stroke-linecap="round" d="M16 34h16" />
                        </g>
                    </mask>
                </defs>
                <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSBuy0)" />
            </svg>
        </PostInteractionButton>
    </div>

    {#if showComments && post.comments.length > 0}
        <Comments comments={post.comments} />
    {/if}
</div>

{#if !isLast}
    <div class="border-t border-light-positive-muted-gray dark:border-dark-positive-muted-gray"></div>
{/if} 