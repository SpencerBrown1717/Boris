const Logger = require('../utils/logger');
const logger = new Logger();

const tools = {
  'web-search': {
    name: 'web-search',
    description: 'Search the web for information',
    execute: async (query) => {
      try {
        if (!query) {
          throw new Error('Query parameter is required');
        }
        // TODO: Implement actual web search functionality
        logger.debug(`Searching web for: ${query}`);
        return [];
      } catch (error) {
        logger.error('Web search failed:', error);
        throw error;
      }
    }
  },
  'file-system': {
    name: 'file-system',
    description: 'Interact with the file system',
    execute: async (operation, path, content) => {
      try {
        if (!operation || !path) {
          throw new Error('Operation and path parameters are required');
        }
        // TODO: Implement actual file system operations
        logger.debug(`Performing ${operation} on ${path}`);
        return { success: true };
      } catch (error) {
        logger.error('File system operation failed:', error);
        throw error;
      }
    }
  }
};

function validateTool(tool) {
  if (!tool.name || typeof tool.name !== 'string') {
    throw new Error('Tool must have a valid name');
  }
  if (!tool.description || typeof tool.description !== 'string') {
    throw new Error('Tool must have a valid description');
  }
  if (!tool.execute || typeof tool.execute !== 'function') {
    throw new Error('Tool must have a valid execute function');
  }
  return true;
}

module.exports = {
  getTool: (name) => {
    const tool = tools[name];
    if (!tool) {
      logger.warn(`Tool ${name} not found`);
      return null;
    }
    return tool;
  },
  
  listTools: () => Object.keys(tools),
  
  registerTool: (name, tool) => {
    try {
      validateTool(tool);
      if (tools[name]) {
        logger.warn(`Overwriting existing tool: ${name}`);
      }
      tools[name] = tool;
      logger.info(`Tool ${name} registered successfully`);
    } catch (error) {
      logger.error('Tool registration failed:', error);
      throw error;
    }
  }
}; 