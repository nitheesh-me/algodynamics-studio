"use client"

import { createMachine, assign, createActor } from 'xstate';
import type React from 'react';
import { useMachine } from '@xstate/react';

const numbers = [1, 2, 3, 4, 5];
const target = 4;

const randomSelectionMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QCcCGA7CB7AtgZTABswBjAFwEst0A6WMVZEgCwvSgGI8BRAGW4DCAFQDaABgC6iUAAcssCpWrSQAD0QBWAEw0xANgDsB-XoAsGowGYAHAE4ANCACeiAIyXbNPd+-mNty2NLAF9Qx3QsCDgVNExcAmJyKnQVOQUlFKQ1RABaHS09DT0tSxLbYzEtay0NRxcEHL0wkFjsfCJSDLoGJlZ2VPlFZJV1BFMDOsQtUzEaLVtXQxmDUy0C62tm1viOpOoaADMsAFdMAfThrNHxryKCqrF9FdLJhHnrGgMFwo1zWy0xBprE1go5tu1El0ImQAGInM5ZNJDZRXRDmT6WUyBQx6Sq2cpaV7WVw0RY+eaBCwbEKhYJAA */
    id: "randomSelection",
    initial: "searching",
    context: {
        visited: [] as number[],
    },
    states: {
        searching: {
          on: {
            SELECT: {
                actions: [
                    assign({
                        visited: ({ context, event }) => context.visited.includes(event.index) ? context.visited : [...context.visited, event.index],
                    }),
                ],
                target: [
                    {
                        guard: ({ event }) => numbers[event.index] == target,
                        target: 'found'
                    }
                ]
            }
          }
        },
        found: {},
        notFound: {}
    }
})

const RandomSelectionComponent: React.FC = () => {
    const [state, send] = useMachine(randomSelectionMachine);

    return (
        <div className={`machine p-4 rounded-lg shadow transition-colors duration-500`}>
          <h2 className="text-xl font-bold mb-4">Random Selection Machine</h2>
          <div className="flex justify-center space-x-4 mb-4">
            {numbers.map((num, index) => (
              <button
                key={index}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                  state.context.visited.includes(index) ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-200"
                }`}
                onClick={() => send({ type: 'SELECT', index: index })}
              >
                {num}
              </button>
            ))}
          </div>
          <div>
            Target: {target}
          </div>
        </div>
      )
}

export default RandomSelectionComponent;