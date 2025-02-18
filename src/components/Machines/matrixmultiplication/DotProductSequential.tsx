import React, { useState } from "react";

const DotProductSequential = () => {
  const array1 = [8, 4, 3, 7];
  const array2 = [4, 5, 2, 6];

  const [index, setIndex] = useState(0);
  const [output, setOutput] = useState(0);
  const [products, setProducts] = useState(Array(array1.length).fill(0));

  const handleNext = () => {
    if (index < array1.length) {
      const product = array1[index] * array2[index];
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        newProducts[index] = product;
        return newProducts;
      });
      setOutput((prevOutput) => prevOutput + product);
      setIndex(index + 1);
    }
  };

  const handleReset = () => {
    setIndex(0);
    setOutput(0);
    setProducts(Array(array1.length).fill(0));
  };

  return (
    <div className="machine p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Dot Product Sequentially</h2>
      
      <p className="mt-3">ans = {array1.reduce((sum, num, i) => sum + num * array2[i], 0)}</p>
      <div className="flex justify-center space-x-4 mb-4">
        {array1.map((num, i) => (
          <button
            key={i}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
              index === i ? 'bg-blue-400 text-white' : 'bg-gray-800 text-white'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        {array2.map((num, i) => (
          <button
            key={i}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
              index === i ? 'bg-blue-400 text-white' : 'bg-gray-800 text-white'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        {products.map((num, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-gray-800 text-white"
          >
            {num}
          </div>
        ))}
      </div>
      <p className="text-xl pt-4 pl-70 pb-2">output = {output}</p>
      
      <div className="flex justify-center space-x-4">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={handleNext}
          disabled={index >= array1.length}
        >
          Next
        </button>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DotProductSequential;