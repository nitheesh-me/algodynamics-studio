"use client"

// TODO: modify to use xstate

import "@/components/Machines/machines.css"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/Machines/ui/button"

const SwapMachine: React.FC = () => {
  const [numbers, setNumbers] = useState([4, 3, 2, 1])
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
  const [isSorted, setIsSorted] = useState(false)

  const handleElementClick = (index: number) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index))
    } else if (selectedIndices.length < 2) {
      setSelectedIndices([...selectedIndices, index])
    }
  }

  const swapElements = () => {
    if (selectedIndices.length === 2) {
      const newNumbers = [...numbers]
      const [index1, index2] = selectedIndices
      ;[newNumbers[index1], newNumbers[index2]] = [newNumbers[index2], newNumbers[index1]]
      setNumbers(newNumbers)
      setSelectedIndices([])
      checkIfSorted(newNumbers)
    }
  }

  const checkIfSorted = (arr: number[]) => {
    setIsSorted(arr.every((v, i, a) => !i || a[i - 1] <= v))
  }

  useEffect(() => {
    checkIfSorted(numbers)
  }, [numbers]) // Added numbers to the dependency array

  return (
    <div className={`machine p-4 rounded-lg shadow transition-colors duration-500 ${isSorted ? "bg-green-400": "bg-primary-100"}`}>
      <h2 className="text-xl font-bold mb-4">Swap Machine</h2>
      <div className="flex justify-center space-x-4 mb-4">
        {numbers.map((num, index) => (
          <button
            key={index}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
              selectedIndices.includes(index) ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleElementClick(index)}
          >
            {num}
          </button>
        ))}
      </div>
      <Button onClick={swapElements} disabled={selectedIndices.length !== 2} className="btn btn-secondary w-full">
        Swap
      </Button>
    </div>
  )
}

export default SwapMachine