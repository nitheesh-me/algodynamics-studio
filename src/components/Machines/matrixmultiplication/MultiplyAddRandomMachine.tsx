import React, { useState } from 'react';
import { Button } from '@/components/Machines/ui/button';

const MultiplyAddRandomMachine = () => {
  const [array1] = useState([2, 4, 6, 8]);
  const [array2] = useState([1, 3, 5, 7]);
  const [selectedIndex1, setSelectedIndex1] = useState<number | null>(null);
  const [selectedIndex2, setSelectedIndex2] = useState<number | null>(null);
  const [result, setResult] = useState<{ value: number; operation: string } | null>(null);

  const handleClick = (index: number, arrayNum: 1 | 2) => {
    if (arrayNum === 1) {
      setSelectedIndex1(selectedIndex1 === index ? null : index);
    } else {
      setSelectedIndex2(selectedIndex2 === index ? null : index);
    }
  };

  const performOperation = (operation: 'multiply' | 'add') => {
    if (selectedIndex1 !== null && selectedIndex2 !== null) {
      const num1 = array1[selectedIndex1];
      const num2 = array2[selectedIndex2];
      const value = operation === 'multiply' ? num1 * num2 : num1 + num2;
      setResult({ value, operation });
      setSelectedIndex1(null);
      setSelectedIndex2(null);
    }
  };

  return (
    <div className="machine p-4 rounded-lg shadow ">
      <h2 className="text-xl font-bold mb-4 pl-16 ">Dual Operation Machine</h2>
      
      <div className="flex items-center p-4 mb-4 pl-32">
        <div className="w-20">Array 1:</div>
        <div className="flex space-x-4">
          {array1.map((num, index) => (
            <button
              key={`array1-${index}`}
              onClick={() => handleClick(index, 1)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                selectedIndex1 === index ? 'bg-blue-400 text-white' : 'bg-gray-800 text-white'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center mb-4 p-4 pl-32">
        <div className="w-20">Array 2:</div>
        <div className="flex space-x-4">
          {array2.map((num, index) => (
            <button
              key={`array2-${index}`}
              onClick={() => handleClick(index, 2)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                selectedIndex2 === index ? 'bg-blue-400 text-white' : 'bg-gray-800 text-white'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button 
          onClick={() => performOperation('multiply')} 
          disabled={selectedIndex1 === null || selectedIndex2 === null}
          className="flex-1"
        >
          Multiply
        </Button>
        <Button 
          onClick={() => performOperation('add')}
          disabled={selectedIndex1 === null || selectedIndex2 === null}
          className="flex-1"
        >
          Add
        </Button>
      </div>

      {result && (
        <div className="text-center mt-4 space-y-2">
          <div className="text-lg font-semibold">
            Operation: {result.operation === 'multiply' ? 'Multiplication' : 'Addition'}
          </div>
          <div className="text-xl font-bold">
            Result: {result.value}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiplyAddRandomMachine;