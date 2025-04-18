# Boris Monorepo

A collection of tools and packages for building AI-powered applications.

## Packages

### [@boris/agent](./packages/boris-agent)
A lightweight framework for building autonomous agents powered by Claude 3.7 and e2b. This package provides the core agent implementation with support for:
- Agentic thinking and planning
- Secure sandbox execution
- Tool management
- Logging and monitoring

## Repository Structure

```
boris-monorepo/
├── packages/
│   ├── boris-agent/        # Core agent implementation
│   │   ├── src/
│   │   │   ├── agent.ts    # Agent implementation
│   │   │   ├── claude/     # Claude API integration
│   │   │   ├── e2b/        # e2b sandbox integration
│   │   │   ├── tools/      # Tool implementations
│   │   │   └── utils/      # Utilities
│   │   ├── examples/       # Usage examples
│   │   └── tests/         # Test suite
│   └── [future-packages]/  # Additional packages will be added here
├── docs/                   # Documentation
└── scripts/               # Build and maintenance scripts
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/SpencerBrown1717/Boris.git
cd Boris
```

2. Install dependencies:
```bash
npm install
```

3. Build all packages:
```bash
npm run build
```

## Development

- `npm run build`: Build all packages
- `npm run dev`: Start development mode for all packages
- `npm run clean`: Clean build artifacts
- `npm test`: Run tests across all packages

## Environment Variables

Each package may require its own environment variables. Check the README in each package directory for specific requirements.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT