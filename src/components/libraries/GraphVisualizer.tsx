
import React, { useState, useEffect } from "react";

// Types for graph nodes and edges
interface Node {
  id: string | number;
  label?: string;
  value?: number;
}

interface Edge {
  source: string | number;
  target: string | number;
  weight?: number;
}

interface GraphVisualizerProps {
  nodes: Node[];
  edges: Edge[];
  highlightedNodes?: (string | number)[];
  comparingNodes?: (string | number)[];
  pathNodes?: (string | number)[];
  currentNode?: string | number | null;
  blockedNodes?: (string | number)[];
  maxNodeValue?: number;
  showNodeValues?: boolean;
  layout?: "force" | "grid" | "circular";
  colorScheme?: {
    default: string;
    highlight: string;
    compare: string;
    path: string;
    current: string;
    blocked: string;
    edge: string;
  };
  label?: string;
  onNodeClick?: (nodeId: string | number) => void;
  allowInteraction?: boolean;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({
  nodes,
  edges,
  highlightedNodes = [],
  comparingNodes = [],
  pathNodes = [],
  currentNode = null,
  blockedNodes = [],
  maxNodeValue = null,
  showNodeValues = true,
  layout = "force",
  colorScheme = {
    default: "bg-blue-500",
    highlight: "bg-yellow-500",
    compare: "bg-purple-500", 
    path: "bg-green-500",
    current: "bg-orange-500",
    blocked: "bg-gray-700",
    edge: "border-gray-400",
  },
  label = "",
  onNodeClick = undefined,
  allowInteraction = false,
}) => {
  const [graphNodes, setGraphNodes] = useState<Node[]>(nodes);
  const [graphEdges, setGraphEdges] = useState<Edge[]>(edges);

  const actualMaxNodeValue = maxNodeValue || Math.max(...nodes.map(n => n.value || 0), 1);

  useEffect(() => {
    setGraphNodes(nodes);
    setGraphEdges(edges);
  }, [nodes, edges]);

  const getNodeColor = (nodeId: string | number) => {
    if (blockedNodes.includes(nodeId)) return colorScheme.blocked;
    if (currentNode === nodeId) return colorScheme.current;
    if (highlightedNodes.includes(nodeId)) return colorScheme.highlight;
    if (comparingNodes.includes(nodeId)) return colorScheme.compare;
    if (pathNodes.includes(nodeId)) return colorScheme.path;
    return colorScheme.default;
  };

  const handleNodeClick = (nodeId: string | number) => {
    if (onNodeClick && allowInteraction) {
      onNodeClick(nodeId);
    }
  };

  // Determine node positions based on layout
  const calculateNodePositions = () => {
    const containerWidth = 600;
    const containerHeight = 400;

    switch (layout) {
      case "grid":
        return nodes.map((_, index) => ({
          x: (index % 5) * (containerWidth / 5) + 50,
          y: Math.floor(index / 5) * (containerHeight / 5) + 50
        }));
      
      case "circular":
        return nodes.map((_, index) => {
          const angle = (2 * Math.PI * index) / nodes.length;
          return {
            x: containerWidth / 2 + Math.cos(angle) * 150,
            y: containerHeight / 2 + Math.sin(angle) * 150
          };
        });
      
      default: // "force" layout (simplified)
        return nodes.map((_, index) => ({
          x: Math.random() * containerWidth,
          y: Math.random() * containerHeight
        }));
    }
  };

  const nodePositions = calculateNodePositions();

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
      {label && <h3 className="text-lg font-medium">{label}</h3>}
      <div 
        className="relative bg-gray-900 rounded-lg shadow-lg" 
        style={{ width: '600px', height: '400px' }}
      >
        {/* Render Edges */}
        {graphEdges.map((edge, index) => {
          const sourcePos = nodePositions[nodes.findIndex(n => n.id === edge.source)];
          const targetPos = nodePositions[nodes.findIndex(n => n.id === edge.target)];

          return (
            <svg 
              key={`edge-${index}`} 
              className="absolute top-0 left-0 pointer-events-none"
              width="600" 
              height="400"
            >
              <line
                x1={sourcePos.x}
                y1={sourcePos.y}
                x2={targetPos.x}
                y2={targetPos.y}
                stroke={colorScheme.edge}
                strokeWidth="2"
              />
            </svg>
          );
        })}

        {/* Render Nodes */}
        {graphNodes.map((node, index) => {
          const pos = nodePositions[index];
          return (
            <div 
              key={node.id} 
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center 
                ${getNodeColor(node.id)} ${
                  allowInteraction && onNodeClick ? "cursor-pointer hover:opacity-80" : ""
                }`}
              style={{
                left: pos.x - 20,
                top: pos.y - 20,
              }}
              onClick={() => handleNodeClick(node.id)}
            >
              {showNodeValues && <span className="text-xs text-white">{node.value}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GraphVisualizer;