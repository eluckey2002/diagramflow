# Infinite Canvas - Solution Design

## Architecture Overview

### Component Structure
```
CanvasManager
├── ViewportManager
│   ├── PanController
│   └── ZoomController
├── ObjectManager
│   ├── ObjectRegistry
│   └── SpatialIndex
├── GroupManager
│   ├── HierarchyManager
│   └── FlatStorage
├── EventManager
│   ├── EventBus
│   └── PerformanceControls
└── RenderManager
    ├── CullingManager
    └── BatchRenderer
```

## Component Details

### CanvasManager
```typescript
class CanvasManager {
  private canvas: fabric.Canvas;
  private viewportManager: ViewportManager;
  private objectManager: ObjectManager;
  private groupManager: GroupManager;
  private eventManager: EventManager;
  private renderManager: RenderManager;

  constructor(containerId: string) {
    this.canvas = new fabric.Canvas(containerId);
    this.viewportManager = new ViewportManager(this.canvas);
    this.objectManager = new ObjectManager();
    this.groupManager = new GroupManager();
    this.eventManager = new EventManager();
    this.renderManager = new RenderManager(this.canvas);
  }

  initialize(): void {
    this.setupEventHandlers();
    this.configureCanvas();
    this.startRenderLoop();
  }
}
```

### ViewportManager
```typescript
class ViewportManager {
  private viewport: Viewport = {
    x: 0,
    y: 0,
    zoom: 1
  };

  pan(deltaX: number, deltaY: number): void {
    this.viewport.x += deltaX;
    this.viewport.y += deltaY;
    this.updateTransform();
  }

  zoom(scale: number, point: Point): void {
    // Implement zoom logic around point
  }
}
```

### GroupManager
```typescript
class GroupManager {
  private readonly MAX_DEPTH = 5;
  private flattenedChildren: Map<string, Shape> = new Map();
  private hierarchy: Map<string, string[]> = new Map();

  addToGroup(child: Shape, parentId: string): void {
    if (this.getDepth(parentId) >= this.MAX_DEPTH) {
      throw new GroupDepthError('Maximum group depth exceeded');
    }
    this.flattenedChildren.set(child.id, child);
    this.hierarchy.get(parentId)?.push(child.id);
  }

  getDepth(groupId: string): number {
    let depth = 0;
    let currentId = groupId;
    while (this.getParentId(currentId)) {
      depth++;
      currentId = this.getParentId(currentId)!;
    }
    return depth;
  }

  private getParentId(childId: string): string | null {
    for (const [parentId, children] of this.hierarchy.entries()) {
      if (children.includes(childId)) {
        return parentId;
      }
    }
    return null;
  }

  getChildren(groupId: string): Shape[] {
    return this.hierarchy.get(groupId)?.map(id => this.flattenedChildren.get(id)!) ?? [];
  }
}
```

### EventManager
```typescript
class EventManager {
  private eventBus: EventBus;
  
  constructor() {
    this.eventBus = new EventBus();
  }
}

class EventBus {
  private throttleMap = new Map<string, number>([
    ['viewport.pan', 16],     // 60fps
    ['viewport.zoom', 16],    // 60fps
    ['object.move', 32],      // 30fps
    ['object.resize', 32]     // 30fps
  ]);
  
  private debounceMap = new Map<string, number>([
    ['canvas.save', 1000],    // 1s
    ['selection.change', 150], // 150ms
    ['text.input', 100]       // 100ms
  ]);

  private throttledHandlers = new Map<string, Function>();
  private debounceHandlers = new Map<string, Function>();

  publish<T>(event: string, data: T): void {
    if (this.throttleMap.has(event)) {
      this.throttledPublish(event, data);
    } else if (this.debounceMap.has(event)) {
      this.debouncedPublish(event, data);
    } else {
      this.immediatePublish(event, data);
    }
  }

  private throttledPublish<T>(event: string, data: T): void {
    const delay = this.throttleMap.get(event)!;
    if (!this.throttledHandlers.has(event)) {
      this.throttledHandlers.set(event, this.createThrottledHandler(delay));
    }
    this.throttledHandlers.get(event)!(data);
  }

  private debouncedPublish<T>(event: string, data: T): void {
    const delay = this.debounceMap.get(event)!;
    if (!this.debounceHandlers.has(event)) {
      this.debounceHandlers.set(event, this.createDebouncedHandler(delay));
    }
    this.debounceHandlers.get(event)!(data);
  }
}
```

## State Management

### Store Structure
```typescript
interface RootState {
  canvas: {
    viewport: Viewport;
    objects: Record<string, CanvasObject>;
    selection: string[];
    settings: CanvasSettings;
  };
  groups: {
    flattenedChildren: Record<string, Shape>;
    hierarchy: Record<string, string[]>;
  };
  ui: {
    tool: ToolType;
    sidebar: {
      visible: boolean;
      activeTab: string;
    };
  };
}
```

