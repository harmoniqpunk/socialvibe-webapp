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
		
		// Toggle body scroll
		document.body.classList.toggle('menu-open');
	}

	function closeSidebar() {
		if (isMenuOpen) {
			isMenuOpen = false;
			const sidebar = document.getElementById('default-sidebar');
			sidebar?.classList.add('-translate-x-full');
			
			// Remove body scroll lock
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

	const currentYear = new Date().getFullYear();
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
				<!-- Left side - Profile Picture (links to /profile) -->
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
			<!-- <li>
				<a href="/notifications" class="flex items-center p-2 rounded-lg text-light-positive-primary dark:text-dark-positive-primary hover:bg-light-positive-secondary dark:hover:bg-dark-positive-secondary group text-xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
						<path fill="currentColor" d="M5 18.77v-1h1.616V9.845q0-1.96 1.24-3.447T11 4.546V4q0-.417.291-.708q.291-.292.707-.292t.709.292T13 4v.546q1.904.365 3.144 1.853t1.24 3.447v7.923H19v1zm6.997 2.615q-.668 0-1.14-.475t-.472-1.14h3.23q0 .67-.475 1.142q-.476.472-1.143.472" />
					</svg>
					<span class="ms-3">Notifications</span>
				</a>
			</li>
			<li>
				<a href="/messages" class="flex items-center p-2 rounded-lg text-light-positive-primary dark:text-dark-positive-primary hover:bg-light-positive-secondary dark:hover:bg-dark-positive-secondary group text-xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="-2 -2 24 24" {...$$props}>
						<g fill="currentColor">
							<path d="M7.46 2.332C8.74.913 10.746 0 13 0c3.866 0 7 2.686 7 6c0 1.989-1.13 3.752-2.868 4.844L17 10.92v4.05a1 1 0 0 1-1.718.696l-1.14-1.174c1.069-1.264 1.698-2.816 1.698-4.493c0-4.067-3.698-7.395-8.38-7.667" />
							<path d="m8.385 15.886l-3.667 3.78A1 1 0 0 1 3 18.97v-4.05l-.132-.076C1.129 13.752 0 11.989 0 10c0-3.314 3.134-6 7-6s7 2.686 7 6c0 2.726-2.121 5.028-5.026 5.758a8 8 0 0 1-.589.128" />
						</g>
					</svg>
					<span class="ms-3">Messages</span>
				</a>
			</li>  -->
			<li>
				<a href="/wallet" class="flex items-center p-2 rounded-lg text-light-positive-primary dark:text-dark-positive-primary hover:bg-light-positive-secondary dark:hover:bg-dark-positive-secondary group text-xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
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
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
						<path fill="currentColor" d="M21.22 6.894a3.7 3.7 0 0 0-1.4-1.37l-6-3.31a3.83 3.83 0 0 0-3.63 0l-6 3.31a3.7 3.7 0 0 0-1.4 1.37a3.74 3.74 0 0 0-.52 1.9v6.41a3.79 3.79 0 0 0 1.92 3.27l6 3.3a3.74 3.74 0 0 0 3.63 0l6-3.31a3.72 3.72 0 0 0 1.91-3.26v-6.36a3.64 3.64 0 0 0-.51-1.95m-1 8.31a2.2 2.2 0 0 1-1.14 1.95l-6 3.31q-.158.089-.33.14v-8.18l7.3-4.39c.092.242.136.5.13.76z" />
					</svg>
					<span class="ms-3">Content</span>
				</a>
			</li>
			<li>
				<a href="/environments" class="flex items-center p-2 rounded-lg text-light-positive-primary dark:text-dark-positive-primary hover:bg-light-positive-secondary dark:hover:bg-dark-positive-secondary group text-xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" {...$$props}>
						<path fill="currentColor" d="M15.9 5.5C15.3 4.5 14.2 4 13 4H7c-1.2 0-2.3.5-2.9 1.5c-2.3 3.5-2.8 8.8-1.2 9.9s5.2-3.7 7.1-3.7s5.4 4.8 7.1 3.7c1.6-1.1 1.1-6.4-1.2-9.9M8 9H7v1H6V9H5V8h1V7h1v1h1zm5.4.5c0 .5-.4.9-.9.9s-.9-.4-.9-.9s.4-.9.9-.9s.9.4.9.9m1.9-2c0 .5-.4.9-.9.9s-.9-.4-.9-.9s.4-.9.9-.9s.9.4.9.9" />
					</svg>
					<span class="ms-3">Games</span>
				</a>
			</li>
			<li>
				<a href="/agents" class="flex items-center p-2 rounded-lg text-light-positive-primary dark:text-dark-positive-primary hover:bg-light-positive-secondary dark:hover:bg-dark-positive-secondary group text-xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...$$props}>
						<path fill="currentColor" fill-rule="evenodd" d="M384 128v256H128V128zm-148.25 64h-24.932l-47.334 128h22.493l8.936-25.023h56.662L260.32 320h23.847zm88.344 0h-22.402v128h22.402zm-101 21.475l22.315 63.858h-44.274zM405.335 320H448v42.667h-42.667zm-256 85.333H192V448h-42.667zm85.333 0h42.666V448h-42.666zM149.333 64H192v42.667h-42.667zM320 405.333h42.667V448H320zM234.667 64h42.666v42.667h-42.666zM320 64h42.667v42.667H320zm85.333 170.667H448v42.666h-42.667zM64 320h42.667v42.667H64zm341.333-170.667H448V192h-42.667zM64 234.667h42.667v42.666H64zm0-85.334h42.667V192H64z" />
					</svg>
					<span class="ms-3">Agents</span>
				</a>
			</li>
			<li>
				<a href="/sim2real" class="flex items-center p-2 rounded-lg text-light-positive-primary dark:text-dark-positive-primary hover:bg-light-positive-secondary dark:hover:bg-dark-positive-secondary group text-xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
						<path fill="currentColor" fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10M7 14.75h8l-1.93 1.685a.75.75 0 0 0 .986 1.13l3.437-3A.75.75 0 0 0 17 13.25H7a.75.75 0 0 0 0 1.5m4.003-8.243a.75.75 0 0 1-.072 1.058L9 9.25h8a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.493-1.315l3.437-3a.75.75 0 0 1 1.059.072" clip-rule="evenodd" />
					</svg>
					<span class="ms-3">Sim2Real</span>
				</a>
			</li>
			<li>
				<a href="/settings" class="flex items-center p-2 rounded-lg text-light-positive-primary dark:text-dark-positive-primary hover:bg-light-positive-secondary dark:hover:bg-dark-positive-secondary group text-xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" {...$$props}>
						<path fill="currentColor" d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11 11 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.5 11.5 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11 11 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.5 11.5 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51ZM25.21 24l-3.43-1.16a8.9 8.9 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.4 9.4 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.9 8.9 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.4 9.4 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20Z" />
						<path fill="currentColor" d="M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6m0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4" />
					</svg>
					<span class="ms-3">Settings</span>
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
		<slot></slot>
	</main>
</div>

<!-- Glow Effect Style -->
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
