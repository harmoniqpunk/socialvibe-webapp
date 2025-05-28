# Executor Prompt: Rebuild UI - Task 4

## Context

The latest changes have regressed the UI and functionality. The current implementation does not match Mihnea's mock-up, and the reply interface is not as designed. We need to revert to the previous working state (before the last prompt) and then rebuild the dashboard to match the mock-up with complete accuracy.

## Instructions

1. **Revert to Previous Working State**
   - Restore the codebase to the state it was in before the last prompt (i.e., before Task 3). This version was closer to Mihnea's mock-up and more aligned with our goals.

2. **Full Sync with Mihnea's Mock-up**
   - Carefully review the code and UI in `mihneas-mock/TwitterEngagementDashboard.jsx` and any related files.
   - Rebuild the dashboard in SvelteKit so that every aspect—UI, logic, and interactions—matches the mock-up exactly. This includes:
     - Layout
     - Styling
     - Animations
     - All user interactions
   - Transcribe the mock-up implementation line by line if needed. No partial matches or approximations are allowed.

3. **Reply Interface as Modal with Pre-made Replies**
   - The reply interface must be a modal dialog, not an inline input.
   - The modal should include pre-made reply options that can be sent with a single click, exactly as in Mihnea's mock-up.
   - The modal should match the design, layout, and behavior of the mock-up, including any animations or transitions.

4. **Code Audit & Verification**
   - Audit the current SvelteKit implementation against the mock-up.
   - Ensure all logic, UI components, and interactions are present and behave identically to the mock-up.
   - Every click, animation, and layout detail must match.

## Deliverables

- A SvelteKit dashboard that is a pixel-perfect and behavior-perfect match to Mihnea's mock-up.
- A reply interface implemented as a modal with pre-made reply options, matching the mock-up exactly.
- All code, UI, and logic fully synced with the mock-up.

## Notes

- Do not deliver partial matches or approximations. This is a full sync job.
- Read the mock-up implementation carefully and transcribe it line by line if needed.
- If you have any doubts, refer to Mihnea's mock-up as the source of truth.

---

Begin by reverting to the previous working state, then proceed with the full rebuild and sync as described above. 