# DiagramFlow - Coding Standards and Best Practices
Version 1.0 | January 25, 2024

## 1. Development Principles

### 1.1 Core Principles
- **YAGNI** (You Aren't Gonna Need It)
  * Only implement features when they are actually needed
  * Avoid speculative functionality
  * Focus on current requirements
  * Resist over-engineering

- **KISS** (Keep It Simple, Stupid)
  * Write straightforward, understandable code
  * Avoid unnecessary complexity
  * Choose simple solutions over clever ones
  * Maintain readability over brevity

- **DRY** (Don't Repeat Yourself)
  * Avoid code duplication
  * Extract reusable patterns
  * Create shared utilities
  * Maintain single sources of truth

### 1.2 SOLID Principles
- **Single Responsibility**: Each component/module does one thing well
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Subtypes must be substitutable
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: Depend on abstractions

## 2. Project Structure

### 2.1 Feature-Based Organization
```
src/
├── features/
│   ├── canvas/
│   │   ├── types.ts              # Canvas-specific types
│   │   ├── Canvas.tsx            # Main canvas component
│   │   ├── CanvasObject.tsx      # Canvas object component
│   │   ├── hooks/
│   │   ├── store/
│   │   └── utils/
│   │
│   ├── shapes/
│   │   ├── types.ts              # Shape-specific types
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   └── tools/
│       ├── types.ts              # Tool-specific types
│       ├── components/
│       ├── store/
│       └── hooks/
│
├── shared/
│   ├── types/
│   ├── components/
│   └── hooks/
│
└── app/
    ├── types.ts
    └── store/
```

### 2.2 Feature Module Structure
Each feature module should contain:
- Types (types.ts)
- Components
- Hooks
- Utils
- Store (if needed)
- Tests

## 3. Naming Conventions

### 3.1 Files and Folders
- **Components**: PascalCase
  * `Button.tsx`
  * `CanvasObject.tsx`

- **Utilities/Hooks**: camelCase
  * `useCanvas.ts`
  * `geometryUtils.ts`

- **Types**: PascalCase
  * `types.ts`
  * `CanvasTypes.ts`

### 3.2 Code Elements
```typescript
// Interfaces
interface ICanvasProps {
  width: number;
  height: number;
}

// Types
type ShapeType = 'rectangle' | 'circle';

// Components
const CanvasComponent: React.FC<ICanvasProps> = () => {};

// Functions
const handleMouseMove = (event: MouseEvent) => {};

// Constants
const MAX_CANVAS_OBJECTS = 1000;
```

## 4. Component Structure

### 4.1 Component Template
```typescript
import React from 'react';
import { ComponentProps } from './types';
import styles from './Component.module.css';

export const Component: React.FC<ComponentProps> = ({
  prop1,
  prop2,
}) => {
  // 1. Hooks
  const [state, setState] = useState();
  
  // 2. Derived State
  const computed = useMemo(() => {}, []);
  
  // 3. Effects
  useEffect(() => {}, []);
  
  // 4. Event Handlers
  const handleEvent = () => {};
  
  // 5. Render
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
};
```

### 4.2 Props Interface Location
```typescript
// In feature/component/types.ts
export interface ComponentProps {
  required: string;
  optional?: number;
  children?: React.ReactNode;
}
```

## 5. Type Definition Guidelines

### 5.1 Feature-Level Types
```typescript
// features/canvas/types.ts
export interface CanvasState {
  zoom: number;
  pan: Point;
  selectedIds: string[];
}

export type CanvasAction =
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'SET_PAN'; payload: Point };
```

### 5.2 Shared Types
```typescript
// shared/types/common.ts
export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}
```

### 5.3 Type Organization Rules
1. Place types closest to their usage
2. Share only truly common types
3. Keep feature-specific types within feature
4. Use explicit imports for types

## 6. Code Style

### 6.1 General Rules
- Max line length: 80 characters
- Indentation: 2 spaces
- Semicolons: required
- Single quotes for strings
- Trailing commas in multiline
- No unused variables/imports

### 6.2 TypeScript Rules
```typescript
// Use type annotations
const value: string = 'example';

// Use interface for objects
interface Config {
  name: string;
  value: number;
}

// Use type for unions/intersections
type Status = 'pending' | 'success' | 'error';

// Use generics appropriately
function getFirst<T>(array: T[]): T | undefined {
  return array[0];
}
```

## 7. State Management

### 7.1 Zustand Store Structure
```typescript
interface Store {
  // State
  data: Data;
  status: Status;
  
  // Actions
  setData: (data: Data) => void;
  resetStore: () => void;
}

const useStore = create<Store>((set) => ({
  // Implementation
}));
```

### 7.2 State Organization
- Feature-based stores
- Minimal global state
- Computed values via selectors
- Action creators for complex operations

## 8. Testing Standards

### 8.1 Test Structure
```typescript
describe('Component', () => {
  // Setup
  beforeEach(() => {
    // Common setup
  });

  // Tests
  it('should render correctly', () => {
    // Test implementation
  });
});
```

### 8.2 Testing Rules
- Test behavior, not implementation
- One assertion per test
- Use meaningful test descriptions
- Mock external dependencies
- Test edge cases

## 9. Documentation

### 9.1 Code Documentation
```typescript
/**
 * Creates a new canvas object
 * @param type - The type of object to create
 * @param position - Initial position
 * @returns The created object
 */
function createObject(type: ObjectType, position: Point): CanvasObject {
  // Implementation
}
```

### 9.2 README Requirements
- Feature description
- Usage examples
- API documentation
- Type documentation
- Testing instructions

## 10. Version History
- v1.0.0 (January 25, 2024) - Initial coding standards
