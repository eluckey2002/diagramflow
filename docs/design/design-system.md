# DiagramFlow - Design System
Version 1.0 | January 25, 2024

## 1. Color Palette

### 1.1 Primary Colors
```css
--primary-blue: #2563EB;
--primary-blue-hover: #1D4ED8;
--primary-blue-active: #1E40AF;
--primary-text-on-blue: #FFFFFF;

--secondary-gray: #4B5563;
--secondary-gray-hover: #374151;
--secondary-gray-active: #1F2937;
--secondary-text-on-gray: #FFFFFF;
```

### 1.2 Semantic Colors
```css
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;

/* Backgrounds */
--canvas-bg: #F8FAFC;
--toolbar-bg: #FFFFFF;
--sidebar-bg: #FFFFFF;
--modal-bg: #FFFFFF;
```

### 1.3 Neutral Colors
```css
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

## 2. Typography

### 2.1 Font Families
```css
--font-heading: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### 2.2 Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### 2.3 Font Weights
```css
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## 3. Spacing System

### 3.1 Base Spacing Units
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### 3.2 Component Specific Spacing
```css
--toolbar-height: 3rem;        /* 48px */
--sidebar-width: 17.5rem;      /* 280px */
--statusbar-height: 1.5rem;    /* 24px */
--panel-padding: 1rem;         /* 16px */
--toolbar-item-gap: 0.5rem;    /* 8px */
```

## 4. Components

### 4.1 Layout Components

#### AppLayout
```typescript
interface AppLayoutProps {
  children: React.ReactNode;
}
```
- **Description**: Main application layout wrapper
- **Responsibility**: Manages overall application layout and structure
- **Subcomponents**:
  * TopBar
  * LeftToolbar
  * Canvas
  * RightPanel
  * StatusBar

#### TopBar
```typescript
interface TopBarProps {
  onNewDocument: () => void;
  onSave: () => void;
  onExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}
```
- **Height**: 48px
- **Background**: white
- **Shadow**: shadow-sm

#### LeftToolbar
```typescript
interface LeftToolbarProps {
  selectedTool: ToolType;
  onToolSelect: (tool: ToolType) => void;
}
```
- **Width**: 48px
- **Background**: white

### 4.2 Canvas Components

#### Canvas
```typescript
interface CanvasProps {
  width: number;
  height: number;
  zoom: number;
  pan: { x: number; y: number };
  objects: CanvasObject[];
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  onObjectUpdate: (id: string, updates: Partial<CanvasObject>) => void;
}
```

#### CanvasObject
```typescript
interface CanvasObjectProps {
  object: BaseObject;
  selected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (updates: Partial<BaseObject>) => void;
  onDelete: (id: string) => void;
}
```

### 4.3 Tool Components

#### ToolButton
```typescript
interface ToolButtonProps {
  tool: ToolType;
  selected: boolean;
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  onClick: () => void;
}
```
- **Size**: 32x32px
- **States**:
  * Normal
  * Hovered
  * Selected
  * Disabled

#### ColorPicker
```typescript
interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  presets?: string[];
  allowCustom?: boolean;
}
```

### 4.4 Panel Components

#### RightPanel
```typescript
interface RightPanelProps {
  selectedObjects: BaseObject[];
  visible: boolean;
  onClose: () => void;
}
```
- **Width**: 280px
- **Features**:
  * Collapsible
  * Tabbed interface
  * Scroll containment

## 5. Shadows

### 5.1 Elevation Levels
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### 5.2 Interactive Shadows
```css
--shadow-button: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-button-hover: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-dropdown: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-modal: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## 6. Border Radius

### 6.1 Base Radius
```css
--radius-sm: 0.125rem;  /* 2px */
--radius: 0.25rem;      /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-full: 9999px;
```

### 6.2 Component Specific Radius
```css
--radius-button: var(--radius);
--radius-input: var(--radius);
--radius-panel: var(--radius-lg);
--radius-modal: var(--radius-lg);
--radius-tooltip: var(--radius);
```

## 7. Motion

### 7.1 Duration
```css
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
```

### 7.2 Easing
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

## 8. Z-Index Layers
```css
--z-negative: -1;
--z-elevate: 1;
--z-sticky: 100;
--z-header: 200;
--z-dropdown: 300;
--z-modal: 400;
--z-popup: 500;
--z-tooltip: 600;
```

## 9. Breakpoints
```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

## 10. Component States

### 10.1 Interactive States
- **Hover**:
  * Background lighten: 5%
  * Scale: 1.02
  * Transition: 150ms ease

- **Active**:
  * Background darken: 5%
  * Scale: 0.98
  * Transition: 50ms ease

- **Focus**:
  * Ring color: primary-blue
  * Ring width: 2px
  * Ring offset: 2px

### 10.2 Loading States
- **Button Loading**:
  * Spinner overlay
  * Disabled state
  * Loading text

- **Panel Loading**:
  * Skeleton layout
  * Progress indicator
  * Loading message

### 10.3 Error States
- **Input Error**:
  * Red border
  * Error message
  * Error icon

## 11. Version History
- v1.0.0 (January 25, 2024) - Initial design system
