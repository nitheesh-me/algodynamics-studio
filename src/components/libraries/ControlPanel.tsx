interface ControlPanelProps {
    onStart: () => void;
    onNextStep: () => void;
    onReset: () => void;
    speed?: number;
    setSpeed?: (speed: number) => void;
  }
  
  const ControlPanel: React.FC<ControlPanelProps> = ({
    onStart,
    onNextStep,
    onReset,
    speed = 300,
    setSpeed,
  }) => {
    return (
      <div className="flex space-x-4 mt-4">
        <button
          onClick={onStart}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
        >
          Start
        </button>
        <button
          onClick={onNextStep}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Next Step
        </button>
        <button
          onClick={onReset}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
        >
          Reset
        </button>
        {setSpeed && (
          <input
            type="range"
            min="100"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="cursor-pointer"
          />
        )}
      </div>
    );
  };
  
  export default ControlPanel;
  