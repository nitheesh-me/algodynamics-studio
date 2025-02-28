import { useState, useEffect, useRef } from "react";
import MatrixVisualizer from "~/components/libraries/MatrixVisualizer";
import SpeedController from "~/components/libraries/SpeedController";

const MatrixPage = () => {
  const initialMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  
  const [matrix, setMatrix] = useState([...initialMatrix]);
  const [highlighted, setHighlighted] = useState<[number, number][]>([]);
  const [compare, setCompare] = useState<[number, number][]>([]);
  const [path, setPath] = useState<[number, number][]>([]);
  const [currentCell, setCurrentCell] = useState<[number, number] | null>(null);
  const [blocked, setBlocked] = useState<[number, number][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState<"slow" | "medium" | "fast">("medium");
  const [algorithm, setAlgorithm] = useState<"bfs" | "dfs" | "dijkstra">("bfs");
  
  // Use a ref to store timeout IDs so we can clear them
  const timeoutIds = useRef<number[]>([]);
  
  // BFS algorithm simulation steps
  const getBFSSteps = () => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const steps: {
      highlighted: [number, number][];
      compare: [number, number][];
      path: [number, number][];
      current: [number, number] | null;
    }[] = [];
    
    // Queue for BFS
    const queue: [number, number][] = [[0, 0]];
    const visited = new Set<string>();
    visited.add("0,0");
    
    // Parent map to reconstruct path
    const parent: Record<string, string> = {};
    
    // Directions: right, down, left, up
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    // BFS algorithm
    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      const currentPosition = `${r},${c}`;
      
      // Create a step with current state
      steps.push({
        highlighted: [...visited].map(pos => {
          const [r, c] = pos.split(",").map(Number);
          return [r, c] as [number, number];
        }),
        compare: [],
        path: reconstructPath(parent, r, c),
        current: [r, c],
      });
      
      // Target cell found (bottom right)
      if (r === rows - 1 && c === cols - 1) {
        break;
      }
      
      // Explore neighbors
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        const newPos = `${nr},${nc}`;
        
        // Valid neighbor?
        if (
          nr >= 0 && nr < rows && 
          nc >= 0 && nc < cols && 
          !visited.has(newPos) &&
          !blocked.some(([br, bc]) => br === nr && bc === nc)
        ) {
          // Add comparison step
          steps.push({
            highlighted: [...visited].map(pos => {
              const [r, c] = pos.split(",").map(Number);
              return [r, c] as [number, number];
            }),
            compare: [[nr, nc]],
            path: reconstructPath(parent, r, c),
            current: [r, c],
          });
          
          // Add to queue and mark as visited
          queue.push([nr, nc]);
          visited.add(newPos);
          parent[newPos] = currentPosition;
        }
      }
    }
    
    // Final step with complete path
    if (visited.has(`${rows-1},${cols-1}`)) {
      steps.push({
        highlighted: [...visited].map(pos => {
          const [r, c] = pos.split(",").map(Number);
          return [r, c] as [number, number];
        }),
        compare: [],
        path: reconstructPath(parent, rows-1, cols-1),
        current: [rows-1, cols-1],
      });
    }
    
    return steps;
  };
  
  // Helper to reconstruct path
  const reconstructPath = (parent: Record<string, string>, r: number, c: number): [number, number][] => {
    const path: [number, number][] = [];
    let current = `${r},${c}`;
    
    while (current in parent) {
      const [cr, cc] = current.split(",").map(Number);
      path.unshift([cr, cc]);
      current = parent[current];
    }
    
    // Add the start position
    if (current === "0,0") {
      path.unshift([0, 0]);
    }
    
    return path;
  };
  
  const getAlgorithmSteps = () => {
    // For now, just returning BFS steps, but this can be expanded
    // to include other algorithms
    return getBFSSteps();
  };
  
  const startAlgorithm = () => {
    // Reset previous state
    resetVisualization();
    
    // Get algorithm steps
    const steps = getAlgorithmSteps();
    
    // Clear any existing timeouts
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    
    // Set running state
    setIsRunning(true);
    
    // Map speed to actual milliseconds
    const delayMap = {
      slow: 1000,
      medium: 500,
      fast: 250
    };
    const delay = delayMap[speed];
    
    // Run steps with timeouts
    steps.forEach((step, index) => {
      const id = window.setTimeout(() => {
        setHighlighted(step.highlighted);
        setCompare(step.compare);
        setPath(step.path);
        setCurrentCell(step.current);
        
        // Check if this is the last step
        if (index === steps.length - 1) {
          setIsRunning(false);
        }
      }, index * delay);
      
      timeoutIds.current.push(id);
    });
  };
  
  const resetVisualization = () => {
    // Clear all timeouts
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    
    // Reset visualization state but keep walls
    setHighlighted([]);
    setCompare([]);
    setPath([]);
    setCurrentCell(null);
    setIsRunning(false);
  };
  
  const resetAll = () => {
    resetVisualization();
    setBlocked([]);
  };
  
  const toggleCell = (row: number, col: number) => {
    if (isRunning) return;
    
    // Toggle a cell as blocked/unblocked
    const isBlocked = blocked.some(([r, c]) => r === row && c === col);
    if (isBlocked) {
      setBlocked(blocked.filter(([r, c]) => !(r === row && c === col)));
    } else {
      // Don't block start or end
      if ((row === 0 && col === 0) || (row === matrix.length - 1 && col === matrix[0].length - 1)) {
        return;
      }
      setBlocked([...blocked, [row, col]]);
    }
  };
  
  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutIds.current.forEach(clearTimeout);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Matrix Algorithm Visualization</h1>
      
      <div className="max-w-3xl w-full mb-6 flex flex-col md:flex-row justify-between gap-4">
        {/* Speed controller */}
        <SpeedController 
          speed={speed} 
          setSpeed={setSpeed} 
          isDisabled={isRunning}
          variant="buttons" 
          className="flex-1"
        />
        
        {/* Algorithm selector */}
        <div className="flex items-center space-x-3 flex-1">
          <span className="text-sm font-medium">Algorithm:</span>
          <select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as "bfs" | "dfs" | "dijkstra")}
            disabled={isRunning}
            className={`bg-gray-800 text-white rounded px-3 py-2 w-full border border-gray-700 ${
              isRunning ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500"
            }`}
          >
            <option value="bfs">Breadth-First Search</option>
            <option value="dfs">Depth-First Search</option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
          </select>
        </div>
      </div>
      
      {/* Instructions */}
      <p className="text-sm text-gray-400 mb-4 text-center max-w-xl">
        Click on cells to toggle walls. The algorithm will find a path from top-left to bottom-right.
      </p>

      {/* Matrix Visualizer */}
      <MatrixVisualizer
        matrix={matrix}
        highlightedCells={highlighted}
        compareCells={compare}
        pathCells={path}
        currentCell={currentCell}
        blockedCells={blocked}
        showValues={true}
        speed={speed}
        label={`${algorithm.toUpperCase()} Pathfinding Simulation`}
        onCellClick={toggleCell}
        allowInteraction={!isRunning}
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
          <span className="text-sm">Unvisited</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
          <span className="text-sm">Visited</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-500 mr-2"></div>
          <span className="text-sm">Comparing</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 mr-2"></div>
          <span className="text-sm">Path</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 mr-2"></div>
          <span className="text-sm">Current</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-700 mr-2"></div>
          <span className="text-sm">Wall</span>
        </div>
      </div>

      {/* Buttons for Interaction */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={startAlgorithm}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            isRunning ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isRunning ? "Running..." : "Start Algorithm"}
        </button>
        <button
          onClick={resetVisualization}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition duration-300"
        >
          Reset Visualization
        </button>
        <button
          onClick={resetAll}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition duration-300"
        >
          Reset All
        </button>
      </div>
    </div>
  );
};

export default MatrixPage;