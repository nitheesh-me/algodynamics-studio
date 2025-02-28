import { useState } from "react";
// import ArrayVisualizer from "../components/ArrayVisualizer";
import ArrayVisualizer from "~/components/libraries/ArrayVisualizer";

const SortingPage = () => {
  const initialArray = [10, 20, 15, 30, 5, 25];
  const [array, setArray] = useState([...initialArray]);
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [compare, setCompare] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<[number, number] | null>(null);
  const [sorted, setSorted] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [sortingSteps, setSortingSteps] = useState<
    { arr: number[]; highlight: number[]; compare: number[]; swap?: [number, number]; sorted: number[] }[]
  >([]);

  // Generate sorting steps (Bubble Sort Example)
  const generateBubbleSortSteps = (arr: number[]) => {
    let steps: { arr: number[]; highlight: number[]; compare: number[]; swap?: [number, number]; sorted: number[] }[] = [];
    let tempArray = [...arr];
    let sortedIndexes: number[] = [];

    for (let i = 0; i < tempArray.length - 1; i++) {
      for (let j = 0; j < tempArray.length - i - 1; j++) {
        steps.push({ arr: [...tempArray], highlight: [j, j + 1], compare: [j, j + 1], sorted: [...sortedIndexes] });

        if (tempArray[j] > tempArray[j + 1]) {
          [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
          steps.push({ arr: [...tempArray], highlight: [], compare: [], swap: [j, j + 1], sorted: [...sortedIndexes] });
        }
      }
      sortedIndexes.push(tempArray.length - 1 - i);
    }

    return steps;
  };

  const startSorting = () => {
    const steps = generateBubbleSortSteps(array);
    setSortingSteps(steps);
    setCurrentStep(0);
    applyStep(0);
  };

  const applyStep = (stepIndex: number) => {
    if (stepIndex < sortingSteps.length) {
      setCurrentStep(stepIndex);
      setArray(sortingSteps[stepIndex].arr);
      setHighlighted(sortingSteps[stepIndex].highlight);
      setCompare(sortingSteps[stepIndex].compare);
      setSwapping(sortingSteps[stepIndex].swap || null);
      setSorted(sortingSteps[stepIndex].sorted);
    }
  };

  const nextStep = () => {
    if (currentStep < sortingSteps.length - 1) {
      applyStep(currentStep + 1);
    }
  };

  const resetArray = () => {
    setArray([...initialArray]);
    setSortingSteps([]);
    setCurrentStep(0);
    setHighlighted([]);
    setCompare([]);
    setSwapping(null);
    setSorted([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Sorting Algorithm Visualization</h1>

      {/* Array Visualizer */}
      <ArrayVisualizer
        array={array}
        highlightedIndices={highlighted}
        compareIndices={compare}
        swappingIndices={swapping || [-1, -1]}
        sortedIndices={sorted}
        showValues={true}
        showIndices={true}
        label="Bubble Sort Visualization"
      />

      {/* Buttons for Interaction */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={startSorting}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
        >
          Start Sorting
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition duration-300"
        >
          Next Step
        </button>
        <button
          onClick={resetArray}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SortingPage;
