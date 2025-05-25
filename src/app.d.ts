/// <reference types="@cloudflare/workers-types" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

interface Env {
	SOCIALVIBE_KV: KVNamespace
	SOCIALVIBE_DO: DurableObjectNamespace
	GROQ_API_KEY: string
}

export {};
