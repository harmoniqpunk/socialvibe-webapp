<script lang="ts">
	import { selectedFilters } from '$lib/stores/filterStore';
	import { Dropdown, DropdownItem, Input, Checkbox } from 'flowbite-svelte';

	export let category: string;
	export let options: string[];

	let searchTerm = '';
	let isOpen = false;

	$: filteredOptions = options.filter(option =>
		option.toLowerCase().includes(searchTerm.toLowerCase())
	);

	function toggleFilter(option: string) {
		$selectedFilters = {
			...$selectedFilters,
			[category]: $selectedFilters[category]?.includes(option)
				? $selectedFilters[category].filter(f => f !== option)
				: [...($selectedFilters[category] || []), option]
		};
	}
</script>

<div class="relative">
	<button
		on:click={() => (isOpen = !isOpen)}
		class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
	>
		{category} ({$selectedFilters[category]?.length || 0})
	</button>

	{#if isOpen}
		<div class="absolute z-10 w-64 mt-2 bg-white rounded-md shadow-lg">
			<div class="p-2">
				<Input
					type="search"
					bind:value={searchTerm}
					placeholder="Search filters..."
					class="w-full"
				/>
			</div>
			<div class="max-h-60 overflow-y-auto p-2">
				{#each filteredOptions as option}
					<div class="flex items-center p-2">
						<Checkbox
							checked={$selectedFilters[category]?.includes(option)}
							on:change={() => toggleFilter(option)}
						>
							{option}
						</Checkbox>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div> 