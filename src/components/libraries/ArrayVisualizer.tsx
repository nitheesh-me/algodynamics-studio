import { useState, useEffect } from "react";

interface ArrayVisualizerProps {
  array: number[];
  highlightedIndices?: number[];
  compareIndices?: number[];
  pivotIndex?: number;
  swappingIndices?: [number, number];
  sortedIndices?: number[];
  currentIndex?: number;
  maxValue?: number;
  showIndices?: boolean;
  showValues?: boolean;
  speed?: "slow" | "medium" | "fast";
  colorScheme?: {
    default: string;
    highlight: string;
    compare: string;
    pivot: string;
    swapping: string;
    sorted: string;
    current: string;
  };
  label?: string;
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  array,
  highlightedIndices = [],
  compareIndices = [],
  pivotIndex = -1,
  swappingIndices = [-1, -1],
  sortedIndices = [],
  currentIndex = -1,
  maxValue = null,
  showIndices = false,
  showValues = true,
  speed = "medium",
  colorScheme = {
    default: "bg-blue-500",
    highlight: "bg-yellow-500",
    compare: "bg-purple-500",
    pivot: "bg-red-500",
    swapping: "bg-green-500",
    sorted: "bg-teal-500",
    current: "bg-orange-500",
  },
  label = "",
}) => {
  const [values, setValues] = useState(array || []);
  const actualMaxValue = maxValue || Math.max(...array, 1);
  
  const speedMap = {
    slow: "duration-1000",
    medium: "duration-500",
    fast: "duration-300",
  };

  useEffect(() => {
    setValues(array);
  }, [array]);

  const getBarColor = (index: number) => {
    if (swappingIndices.includes(index)) return colorScheme.swapping;
    if (index === pivotIndex) return colorScheme.pivot;
    if (compareIndices.includes(index)) return colorScheme.compare;
    if (index === currentIndex) return colorScheme.current;
    if (highlightedIndices.includes(index)) return colorScheme.highlight;
    if (sortedIndices.includes(index)) return colorScheme.sorted;
    return colorScheme.default;
  };

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
      {label && <h3 className="text-lg font-medium">{label}</h3>}
      <div className="flex justify-center items-end h-64 w-full space-x-1 bg-gray-900 p-5 rounded-lg shadow-lg">
        {values.map((val, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-10 transition-all ${speedMap[speed]} ease-in-out ${getBarColor(idx)}`}
              style={{ height: `${(val / actualMaxValue) * 220}px` }}
            ></div>
            {showValues && (
              <span className="text-xs text-white mt-1">{val}</span>
            )}
            {showIndices && (
              <span className="text-xs text-gray-400">{idx}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizer;