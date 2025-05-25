import { writable } from 'svelte/store';

type FilterStore = Record<string, string[]>;

const initialFilters: FilterStore = {
    content: [],
    games: [],
    sim2real: [],
    agents: []
};

export const selectedFilters = writable<FilterStore>(initialFilters); 