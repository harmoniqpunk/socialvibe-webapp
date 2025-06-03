<script lang="ts">
	import '../app.css';
	import { initializeWasm } from '$lib';
	import { onMount } from 'svelte';
	import { colors } from '$lib/style/colors';
	import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';

	let isOpen = false;
	let ratings = 4.5;
	let totalRatings = 128;
	let identities = ['CryptoNinja42', 'BlockchainPioneer', 'Web3Explorer'];
	let currentIdentity = identities[0];
	let dropdownOpen = false;
	let isMenuOpen = false;

	function toggleSidebar() {
		isMenuOpen = !isMenuOpen;
		const sidebar = document.getElementById('default-sidebar');
		sidebar?.classList.toggle('-translate-x-full');
		document.body.classList.toggle('menu-open');
	}

	function closeSidebar() {
		if (isMenuOpen) {
			isMenuOpen = false;
			const sidebar = document.getElementById('default-sidebar');
			sidebar?.classList.add('-translate-x-full');
			document.body.classList.remove('menu-open');
		}
	}

	function setColorScheme() {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	function selectIdentity(identity: string) {
		currentIdentity = identity;
	}

	onMount(async () => {
		setColorScheme();
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setColorScheme);
		try {
			await initializeWasm();
		} catch (e) {
			console.error("Failed to initialize WASM", e);
		}
		return () => {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setColorScheme);
		};
	});
</script>

<!-- Header -->
<div class="fixed top-0 left-0 right-0 h-20 bg-white z-50 flex items-center">
	<img src="/socialvibe-logo.png" alt="SocialVibe Logo" style="height:58px; padding-left:12px; padding-right:10px;" class="object-contain" />
	<!-- Mobile Toggle Button -->
	<button
		type="button"
		class="absolute top-1/2 right-3 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 sm:hidden rounded-full overflow-hidden hover:ring-2 hover:ring-light-positive-primary dark:hover:ring-dark-positive-primary focus:outline-none focus:ring-2 focus:ring-light-positive-primary dark:focus:ring-dark-positive-primary bg-light-positive-primary dark:bg-dark-positive-primary text-light-positive-background dark:text-dark-positive-background z-50 {isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300"
		on:click={toggleSidebar}
		aria-controls="default-sidebar"
	>
		<span class="sr-only">Open sidebar</span>
		<!-- Hamburger icon -->
		<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>
</div>

<!-- Overlay for closing sidebar -->
{#if isMenuOpen}
	<button 
		type="button"
		class="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden transition-opacity duration-300"
		on:click={closeSidebar}
		on:keydown={(e) => e.key === 'Escape' && closeSidebar()}
		aria-label="Close sidebar"
	></button>
{/if}

<!-- Sidebar -->
<aside 
	id="default-sidebar" 
	class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out -translate-x-full sm:translate-x-0 bg-gray-300" 
	aria-label="Sidebar"
>
	<div class="h-full px-3 py-4 overflow-y-auto">
		<!-- Sidebar content will be added here later -->
	</div>
</aside>

<!-- Main Content -->
<div 
	class="pt-16 sm:pt-16 sm:ml-64 transition-transform duration-300 ease-in-out min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
	role="presentation"
	on:click={closeSidebar}
	on:keydown={(e) => e.key === 'Escape' && closeSidebar()}
>
	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
	:global(body) {
		@apply bg-light-positive-background dark:bg-dark-positive-background text-light-positive-primary dark:text-dark-positive-primary;
		font-family: 'Raleway', sans-serif;
	}

	:global(*) {
		font-family: 'Raleway', sans-serif;
	}

	/* Prevent body scroll when menu is open */
	:global(body.menu-open) {
		overflow: hidden;
	}
</style>
