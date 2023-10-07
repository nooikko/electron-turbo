import React, { useCallback, useContext, useMemo } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useEdgesState, addEdge, BackgroundVariant, OnConnect, ReactFlowProvider } from 'reactflow';
import { NodeTypes } from '../Nodes';
import { NodeContext } from '#components/NodeContext';
import 'reactflow/dist/style.css';
import { ViewportLogger } from '../ViewportLogger';

interface FlowProps {}
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export const Flow: React.FC<FlowProps> = ({}) => {
  const nodeTypes = useMemo(() => NodeTypes, []);
  const { nodes, onNodesChange } = useContext(NodeContext);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback<OnConnect>((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  return (
    <div className='h-screen w-screen'>
      <ReactFlowProvider>
        <ReactFlow
          nodeTypes={nodeTypes}
          defaultViewport={{
            x: 0,
            y: 0,
            zoom: 1.5,
          }}
          maxZoom={3}
          minZoom={0.2}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={{
            maxZoom: 1.5,
          }}
          proOptions={{
            hideAttribution: process.env.NODE_ENV === 'development',
          }}
        >
          <Controls className='bg-base-100' />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1.2} />
          <ViewportLogger />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};
