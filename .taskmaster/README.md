# Taskmaster Setup for E-Commerce Store

This project is configured to use Taskmaster AI for project management and task generation.

## Directory Structure
```
.taskmaster/
├── config.json          # Project configuration
├── docs/
│   └── prd.txt          # Product Requirements Document
├── tasks/               # Generated task files will be stored here
├── templates/
│   └── task_template.md # Template for task structure
└── README.md           # This file
```

## Configuration
- **Project**: E-Commerce Store
- **Framework**: Next.js with TypeScript
- **Main AI Model**: Claude 3.5 Sonnet
- **Research Model**: Claude 3.5 Sonnet
- **Fallback Model**: GPT-4

## Usage

### Via Cursor AI Chat
Once you have configured your API keys in the MCP configuration, you can use these commands in Cursor's AI chat:

1. **Parse PRD and generate tasks:**
   ```
   Can you parse my PRD at .taskmaster/docs/prd.txt?
   ```

2. **Get next task:**
   ```
   What's the next task I should work on?
   ```

3. **Implement a specific task:**
   ```
   Can you help me implement task [number]?
   ```

4. **Create individual tasks:**
   ```
   Can you help me implement [description of what you want to do]?
   ```

### API Keys Required
Make sure you have at least one of these API keys configured in your Cursor MCP settings:
- Anthropic API Key (recommended)
- OpenAI API Key
- Google API Key
- Perplexity API Key (for research)

## Next Steps
1. Update the MCP configuration with your actual API keys
2. Enable Taskmaster in Cursor's MCP settings
3. Restart Cursor
4. Start using Taskmaster commands in the AI chat

## PRD Location
The main Product Requirements Document is located at:
`.taskmaster/docs/prd.txt`

Feel free to modify this PRD to match your specific project requirements. 