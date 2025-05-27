# Browser Tools Guide for SocialVibe WebApp Development

## 1. Introduction

This document provides guidance on setting up and using specific browser tools that can assist the AI Executor in frontend development tasks for the SocialVibe WebApp. These tools typically involve a browser extension and a local "MCP (Multi-Control Program) Server" that allows the Executor to interact with or gather information from a live browser session.

**Note:** The AI Planner will instruct the AI Executor when and how to utilize these tools for specific tasks. Executors should not use these tools unsolicited.

## 2. Overview of Tools

* **Purpose:** [Operator George/Mihnea to fill in: Briefly describe the primary purpose of these browser tools in the context of SocialVibe development, e.g., inspecting complex DOM structures, verifying UI states, assisting with E2E test debugging, etc.]
* **Components:**
    * Browser Extension (e.g., for Chrome, Cursor)
    * MCP Server (Local application that bridges the Executor and the browser extension)

## 3. Installation and Setup

The following steps outline the general process. Specific details for the chosen tools need to be provided by the human operator (George/Mihnea).

### 3.1. MCP Server Setup
1.  **Download/Clone:** [Operator to provide: Link to MCP Server repository or download page.]
2.  **Installation:** [Operator to provide: Command(s) to install dependencies, e.g., `npm install`.]
3.  **Configuration:** [Operator to provide: Any necessary configuration steps, e.g., setting API keys, port numbers.]
4.  **Running the Server:** [Operator to provide: Command to start the MCP server, e.g., `npm run start-mcp`.]
    * Ensure the server is running before the Executor attempts to use the browser tools.

### 3.2. Browser Extension for Google Chrome
1.  **Download:** [Operator to provide: Link to the Chrome extension (.crx file or Chrome Web Store page).]
2.  **Installation:**
    * Open Chrome and navigate to `chrome://extensions`.
    * Enable "Developer mode" (usually a toggle in the top right).
    * [Operator to provide: Specific instructions, e.g., "Drag and drop the .crx file onto the page" or "Click 'Load unpacked' and select the extension directory."]
3.  **Configuration:** [Operator to provide: Any necessary extension configuration, e.g., pointing it to the MCP server address/port.]

### 3.3. Browser Extension for Cursor
1.  **Compatibility:** [Operator to confirm: Verify if the Chrome extension is directly compatible with Cursor or if a separate version/procedure is needed. Cursor is based on VS Code and might have its own way of handling such extensions or might support Chrome extensions directly.]
2.  **Installation:** [Operator to provide: Steps similar to Chrome, adapted for Cursor if necessary.]
3.  **Configuration:** [Operator to provide: Any necessary extension configuration for Cursor.]

## 4. Usage in SocialVibe Project

* **Activation:** The AI Planner will instruct the Executor if a task requires the use of browser tools.
* **Typical Commands/Interaction (Conceptual):**
    * [Operator to define: Examples of how the Planner might instruct the Executor to use the tools, e.g.,
        * "Using the MCP browser tool, navigate to `http://localhost:5173/some-page` and report the text content of the element with ID `xyz`."
        * "Activate the browser tool, perform a click on the button with class `my-button`, and report if a modal with title 'Success' appears."]
* **Data Retrieval:** The Executor will report back information gathered via the browser tools as specified in the Planner's prompt.
* **Limitations:** [Operator to document: Any known limitations or specific scenarios where the tools are most/least effective.]

## 5. Troubleshooting
* **MCP Server Not Connecting:** [Operator to provide: Common issues and solutions, e.g., firewall, incorrect port.]
* **Extension Not Responding:** [Operator to provide: Common issues and solutions, e.g., re-install, browser restart.]

---
*This document is a placeholder and needs to be populated with specific details about the browser tools used by George and Mihnea.* 