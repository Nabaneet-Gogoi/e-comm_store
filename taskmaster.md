Here's the guide formatted as a Markdown file, ready for use as `GUIDE.md` or similar.

```markdown
# Task Master: Installation and Usage Guide

Task Master is an AI-driven task management system designed to work seamlessly with AI-powered editors like Cursor AI, especially utilizing Claude models. It helps you manage and automate various aspects of your development workflow.

---

## 1. Understanding the Core Concept

Task Master helps you break down complex projects into manageable tasks, generate code, and facilitate development workflows, all driven by AI. It's particularly powerful when used with a detailed **PRD (Product Requirements Document)**.

---

## 2. Prerequisites (API Keys)

Task Master utilizes AI models for its commands. You *must* have at least one API key from the supported providers. Adding multiple keys allows you to switch between models.

*   **Required:** At least one of the following:
    *   Anthropic API Key (for Claude models)
    *   OpenAI API Key
    *   Google Gemini API Key
    *   xAI API Key
    *   OpenRouter API Key
    *   Azure OpenAI API Key
    *   Ollama API Key
*   **Recommended (for research capabilities):**
    *   Perplexity API Key
*   **Optional:**
    *   Mistral AI Key

You can define three types of models to be used: `main` (for core tasks), `research` (for information gathering), and `fallback` (in case either the main or research model fails).

---

## 3. Installation & Setup (Choose Your Option)

Task Master offers two primary ways to run: via **MCP (Model Control Protocol)** for editor integration, or as a **Command Line Interface (CLI)** tool. MCP is recommended for seamless editor integration.

### Option 1: MCP (Recommended for Cursor/Windsurf/VS Code Users)

MCP allows you to run Task Master directly from your editor's AI chat pane.

**Steps:**

1.  **Locate your MCP Config File:**
    This file defines how your editor interacts with external AI servers. Create or modify it at the following path depending on your editor and scope:

    | Editor       | Scope   | Linux/macOS Path                      | Windows Path                                      | Key          |
    | :----------- | :------ | :------------------------------------ | :------------------------------------------------ | :----------- |
    | **Cursor**   | Global  | `~/.cursor/mcp.json`                  | `%USERPROFILE%\.cursor\mcp.json`                  | `mcpServers` |
    |              | Project | `<project_folder>/.cursor/mcp.json`   | `<project_folder>\.cursor\mcp.json`               | `mcpServers` |
    | **Windsurf** | Global  | `~/.codeium/windsurf/mcp_config.json` | `%USERPROFILE%\.codeium\windsurf\mcp_config.json` | `mcpServers` |
    | **VS Code**  | Project | `<project_folder>/.vscode/mcp.json`   | `<project_folder>\.vscode\mcp.json`               | `servers`    |

2.  **Add Task Master Configuration:**
    Open the `mcp.json` (or `mcp_config.json` / `vscode/mcp.json`) file and add the following configuration. **Replace `YOUR_..._KEY_HERE` with your actual API keys.** You can remove keys for providers you don't use.

    *   **For Cursor & Windsurf (`mcpServers` key):**
        ```jsonc
        {
          "mcpServers": {
            "taskmaster-ai": {
              "command": "npx",
              "args": ["-y", "--package=task-master-ai", "task-master-ai"],
              "env": {
                "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",
                "PERPLEXITY_API_KEY": "YOUR_PERPLEXITY_API_KEY_HERE",
                "OPENAI_API_KEY": "YOUR_OPENAI_KEY_HERE",
                "GOOGLE_API_KEY": "YOUR_GOOGLE_KEY_HERE",
                "MISTRAL_API_KEY": "YOUR_MISTRAL_KEY_HERE",
                "OPENROUTER_API_KEY": "YOUR_OPENROUTER_KEY_HERE",
                "XAI_API_KEY": "YOUR_XAI_KEY_HERE",
                "AZURE_OPENAI_API_KEY": "YOUR_AZURE_KEY_HERE",
                "OLLAMA_API_KEY": "YOUR_OLLAMA_API_KEY_HERE"
              }
            }
          }
        }
        ```
    *   **For VS Code (`servers` + `type` key):**
        ```jsonc
        {
          "servers": {
            "taskmaster-ai": {
              "command": "npx",
              "args": ["-y", "--package=task-master-ai", "task-master-ai"],
              "env": {
                "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",
                "PERPLEXITY_API_KEY": "YOUR_PERPLEXITY_API_KEY_HERE",
                "OPENAI_API_KEY": "YOUR_OPENAI_KEY_HERE",
                "GOOGLE_API_KEY": "YOUR_GOOGLE_KEY_HERE",
                "MISTRAL_API_KEY": "YOUR_MISTRAL_KEY_HERE",
                "OPENROUTER_API_KEY": "YOUR_OPENROUTER_KEY_HERE",
                "XAI_API_KEY": "YOUR_XAI_KEY_HERE",
                "AZURE_OPENAI_API_KEY": "YOUR_AZURE_KEY_HERE"
              },
              "type": "stdio"
            }
          }
        }
        ```

3.  **Enable Taskmaster MCP (Cursor-only):**
    If you're using Cursor, open its Settings (Ctrl+Shift+J or Cmd+Shift+J) -> navigate to the `MCP` tab on the left -> enable `task-master-ai` using the toggle.

4.  **Configure AI Models (Optional, but Recommended):**
    In your editor's AI chat pane (e.g., Cursor's chat), you can specify which models Task Master should use for different roles.
    ```txt
    Change the main, research and fallback models to <main_model_name>, <research_model_name> and <fallback_model_name> respectively.
    ```
    (Refer to the [Table of available models](https://github.com/eyaltoledano/claude-task-master/blob/main/docs/models.md) in the GitHub repository for a list of model names.)

### Option 2: Command Line Interface (CLI)

This option allows you to run Task Master commands directly from your terminal.

**Steps:**

1.  **Install Task Master:**
    You can install it globally or locally within your project.
    *   **Globally (recommended for general use):**
        ```bash
        npm install -g task-master-ai
        ```
    *   **Locally (for project-specific versions):**
        ```bash
        npm install task-master-ai
        ```

2.  **Set up API Keys (for CLI):**
    When using the CLI, you'll need to set your API keys as environment variables. You can do this by creating a `.env` file in your project root with the keys, or by setting them in your shell environment.

    Example `.env` file:
    ```
    ANTHROPIC_API_KEY=YOUR_ANTHROPIC_API_KEY_HERE
    PERPLEXITY_API_KEY=YOUR_PERPLEXITY_API_KEY_HERE
    OPENAI_API_KEY=YOUR_OPENAI_KEY_HERE
    GOOGLE_API_KEY=YOUR_GOOGLE_KEY_HERE
    # ... and so on for other keys you use
    ```

---

## 4. Initializing a Task Master Project

Whether you chose MCP or CLI, the next step is to initialize Task Master in your project.

*   **Via MCP (AI Chat Pane):**
    In your editor's AI chat pane, say:
    ```txt
    Initialize taskmaster-ai in my project
    ```
*   **Via Command Line:**
    If installed globally:
    ```bash
    task-master init
    ```
    If installed locally:
    ```bash
    npx task-master init
    ```
    This command will prompt you for project details and set up the necessary `.taskmaster` directory structure and initial files.

### Troubleshooting `task-master init` (if it doesn't respond):

You can try running it directly with Node:

```bash
node node_modules/task-master-ai/scripts/init.js
```

Or, if you cloned the repository:

```bash
git clone https://github.com/eyaltoledano/claude-task-master.git
cd claude-task-master
node scripts/init.js
```

---

## 5. Essential: The PRD (Product Requirements Document)

For complex projects, a detailed PRD is highly recommended. Task Master can parse your PRD to generate a structured set of tasks.

*   **For New Projects:** Create your PRD at `.taskmaster/docs/prd.txt`. An example template will be available after initialization in `.taskmaster/templates/example_prd.txt`.
*   **For Existing Projects:** You can use an existing PRD (e.g., `scripts/prd.txt`) or migrate your existing structure with `task-master migrate`.

> [!NOTE]
> While a PRD is recommended for complex projects, you can always create individual tasks by asking "Can you help me implement [description of what you want to do]?" in chat.

**Key Advice:** The more detailed and well-structured your PRD, the better and more accurate the AI-generated tasks will be. Task Master **does not create the PRD for you from scratch**; you are responsible for providing the initial document.

---

## 6. Common Usage Commands

Once initialized and (optionally) with a PRD, you can start using Task Master.

### Via AI Chat Pane (MCP)

These commands are sent as natural language queries in your editor's AI chat.

*   **Parse Requirements from PRD:**
    ```txt
    Can you parse my PRD at .taskmaster/docs/prd.txt?
    ```
    (Adjust the path if your PRD is elsewhere, e.g., `scripts/prd.txt`)

*   **Get the Next Task:**
    ```txt
    What's the next task I should work on?
    ```

*   **Implement a Specific Task:**
    ```txt
    Can you help me implement task 3?
    ```
    (Replace `3` with the actual task number from your task list)

*   **Expand a Task (break it down further):**
    ```txt
    Can you help me expand task 4?
    ```

*   **Create Individual Tasks (without a full PRD):**
    If you don't have a PRD, you can still ask:
    ```txt
    Can you help me implement [description of what you want to do]?
    ```

For more examples, refer to the [Example Interactions](https://github.com/eyaltoledano/claude-task-master/blob/main/docs/examples.md) documentation.

### Via Command Line

These commands are run in your terminal.

*   **Initialize a new project (as above):**
    ```bash
    task-master init
    ```

*   **Parse a PRD and generate tasks:**
    ```bash
    task-master parse-prd .taskmaster/docs/prd.txt
    ```
    (Replace `.taskmaster/docs/prd.txt` with your actual PRD file path)

*   **List all generated tasks:**
    ```bash
    task-master list
    ```

*   **Show the next task to work on:**
    ```bash
    task-master next
    ```

*   **Generate task files (e.g., code snippets, plans for the current task):**
    ```bash
    task-master generate
    ```

---

## 7. Further Documentation & Support

For more detailed information, check out the documentation in the `docs` directory of the [Task Master GitHub repository](https://github.com/eyaltoledano/claude-task-master):

*   [Configuration Guide](https://github.com/eyaltoledano/claude-task-master/blob/main/docs/configuration.md) - Set up environment variables and customize Task Master
*   [Tutorial](https://github.com/eyaltoledano/claude-task-master/blob/main/docs/tutorial.md) - Step-by-step guide to getting started with Task Master
*   [Command Reference](https://github.com/eyaltoledano/claude-task-master/blob/main/docs/command-reference.md) - Complete list of all available commands
*   [Task Structure](https://github.com/eyaltoledano/claude-task-master/blob/main/docs/task-structure.md) - Understanding the task format and features
*   [Example Interactions](https://github.com/eyaltoledano/claude-task-master/blob/main/docs/examples.md) - Common Cursor AI interaction examples
*   [Migration Guide](https://github.com/eyaltoledano/claude-task-master/blob/main/docs/migration-guide.md) - Guide to migrating to the new project structure

---

## 8. Licensing

Task Master is licensed under the MIT License with Commons Clause. For full details on what is allowed and not allowed, please refer to the [LICENSE](https://github.com/eyaltoledano/claude-task-master/blob/main/LICENSE) file in the repository.

---

Remember, the key to getting the most out of Task Master is to start with a clear understanding of your project's requirements, ideally documented in a detailed PRD. Happy coding!
```