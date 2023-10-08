import { FlowContext } from '#components/FlowContext';
import { NodeContext } from '#components/NodeContext';
import { CommandPaletteContext } from '#ui/CommandPalette';
import React, { useCallback, useContext, useMemo } from 'react';
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap, OnConnect, ReactFlowProvider, addEdge, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { NodeTypeDict } from '../Nodes';
import { ViewportLogger } from '../ViewportLogger';

interface FlowProps {}
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export const Flow: React.FC<FlowProps> = ({}) => {
  const nodeTypes = useMemo(() => NodeTypeDict, []);
  const { nodes, onNodesChange } = useContext(NodeContext);
  const { container, instance } = useContext(FlowContext);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { openPaletteWithClick } = useContext(CommandPaletteContext);

  const onConnect = useCallback<OnConnect>((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  return (
    <div className='h-screen w-screen' ref={container}>
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
          nodeOrigin={[0.5, 0.5]}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={(inst) => {
            instance.current = inst;
          }}
          onPaneContextMenu={openPaletteWithClick}
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
