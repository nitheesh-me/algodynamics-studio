import React, { useState, useEffect } from "react";

interface MatrixVisualizerProps {
  matrix: number[][];
  highlightedCells?: [number, number][];
  compareCells?: [number, number][];
  pathCells?: [number, number][];
  currentCell?: [number, number] | null;
  blockedCells?: [number, number][];
  maxValue?: number;
  showValues?: boolean;
  speed?: "slow" | "medium" | "fast";
  colorScheme?: {
    default: string;
    highlight: string;
    compare: string;
    path: string;
    current: string;
    blocked: string;
  };
  label?: string;
  onCellClick?: (row: number, col: number) => void;
  allowInteraction?: boolean;
}

const MatrixVisualizer: React.FC<MatrixVisualizerProps> = ({
  matrix,
  highlightedCells = [],
  compareCells = [],
  pathCells = [],
  currentCell = null,
  blockedCells = [],
  maxValue = null,
  showValues = true,
  speed = "medium",
  colorScheme = {
    default: "bg-blue-500",
    highlight: "bg-yellow-500",
    compare: "bg-purple-500",
    path: "bg-green-500",
    current: "bg-orange-500",
    blocked: "bg-gray-700",
  },
  label = "",
  onCellClick = undefined,
  allowInteraction = false,
}) => {
  const [grid, setGrid] = useState(matrix || []);
  const actualMaxValue = maxValue || Math.max(...matrix.flat(), 1);

  const speedMap = {
    slow: "duration-1000",
    medium: "duration-500",
    fast: "duration-300",
  };

  useEffect(() => {
    setGrid(matrix);
  }, [matrix]);

  const getCellColor = (row: number, col: number) => {
    if (blockedCells.some(([r, c]) => r === row && c === col)) return colorScheme.blocked;
    if (currentCell && currentCell[0] === row && currentCell[1] === col) return colorScheme.current;
    if (highlightedCells.some(([r, c]) => r === row && c === col)) return colorScheme.highlight;
    if (compareCells.some(([r, c]) => r === row && c === col)) return colorScheme.compare;
    if (pathCells.some(([r, c]) => r === row && c === col)) return colorScheme.path;
    return colorScheme.default;
  };

  const handleCellClick = (row: number, col: number) => {
    if (onCellClick && allowInteraction) {
      onCellClick(row, col);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
      {label && <h3 className="text-lg font-medium">{label}</h3>}
      <div 
        className="grid gap-1 p-3 bg-gray-900 rounded-lg shadow-lg" 
        style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(30px, 1fr))` }}
      >
        {grid.map((row, rIdx) =>
          row.map((val, cIdx) => (
            <div 
              key={`${rIdx}-${cIdx}`} 
              className={`w-10 h-10 flex items-center justify-center border border-gray-600 
              ${speedMap[speed]} transition-all ${getCellColor(rIdx, cIdx)} ${
                allowInteraction && onCellClick ? "cursor-pointer hover:opacity-80" : ""
              }`}
              onClick={() => handleCellClick(rIdx, cIdx)}
            >
              {showValues && <span className="text-xs text-white">{val}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MatrixVisualizer;