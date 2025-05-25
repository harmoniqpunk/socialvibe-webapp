/// <reference types="@cloudflare/workers-types" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {

		interface Platform {
			env: {
				SOCIALVIBE_KV: KVNamespace;
				GROQ_API_KEY: string;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache }
		}

		
	}
}

interface Env {
	SOCIALVIBE_KV: KVNamespace
	SOCIALVIBE_DO: DurableObjectNamespace
	GROQ_API_KEY: string
}

export {};
