# Planner Operating Manual: SocialVibe WebApp Frontend

## 1. Purpose

This document provides guidelines for the AI Planner on how to create effective, clear, and executable prompts for the AI Executor working on the SocialVibe WebApp frontend project. Adherence to these guidelines is crucial for efficient development and minimizing errors.

**In addition to these guidelines, the Planner MUST consult the following documents as the primary source of comprehensive project context, current status, and key decisions before generating any execution prompts:**

* `docs/PROJECT_OVERVIEW.md`: Overall project vision and goals
* `docs/ARCHITECTURE.md`: Frontend architecture and technical decisions
* `docs/PROJECT_TODO.md`: Current tasks and their status
* `docs/PROJECT_STATUS.md`: Latest development status and session tracking
* `docs/DEVELOPMENT_GUARDRAILS.md`: Development rules and standards

The Planner is responsible for keeping these documents up to date with significant new decisions and progress.

## 2. Core Principles for Prompts

* **Clarity & Specificity:** Prompts must be unambiguous. Clearly define the task, the expected outcome, and the exact steps or content required.
* **No Ambiguity:** Avoid vague language or instructions that could be interpreted in multiple ways.
* **Self-Contained (or Clearly Referenced):** Provide all necessary information within the prompt or by precise reference to existing, accessible project files.
* **Adherence to Guardrails:** All prompts must remind Executors to follow `docs/DEVELOPMENT_GUARDRAILS.md`.
* **Idempotency (where possible):** Design prompts so that if an Executor had to re-run a *successful* prompt, it wouldn't cause negative side effects.

## 3. Prompt Structure and Format

* **Delivery Format:** All execution prompts must be delivered to Executors as **raw markdown, typically within fenced code blocks.**
* **Task Definition:** Start with a clear, concise statement of what the Executor needs to accomplish.
* **File Path Specification:**
    * Always provide file paths relative to the project root (e.g., `src/routes/+page.svelte`, `src/lib/components/Post.svelte`).
    * **Crucially, the Planner MUST NEVER explicitly write the root folder's name in these paths within prompts for Executors.** The Executor operates with the root as its implicit current working directory.
* **Code/Content Instructions:**
    * For new code/content: Provide the exact code block or text to be inserted.
    * For modifications: Clearly specify the file, the location within the file, and the exact changes to be made. Show the "before" and "after" or use diff-like instructions if it aids clarity for complex changes.
* **Tool Usage:** If the Executor needs to be prompted to use a tool, be explicit about the tool name and required parameters.
* **Guardrail Reminder:** Include a standard reminder, e.g., "Remember to strictly follow all guardrails defined in `docs/DEVELOPMENT_GUARDRAILS.md`."
* **Reporting:** Instruct the Executor to report success clearly or provide full error details upon failure.

## 4. Git Workflow and Progress Tracking

### 4.1. Operator-Specific Git Workflow

#### For Mihnea (Product Owner):
1. **Branch Creation:**
   * After confirming the session's objective, the Planner's first Executor prompt must be to create a new feature branch.
   * The Executor must ask Mihnea for a concise name for the current feature/task.
   * The Executor will create a new Git feature branch named `feature/name-from-mihnea` from the `develop` branch.
   * All subsequent tasks in that session are performed on this feature branch.

2. **Commit Process:**
   * After each successful task (file modification, creation), the Executor must:
     1. Prompt Mihnea: "Mihnea, I have completed the requested changes. Please review them. Shall I commit these changes with the message: 'feat: [brief description of change]'?"
     2. Wait for Mihnea's explicit "yes" confirmation.
     3. Only then proceed with staging and committing using the exact commit message provided by the Planner.

#### For George (Tech Lead):
1. George manages his own Git workflow.
2. The Planner's prompts for the Executor will not include Git branch creation or assisted commits unless explicitly requested by George.
3. The Executor will commit changes directly after successful execution of a task, using a commit message provided by the Planner.

### 4.2. Progress Tracking

#### PROJECT_TODO.md Management:
* The Planner must update this file (via Executor prompts) to reflect:
  * Task decomposition
  * Task assignment (to "George", "Mihnea", "Planner", or "Executor")
  * Task completion status
* Each task should have:
  * A unique Task ID
  * Clear description
  * Priority level
  * Assigned party
  * Current status
  * Due date (if applicable)
  * Relevant notes

#### PROJECT_STATUS.md Management:
* The Executor must update this file at:
  * Start of each task (marking "in progress")
  * End of each task (marking "completed" or "failed" with details)
* Each entry should include:
  * Timestamp
  * Operator (George/Mihnea)
  * Session/Task ID
  * Action performed
  * Status
  * Details/Error (if any)

## 5. Handling Executor Feedback

* **Success:** Acknowledge and proceed to the git commit instruction step (for the human user).
* **Failure:**
    * Analyze the error message and any context provided by the Executor.
    * Do not ask the same Executor to retry the exact same failed prompt without modification.
    * Formulate a new, revised prompt to address the cause of the failure.

## 6. Task Analysis and Planning

### 6.1. Pre-Analysis Protocol
Before generating any Executor prompt, the Planner must:
1. Review all relevant project files (especially existing Svelte components, TypeScript modules, and styling)
2. Summarize key findings in the prompt's `Context:` block
3. Identify potential risks and dependencies

### 6.2. Task Decomposition
For complex frontend tasks, the Planner must:
1. Break down the task into precise, verifiable sub-tasks
2. Sequence the sub-tasks logically
3. Identify dependencies between sub-tasks
4. Assign appropriate priority levels

### 6.3. Risk Management
For each task, the Planner must identify:
1. Assumptions being made
2. Potential risks (component coupling, state management, performance, UI consistency, accessibility)
3. Impact and likelihood of each risk
4. Mitigation strategies

## 7. Documentation Updates

After successful feature implementation or bug fixes, the Planner must:
1. Generate instructions for the Executor to update relevant documentation
2. Ensure architectural decisions are documented in `docs/ARCHITECTURE.md`
3. Update component-specific documentation if needed
4. Keep `docs/PROJECT_TODO.md` and `docs/PROJECT_STATUS.md` current

## 8. Review and Iteration

These guidelines are a living document. The Planner should propose updates to these guidelines as the project evolves and new best practices emerge, with final approval from the Tech Lead (George). 