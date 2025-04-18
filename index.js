const Agent = require('./src/agent');
const config = require('./config');

async function main() {
  try {
    // Initialize agent
    const agent = new Agent({
      name: 'Borris',
      model: config.agent.defaultModel
    });

    // Example task
    const result = await agent.run({
      task: 'Find the current time in Tokyo and create a text file with it',
      tools: ['web-search', 'file-system']
    });

    console.log('Task completed:', result);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  Agent,
  config
}; 