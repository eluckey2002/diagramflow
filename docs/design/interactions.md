# DiagramFlow - Interaction Specifications
Version 1.0 | January 25, 2024

## 1. Canvas Interactions

### 1.1 Navigation
#### Pan
- **Trigger**: Space + Left Mouse Drag / Middle Mouse Button
- **Behavior**:
  * Canvas follows mouse movement 1:1
  * Smooth inertia scrolling on release
  * Edge resistance at canvas bounds
- **Visual Feedback**:
  * Cursor changes to hand icon
  * Grid moves with pan motion

#### Zoom
- **Trigger**: Mouse Wheel / Pinch Gesture
- **Behavior**:
  * Zoom centered on cursor position
  * Smooth zoom animation (200ms)
  * Zoom levels: 25% to 400%
- **Visual Feedback**:
  * Grid scale updates
  * Objects scale smoothly
  * Zoom level indicator updates

### 1.2 Object Manipulation

#### Selection
- **Single Select**:
  * Trigger: Click on object
  * Behavior: Deselects others, shows handles
  * Visual: Blue outline, handles appear

- **Multi-Select**:
  * Trigger: Shift + Click / Drag Rectangle
  * Behavior: Adds to selection, shows group handles
  * Visual: Individual outlines + group outline

#### Move
- **Free Move**:
  * Trigger: Drag selected object
  * Behavior: Follows cursor with snap-to-grid
  * Visual: Live position preview, smart guides

- **Constrained Move**:
  * Trigger: Shift + Drag
  * Behavior: Locks to horizontal/vertical
  * Visual: Constraint line indicator

#### Resize
- **Corner Resize**:
  * Trigger: Drag corner handle
  * Behavior: Proportional scaling
  * Visual: Size preview, aspect ratio indicator

- **Edge Resize**:
  * Trigger: Drag edge handle
  * Behavior: Single axis scaling
  * Visual: Dimension preview

#### Rotate
- **Free Rotation**:
  * Trigger: Drag rotation handle
  * Behavior: Rotation around center point
  * Visual: Angle indicator, rotation preview

- **Snapped Rotation**:
  * Trigger: Shift + Drag rotation handle
  * Behavior: Snaps to 15° increments
  * Visual: Snap points highlight

## 2. Tool Interactions

### 2.1 Shape Tools

#### Rectangle Tool
- **Create**:
  * Trigger: Click and drag
  * Behavior: Draws from corner to corner
  * Visual: Live preview with dimensions

- **Square Constraint**:
  * Trigger: Shift + Drag
  * Behavior: Forces 1:1 aspect ratio
  * Visual: Square indicator

#### Circle Tool
- **Create**:
  * Trigger: Click and drag
  * Behavior: Draws from center
  * Visual: Radius preview

- **Perfect Circle**:
  * Trigger: Shift + Drag
  * Behavior: Forces perfect circle
  * Visual: Circle indicator

### 2.2 Text Tool

#### Text Creation
- **New Text Box**:
  * Trigger: Single click
  * Behavior: Creates default size text box
  * Visual: Blinking cursor, focus state

- **Sized Text Box**:
  * Trigger: Click and drag
  * Behavior: Creates custom size text box
  * Visual: Size preview while dragging

#### Text Editing
- **Direct Edit**:
  * Trigger: Double click existing text
  * Behavior: Enters edit mode
  * Visual: Text cursor, selection highlight

- **Format Changes**:
  * Trigger: Toolbar buttons while editing
  * Behavior: Applies formatting to selection
  * Visual: Format preview, button active states

### 2.3 Connector Tool

#### Connection Creation
- **Start Connection**:
  * Trigger: Click on object
  * Behavior: Anchors start point
  * Visual: Connection preview follows cursor

- **Complete Connection**:
  * Trigger: Click on target object
  * Behavior: Creates anchored connection
  * Visual: Snaps to connection points

#### Connection Adjustment
- **Path Modification**:
  * Trigger: Drag control points
  * Behavior: Adjusts curve/angles
  * Visual: Path preview, control handles

- **Anchor Adjustment**:
  * Trigger: Drag endpoints
  * Behavior: Reconnects to new points
  * Visual: Valid connection points highlight

## 3. Panel Interactions

### 3.1 Properties Panel

#### Property Updates
- **Numeric Inputs**:
  * Trigger: Type / Scrubber drag
  * Behavior: Live updates with validation
  * Visual: Value preview, error states

- **Color Selection**:
  * Trigger: Click color field
  * Behavior: Opens color picker
  * Visual: Color preview, opacity preview

### 3.2 Layers Panel

#### Layer Management
- **Reordering**:
  * Trigger: Drag layer item
  * Behavior: Updates z-index
  * Visual: Insert position indicator

- **Visibility Toggle**:
  * Trigger: Click eye icon
  * Behavior: Toggles layer visibility
  * Visual: Icon state, layer preview

## 4. Animation Specifications

### 4.1 Object Animations

#### Creation
```css
.object-create {
  animation: scale-in 200ms ease-out;
  transform-origin: center;
}

@keyframes scale-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

#### Selection
```css
.object-select {
  animation: select-pulse 200ms ease-out;
}

@keyframes select-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
```

### 4.2 Panel Animations

#### Panel Open/Close
```css
.panel-slide {
  transition: transform 200ms ease-in-out;
}

.panel-enter {
  transform: translateX(100%);
}

.panel-enter-active {
  transform: translateX(0);
}
```

#### Property Updates
```css
.property-update {
  transition: all 150ms ease-out;
}

.property-flash {
  animation: flash 300ms ease-out;
}
```

## 5. Gesture Support

### 5.1 Touch Gestures
- **Pan**: Two-finger drag
- **Zoom**: Pinch/spread
- **Rotate**: Two-finger rotate
- **Object Move**: One-finger drag
- **Selection**: Tap / Long press

### 5.2 Keyboard Shortcuts

#### Navigation
- **Pan**: Space + Drag
- **Zoom In**: Ctrl + +
- **Zoom Out**: Ctrl + -
- **Zoom to Fit**: Ctrl + 0
- **Zoom to Selection**: Ctrl + 1

#### Tools
- **Selection Tool**: V
- **Rectangle**: R
- **Circle**: C
- **Text**: T
- **Connector**: L
- **Hand Tool**: H

#### Operations
- **Delete**: Delete / Backspace
- **Copy**: Ctrl + C
- **Paste**: Ctrl + V
- **Cut**: Ctrl + X
- **Undo**: Ctrl + Z
- **Redo**: Ctrl + Shift + Z

## 6. Feedback States

### 6.1 Loading States
- Progressive loading indicators
- Skeleton UI for data loading
- Operation progress feedback
- Background task indicators

### 6.2 Error States
- Validation feedback
- Operation failure messages
- Recovery options
- Error boundaries

### 6.3 Success States
- Operation completion feedback
- Save confirmations
- Action success indicators
- State update confirmations

## 7. Version History
- v1.0.0 (January 25, 2024) - Initial interaction specifications
