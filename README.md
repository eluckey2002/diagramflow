# DiagramFlow

A powerful, intuitive digital whiteboard solution for creating diagrams, organizing ideas, and visualizing concepts.

## Overview

DiagramFlow is a desktop-first application that enables users to create professional diagrams with ease. Built with modern web technologies, it provides a smooth and responsive experience for various diagramming needs.

### Key Features

- 🎨 Infinite Canvas with Pan & Zoom
- 📐 Smart Guides & Grid System
- 🔷 Rich Shape Library
- 📝 Text & Sticky Notes
- 🔗 Smart Connectors
- 🎯 Precise Alignment Tools
- 🖼️ Image Support
- ⚡ High Performance

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Git >= 2.3
- VS Code (recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd diagramflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Architecture

DiagramFlow is built with:

- **React** - UI framework
- **TypeScript** - Type safety
- **Fabric.js** - Canvas manipulation
- **Zustand** - State management
- **Tailwind CSS** - Styling

## Contributing

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards

3. Write tests for your changes

4. Create a pull request with:
   - Clear description of changes
   - Screenshots/GIFs if applicable
   - Test coverage report
   - Related issue numbers

### Coding Standards

- Follow TypeScript best practices
- Use functional components
- Write unit tests
- Document complex logic
- Follow conventional commits

## Project Structure

```
src/
├── features/          # Feature modules
│   ├── canvas/       # Canvas related components
│   ├── shapes/       # Shape implementations
│   └── tools/        # Tool implementations
├── shared/           # Shared utilities
├── app/              # App-wide configurations
└── types/            # TypeScript definitions
```

## Documentation

- [Technical Documentation](docs/technical/)
- [User Guide](docs/user/)
- [API Reference](docs/api/)
- [Contributing Guide](CONTRIBUTING.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Fabric.js](http://fabricjs.com/) - HTML5 Canvas Library
- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Type System
- [Zustand](https://github.com/pmndrs/zustand) - State Management
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework

## Contact

For questions or support, please [open an issue](issues/new).

---
Built with ❤️ by the DiagramFlow Team
