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

interface GraphDFSProps {
  nodes: Node[];
  edges: Edge[];
}

const GraphDFS: React.FC<GraphDFSProps> = ({ 
  nodes: initialNodes, 
  edges: initialEdges 
}) => {
  const [visitedNodes, setVisitedNodes] = useState<(string | number)[]>([]);
  const [currentNode, setCurrentNode] = useState<string | number | null>(null);

  const dfs = (startNode: number | string) => {
    const stack: (number | string)[] = [startNode];
    const visited: Set<number | string> = new Set();

    const traverse = () => {
      if (stack.length === 0) return;

      const node = stack.pop()!;
      if (!visited.has(node)) {
        visited.add(node);
        setCurrentNode(node);
        setVisitedNodes(Array.from(visited));

        // Find unvisited neighbors
        const neighbors = initialEdges
          .filter((edge) => edge.source === node || edge.target === node)
          .map((edge) => (edge.source === node ? edge.target : edge.source))
          .filter((neighbor) => !visited.has(neighbor))
          .reverse(); // Reverse to maintain DFS traversal order

        setTimeout(() => {
          stack.push(...neighbors);
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
      <h2 className="text-xl font-semibold mb-4">Graph DFS Traversal</h2>
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
        label="DFS Visualization"
      />
      <button
        onClick={() => dfs(initialNodes[0].id)}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition"
      >
        Start DFS
      </button>
    </div>
  );
};

export default GraphDFS;