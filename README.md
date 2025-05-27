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
- [AI Planner & Development Workflow](#ai-planner-and-development-workflow)

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

## AI Planner & Development Workflow

This project utilizes an AI Planner to help manage and drive development. Please familiarize yourself with the documentation in the `docs/` directory, especially:

* `docs/SYSTEM_PROMPT.md`: The AI Planner's core operating instructions.
* `docs/PLANNER_OPERATING_MANUAL.md`: Detailed guidelines for how the Planner works, including Git workflows and progress tracking.
* `docs/PROJECT_OVERVIEW.md`: The vision and goals for this application.
* `docs/ROLES_AND_RESPONSIBILITIES.md`: Defines who is who (human and AI).
* `docs/BROWSER_TOOLS_GUIDE.md`: Information on setting up and using browser-based development tools with the AI Executor.

### Onboarding the AI Planner

To start a development session with the AI Planner:

1.  Invoke the AI Planner (details depend on your interface with the Planner).
2.  The Planner will ask you to identify yourself (George or Mihnea).
3.  The Planner will then review `docs/PROJECT_TODO.md` and `docs/PROJECT_STATUS.md`.
4.  Clearly state your objective for the session.

### Example Onboarding Prompt for Mihnea (as Operator)

If you are Mihnea, after the Planner asks for your identity and reviews the status, you can initiate a task like this:

**Mihnea:** "Hi Planner, I'm Mihnea. For this session, I want to start implementing the basic UI for displaying the 'Trending Posts' feed. We should create a Svelte component that takes the mock data and lists out the posts with their author, content, and timestamp. Let's call the feature `display-trending-posts`."

The Planner will then guide the process, including instructing the Executor to create a new feature branch (`feature/display-trending-posts` or similar) and manage commits with your confirmation.
