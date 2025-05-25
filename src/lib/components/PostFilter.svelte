<script lang="ts">
	import { Button, Dropdown, DropdownItem, Input } from 'flowbite-svelte';
	import { selectedFilters } from '$lib/stores/filterStore';

	export let filterOptions: Record<string, string[]>;
	
	// Ensure sim2real is the last tab
	const tabOrder = ['content', 'games', 'agents', 'sim2real'];
	let activeTab: string = tabOrder[0];
	let isFilterOpen = false;
	let searchTerm = '';
	let customTags: Record<string, string[]> = {
		content: [],
		games: [],
		sim2real: [],
		agents: []
	};

	function handleTabClick(tab: string) {
		activeTab = tab;
		$selectedFilters = {
			...$selectedFilters,
			[tab]: filterOptions[tab]
		};
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && searchTerm.trim()) {
			const newTag = searchTerm.trim();
			customTags[activeTab] = [...(customTags[activeTab] || []), newTag];
			$selectedFilters = {
				...$selectedFilters,
				[activeTab]: [...($selectedFilters[activeTab] || []), newTag]
			};
			searchTerm = '';
		}
	}

	function addTag(tag: string) {
		if (!$selectedFilters[activeTab]?.includes(tag)) {
			$selectedFilters = {
				...$selectedFilters,
				[activeTab]: [...($selectedFilters[activeTab] || []), tag]
			};
		}
	}

	function removeTag(tag: string) {
		customTags[activeTab] = customTags[activeTab].filter(t => t !== tag);
		$selectedFilters = {
			...$selectedFilters,
			[activeTab]: ($selectedFilters[activeTab] || []).filter(t => t !== tag)
		};
	}

	$: filteredOptions = activeTab
		? filterOptions[activeTab]?.filter(option =>
			option.toLowerCase().includes(searchTerm.toLowerCase())
		  ) 
		: [];
</script>

<div class="sticky top-0 z-10 bg-light-positive-background dark:bg-dark-positive-background p-2 sm:p-4 border-b border-gray-200 dark:border-gray-700">
	<div class="flex justify-between sm:justify-start gap-1 sm:gap-4">
		{#each tabOrder as tab}
			<button
				class="px-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base whitespace-nowrap {activeTab === tab 
						? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' 
						: 'text-gray-600 dark:text-gray-400'}"
				on:click={() => handleTabClick(tab)}
			>
				{tab}
			</button>
		{/each}

		<div class="relative">
			<button
				on:click={() => isFilterOpen = !isFilterOpen}
				class="!p-2 sm:!p-2.5 min-w-[40px] text-light-positive-primary dark:text-dark-positive-primary rounded-lg"
			>
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					width="1.2em" 
					height="1.2em" 
					viewBox="0 0 24 24" 
					class="text-current"
				>
					<path 
						fill="currentColor" 
						d="M19 6H5c-1.1 0-1.4.6-.6 1.4l4.2 4.2c.8.8 1.4 2.3 1.4 3.4v5l4-2v-3.5c0-.8.6-2.1 1.4-2.9l4.2-4.2c.8-.8.5-1.4-.6-1.4"
					/>
				</svg>
			</button>

			{#if isFilterOpen}
				<div class="absolute right-0 sm:left-0 top-full mt-2 w-[280px] sm:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
					<!-- Search input -->
					<div class="mb-4">
						<Input
							type="search"
							bind:value={searchTerm}
							on:keydown={handleKeydown}
							placeholder="Search or add new tag (press Enter)"
							class="w-full"
						/>
					</div>

					<!-- Predefined tags -->
					<div class="mb-4">
						<h3 class="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Suggested Tags</h3>
						<div class="flex flex-wrap gap-2">
							{#each filteredOptions as option}
								<button
									type="button"
									class="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800"
									on:click={() => addTag(option)}
									role="checkbox"
									aria-checked={$selectedFilters[activeTab]?.includes(option)}
								>
									{option}
								</button>
							{/each}
						</div>
					</div>

					<!-- Custom tags -->
					{#if customTags[activeTab]?.length > 0}
						<div>
							<h3 class="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Custom Tags</h3>
							<div class="flex flex-wrap gap-2">
								{#each customTags[activeTab] as tag}
									<button
										type="button"
										class="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 flex items-center gap-1"
										on:click={() => removeTag(tag)}
										role="checkbox"
										aria-checked={$selectedFilters[activeTab]?.includes(tag)}
									>
										{tag}
										<span class="ml-1 text-xs">×</span>
									</button>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Ensure buttons don't shrink below readable size */
	button {
		min-width: min-content;
	}
</style>