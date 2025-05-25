<!-- src\routes\+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Spinner } from 'flowbite-svelte';
	import Post from '$lib/components/Post.svelte';
	import PostSkeleton from '$lib/components/PostSkeleton.svelte';
	import type { Post as PostType } from '$lib/types';
	import PostFilter from '$lib/components/PostFilter.svelte';
	import { selectedFilters } from '$lib/stores/filterStore';

	// Enhanced mock data with comments
	const mockPosts: PostType[] = [
		{
			id: '1',
			content: 'Check out this amazing video about Svelte!',
			author: 'SvelteMaster',
			likes: 42,
			comments: [
				{
					id: 'c1',
					author: 'WebDev',
					content: 'Great video! Thanks for sharing',
					timestamp: '1h ago'
				},
				{
					id: 'c2',
					author: 'SvelteNewbie',
					content: 'This helped me a lot!',
					timestamp: '30m ago'
				}
			],
			reposts: 8,
			timestamp: '2h ago',
			youtubeUrl: 'https://www.youtube.com/embed/rv3Yq-B8qp4',
			isLiked: false,
			isReposted: false
		},
		{
			id: '2',
			content: 'Just launched my new project using SvelteKit and Flowbite!',
			author: 'TechEnthusiast',
			likes: 23,
			comments: [],
			reposts: 3,
			timestamp: '4h ago'
		},
		{
			id: '3',
			content: 'Another great Svelte tutorial: https://youtu.be/uK2RnIzrQ0M',
			author: 'WebDevPro',
			likes: 56,
			comments: [],
			reposts: 5,
			timestamp: '5h ago',
			youtubeUrl: 'https://www.youtube.com/embed/uK2RnIzrQ0M'
		}
	];

	let posts: PostType[] = [];
	let initialLoading = true;
	let loadingMore = false;
	let hasMore = true;
	let page = 1;

	// Define filter options
	const filterOptions = {
		content: ['3D Assets', '2D Assets', 'Books', 'Music', 'Animations', 'Film'],
		games: ['Robots', 'Cars', 'Drones'],
		sim2real: ['ROS2', 'MAVLINK', 'DMX'],
		agents: [] // Add agent options as needed
	};

	async function loadPosts() {
		if (loadingMore || !hasMore) return;
		
		if (posts.length === 0) {
			initialLoading = true;
		} else {
			loadingMore = true;
		}

		try {
			// In the future, send filters to API
			const filters = $selectedFilters;
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			if (page === 1) {
				// Mock filtering logic (replace with API call later)
				posts = mockPosts;
				hasMore = false;
			}
		} catch (error) {
			console.error('Error loading posts:', error);
		} finally {
			initialLoading = false;
			loadingMore = false;
		}
	}

	// Subscribe to filter changes
	$: {
		$selectedFilters; // trigger on filter changes
		page = 1;
		posts = [];
		loadPosts();
	}

	onMount(() => {
		loadPosts();
	});
</script>

<section class="min-h-screen bg-light-positive-background dark:bg-dark-positive-background">
	<PostFilter {filterOptions} />
	<div class="container ml-0 md:ml-[15%] px-4 py-4 max-w-[600px]">
		<div class="space-y-4">
			{#if initialLoading}
				<PostSkeleton />
			{:else}
				{#each posts as post, i (post.id)}
					<Post {post} isLast={i === posts.length - 1} />
				{/each}

				{#if loadingMore}
					<div class="flex justify-center p-4">
						<Spinner size="8" class="text-light-positive-primary dark:text-dark-positive-primary" />
					</div>
				{/if}
			{/if}
		</div>
	</div>
</section>

<style lang="postcss">
	:global(body) {
		@apply bg-light-positive-background dark:bg-dark-positive-background text-light-positive-primary dark:text-dark-positive-primary;
	}

	:global(.negative-section h1),
	:global(.negative-section h2) {
		@apply text-light-negative-primary dark:text-dark-negative-primary;
	}

	/* ... Rest of your styles ... */

	/* Add padding to account for the sticky filter on mobile */
	@media (max-width: 768px) {
		section {
			padding-top: 3rem;
		}
	}
</style>

