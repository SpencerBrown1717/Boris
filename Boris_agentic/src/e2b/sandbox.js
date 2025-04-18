const { Sandbox } = require('@e2b/sdk');
const Logger = require('../utils/logger');

class SandboxManager {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('E2B API key is required');
    }
    
    this.apiKey = apiKey || process.env.E2B_API_KEY;
    this.sandbox = null;
    this.logger = new Logger();
  }

  async create() {
    try {
      if (this.sandbox) {
        this.logger.warn('Sandbox already exists, destroying previous instance');
        await this.destroy();
      }

      this.logger.info('Creating new sandbox');
      this.sandbox = await Sandbox.create({
        apiKey: this.apiKey,
        template: 'base'
      });
      
      return this.sandbox;
    } catch (error) {
      this.logger.error('Failed to create sandbox:', error);
      throw error;
    }
  }

  async execute(command) {
    if (!this.sandbox) {
      throw new Error('Sandbox not initialized. Call create() first.');
    }

    if (!command || typeof command !== 'string') {
      throw new Error('Command must be a non-empty string');
    }

    try {
      this.logger.debug(`Executing command: ${command}`);
      const result = await this.sandbox.exec(command);
      
      if (result.exitCode !== 0) {
        this.logger.warn(`Command exited with code ${result.exitCode}: ${result.stderr}`);
      }
      
      return result;
    } catch (error) {
      this.logger.error('Failed to execute command:', error);
      throw error;
    }
  }

  async destroy() {
    if (this.sandbox) {
      try {
        this.logger.info('Destroying sandbox');
        await this.sandbox.close();
        this.sandbox = null;
      } catch (error) {
        this.logger.error('Failed to destroy sandbox:', error);
        throw error;
      }
    }
  }
}

module.exports = SandboxManager; 