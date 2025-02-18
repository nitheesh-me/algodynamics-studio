import React, { useState } from 'react';
import { Button } from '@/components/Machines/ui/button';

const MultiplyAddInOrderMachine = () => {
  const [array1] = useState([8, 4, 3, 7]);
  const [array2] = useState([4, 5, 2, 6]);
  const [products, setProducts] = useState(Array(array1.length).fill(null));
  const [output, setOutput] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const multiply = () => {
    if (selectedIndex !== null) {
      const num1 = array1[selectedIndex];
      const num2 = array2[selectedIndex];
      const product = num1 * num2;
      
      const newProducts = [...products];
      newProducts[selectedIndex] = product;
      setProducts(newProducts);
    }
  };

  const addToOutput = () => {
    if (selectedIndex !== null && products[selectedIndex] !== null) {
      setOutput(output + products[selectedIndex]!);
      setSelectedIndex(null);
    }
  };

  return (
    <div className="machine p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Multiply and Add In Order</h2>
      <p>Output: {output}</p>

      <div className="flex justify-center space-x-4 mb-4">
        {array1.map((num, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
              selectedIndex === index ? 'bg-blue-400 text-white' : 'bg-gray-800 text-white'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      
      <div className="flex justify-center space-x-4 mb-4">
        {array2.map((num, index) => (
          <button
            key={index}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
              selectedIndex === index ? 'bg-blue-400 text-white' : 'bg-gray-800 text-white'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      
      <div className="flex justify-center space-x-4 mb-4">
        {products.map((num, index) => (
          <div
            key={index}
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-gray-800 text-white"
          >
            {num !== null ? num : ''}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button onClick={multiply} disabled={selectedIndex === null}>Multiply</Button>
        <Button onClick={addToOutput} disabled={selectedIndex === null || products[selectedIndex] === null}>Add</Button>
      </div>
    </div>
  );
};

export default MultiplyAddInOrderMachine;
