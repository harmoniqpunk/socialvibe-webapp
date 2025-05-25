import init, { greet } from './os4web_lib';

export async function initializeWasm() {
    await init();
    console.log("WASM module initialized");
}

// Re-export the greet function
export { greet };

export function debugExports() {
    console.log("Exported functions:", { greet });
}