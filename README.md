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

This project utilizes an AI Planner to help manage and drive development. The Planner follows a strict onboarding protocol and specific interaction flows depending on the operator.

### Key Documentation for the Planner Ecosystem:
* `docs/SYSTEM_PROMPT.MD`: The AI Planner's core operating instructions. **This is the first document the Planner processes to understand its role and how to interact with other documents.**
* `docs/PLANNER_OPERATING_MANUAL.MD`: Detailed guidelines for how the Planner works, including how it should author prompts for AI Executors, Git workflows for different operators, and progress tracking procedures.
* `docs/PROJECT_OVERVIEW.MD`: The vision and goals for this application.
* `docs/ARCHITECTURE.MD`: Technical architecture of the SocialVibe WebApp.
* `docs/ROLES_AND_RESPONSIBILITIES.MD`: Defines roles for Human Operators (George, Mihnea) and AI agents.
* `docs/DEVELOPMENT_GUARDRAILS.MD`: Non-negotiable development rules.
* `docs/PROJECT_TODO.MD`: Live list of development tasks.
* `docs/PROJECT_STATUS.MD`: Log of ongoing and completed tasks and sessions.
* `docs/BROWSER_TOOLS_GUIDE.MD`: Information on setting up and using any project-specific browser-based development tools.

### Onboarding and Interacting with the AI Planner

1.  **Invoking the AI Planner (Human Operator Action):**
    * To start a session, you (the Human Operator - George or Mihnea) must invoke the AI Planner.
    * When invoking the Planner, you need to provide it with access to the `socialvibe-webapp` project folder (so it can read the `docs/` and `src/` files).
    * Your initial prompt to the Planner should identify who you are (George or Mihnea) and state that its first task is to perform its internal onboarding. For example:
      `"Hello Planner, this is [Your Name: George/Mihnea]. Please begin your standard onboarding procedure for the SocialVibe WebApp project. The project folder is accessible at [current working directory or path to project root]."`

2.  **Planner's Internal Onboarding (AI Planner Action):**
    * Upon receiving your initial prompt, the Planner will follow the instructions in its `docs/SYSTEM_PROMPT.MD` (Section 2).
    * It will first confirm your identity.
    * Then, it will announce that it's starting its internal onboarding. This involves sequentially reading core project documents (`SYSTEM_PROMPT.MD`, `PLANNER_OPERATING_MANUAL.MD`, etc.).
    * The Planner will **confirm its understanding with you** after processing key groups of documents and will await your go-ahead before proceeding to the next stage or being ready for tasks.
    * This entire internal onboarding by the Planner must complete before you can assign it your first development task for the session.

3.  **Starting a Development Task (After Planner Onboarding):**
    * Once the Planner confirms it's fully onboarded and ready (e.g., *"I am now fully onboarded and ready to assist. Please provide your objective for this session."*), you can state your development goal.
    * The Planner will then review `docs/PROJECT_TODO.MD` and `docs/PROJECT_STATUS.MD` and proceed with planning.

### Example: Mihnea's First Task Instruction (Post-Planner Onboarding)

*(This interaction occurs **after** the AI Planner has completed its multi-step internal onboarding and confirmed its readiness with Mihnea.)*

**Mihnea:** "Hi Planner, thanks for confirming you're ready. I'm Mihnea. For this session, I want to start implementing the basic UI for displaying the 'Trending Posts' feed. We should create a Svelte component that takes the mock data and lists out the posts with their author, content, and timestamp. Let's call the feature `display-trending-posts`."

The Planner will then guide the process. Since the operator is Mihnea, its first action will be to instruct the AI Executor to ask Mihnea for a feature branch name (derived from `display-trending-posts`) and create that branch from `develop`. Subsequent commits will also require Mihnea's explicit confirmation.
