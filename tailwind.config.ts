import flowbitePlugin from 'flowbite/plugin';
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import { colors } from './src/lib/style/colors';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: colors,
			fontFamily: {
				sans: ['Raleway', 'sans-serif'],
			},
		},
	},

	plugins: [typography, flowbitePlugin],

	darkMode: 'class',
} as Config;
