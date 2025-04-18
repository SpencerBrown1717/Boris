require('dotenv').config();
const { Agent } = require('../index');
const config = require('../config');

async function runSimpleTask() {
  try {
    // Initialize agent with configuration
    const agent = new Agent({
      name: 'Borris',
      model: config.claude.model,
      claudeApiKey: config.claude.apiKey,
      e2bApiKey: config.e2b.apiKey,
      logger: {
        level: 'debug'
      }
    });

    // Define a simple task
    const task = {
      description: 'Create a simple text file with a greeting message',
      tools: ['file-system']
    };

    // Run the task
    const result = await agent.run(task);
    
    console.log('Task completed successfully:', result);
  } catch (error) {
    console.error('Task failed:', error);
  }
}

// Run the example
runSimpleTask(); 