import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNarrative } from '../contexts/NarrativeContext';
import { TimelineNode } from '../types/narrative';

const NODE_WIDTH = 200;
const NODE_HEIGHT = 100;
const LEVEL_HEIGHT = 150;

const NarrativeTimeline: React.FC = () => {
  const { state } = useNarrative();
  const containerRef = useRef<HTMLDivElement>(null);

  const buildTimelineTree = (): TimelineNode[] => {
    if (!state) return [];

    const nodes: Record<string, TimelineNode> = {};
    const rootNodes: TimelineNode[] = [];

    // Create nodes
    state.forks.forEach(fork => {
      nodes[fork.id] = {
        id: fork.id,
        parentId: fork.parentId,
        description: fork.description,
        timestamp: fork.timestamp,
        x: 0,
        y: 0,
        children: []
      };
    });

    // Build tree structure
    Object.values(nodes).forEach(node => {
      if (node.parentId === null) {
        rootNodes.push(node);
      } else {
        const parent = nodes[node.parentId];
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    // Calculate positions
    const calculatePositions = (
      node: TimelineNode,
      level: number,
      index: number,
      totalSiblings: number
    ) => {
      node.y = level * LEVEL_HEIGHT;
      node.x = (index - (totalSiblings - 1) / 2) * NODE_WIDTH;

      node.children.forEach((child, i) => {
        calculatePositions(child, level + 1, i, node.children.length);
      });
    };

    rootNodes.forEach((node, i) => {
      calculatePositions(node, 0, i, rootNodes.length);
    });

    return rootNodes;
  };

  const renderNode = (node: TimelineNode) => {
    return (
      <motion.div
        key={node.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute"
        style={{
          left: node.x,
          top: node.y,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        }}
      >
        <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-purple-500">
          <p className="text-sm text-gray-700 line-clamp-3">
            {node.description}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            {new Date(node.timestamp).toLocaleString()}
          </div>
        </div>

        {node.children.map(child => (
          <React.Fragment key={child.id}>
            <svg
              className="absolute"
              style={{
                left: NODE_WIDTH / 2,
                top: NODE_HEIGHT,
                width: child.x - node.x,
                height: LEVEL_HEIGHT - NODE_HEIGHT
              }}
            >
              <line
                x1="0"
                y1="0"
                x2={child.x - node.x}
                y2={LEVEL_HEIGHT - NODE_HEIGHT}
                stroke="#8B5CF6"
                strokeWidth="2"
              />
            </svg>
            {renderNode(child)}
          </React.Fragment>
        ))}
      </motion.div>
    );
  };

  const timelineTree = buildTimelineTree();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-auto p-8"
      style={{ minHeight: '500px' }}
    >
      <div className="relative" style={{ minWidth: '100%', minHeight: '100%' }}>
        {timelineTree.map(node => renderNode(node))}
      </div>
    </div>
  );
};

export default NarrativeTimeline; 