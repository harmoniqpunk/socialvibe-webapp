<!-- src\routes\+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Button, Card } from 'flowbite-svelte';
	import { colors } from '$lib/style/colors';

	interface Tweet {
		id: string;
		content: string;
		author: string;
		timestamp: string;
		likes: number;
		reposts: number;
		comments: number;
		priority: number;
	}

	let tweets: Tweet[] = [
		{
			id: '1',
			content: 'Just launched my new NFT collection! Check it out at #NFTLaunch',
			author: 'CryptoNinja42',
			timestamp: '2h',
			likes: 128,
			reposts: 45,
			comments: 23,
			priority: 1
		},
		{
			id: '2',
			content: 'The future of web3 is here! #Web3Revolution',
			author: 'BlockchainPioneer',
			timestamp: '4h',
			likes: 256,
			reposts: 89,
			comments: 45,
			priority: 2
		},
		{
			id: '3',
			content: 'Excited to announce my new partnership with @Web3Explorer! #CryptoNews',
			author: 'Web3Explorer',
			timestamp: '6h',
			likes: 512,
			reposts: 167,
			comments: 89,
			priority: 3
		}
	];

	function formatNumber(num: number): string {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'M';
		}
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	}

	onMount(() => {
		// Sort tweets by priority
		tweets.sort((a, b) => b.priority - a.priority);
	});
</script>

<div class="container mx-auto px-4 py-8">
	<!-- Feed Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-light-positive-primary dark:text-dark-positive-primary">Discover Feed</h1>
		<p class="text-light-positive-secondary dark:text-dark-positive-secondary">Latest updates from your network</p>
	</div>

	<!-- Tweet Feed -->
	<div class="space-y-6">
		{#if browser}
			{#each tweets as tweet (tweet.id)}
				<Card class="bg-light-positive-background dark:bg-dark-positive-background border-light-positive-muted-gray dark:border-dark-positive-muted-gray">
					<div class="p-4">
						<div class="flex items-center space-x-4">
							<div class="w-12 h-12 rounded-full bg-light-positive-primary dark:bg-dark-positive-primary flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-light-positive-background dark:text-dark-positive-background" viewBox="0 0 24 24">
									<path fill="currentColor" d="M12 5.9a2.1 2.1 0 1 1 0 4.2a2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4" />
								</svg>
							</div>
							<div>
								<h3 class="text-lg font-semibold text-light-positive-primary dark:text-dark-positive-primary">{tweet.author}</h3>
								<p class="text-sm text-light-positive-secondary dark:text-dark-positive-secondary">{tweet.timestamp}</p>
							</div>
						</div>
					</div>
					<div class="p-4 pt-0">
						<p class="text-light-positive-primary dark:text-dark-positive-primary">{tweet.content}</p>
					</div>
					<div class="p-4 pt-0">
						<div class="flex justify-between w-full">
							<button class="flex items-center space-x-2 text-light-positive-secondary dark:text-dark-positive-secondary hover:text-light-positive-primary dark:hover:text-dark-positive-primary">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
									<path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
								</svg>
								<span>{formatNumber(tweet.likes)}</span>
							</button>
							<button class="flex items-center space-x-2 text-light-positive-secondary dark:text-dark-positive-secondary hover:text-light-positive-primary dark:hover:text-dark-positive-primary">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
									<path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1c1.71 0 3.1 1.39 3.1 3.1z" />
								</svg>
								<span>{formatNumber(tweet.reposts)}</span>
							</button>
							<button class="flex items-center space-x-2 text-light-positive-secondary dark:text-dark-positive-secondary hover:text-light-positive-primary dark:hover:text-dark-positive-primary">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
									<path fill="currentColor" d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4z" />
								</svg>
								<span>{formatNumber(tweet.comments)}</span>
							</button>
						</div>
					</div>
				</Card>
			{/each}
		{:else}
			<div class="text-center py-8">
				<p class="text-light-positive-secondary dark:text-dark-positive-secondary">Loading feed...</p>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	:global(body) {
		@apply bg-light-positive-background dark:bg-dark-positive-background;
	}
</style>

