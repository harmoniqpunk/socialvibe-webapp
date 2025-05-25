<!-- src\routes\+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Spinner } from 'flowbite-svelte';
	import Post from '$lib/components/Post.svelte';
	import PostSkeleton from '$lib/components/PostSkeleton.svelte';
	import type { Post as PostType } from '$lib/types';
	import PostFilter from '$lib/components/PostFilter.svelte';
	import { selectedFilters } from '$lib/stores/filterStore';
	import { Heart, MessageCircle, Repeat2, Eye, TrendingUp, Clock, User, Send, X } from 'lucide-svelte';
	import { trendingPostsData, initialLatestPostsData, mockAccounts } from '$lib/mockTwitterData';
	import type { Tweet, ReplyOption } from '$lib/types/twitter';

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

	let selectedTab: 'latest' | 'trending' = 'latest';
	let selectedPost: Tweet | null = null;
	let isModalOpen = false;

	// Default replies, can be expanded
	let quickReplies: ReplyOption[] = [
		{ id: 'reply1', text: "Great insights! Thanks for sharing 🙌" },
		{ id: 'reply2', text: "This is exactly what I was looking for. Appreciate the detailed breakdown!" },
		{ id: 'reply3', text: "Love this perspective! Have you considered [specific question]?" },
		{ id: 'reply4', text: "Bookmarking this for later reference. Excellent thread! 📌" },
		{ id: 'reply5', text: "Thanks for the valuable content! This will help many people." }
	];
	let newReplyText = '';

	let trendingPosts: Tweet[] = trendingPostsData;
	let latestPosts: Tweet[] = initialLatestPostsData.map(post => ({
		...post,
		timestamp: Date.now()
	}));

	let liveFeedInterval: any;

	onMount(() => {
		let postIdCounter = 106;
		const generateNewPost = (): Tweet => {
			const randomAccount = mockAccounts[Math.floor(Math.random() * mockAccounts.length)];
			const randomContent = randomAccount.contentTemplates[Math.floor(Math.random() * randomAccount.contentTemplates.length)];
			const engagement = Math.floor(Math.random() * 1000) + 300;
			return {
				id: postIdCounter++,
				name: randomAccount.name,
				author: randomAccount.author,
				content: randomContent,
				engagement: engagement,
				likes: Math.floor(engagement * 0.6),
				retweets: Math.floor(engagement * 0.2),
				replies: Math.floor(engagement * 0.15),
				impressions: engagement * 15,
				timestamp: Date.now(),
				priority: engagement > 800 ? 'medium' : (engagement > 10000 ? 'high' : 'low'),
				avatar: randomAccount.avatar
			};
		};

		liveFeedInterval = setInterval(() => {
			const newPost = generateNewPost();
			latestPosts = [newPost, ...latestPosts.slice(0, 19)];
		}, 10000);

		return () => {
			clearInterval(liveFeedInterval);
		};
	});

	function formatLatestPostTimestamp(timestamp: number): string {
		const now = Date.now();
		const diffMs = now - timestamp;
		const diffSecs = Math.floor(diffMs / 1000);
		const diffMins = Math.floor(diffMs / 60000);
		if (diffSecs < 5) return 'just now';
		if (diffMins < 1) return `${diffSecs} secs ago`;
		if (diffMins === 1) return '1 min ago';
		return `${diffMins} mins ago`;
	}

	function getPriorityColor(priority: 'high' | 'medium' | 'low'): string {
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

	function openModal(post: Tweet) {
		selectedPost = post;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		selectedPost = null;
		newReplyText = '';
	}

	function handleReply(replyText: string) {
		if (!selectedPost) return;
		alert(`Reply sent to ${selectedPost.author}: "${replyText}"`);
		if (selectedTab === 'trending') {
			trendingPosts = trendingPosts.filter(post => post.id !== selectedPost!.id);
		} else {
			latestPosts = latestPosts.filter(post => post.id !== selectedPost!.id);
		}
		closeModal();
	}

	function addCustomReplyTemplate() {
		if (newReplyText.trim()) {
			quickReplies = [...quickReplies, { id: `custom${quickReplies.length + 1}`, text: newReplyText.trim() }];
			newReplyText = '';
		}
	}

	function handleSkipPost(postId: number | string, event: MouseEvent) {
		event.stopPropagation();
		if (selectedTab === 'trending') {
			trendingPosts = trendingPosts.filter(post => post.id !== postId);
		} else {
			latestPosts = latestPosts.filter(post => post.id !== postId);
		}
	}

	$: currentPosts = selectedTab === 'trending' ? trendingPosts : latestPosts;
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

<div class="min-h-screen p-4 bg-light-positive-background dark:bg-dark-positive-background text-light-positive-text dark:text-dark-positive-text">
	<div class="max-w-4xl mx-auto">
		<div class="bg-light-positive-background dark:bg-dark-positive-background rounded-lg shadow-sm p-6 mb-6 border border-light-positive-muted-gray dark:border-dark-positive-muted-gray">
			<h1 class="text-3xl font-bold text-light-positive-primary dark:text-dark-positive-primary mb-2"> Reply Command Center</h1>
			<p class="text-light-positive-text dark:text-dark-positive-text opacity-80">High-priority posts from your curated list</p>
			<div class="mt-4 flex items-center space-x-4 text-sm text-light-positive-text dark:text-dark-positive-text opacity-70">
				<div class="flex items-center">
					<div class="w-3 h-3 bg-red-500 rounded mr-2"></div>
					High Priority
				</div>
				<div class="flex items-center">
					<div class="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
					Medium Priority
				</div>
				<div class="flex items-center">
					<div class="w-3 h-3 bg-green-500 rounded mr-2"></div>
					Low Priority
				</div>
			</div>
		</div>

		<div class="flex space-x-2 mb-0">
			<button
				class="px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-colors"
				class:bg-light-positive-background={selectedTab === 'latest'}
				class:dark:bg-dark-positive-background={selectedTab === 'latest'}
				class:text-light-positive-primary={selectedTab === 'latest'}
				class:dark:text-dark-positive-primary={selectedTab === 'latest'}
				class:border-b-2={selectedTab === 'latest'}
				class:border-light-positive-primary={selectedTab === 'latest'}
				class:dark:border-dark-positive-primary={selectedTab === 'latest'}
				class:bg-light-positive-muted-gray={selectedTab !== 'latest'}
				class:dark:bg-dark-positive-muted-gray={selectedTab !== 'latest'}
				class:text-light-positive-text={selectedTab !== 'latest'}
				class:dark:text-dark-positive-text={selectedTab !== 'latest'}
				class:opacity-70={selectedTab !== 'latest'}
				on:click={() => selectedTab = 'latest'}
			>
				<Clock class="inline-block mr-1 h-5 w-5" /> Latest Posts
			</button>
			<button
				class="px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-colors"
				class:bg-light-positive-background={selectedTab === 'trending'}
				class:dark:bg-dark-positive-background={selectedTab === 'trending'}
				class:text-light-positive-primary={selectedTab === 'trending'}
				class:dark:text-dark-positive-primary={selectedTab === 'trending'}
				class:border-b-2={selectedTab === 'trending'}
				class:border-light-positive-primary={selectedTab === 'trending'}
				class:dark:border-dark-positive-primary={selectedTab === 'trending'}
				class:bg-light-positive-muted-gray={selectedTab !== 'trending'}
				class:dark:bg-dark-positive-muted-gray={selectedTab !== 'trending'}
				class:text-light-positive-text={selectedTab !== 'trending'}
				class:dark:text-dark-positive-text={selectedTab !== 'trending'}
				class:opacity-70={selectedTab !== 'trending'}
				on:click={() => selectedTab = 'trending'}
			>
				<TrendingUp class="inline-block mr-1 h-5 w-5" /> Trending Posts
			</button>
		</div>

		{#if currentPosts.length > 0}
			<div class="bg-light-positive-background dark:bg-dark-positive-background rounded-r-lg rounded-b-lg shadow-sm border border-light-positive-muted-gray dark:border-dark-positive-muted-gray">
				<div class="p-4 border-b border-light-positive-muted-gray dark:border-dark-positive-muted-gray">
					<h2 class="text-xl font-semibold text-light-positive-primary dark:text-dark-positive-primary flex items-center">
						{#if selectedTab === 'trending'}
							<TrendingUp class="mr-2 h-5 w-5" /> Trending Posts
						{:else}
							<Clock class="mr-2 h-5 w-5" /> Latest Posts
						{/if}
					</h2>
				</div>
				<div class="divide-y divide-light-positive-muted-gray dark:divide-dark-positive-muted-gray max-h-[60vh] overflow-y-auto">
					{#each currentPosts as post (post.id)}
						{@const priorityClass = post.priority === 'high' ? 'border-l-light-negative-primary dark:border-l-dark-negative-primary bg-light-negative-background/30 dark:bg-dark-negative-background/30' : post.priority === 'medium' ? 'border-l-yellow-500 dark:border-l-yellow-400 bg-yellow-500/10 dark:bg-yellow-400/10' : 'border-l-green-500 dark:border-l-green-400 bg-green-500/10 dark:bg-green-400/10'}
						<div
							class={`p-4 border-l-4 ${priorityClass} cursor-pointer hover:bg-light-positive-muted-gray/50 dark:hover:bg-dark-positive-muted-gray/50 transition-colors`}
							on:click={() => openModal(post)}
							role="button"
							tabindex="0"
							on:keydown={(e) => e.key === 'Enter' && openModal(post)}
						>
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<div class="flex items-center mb-2">
										<span class="text-2xl mr-2">{post.avatar}</span>
										<span class="font-semibold text-light-positive-link dark:text-dark-positive-link">{post.name} <span class="text-light-positive-text/70 dark:text-dark-positive-text/70 font-normal">{post.author}</span></span>
										<span class="text-light-positive-text/60 dark:text-dark-positive-text/60 text-sm ml-2 flex items-center">
											<Clock class="h-4 w-4 mr-1" />
											{selectedTab === 'latest' && typeof post.timestamp === 'number' ? formatLatestPostTimestamp(post.timestamp) : post.timestamp.toString()}
										</span>
									</div>
									<p class="text-light-positive-text dark:text-dark-positive-text mb-3 whitespace-pre-wrap">{post.content}</p>
									<div class="flex items-center space-x-4 text-sm text-light-positive-text/80 dark:text-dark-positive-text/80">
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
										<div class="text-lg font-bold text-light-positive-text dark:text-dark-positive-text">
											{formatNumber(post.engagement)}
										</div>
										<div class="text-xs text-light-positive-text/60 dark:text-dark-positive-text/60">Total Engagements</div>
									</div>
									<button
										on:click={(event) => handleSkipPost(post.id, event)}
										class="mt-2 px-3 py-1 bg-light-positive-muted-gray dark:bg-dark-positive-muted-gray text-light-positive-text dark:text-dark-positive-text rounded hover:opacity-80 text-xs font-semibold transition-opacity"
									>
										Skip
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="bg-light-positive-background dark:bg-dark-positive-background rounded-lg shadow-sm p-8 text-center text-2xl text-green-600 font-semibold border border-light-positive-muted-gray dark:border-dark-positive-muted-gray">
				{#if selectedTab === 'trending'}
					Reply Guy mission accomplished. New trending posts next session.
				{:else}
					Reply Guy mission accomplished. Waiting for new posts.
				{/if}
			</div>
		{/if}

		{#if isModalOpen && selectedPost}
			<div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
				<div class="bg-light-positive-background dark:bg-dark-positive-background rounded-lg shadow-xl max-w-2xl w-full my-8 max-h-[90vh] flex flex-col border border-light-positive-muted-gray dark:border-dark-positive-muted-gray">
					<div class="flex justify-between items-center p-5 border-b border-light-positive-muted-gray dark:border-dark-positive-muted-gray">
						<h3 class="text-xl font-semibold text-light-positive-primary dark:text-dark-positive-primary flex items-center">
							<MessageCircle class="mr-2 h-5 w-5" /> Reply to Post
						</h3>
						<button
							on:click={closeModal}
							class="text-light-positive-text dark:text-dark-positive-text hover:opacity-70 transition-opacity"
						>
							<X class="h-6 w-6" />
						</button>
					</div>
					<div class="p-6 overflow-y-auto flex-grow">
						{#if selectedPost}
							<div class="bg-light-positive-muted-gray/30 dark:bg-dark-positive-muted-gray/30 p-4 rounded-lg mb-6 border border-light-positive-muted-gray/50 dark:border-dark-positive-muted-gray/50">
								<div class="flex items-center mb-3">
									<span class="text-2xl mr-3">{selectedPost.avatar}</span>
									<div>
										<span class="font-semibold text-light-positive-link dark:text-dark-positive-link">{selectedPost.name} <span class="text-light-positive-text/70 dark:text-dark-positive-text/70 font-normal">{selectedPost.author}</span></span>
										<div class="text-sm text-light-positive-text/60 dark:text-dark-positive-text/60">
											{typeof selectedPost.timestamp === 'number' ? formatLatestPostTimestamp(selectedPost.timestamp) : selectedPost.timestamp.toString()}
										</div>
									</div>
								</div>
								<p class="text-light-positive-text dark:text-dark-positive-text mb-3 whitespace-pre-wrap">{selectedPost.content}</p>
								<div class="flex items-center space-x-4 text-sm text-light-positive-text/80 dark:text-dark-positive-text/80">
									<div class="flex items-center"><Heart class="h-4 w-4 mr-1 text-red-500" />{formatNumber(selectedPost.likes)}</div>
									<div class="flex items-center"><Repeat2 class="h-4 w-4 mr-1 text-green-500" />{formatNumber(selectedPost.retweets)}</div>
									<div class="flex items-center"><Eye class="h-4 w-4 mr-1 text-purple-500" />{formatNumber(selectedPost.impressions)}</div>
								</div>
							</div>

							<div class="mb-6">
								<h4 class="font-semibold text-light-positive-text dark:text-dark-positive-text mb-3">Quick Replies:</h4>
								<div class="space-y-2">
									{#each quickReplies as reply (reply.id)}
										<button
											on:click={() => handleReply(reply.text)}
											class="w-full text-left p-3 bg-light-positive-secondary/20 dark:bg-dark-positive-secondary/20 hover:bg-light-positive-secondary/30 dark:hover:bg-dark-positive-secondary/30 rounded-lg text-sm transition-colors border border-light-positive-secondary/50 dark:border-dark-positive-secondary/50 text-light-positive-text dark:text-dark-positive-text"
										>
											{reply.text}
										</button>
									{/each}
								</div>
							</div>

							<div class="border-t border-light-positive-muted-gray dark:border-dark-positive-muted-gray pt-6">
								<h4 class="font-semibold text-light-positive-text dark:text-dark-positive-text mb-3">Custom Reply:</h4>
								<textarea
									bind:value={newReplyText}
									placeholder="Write your custom reply..."
									class="w-full p-3 border border-light-positive-muted-gray dark:border-dark-positive-muted-gray rounded-lg text-sm resize-none focus:ring-2 focus:ring-light-positive-primary dark:focus:ring-dark-positive-primary focus:border-light-positive-primary dark:focus:border-dark-positive-primary bg-light-positive-background dark:bg-dark-positive-muted-gray text-light-positive-text dark:text-dark-positive-text"
									rows="4"
								></textarea>
								<div class="flex mt-4 space-x-3">
									<button
										on:click={addCustomReplyTemplate}
										disabled={!newReplyText.trim()}
										class="px-4 py-2 bg-light-positive-muted dark:bg-dark-positive-muted text-white rounded-lg text-sm hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
									>
										Save as Template
									</button>
									<button
										on:click={() => handleReply(newReplyText)}
										disabled={!newReplyText.trim()}
										class="flex-1 px-4 py-2 bg-light-positive-button-bg dark:bg-dark-positive-button-bg text-light-positive-button-text dark:text-dark-positive-button-text rounded-lg text-sm hover:bg-light-positive-button-hover-bg dark:hover:bg-dark-positive-button-hover-bg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
									>
										<Send class="h-4 w-4 mr-2" />
										Send Reply
									</button>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

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

