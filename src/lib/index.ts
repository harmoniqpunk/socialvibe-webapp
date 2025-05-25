import init, { greet } from './socialvibe_lib/socialvibe_lib';

export async function initializeWasm() {
    await init();
    console.log("SocialVibe WASM module initialized");
}

// Re-export the greet function
export { greet };

export function debugExports() {
    console.log("Exported functions:", { greet });
}