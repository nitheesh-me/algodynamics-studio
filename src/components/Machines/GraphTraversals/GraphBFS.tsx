// import React, { useState } from "react";
// // import GraphVisualizer from "./GraphVisualizer";
// import GraphVisualizer from "~/components/libraries/GraphVisualizer";

// const GraphBFS: React.FC = () => {
//   const initialNodes = [
//     { id: 1, value: 1 },
//     { id: 2, value: 2 },
//     { id: 3, value: 3 },
//     { id: 4, value: 4 },
//     { id: 5, value: 5 },
//   ];

//   const initialEdges = [
//     { source: 1, target: 2 },
//     { source: 1, target: 3 },
//     { source: 2, target: 4 },
//     { source: 3, target: 5 },
//     { source: 4, target: 5 },
//   ];

//   const [visitedNodes, setVisitedNodes] = useState<(string | number)[]>([]);
//   const [currentNode, setCurrentNode] = useState<string | number | null>(null);

//   const bfs = (startNode: number) => {
//     const queue: number[] = [startNode];
//     const visited: Set<number> = new Set();

//     const traverse = () => {
//       if (queue.length === 0) return;

//       const node = queue.shift()!;
//       if (!visited.has(node)) {
//         visited.add(node);
//         setCurrentNode(node);
//         setVisitedNodes(Array.from(visited));

//         // Enqueue neighbors
//         const neighbors = initialEdges
//           .filter((edge) => edge.source === node || edge.target === node)
//           .map((edge) => (edge.source === node ? edge.target : edge.source))
//           .filter((neighbor) => !visited.has(neighbor));

//         setTimeout(() => {
//           queue.push(...neighbors);
//           traverse();
//         }, 700); // Animation delay
//       } else {
//         traverse();
//       }
//     };

//     traverse();
//   };

//   return (
//     <div className="flex flex-col items-center text-white p-4">
//       <h2 className="text-xl font-semibold mb-4">Graph BFS Traversal</h2>
//       <GraphVisualizer
//         nodes={initialNodes}
//         edges={initialEdges}
//         highlightedNodes={visitedNodes}
//         currentNode={currentNode}
//         layout="circular"
//         colorScheme={{
//           default: "bg-blue-700",
//           highlight: "bg-yellow-500",
//           compare: "bg-purple-500",
//           path: "bg-green-500",
//           current: "bg-orange-500",
//           blocked: "bg-gray-700",
//           edge: "white",
//         }}
//         label="BFS Visualization"
//       />
//       <button
//         onClick={() => bfs(1)}
//         className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition"
//       >
//         Start BFS
//       </button>
//     </div>
//   );
// };

// export default GraphBFS;


import React, { useState } from "react";
import GraphVisualizer from "~/components/libraries/GraphVisualizer";

// Define types for nodes and edges
interface Node {
  id: number | string;
  value: number | string;
}

interface Edge {
  source: number | string;
  target: number | string;
}

interface GraphBFSProps {
  nodes: Node[];
  edges: Edge[];
}

const GraphBFS: React.FC<GraphBFSProps> = ({ 
  nodes: initialNodes, 
  edges: initialEdges 
}) => {
  const [visitedNodes, setVisitedNodes] = useState<(string | number)[]>([]);
  const [currentNode, setCurrentNode] = useState<string | number | null>(null);

  const bfs = (startNode: number | string) => {
    const queue: (number | string)[] = [startNode];
    const visited: Set<number | string> = new Set();

    const traverse = () => {
      if (queue.length === 0) return;

      const node = queue.shift()!;
      if (!visited.has(node)) {
        visited.add(node);
        setCurrentNode(node);
        setVisitedNodes(Array.from(visited));

        // Enqueue neighbors
        const neighbors = initialEdges
          .filter((edge) => edge.source === node || edge.target === node)
          .map((edge) => (edge.source === node ? edge.target : edge.source))
          .filter((neighbor) => !visited.has(neighbor));

        setTimeout(() => {
          queue.push(...neighbors);
          traverse();
        }, 700); // Animation delay
      } else {
        traverse();
      }
    };

    traverse();
  };

  return (
    <div className="flex flex-col items-center text-white p-4">
      <h2 className="text-xl font-semibold mb-4">Graph BFS Traversal</h2>
      <GraphVisualizer
        nodes={initialNodes}
        edges={initialEdges}
        highlightedNodes={visitedNodes}
        currentNode={currentNode}
        layout="circular"
        colorScheme={{
          default: "bg-blue-700",
          highlight: "bg-yellow-500",
          compare: "bg-purple-500",
          path: "bg-green-500",
          current: "bg-orange-500",
          blocked: "bg-gray-700",
          edge: "white",
        }}
        label="BFS Visualization"
      />
      <button
        onClick={() => bfs(initialNodes[0].id)}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition"
      >
        Start BFS
      </button>
    </div>
  );
};

export default GraphBFS;