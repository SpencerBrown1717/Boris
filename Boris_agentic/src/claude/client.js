const Anthropic = require('@anthropic-ai/sdk');
const Logger = require('../utils/logger');

class ClaudeClient {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('Claude API key is required');
    }
    
    this.client = new Anthropic({
      apiKey: apiKey
    });
    this.logger = new Logger();
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
  }

  async complete(prompt, options = {}) {
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    let lastError;
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        this.logger.debug(`Attempt ${attempt} to complete prompt`);
        
        const message = await this.client.messages.create({
          model: options.model || 'claude-3-opus-20240229',
          max_tokens: options.maxTokens || 1000,
          system: "You are a helpful AI assistant that provides clear and concise responses.",
          messages: [{
            role: 'user',
            content: prompt
          }]
        });

        if (!message?.content) {
          throw new Error('Invalid response format from Claude API');
        }

        return message.content;
      } catch (error) {
        lastError = error;
        this.logger.warn(`Attempt ${attempt} failed:`, error);
        
        if (attempt < this.maxRetries) {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        }
      }
    }

    this.logger.error('All retry attempts failed:', lastError);
    throw lastError;
  }
}

module.exports = ClaudeClient; 