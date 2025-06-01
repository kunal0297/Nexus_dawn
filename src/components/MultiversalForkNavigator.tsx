import React, { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import * as THREE from 'three';

interface TimelineNode {
  id: string;
  position: [number, number, number];
  content: string;
  timestamp: Date;
  connections: string[];
  isActive: boolean;
}

interface ForkNavigatorProps {
  initialNodes?: TimelineNode[];
  onNodeSelect?: (node: TimelineNode) => void;
}

const TimelineNode: React.FC<{
  node: TimelineNode;
  onClick: () => void;
  isSelected: boolean;
}> = ({ node, onClick, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isCosmicMode } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={node.position}>
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={isSelected ? '#8B5CF6' : isCosmicMode ? '#4C1D95' : '#3B82F6'}
          emissive={isSelected ? '#8B5CF6' : '#000000'}
          emissiveIntensity={isSelected ? 0.5 : 0}
        />
      </mesh>
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.3}
        color={isCosmicMode ? '#E9D5FF' : '#1F2937'}
        anchorX="center"
        anchorY="middle"
      >
        {node.content}
      </Text>
    </group>
  );
};

const TimelineConnection: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  isActive: boolean;
}> = ({ start, end, isActive }) => {
  const { isCosmicMode } = useTheme();
  
  return (
    <Line
      points={[start, end]}
      color={isActive ? (isCosmicMode ? '#8B5CF6' : '#3B82F6') : '#9CA3AF'}
      lineWidth={isActive ? 2 : 1}
      dashed={!isActive}
    />
  );
};

const Scene: React.FC<{
  nodes: TimelineNode[];
  selectedNode: TimelineNode | null;
  onNodeSelect: (node: TimelineNode) => void;
}> = ({ nodes, selectedNode, onNodeSelect }) => {
  const { camera } = useThree();
  const { isCosmicMode } = useTheme();

  useFrame(() => {
    if (selectedNode) {
      camera.lookAt(
        selectedNode.position[0],
        selectedNode.position[1],
        selectedNode.position[2]
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableDamping dampingFactor={0.05} />
      
      {nodes.map((node) => (
        <TimelineNode
          key={node.id}
          node={node}
          onClick={() => onNodeSelect(node)}
          isSelected={selectedNode?.id === node.id}
        />
      ))}

      {nodes.map((node) =>
        node.connections.map((targetId) => {
          const targetNode = nodes.find((n) => n.id === targetId);
          if (!targetNode) return null;

          return (
            <TimelineConnection
              key={`${node.id}-${targetId}`}
              start={node.position}
              end={targetNode.position}
              isActive={node.isActive || targetNode.isActive}
            />
          );
        })
      )}
    </>
  );
};

export const MultiversalForkNavigator: React.FC<ForkNavigatorProps> = ({
  initialNodes = [],
  onNodeSelect,
}) => {
  const { isCosmicMode } = useTheme();
  const [nodes, setNodes] = useState<TimelineNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null);

  const handleNodeSelect = useCallback((node: TimelineNode) => {
    setSelectedNode(node);
    onNodeSelect?.(node);
  }, [onNodeSelect]);

  const handleAddNode = useCallback(() => {
    const newId = `node-${Date.now()}`;
    const newPosition: [number, number, number] = [
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
    ];

    const newNode: TimelineNode = {
      id: newId,
      position: newPosition,
      content: `Timeline ${nodes.length + 1}`,
      timestamp: new Date(),
      connections: selectedNode ? [selectedNode.id] : [],
      isActive: true,
    };

    setNodes((prev) => [...prev, newNode]);
  }, [nodes, selectedNode]);

  const handleCollapseTimeline = useCallback(() => {
    if (!selectedNode) return;

    setNodes((prev) =>
      prev.map((node) =>
        node.id === selectedNode.id
          ? { ...node, isActive: false }
          : node
      )
    );
  }, [selectedNode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`h-[600px] rounded-xl overflow-hidden ${
        isCosmicMode
          ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50'
          : 'bg-white dark:bg-gray-800'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Multiversal Fork Navigator
        </h2>
        <div className="space-x-2">
          <button
            onClick={handleAddNode}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add Timeline
          </button>
          <button
            onClick={handleCollapseTimeline}
            disabled={!selectedNode}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Collapse Timeline
          </button>
        </div>
      </div>

      <div className="h-[calc(100%-4rem)]">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Scene
            nodes={nodes}
            selectedNode={selectedNode}
            onNodeSelect={handleNodeSelect}
          />
        </Canvas>
      </div>
    </motion.div>
  );
}; 