### History Management
```typescript
class HistoryManager {
  private readonly MAX_STACK_SIZE = 100;
  private readonly MAX_MEMORY_MB = 50;
  private memoryUsage = 0;

  private past: CircularBuffer<Command>;
  private future: CircularBuffer<Command>;

  constructor() {
    this.past = new CircularBuffer(this.MAX_STACK_SIZE);
    this.future = new CircularBuffer(this.MAX_STACK_SIZE);
  }

  push(command: Command): void {
    const commandSize = this.calculateSize(command);
    
    // Memory-based cleanup
    while (this.memoryUsage + commandSize > this.MAX_MEMORY_MB) {
      this.removeOldestCommand();
    }

    this.past.push(command);
    this.memoryUsage += commandSize;
    this.future.clear(); // Clear redo stack
  }

  undo(): void {
    const command = this.past.pop();
    if (command) {
      this.future.push(command);
      command.undo();
    }
  }

  redo(): void {
    const command = this.future.pop();
    if (command) {
      this.past.push(command);
      command.execute();
    }
  }

  private calculateSize(command: Command): number {
    return JSON.stringify(command).length / (1024 * 1024);
  }

  private removeOldestCommand(): void {
    const oldestCommand = this.past.shift();
    if (oldestCommand) {
      this.memoryUsage -= this.calculateSize(oldestCommand);
    }
  }
}

interface Command {
  type: CommandType;
  targetIds: string[];      // Store IDs instead of objects
  delta: Partial<Changes>;  // Store only changed properties
  timestamp: number;
  execute(): void;
  undo(): void;
}

class CircularBuffer<T> {
  private buffer: T[];
  private size: number;
  private head: number = 0;
  private tail: number = 0;
  private count: number = 0;

  constructor(size: number) {
    this.size = size;
    this.buffer = new Array(size);
  }

  push(item: T): void {
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    if (this.count === this.size) {
      this.head = (this.head + 1) % this.size;
    } else {
      this.count++;
    }
  }

  pop(): T | undefined {
    if (this.count === 0) return undefined;
    this.tail = (this.tail - 1 + this.size) % this.size;
    this.count--;
    return this.buffer[this.tail];
  }

  shift(): T | undefined {
    if (this.count === 0) return undefined;
    const item = this.buffer[this.head];
    this.head = (this.head + 1) % this.size;
    this.count--;
    return item;
  }

  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }
}
```

## Performance Optimizations

### Memory Management
```typescript
class MemoryManager {
  private readonly MAX_MEMORY_MB = 200;
  private readonly WARN_THRESHOLD_MB = 150;
  
  private memoryUsage = 0;
  
  trackAllocation(bytes: number): void {
    this.memoryUsage += bytes;
    if (this.memoryUsage > this.WARN_THRESHOLD_MB * 1024 * 1024) {
      this.emitWarning();
    }
  }

  trackDeallocation(bytes: number): void {
    this.memoryUsage -= bytes;
  }

  private emitWarning(): void {
    this.eventBus.publish('memory.warning', {
      current: this.memoryUsage,
      threshold: this.WARN_THRESHOLD_MB
    });
  }
}
```

## Implementation Guidelines

### Performance Best Practices
1. Use event throttling/debouncing based on operation type
2. Implement memory-aware command storage
3. Limit group nesting depth to 5 levels
4. Use flat storage with hierarchical references
5. Implement circular buffers for history management
6. Monitor and manage memory usage

### Error Handling
```typescript
class GroupDepthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GroupDepthError';
  }
}

class MemoryLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MemoryLimitError';
  }
}
```

## Testing Approach

### Performance Testing
```typescript
describe('Performance Tests', () => {
  it('maintains memory limits', async () => {
    const manager = new HistoryManager();
    for (let i = 0; i < 1000; i++) {
      manager.push(createLargeCommand());
    }
    const memoryUsage = process.memoryUsage().heapUsed;
    expect(memoryUsage).toBeLessThan(50 * 1024 * 1024); // 50MB
  });

  it('handles nested groups efficiently', () => {
    const manager = new GroupManager();
    const root = createGroup();
    for (let i = 0; i < 5; i++) {
      const child = createGroup();
      manager.addToGroup(child, root.id);
    }
    expect(() => manager.addToGroup(createGroup(), root.id))
      .toThrow(GroupDepthError);
  });
});
```

## Version History
- v1.1.0 (January 25, 2024) - Updated with memory management and performance optimizations
- v1.0.0 (January 25, 2024) - Initial solution design
