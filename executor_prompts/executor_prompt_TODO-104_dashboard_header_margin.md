## Task: Add Top Margin to Dashboard Header

**Objective:** Add spacing between the top navigation bar and the "ReplyGuy Command Center" header in the main dashboard view.

**File to Modify:** `src/lib/components/dashboard/DashboardShell.svelte`

**Context:**
The current layout has the "ReplyGuy Command Center" header directly touching the top navigation bar, which can look crowded. We need to add some vertical margin to the top of the main content `div` element that wraps the entire dashboard content, specifically the one with the class `min-h-screen bg-gray-100 p-4`.

**Instructions:**
1.  **Update Project Status:** Modify `docs/PROJECT_STATUS.md` to mark task `TODO-104` as "in progress".
    *   Add a new line with the current timestamp, your role (Executor), Task ID `TODO-104`, Action "Implement: Add top margin to dashboard header", and Status "In Progress".

2.  **Modify `src/lib/components/dashboard/DashboardShell.svelte`:**
    *   Locate the main wrapping `div` element: `<div class="min-h-screen bg-gray-100 p-4">`.
    *   Add a top margin utility class from Tailwind CSS to this `div`. A class like `mt-6` or `mt-8` should be appropriate. For example, change it to `<div class="min-h-screen bg-gray-100 p-4 mt-6">`.

3.  **Report Outcome:**
    *   If the modification is successful, report completion.
    *   If any errors occur, report the full error message and traceback.

4.  **Update Project Status (on completion/failure):** Modify `docs/PROJECT_STATUS.md` again.
    *   Add a new line with the current timestamp, your role (Executor), Task ID `TODO-104`, Action "Implement: Add top margin to dashboard header", and Status ("Completed" or "Failed").
    *   If "Failed", add the error message in the "Details / Error" column.

**Guardrail Reminder:** Remember to strictly follow all guardrails defined in `docs/DEVELOPMENT_GUARDRAILS.md`. 