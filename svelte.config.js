import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	

	kit: {
		// Use the Cloudflare adapter
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
			platformProxy: {
				configPath: 'wrangler.toml',
				environment: process.env.ENVIRONMENT,
				experimentalJsonConfig: false,
				persist: false
			}
		}),
		files: {
			assets: 'static',
			lib: 'src/lib',
		}
	}
};

export default config;
