<script lang="ts">
	import '../app.css';
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

	onMount(() => {
		setColorScheme();
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setColorScheme);
		return () => {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setColorScheme);
		};
	});
</script>

<!-- Header -->
<div class="fixed top-0 left-0 right-0 h-20 bg-light-positive-background dark:bg-dark-positive-background z-40">
	<!-- Mobile Toggle Button -->
	<button
		type="button"
		class="inline-flex items-center justify-center w-12 h-12 mt-4 ms-4 sm:hidden rounded-full overflow-hidden hover:ring-2 hover:ring-light-positive-primary dark:hover:ring-dark-positive-primary focus:outline-none focus:ring-2 focus:ring-light-positive-primary dark:focus:ring-dark-positive-primary bg-light-positive-primary dark:bg-dark-positive-primary text-light-positive-background dark:text-dark-positive-background z-50 {isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300"
		on:click={toggleSidebar}
		aria-controls="default-sidebar"
	>
		<span class="sr-only">Open sidebar</span>
		<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24">
			<path fill="currentColor" d="M12 5.9a2.1 2.1 0 1 1 0 4.2a2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4" />
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
	class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out -translate-x-full sm:translate-x-0" 
	aria-label="Sidebar"
>
	<div class="h-full px-3 py-4 overflow-y-auto bg-light-positive-background dark:bg-dark-positive-background">
		<!-- User Profile Section -->
		<div class="flex flex-col mb-6">
			<!-- Main Profile Button -->
			<div class="flex items-center w-full p-3">
				<!-- Left side - Profile Picture -->
				<a href="/profile" class="flex-shrink-0">
					<div class="w-10 h-10 rounded-full bg-light-positive-primary dark:bg-dark-positive-primary text-light-positive-background dark:text-dark-positive-background flex items-center justify-center overflow-hidden">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
							<path fill="currentColor" d="M12 5.9a2.1 2.1 0 1 1 0 4.2a2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4" />
						</svg>
					</div>
				</a>

				<!-- Middle - Identity Text -->
				<div class="ml-3 flex flex-col items-start overflow-hidden">
					<span class="text-sm font-semibold text-light-positive-primary dark:text-dark-positive-primary truncate max-w-[150px]">{currentIdentity}</span>
				</div>

				<!-- Right side - More Icon Button -->
				<button
					on:click={() => dropdownOpen = !dropdownOpen}
					class="ml-auto focus:outline-none"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" class="w-5 h-5 text-light-positive-primary dark:text-dark-positive-primary">
						<path fill="currentColor" fill-rule="evenodd" d="M2.5 7.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m15 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m-7.274 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5" />
					</svg>
				</button>
			</div>

			<!-- Dropdown Items -->
			{#if dropdownOpen}
				<div class="z-10 w-full mt-2 bg-light-positive-background dark:bg-dark-positive-background rounded-2xl shadow-lg">
					<ul class="py-2">
						{#each identities as identity}
							<li>
								<button
									on:click={() => {
										selectIdentity(identity);
										dropdownOpen = false;
									}}
									class="w-full px-3 py-2 flex items-start hover:bg-light-positive-muted-gray dark:hover:bg-dark-positive-muted-gray rounded-full"
								>
									<!-- Left side - Profile Picture -->
									<div class="flex-shrink-0 w-10 h-10 rounded-full bg-light-positive-primary dark:bg-dark-positive-primary text-light-positive-background dark:text-dark-positive-background flex items-center justify-center overflow-hidden">
										<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
											<path fill="currentColor" d="M12 5.9a2.1 2.1 0 1 1 0 4.2a2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4" />
										</svg>
									</div>

									<!-- Right side - Info -->
									<div class="ml-3 flex flex-col items-start">
										<span class="text-sm font-semibold text-light-positive-primary dark:text-dark-positive-primary">{identity}</span>
									</div>
								</button>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>

		<!-- Navigation Menu -->
		<ul class="space-y-2 font-medium">
			<li>
				<a href="/" class="flex items-center p-2 rounded-lg text-light-positive-primary dark:text-dark-positive-primary hover:bg-light-positive-secondary dark:hover:bg-dark-positive-secondary group text-xl">
					<img src="/logo.svg" class="h-6 dark:filter dark:brightness-0 dark:invert" alt="Logo" />
					<span class="ms-2">Discover</span>
				</a>
			</li>
			<li>
				<a href="/wallet" class="flex items-center p-2 rounded-lg text-light-positive-primary dark:text-dark-positive-primary hover:bg-light-positive-secondary dark:hover:bg-dark-positive-secondary group text-xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
						<g fill="currentColor" stroke-width="1.5">
							<path fill-rule="evenodd" d="M5 6.25A2.75 2.75 0 0 0 2.25 9v9A2.75 2.75 0 0 0 5 20.75h14A2.75 2.75 0 0 0 21.75 18V9A2.75 2.75 0 0 0 19 6.25zm11.5 6a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5" clip-rule="evenodd" />
							<path d="M16.485 3.069A2 2 0 0 1 19 5H9z" />
						</g>
					</svg>
					<span class="ms-3">Wallet</span>
				</a>
			</li>
			<li>
				<a href="/assets" class="flex items-center p-2 rounded-lg text-light-positive-primary dark:text-dark-positive-primary hover:bg-light-positive-secondary dark:hover:bg-dark-positive-secondary group text-xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
						<path fill="currentColor" d="M21.22 6.894a3.7 3.7 0 0 0-1.4-1.37l-6-3.31a3.83 3.83 0 0 0-3.63 0l-6 3.31a3.7 3.7 0 0 0-1.4 1.37a3.74 3.74 0 0 0-.52 1.9v6.41a3.79 3.79 0 0 0 1.92 3.27l6 3.3a3.74 3.74 0 0 0 3.63 0l6-3.31a3.72 3.72 0 0 0 1.91-3.26v-6.36a3.64 3.64 0 0 0-.51-1.95m-1 8.31a2.2 2.2 0 0 1-1.14 1.95l-6 3.31q-.158.089-.33.14v-8.18l7.3-4.39c.092.242.136.5.13.76z" />
					</svg>
					<span class="ms-3">Content</span>
				</a>
			</li>
		</ul>
	</div>
</aside>

<!-- Main Content -->
<div 
	class="pt-16 sm:pt-16 sm:ml-64 transition-transform duration-300 ease-in-out {isMenuOpen ? 'translate-x-64' : ''}"
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

	/* Minimal styles for the container, if any, or rely on app.css */
	.app-container {
		/* display: flex; flex-direction: column; min-height: 100vh; */
		/* Adjust as needed, or could be empty if global styles handle it */
	}
</style>
