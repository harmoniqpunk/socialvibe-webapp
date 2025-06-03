# SocialVibe WebApp - Project TODO List

## Phase 0: Documentation & Workflow Setup
| Task ID | Description                                          | Priority | Assigned To | Status    | Due Date   | Notes                                     |
|---------|------------------------------------------------------|----------|-------------|-----------|------------|-------------------------------------------|
| TODO-000| Finalize AI Planner onboarding & doc structure       | Critical | Executor    | Done      | 2024-03-19 | This task.                                |
| TODO-001| Populate `BROWSER_TOOLS_GUIDE.MD` with actual tool details | High   | George      | Pending   | 2024-03-19 | Fill in placeholders.                     |

## Phase 1: Initial UI Implementation (Example Tasks)
| Task ID | Description                                          | Priority | Assigned To | Status    | Due Date   | Notes                                     |
|---------|------------------------------------------------------|----------|-------------|-----------|------------|-------------------------------------------|
| TODO-101| Implement Basic 'Trending Posts' Feed Display      | High     | Planner     | Pending   | 2024-03-19 | Use `src/lib/mockTwitterData.ts`.       |
| TODO-102| Implement Basic 'Latest Posts' Feed Display        | High     | Planner     | Pending   | 2024-03-19 | Simulate live feed.                       |
| TODO-103| Create Reusable Post Display Component (`Post.svelte`)| High   | Planner     | Pending   | 2024-03-19 | Display author, content, time.            |
| TODO-104| Add top margin to "ReplyGuy Command Center" header | High     | Executor    | Pending   |            | Ensure header doesn't touch top nav bar. |

## Future Tasks
* (Planner to add tasks based on `docs/PROJECT_OVERVIEW.MD` and operator input) 

## Phase 2: SvelteKit Refactor
| Task ID | Description | Priority | Assigned To | Status | Due Date | Notes |
|---------|-------------|----------|-------------|--------|----------|-------|
| REFAC-SVELTE-001 | Full refactor to SvelteKit & cleanup React/JSX | Critical | Executor | In Progress | | Remove src/ui, implement dashboard in Svelte | 