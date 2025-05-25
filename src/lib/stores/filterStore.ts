import { writable } from 'svelte/store';

export const selectedFilters = writable<Record<string, string[]>>({}); 