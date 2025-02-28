import React from "react";

interface SpeedControllerProps {
  speed: "slow" | "medium" | "fast";
  setSpeed: (speed: "slow" | "medium" | "fast") => void;
  isDisabled?: boolean;
  className?: string;
  showLabel?: boolean;
  variant?: "buttons" | "dropdown" | "slider";
}

const SpeedController: React.FC<SpeedControllerProps> = ({
  speed,
  setSpeed,
  isDisabled = false,
  className = "",
  showLabel = true,
  variant = "buttons"
}) => {
  // Speed mapping to milliseconds (for display purposes)
  const speedValues = {
    slow: "1000ms",
    medium: "500ms",
    fast: "250ms"
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value === 1) setSpeed("slow");
    else if (value === 2) setSpeed("medium");
    else if (value === 3) setSpeed("fast");
  };

  const getSliderValue = () => {
    if (speed === "slow") return 1;
    if (speed === "medium") return 2;
    return 3;
  };

  if (variant === "dropdown") {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showLabel && <span className="text-sm font-medium">Speed:</span>}
        <select
          value={speed}
          onChange={(e) => setSpeed(e.target.value as "slow" | "medium" | "fast")}
          disabled={isDisabled}
          className={`bg-gray-800 text-white rounded px-3 py-2 border border-gray-700 ${
            isDisabled ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500"
          }`}
        >
          <option value="slow">Slow ({speedValues.slow})</option>
          <option value="medium">Medium ({speedValues.medium})</option>
          <option value="fast">Fast ({speedValues.fast})</option>
        </select>
      </div>
    );
  }

  if (variant === "slider") {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showLabel && <span className="text-sm font-medium">Speed:</span>}
        <div className="flex items-center space-x-2 flex-grow max-w-xs">
          <span className="text-xs">Slow</span>
          <input
            type="range"
            min="1"
            max="3"
            step="1"
            value={getSliderValue()}
            onChange={handleSliderChange}
            disabled={isDisabled}
            className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
          <span className="text-xs">Fast</span>
        </div>
        <span className="text-xs w-16">{speed} ({speedValues[speed]})</span>
      </div>
    );
  }

  // Default: buttons variant
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showLabel && <span className="text-sm font-medium mr-2">Speed:</span>}
      <div className="flex space-x-1">
        <button
          onClick={() => setSpeed("slow")}
          disabled={isDisabled}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            speed === "slow"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Slow
        </button>
        <button
          onClick={() => setSpeed("medium")}
          disabled={isDisabled}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            speed === "medium"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Medium
        </button>
        <button
          onClick={() => setSpeed("fast")}
          disabled={isDisabled}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            speed === "fast"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Fast
        </button>
      </div>
    </div>
  );
};

export default SpeedController;