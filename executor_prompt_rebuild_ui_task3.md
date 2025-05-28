# Executor Prompt: Rebuild UI - Task 3

This task focuses on fixing UI rendering issues, implementing post interactions (reply and skip), and adding the auto-feed functionality for posts as per Mihnea's mock-up.

## Files to Reference:

*   `mihneas-mock/TwitterEngagementDashboard.jsx` (for UI/UX details of reply and post interactions)
*   `mihneas-mock/mockTwitterData.js` (for understanding data structure, though we use `mockDataStore.ts`)
*   `src/routes/+layout.svelte`
*   `src/routes/+page.svelte`
*   `src/lib/components/dashboard/PostItem.svelte`
*   `src/lib/components/dashboard/PostList.svelte`
*   `src/lib/components/dashboard/DashboardShell.svelte`
*   `src/lib/stores/mockDataStore.ts`

## Task Breakdown:

### 1. Fix Duplicate Interface Rendering

*   **File:** `src/routes/+layout.svelte`
*   **Action:**
    *   Locate the two instances of `<slot />`.
    *   Remove the second `<slot />` (the one currently wrapped in `<div class="app-container">`). The correct one to keep is inside the `<main>` tag, within the `div` that has classes like `sm:ml-64`.

### 2. Implement Post Interaction Logic (Reply & Skip)

*   **File:** `src/lib/components/dashboard/PostItem.svelte`
*   **Details:**
    *   We need a way to track if the user is replying to a *specific* post.
    *   **Modify `src/lib/stores/mockDataStore.ts`**:
        *   Update the `Post` interface to include an optional `isReplying?: boolean;` field.
        *   When posts are initially loaded or added, this should be `false` or undefined.
    *   **Modify `PostItem.svelte`**:
        *   When the main content area of a post (e.g., the `div` containing the post text and user info, but not the action buttons themselves) is clicked:
            *   Update the corresponding post object in the `allPosts` store (or `displayedPosts` once that's primary) to set `isReplying = true`. This will require a function in the store to update a single post, or careful direct mutation if Svelte's reactivity allows.
        *   Conditionally render a "Reply Interface" if `post.isReplying` is true.
            *   This interface should appear below the clicked post.
            *   For now, this can be a simple placeholder:
                ```html
                {#if post.isReplying}
                  <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p class="text-sm text-gray-700 dark:text-gray-300">Replying to post by {post.user.name}...</p>
                    <textarea class="w-full mt-2 p-2 border rounded" placeholder="Write your reply..."></textarea>
                    <div class="mt-2 flex justify-end space-x-2">
                      <button class="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Reply</button>
                      <button on:click={() => { /* Set post.isReplying = false */ }} class="px-4 py-2 text-sm bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400">Cancel</button>
                    </div>
                  </div>
                {/if}
                ```
            *   Ensure the "Cancel" button in this reply interface sets `post.isReplying = false` for the specific post.
        *   **Skip Button:**
            *   When the "Skip" button is clicked:
                *   Log to the console: `Skip button clicked for post ID: {post.id}`.
                *   (Future step, not for now: This action will eventually remove the post from `displayedPosts` and trigger `addNextPost`.) For now, a console log is sufficient.

### 3. Implement Auto-Feed for Latest Posts

*   **File:** `src/lib/stores/mockDataStore.ts`
    *   **Data Structure:**
        *   Keep the existing `allPosts` store, which holds *all* mock posts.
        *   Create a new exported Svelte store: `export const displayedPosts = writable<Post[]>([]);`
        *   Create an exported store to track the index of the next post to add from `allPosts`: `export const nextPostIndex = writable<number>(0);`
    *   **Initialization Logic (e.g., in `DashboardShell.svelte` or a new init function in the store):**
        *   On component mount (e.g., `DashboardShell.svelte`'s `onMount`), initialize `displayedPosts`. Take the first, say, 5 posts from `allPosts` and put them into `displayedPosts`. Update `nextPostIndex` accordingly.
        ```javascript
        // In DashboardShell.svelte onMount, or a function in mockDataStore.ts called by it
        import { allPosts, displayedPosts, nextPostIndex } from '$lib/stores/mockDataStore';
        import { get } from 'svelte/store';

        const initialPosts = get(allPosts).slice(0, 5);
        displayedPosts.set(initialPosts);
        nextPostIndex.set(initialPosts.length);
        ```
    *   **`addNextPost()` Function (export this from `mockDataStore.ts`):**
        ```typescript
        import { writable, get } from 'svelte/store';
        import type { Post } from './mockDataStore'; // Assuming your interfaces are here

        // (allPosts, displayedPosts, nextPostIndex stores as defined above)

        export function addNextPost() {
          const currentAllPosts = get(allPosts);
          const currentNextIndex = get(nextPostIndex);

          if (currentNextIndex >= currentAllPosts.length) {
            // Optional: Loop back to the beginning if all posts shown
            // nextPostIndex.set(0); 
            // For now, just stop adding if we run out of unique posts
            console.log("All mock posts have been displayed.");
            return; 
          }

          const newPost = { ...currentAllPosts[currentNextIndex], isReplying: false }; // Ensure new posts aren't in reply mode

          displayedPosts.update(currentDisplay => {
            let newDisplay = [...currentDisplay, newPost];
            if (newDisplay.length > 20) {
              newDisplay.shift(); // Remove the oldest post
            }
            return newDisplay;
          });
          nextPostIndex.set(currentNextIndex + 1);
        }
        ```
*   **File:** `src/lib/components/dashboard/DashboardShell.svelte`
    *   **Interval Timer:**
        *   In the `<script lang="ts">` section:
            ```typescript
            import { onMount, onDestroy } from 'svelte';
            import { addNextPost, displayedPosts } // Import displayedPosts if you need to react to it here, or pass to PostList
            import { allPosts as allPostsStore, nextPostIndex as nextPostIndexStore } from '$lib/stores/mockDataStore'; // For initialization
            import { get } from 'svelte/store';


            let intervalId: ReturnType<typeof setInterval>;

            onMount(() => {
              // Initialize displayedPosts with the first few posts
              const initialPostCount = Math.min(5, get(allPostsStore).length);
              const initialPosts = get(allPostsStore).slice(0, initialPostCount).map(p => ({...p, isReplying: false }));
              displayedPosts.set(initialPosts);
              nextPostIndexStore.set(initialPostCount);
              
              intervalId = setInterval(() => {
                addNextPost();
              }, 10000); // 10 seconds

              return () => {
                clearInterval(intervalId);
              };
            });

            onDestroy(() => {
              if (intervalId) {
                clearInterval(intervalId);
              }
            });
            ```
*   **File:** `src/lib/components/dashboard/PostList.svelte`
    *   **Source of Posts:**
        *   Change the component to iterate over the `$displayedPosts` store instead of `$allPosts`.
        ```svelte
        // <script lang="ts">
        import { displayedPosts } from '$lib/stores/mockDataStore';
        import PostItem from './PostItem.svelte';
        // </script>

        // {#each $allPosts as post (post.id)} -> becomes:
        {#each $displayedPosts as post (post.id)}
          <PostItem {post} />
        {/each}
        ```
    *   **Update Post Logic (for `isReplying`):**
        *   Since `PostItem` will now manage `isReplying` on post objects that come from the `displayedPosts` store, you'll need a way to update the store when `isReplying` changes within a `PostItem`.
        *   In `mockDataStore.ts`, add a helper function:
            ```typescript
            export function updatePostReplyState(postId: string, isReplying: boolean) {
              displayedPosts.update(posts =>
                posts.map(p => (p.id === postId ? { ...p, isReplying } : p))
              );
              // Also update in allPosts if you want consistency, though displayedPosts is primary for UI
              allPosts.update(posts =>
                posts.map(p => (p.id === postId ? { ...p, isReplying } : p))
              );
            }
            ```
        *   In `PostItem.svelte`, when opening/closing the reply interface, call this `updatePostReplyState(post.id, newState)`.
            ```html
            <!-- Example for cancel button in reply interface -->
            <button on:click={() => updatePostReplyState(post.id, false)} class="px-4 py-2 text-sm bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400">Cancel</button>

            <!-- Example for clicking post content to open reply -->
            <div class="post-content-area" on:click={() => updatePostReplyState(post.id, true)}>
              {post.text}
            </div>
            ```

## Verification Steps:

1.  Load the application. Verify that only ONE instance of the dashboard UI is visible and it is correctly aligned (left-aligned, not top-center).
2.  Click on the text content of any post. Verify the "Reply Interface" placeholder appears below that post.
3.  Click the "Cancel" button in the reply interface. Verify it disappears.
4.  Click the "Skip" button on any post. Check the browser's developer console for the log message: `Skip button clicked for post ID: {post.id}`.
5.  Observe the post feed. Verify that:
    *   It starts with a few posts (e.g., 5).
    *   A new post is added to the bottom of the list every 10 seconds.
    *   Once 20 posts are displayed, when a new post is added, the oldest post (at the top) is removed.
    *   New posts correctly render and do not start in a "replying" state.

Good luck, Executor! Let me know if any part of this is unclear. 