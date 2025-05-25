# SocialVibe WebApp

This repository contains the source code for the SocialVibe web application, a SvelteKit application with WebAssembly integration, designed to be deployed on Cloudflare Pages.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Rust](https://www.rust-lang.org/tools/install)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/socialvibe-webapp.git
   cd socialvibe-webapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the WebAssembly module:
   ```
   npm run wasm
   ```

## Development

To start the development server:

```
npm run dev
```

This will start the SvelteKit development server, usually at `http://localhost:5173`.

## Building

To build the project for production:

```
npm run build
```

This command will:
1. Build the WebAssembly module
2. Compile the SvelteKit application
3. Prepare the output for Cloudflare Pages deployment

## Deployment

Due to the custom WebAssembly build step, this project requires manual deployment to Cloudflare Pages. Automatic deployments from Git are not supported because Cloudflare's build environment doesn't include `wasm-pack`.

To deploy:

1. Ensure you're logged in to Wrangler:
   ```
   wrangler login
   ```

2. Build and deploy the project:
   ```
   npm run deploy
   ```

This will build the project and deploy it to Cloudflare Pages.

## Project Structure

- `src/`: SvelteKit application source
- `socialvibe-lib/`: Rust source for WebAssembly module
- `static/`: Static assets
- `vite.config.ts`: Vite configuration
- `svelte.config.js`: SvelteKit configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `wrangler.toml`: Cloudflare Workers configuration

## Technologies Used

- [SvelteKit](https://kit.svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)
- [WebAssembly](https://webassembly.org/)
- [Rust](https://www.rust-lang.org/)
- [Vite](https://vitejs.dev/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
