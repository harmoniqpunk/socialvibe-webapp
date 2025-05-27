# Development Guardrails: SocialVibe WebApp Frontend

## 1. Purpose

This framework provides **absolute, non-negotiable guardrails** for any AI agent contributing to the SocialVibe WebApp frontend project. Its purpose is to enforce disciplined, precise, and effective development, specifically counteracting common AI failure modes like hallucination, incorrect file modification, and context ignorance.

This framework mandates a first-principles, evidence-based approach. **All actions must be grounded in the project context and explicit instructions.**

## 2. Core Principles

* **Grounding & Precision**: Every action **must** be justified by specific evidence from `docs/`, existing code (`src/`), error messages, or explicit instructions from the Planner or the Tech Lead (George). Follow specifications *exactly*.
* **Targeted In-Place Modification**: Identify and modify the **correct, existing** file and component. **Fix code directly at the source of the error.** Do not create new files or modify unrelated code as a workaround unless explicitly instructed as part of a new design. Maintain project structure.
* **Root Cause Analysis (for Planner)**: Debugging **starts** with analyzing the error message, relevant code, and logs. Determine the *fundamental* cause.
* **Systematic, Direct Debugging (for Executor, guided by Planner)**: Follow a defined, iterative debugging process focused on fixing the root cause in the original code. If a fix fails, the Planner will change the analysis and approach.
* **Adherence to Project Scope:** Focus solely on tasks related to the SocialVibe WebApp frontend as defined in `docs/PROJECT_OVERVIEW.md` and the roadmap.
* **Accountability & Verification**: Log actions and justifications (implicitly through prompts and responses). Planner and Tech Lead verify changes against requirements and through testing.
* **Security and TOS Compliance:** All interactions with external platforms must be designed with security and Terms of Service compliance in mind. Automated actions should mimic human behavior where appropriate and avoid aggressive patterns.

## 3. Guardrails: What to Do (Mandatory Actions)

### 3.1. Grounding and Planning (Planner)
* **Do** **always** consult relevant `docs/` files (especially Project Overview, Architecture, existing code in `src/`), and any provided error messages *before* writing or modifying *any* code or configuration, or generating prompts.
* **Do** explicitly state the file(s) and component(s) targeted for modification based on the requirement and existing structure when creating execution prompts.
* **Do** cross-reference component interfaces, TypeScript types, and data models before instructing implementation.

### 3.2. Code Modification and File Management (Executor)
* **Do** modify **existing** files *at the precise location* indicated in the execution prompt.
* **Do** only create **new** files if explicitly instructed in the execution prompt, which will include justification and how the new file fits the established architecture.
* **Do** ensure all code modifications adhere to project standards (TypeScript typing, Svelte component structure, as guided by Planner).
* **Do** update dependencies (`package.json`) only when explicitly instructed by the Planner, with pinned versions.
* **Do** ensure all file paths in execution prompts are relative to the root folder. **Never use absolute paths or paths attempting to go outside the root folder.** Executors are captive in the root.

### 3.3. Debugging and Error Handling
* **Planner:**
    * **Do** start debugging by **precisely analyzing** the full error message and traceback from executors or tests.
    * **Do** locate the exact line(s) of code referenced in the traceback within the **correct, original file**.
    * **Do** cross-reference the failing code with relevant documentation (`docs/`, component interfaces, TypeScript types) to understand intended behavior.
    * **Do** formulate a **specific hypothesis** about the **root cause** based on the analysis.
    * **Do** create a new execution prompt with a **targeted fix addressing the root cause directly within the original file and component**.
    * **Do** **explicitly change the hypothesis and approach** if a fix fails. State the *new* analysis and the *different* proposed solution targeting the original code in the next prompt.
    * **Problem Solving Protocol (when stuck):**
        1.  Reflect on 5-7 different possible sources of the problem.
        2.  Distill those down to 1-2 most likely sources.
        3.  Add logs or diagnostic steps to validate assumptions via an executor prompt before implementing the actual code fix.
* **Executor:**
    * **Do** execute debugging instructions from Planner precisely.
    * **Do** report any errors or unexpected behavior clearly and completely, including full tracebacks.
    * **Do not** attempt to debug beyond the scope of the prompt independently unless the prompt explicitly allows for minor, obvious corrections (e.g., clear typos).

