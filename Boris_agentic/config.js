require('dotenv').config();

module.exports = {
  claude: {
    apiKey: process.env.CLAUDE_API_KEY,
    model: process.env.CLAUDE_MODEL || 'claude-3-opus-20240229',
    apiUrl: process.env.CLAUDE_API_URL || 'https://api.anthropic.com'
  },
  e2b: {
    apiKey: process.env.E2B_API_KEY,
    apiUrl: process.env.E2B_API_URL || 'https://api.e2b.dev'
  },
  agent: {
    defaultModel: 'claude-3-opus-20240229',
    maxTokens: 1000,
    temperature: 0.7
  }
}; 