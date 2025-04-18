# Project borris - Minimal AI Agent Framework

A lightweight framework for building autonomous agents powered by Claude 3.7 and e2b.

## Overview

Project borris is a minimalist framework for creating AI agents that can perform tasks in isolated sandbox environments. It combines the reasoning capabilities of Claude 3.7 with e2b's secure execution environments.

## File Structure

```
project-borris/
├── src/
│   ├── agent.js           # Core agent implementation 
│   ├── tools/             # Agent tools
│   │   └── index.js       # Tool registry
│   ├── claude/            # Claude integration
│   │   └── client.js      # Claude API client
│   ├── e2b/               # e2b integration
│   │   └── sandbox.js     # Sandbox configuration
│   └── utils/
│       └── logger.js      # Simple logging utility
├── config.js              # Environment configuration
├── index.js               # Entry point
├── examples/
│   └── simple-task.js     # Example implementation
├── package.json
└── README.md
```

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/project-borris.git
cd project-borris

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory:

```
CLAUDE_API_KEY=your_claude_api_key
E2B_API_KEY=your_e2b_api_key
```

## Basic Agentic Flow

Project borris implements a simple 3-step agentic flow:

1. **Think** - Claude analyzes the task and determines necessary actions
2. **Act** - Execute actions in the e2b sandbox environment
3. **Reflect** - Evaluate results and determine next steps

## Quick Start Example

```javascript
// index.js
const Agent = require('./src/agent');

async function main() {
  // Initialize agent
  const agent = new Agent({
    name: 'Borris',
    model: 'claude-3-7-sonnet-20250219',
  });

  // Run a simple task
  const result = await agent.run({
    task: 'Find the current time in Tokyo and create a text file with it',
    tools: ['web-search', 'file-system']
  });

  console.log('Task completed:', result);
}

main().catch(console.error);
```

## Core Components

- **agent.js**: Handles the main agentic loop and orchestrates the workflow
- **claude/client.js**: Manages communication with Claude API
- **e2b/sandbox.js**: Sets up and interacts with e2b execution environments
- **tools/index.js**: Registers and provides access to agent tools

## Dependencies

- Node.js 16+
- Anthropic Claude API
- e2b SDK

## License
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 