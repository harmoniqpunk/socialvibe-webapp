# Executor Prompt: Push Feature to GitHub

## Context
The feature/task has been completed and verified by Mihnea. The next step is to push the changes to GitHub using the correct workflow for Mihnea (Product Owner), as described in `docs/PLANNER_OPERATING_MANUAL.md` and `docs/SYSTEM_PROMPT.md`.

## Instructions

1. **Ask Mihnea for a concise, descriptive name for this feature/task.**  
   Example: `dashboard-mockup-sync` or `modal-reply-interface`.

2. **Create a new feature branch from `develop` using the name provided by Mihnea:**
   ```sh
   git checkout develop
   git pull
   git checkout -b feature/<name-from-mihnea>
   ```

3. **Stage all changes:**
   ```sh
   git add .
   ```

4. **Commit the changes with the following message:**
   ```sh
   feat: sync dashboard UI and logic with Mihnea's mock-up, including modal reply interface and live feed
   ```

5. **Push the feature branch to GitHub:**
   ```sh
   git push -u origin feature/<name-from-mihnea>
   ```

6. **Notify Mihnea that the branch has been pushed and is ready for a pull request and review.**

## Reminder
- Do not push directly to `main` or `master`.
- Use the feature branch workflow as described in the docs.
- Wait for Mihnea's confirmation before merging to develop or main. 