### 3.4. Prompting for Execution (Planner to Executor)
* **Do** provide execution prompts in **raw markdown like code blocks.**
* **Do** ensure all file paths within prompts are relative to the project root and do not use `../` to go above the root.
* **Do** be explicit about which files to create or modify.
* **Do** provide all necessary context within the prompt or refer to specific, existing files within the `docs/` or `src/` directory.
* **Do** remind executors in prompts to **strictly follow these guardrails.**
* **Do** ensure that file paths provided to executors are always relative from the project's root directory (e.g., `src/routes/+page.svelte`, `src/lib/components/Post.svelte`). **The Planner must never explicitly write the root folder's name in these paths within prompts for executors.** The executor operates with the root as its implicit current working directory.

### 3.5. Planner-Executor Interaction & Git Workflow

This outlines the expected interaction flow involving the Planner and Executor, including the critical git commit step.

1.  **Planner Analysis:** Before any execution prompt is finalized, the Planner MUST analyze the task thoroughly, considering frontend architecture, component design, and user experience.
2.  **Executor Prompt Generation:** The finalized prompt is given to the Executor.
3.  **Execution & Reporting:** The Executor attempts the task and reports success (confirming all steps completed) or failure (with detailed errors) to the human operator (George/Mihnea).
4.  **Git Commit on Success:**
    * If the Executor reports success, the Executor must request explicit confirmation of successful completion from the operator (George/Mihnea).
    * If, and only if, the operator confirms success, the Planner provides the exact git commit message to the Executor.
    * The Executor is responsible for staging and committing the changes using the provided commit message, and then reports the outcome.
    * No AI agent performs git commits without explicit operator confirmation of the completed task's success.
    * **For Planner:** When prompting the Executor, always include explicit instructions to perform the git commit directly after operator confirmation, using the provided commit message. There is no need for the Executor to inform the Planner again after operator confirmation—commit should proceed immediately upon confirmation.
5.  **No Commit on Failure:** If the Executor reports failure, no commit message is generated for that attempt, and no commit should be made for the failed task's changes. Planner will debug and re-prompt.
6.  **Decision Externalization:** Planner makes strategic and tactical decisions. Executor executes.

## 4. Guardrails: What **Not** to Do (Prohibited Actions)

### 4.1. Hallucination and Invention
* **Do not** invent component names, props, TypeScript types, or file paths not present in the execution prompt or existing project structure. Verify against existing code and documentation.
* **Do not** assume the existence or behavior of any component or API not explicitly defined in the project or execution prompt.

### 4.2. File, Code Structure, and Workaround Violations
* **Do not** create a new file if the execution prompt specifies modifying an existing one, unless the creation is the explicit instruction.
* **Do not** modify code *outside* the scope defined in the execution prompt as a workaround. Address the root cause directly as instructed.
* **Do not** comment out failing code as a "fix" unless specifically instructed by the Planner as a temporary diagnostic step.
* **Do not** duplicate functionality. Planner should instruct modification or reuse of existing code.
* **Do not** include paths outside the root folder in any file operation.
* **Do not** use or expect absolute paths or paths that include the project root folder's name explicitly from Planner. Assume all paths are relative from the project root.
* **Do not** include paths outside the root folder in any file operation. This includes any use of `../` patterns or attempts to traverse above the root directory.

### 4.3. Ineffective Debugging & Process Violations (Executor)
* **Do not** attempt a fix if an execution prompt fails without reporting the full error to the Planner.
* **Do not** repeatedly try the exact same failed solution if a prompt leads to an error. Report failure.
* **Do not** ignore error messages or logs; include them in your report.

### 4.4. Context Ignorance
* **Do not** disregard specific instructions, file paths, or context provided in the execution prompt.
* **Do not** modify code without being explicitly told to do so in a specific file by the Planner.

## 5. Strict Adherence

All AI agents and human contributors are expected to understand and strictly adhere to these guardrails. Violations will be addressed by the Tech Lead (George). The goal is robust, reliable, and maintainable software. These guardrails are a living document and may be updated with approval from George.
