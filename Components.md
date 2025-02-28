# Algorithm Visualization Components Guide

This guide explains how to use our algorithm visualization components in your React TypeScript projects. These components help you create interactive visualizations for arrays, matrices, and control visualization speed.

## Available Components

1. **MatrixVisualizer**: Visualizes 2D grid data with highlighting, paths, and interactive cells
2. **SpeedController**: Controls animation speed with multiple UI variants
3. **ArrayVisualizer** : Visualizes 1D array data with sorting and search algorithms

## Installation

These components should be placed in your project structure:

```
your-project/
  src/
    components/
      libraries/
        MatrixVisualizer.tsx
        SpeedController.tsx
        ArrayVisualizer.tsx (if implemented)
```

## MatrixVisualizer Component

### Purpose

Visualizes a 2D matrix/grid with support for highlighting paths, current positions, and walls/obstacles.

### Props Interface

```typescript
interface MatrixVisualizerProps {
  matrix: number[][]; // The 2D array to visualize
  highlightedCells?: [number, number][]; // Cells to highlight (visited cells)
  compareCells?: [number, number][]; // Cells being compared
  pathCells?: [number, number][]; // Cells in the final path
  currentCell?: [number, number] | null; // Current active cell
  blockedCells?: [number, number][]; // Walls/obstacles
  maxValue?: number; // Max value for color intensity (optional)
  showValues?: boolean; // Whether to show cell values
  speed?: "slow" | "medium" | "fast"; // Animation speed
  colorScheme?: {
    // Custom colors for different cell types
    default: string;
    highlight: string;
    compare: string;
    path: string;
    current: string;
    blocked: string;
  };
  label?: string; // Label for the visualization
  onCellClick?: (row: number, col: number) => void; // Cell click handler
  allowInteraction?: boolean; // Whether cells can be clicked
}
```

### Basic Usage Example

```tsx
import MatrixVisualizer from "~/components/libraries/MatrixVisualizer";

function MyComponent() {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <MatrixVisualizer matrix={matrix} showValues={true} label="My Matrix" />
  );
}
```

### Advanced Usage Example

```tsx
import { useState } from "react";
import MatrixVisualizer from "~/components/libraries/MatrixVisualizer";

function PathfindingDemo() {
  const [matrix, setMatrix] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]);
  const [blockedCells, setBlockedCells] = useState<[number, number][]>([]);
  const [path, setPath] = useState<[number, number][]>([]);

  const toggleCell = (row: number, col: number) => {
    // Don't block start or end position
    if ((row === 0 && col === 0) || (row === 3 && col === 3)) {
      return;
    }

    // Toggle blocked state
    const isBlocked = blockedCells.some(([r, c]) => r === row && c === col);
    if (isBlocked) {
      setBlockedCells(
        blockedCells.filter(([r, c]) => !(r === row && c === col))
      );
    } else {
      setBlockedCells([...blockedCells, [row, col]]);
    }
  };

  return (
    <div>
      <h2>Pathfinding Demo</h2>
      <MatrixVisualizer
        matrix={matrix}
        blockedCells={blockedCells}
        pathCells={path}
        currentCell={[0, 0]}
        showValues={true}
        speed="medium"
        label="Click to add walls"
        onCellClick={toggleCell}
        allowInteraction={true}
      />
      <button
        onClick={() => {
          /* Run your pathfinding algorithm */
        }}
      >
        Find Path
      </button>
    </div>
  );
}
```

## SpeedController Component

### Purpose

Provides a UI for controlling animation speed with multiple visual variants.

### Props Interface

```typescript
interface SpeedControllerProps {
  speed: "slow" | "medium" | "fast"; // Current speed setting
  setSpeed: (speed: "slow" | "medium" | "fast") => void; // Speed setter function
  isDisabled?: boolean; // Whether controller is disabled
  className?: string; // Additional CSS classes
  showLabel?: boolean; // Whether to show "Speed:" label
  variant?: "buttons" | "dropdown" | "slider"; // UI variant style
}
```

### Basic Usage Example

```tsx
import { useState } from "react";
import SpeedController from "~/components/libraries/SpeedController";

function MyComponent() {
  const [speed, setSpeed] = useState<"slow" | "medium" | "fast">("medium");

  return (
    <div>
      <SpeedController speed={speed} setSpeed={setSpeed} />
      <p>Current speed: {speed}</p>
    </div>
  );
}
```

### Different Variants

```tsx
<SpeedController
  speed={speed}
  setSpeed={setSpeed}
  variant="buttons"   // Default - shows three buttons
/>

<SpeedController
  speed={speed}
  setSpeed={setSpeed}
  variant="dropdown"  // Shows dropdown select
/>

<SpeedController
  speed={speed}
  setSpeed={setSpeed}
  variant="slider"    // Shows a slider with slow-fast range
/>
```

## Implementing Common Algorithms

Here are some algorithms you might want to implement with these visualization components:

### Path Finding Algorithms

- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Dijkstra's Algorithm
- A\* Search Algorithm

### Sorting Algorithms (with ArrayVisualizer)

- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
