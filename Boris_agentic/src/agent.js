const ClaudeClient = require('./claude/client');
const SandboxManager = require('./e2b/sandbox');
const { getTool } = require('./tools');
const Logger = require('./utils/logger');

class Agent {
  constructor(config) {
    this.name = config.name;
    this.model = config.model;
    this.tools = config.tools || [];
    this.logger = new Logger(config.logger);
    this.claude = new ClaudeClient(config.claudeApiKey);
    this.sandbox = new SandboxManager(config.e2bApiKey);
  }

  async run(task) {
    try {
      this.logger.info(`Starting task: ${task.description}`);
      
      // Think phase
      const plan = await this.think(task);
      this.logger.debug('Planning complete:', plan);
      
      // Act phase
      const result = await this.act(plan);
      this.logger.debug('Action complete:', result);
      
      // Reflect phase
      const reflection = await this.reflect(result);
      this.logger.info('Task completed successfully');
      
      return reflection;
    } catch (error) {
      this.logger.error('Agent execution failed:', error);
      throw error;
    }
  }

  async think(task) {
    try {
      const prompt = `Task: ${task.description}\n\nAnalyze this task and create a plan. Respond with a JSON object containing an array of steps, where each step has a 'tool' and 'params' field.`;
      const response = await this.claude.complete(prompt, {
        model: this.model
      });
      
      try {
        const plan = JSON.parse(response);
        return {
          steps: plan.steps || [],
          tools: this.tools
        };
      } catch (error) {
        this.logger.error('Failed to parse Claude response:', error);
        return {
          steps: [],
          tools: this.tools
        };
      }
    } catch (error) {
      this.logger.error('Thinking phase failed:', error);
      throw error;
    }
  }

  async act(plan) {
    try {
      const results = [];
      
      for (const step of plan.steps) {
        const tool = getTool(step.tool);
        if (!tool) {
          throw new Error(`Tool ${step.tool} not found`);
        }
        
        const result = await tool.execute(step.params);
        results.push(result);
      }
      
      return {
        success: true,
        results
      };
    } catch (error) {
      this.logger.error('Action phase failed:', error);
      throw error;
    }
  }

  async reflect(result) {
    try {
      const prompt = `Analyze the following results and provide a reflection: ${JSON.stringify(result)}`;
      const reflection = await this.claude.complete(prompt, {
        model: this.model
      });
      
      return {
        ...result,
        reflection
      };
    } catch (error) {
      this.logger.error('Reflection phase failed:', error);
      throw error;
    }
  }
}

module.exports = Agent; 