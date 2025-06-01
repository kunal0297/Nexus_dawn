import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useQuantumStore, QuantumSnapshot } from '../stores/quantumStore';
import { motion } from 'framer-motion';

interface TreeNode {
  id: string;
  name: string;
  children: TreeNode[];
  data: QuantumSnapshot;
}

const QuantumSaveManager: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedSnapshot, setSelectedSnapshot] = useState<QuantumSnapshot | null>(null);
  const [newBranchName, setNewBranchName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const { snapshots, currentSnapshotId, addSnapshot, forkFromSnapshot, deleteSnapshot, setCurrentSnapshot } = useQuantumStore();

  useEffect(() => {
    if (!svgRef.current || snapshots.length === 0) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove();

    // Convert snapshots to tree structure
    const treeData = buildTreeData(snapshots);

    // Set up D3 tree layout
    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 90, bottom: 30, left: 90 };

    const tree = d3.tree<TreeNode>()
      .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

    const root = d3.hierarchy(treeData);
    const treeLayout = tree(root);

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add links
    svg.selectAll('.link')
      .data(treeLayout.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal<any, any>()
        .x(d => d.y)
        .y(d => d.x))
      .attr('fill', 'none')
      .attr('stroke', '#888')
      .attr('stroke-width', 2);

    // Add nodes
    const node = svg.selectAll('.node')
      .data(treeLayout.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    // Add node circles
    node.append('circle')
      .attr('r', 10)
      .attr('fill', d => d.data.id === currentSnapshotId ? '#4CAF50' : '#2196F3')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedSnapshot(d.data.data);
        setCurrentSnapshot(d.data.id);
      });

    // Add node labels
    node.append('text')
      .attr('dy', '.31em')
      .attr('x', d => d.children ? -13 : 13)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name)
      .style('fill', '#fff')
      .style('font-size', '12px');

  }, [snapshots, currentSnapshotId]);

  const buildTreeData = (snapshots: QuantumSnapshot[]): TreeNode => {
    const snapshotMap = new Map<string, TreeNode>();
    
    // Create nodes for all snapshots
    snapshots.forEach(snapshot => {
      snapshotMap.set(snapshot.id, {
        id: snapshot.id,
        name: snapshot.metadata.branchName || 'main',
        children: [],
        data: snapshot
      });
    });

    // Build tree structure
    let root: TreeNode | undefined;
    snapshots.forEach(snapshot => {
      const node = snapshotMap.get(snapshot.id)!;
      if (snapshot.parentId === null) {
        root = node;
      } else {
        const parent = snapshotMap.get(snapshot.parentId);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    return root || snapshotMap.values().next().value;
  };

  const handleCreateSnapshot = () => {
    if (!selectedSnapshot) return;

    addSnapshot({
      parentId: selectedSnapshot.id,
      state: selectedSnapshot.state,
      metadata: {
        description: newDescription,
        tags: [],
        branchName: newBranchName
      }
    });

    setNewBranchName('');
    setNewDescription('');
  };

  const handleForkSnapshot = () => {
    if (!selectedSnapshot) return;

    forkFromSnapshot(selectedSnapshot.id, {
      ...selectedSnapshot.state,
      currentView: 'oracle'
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Quantum Timeline Manager</h2>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <svg ref={svgRef} className="w-full h-[600px] bg-gray-900 rounded-lg"></svg>
        </div>

        <div className="space-y-6">
          {selectedSnapshot ? (
            <>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Selected Timeline</h3>
                <p className="text-sm text-gray-300">Branch: {selectedSnapshot.metadata.branchName}</p>
                <p className="text-sm text-gray-300">Created: {new Date(selectedSnapshot.timestamp).toLocaleString()}</p>
                <p className="text-sm text-gray-300 mt-2">{selectedSnapshot.metadata.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    New Branch Name
                  </label>
                  <input
                    type="text"
                    value={newBranchName}
                    onChange={(e) => setNewBranchName(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter branch name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateSnapshot}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Create Snapshot
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleForkSnapshot}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Fork Timeline
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteSnapshot(selectedSnapshot.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-300">Select a timeline node to view details and manage snapshots.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuantumSaveManager; 