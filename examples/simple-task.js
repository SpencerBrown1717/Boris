const { Agent } = require('../index');

async function runSimpleTask() {
  try {
    // Initialize agent
    const agent = new Agent({
      name: 'Borris',
      model: 'claude-3-opus-20240229'
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