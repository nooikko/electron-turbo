import { EdgeContext } from '#components/EdgeContext';
import { FlowContext } from '#components/FlowContext';
import { NodeContext } from '#components/NodeContext';
import { useFlowStructure, useValidateConnection } from '#hooks';
import { CommandPaletteContext } from '#ui/CommandPalette';
import React, { useCallback, useContext, useMemo } from 'react';
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap, OnConnect, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { NodeTypeDict } from '../Nodes';
import { ViewportLogger } from '../ViewportLogger';
import { NodeContextMenuContext } from '#components/NodeContextMenuContext';
import { ContextMenu } from '#components/ContextMenu';

interface FlowProps {}

export const Flow: React.FC<FlowProps> = () => {
  const nodeTypes = useMemo(() => NodeTypeDict, []);
  const { nodes, onNodesChange } = useContext(NodeContext);
  const { container, instance } = useContext(FlowContext);
  const { edges, setEdges, onEdgesChange } = useContext(EdgeContext);
  const { openPaletteWithClick } = useContext(CommandPaletteContext);
  const { openContextMenu, closeContextMenu } = useContext(NodeContextMenuContext);
  const validateConnection = useValidateConnection();
  const getFlowStructure = useFlowStructure();

  const onConnect = useCallback<OnConnect>((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  return (
    <div className='h-screen w-screen' ref={container}>
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
        connectOnClick={false}
        onConnect={onConnect}
        onInit={(inst) => {
          instance.current = inst;
        }}
        isValidConnection={validateConnection}
        onPaneClick={closeContextMenu}
        onPaneContextMenu={openPaletteWithClick}
        onNodeContextMenu={openContextMenu}
        onNodeClick={closeContextMenu}
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
        <ContextMenu />
      </ReactFlow>
      <button className='absolute right-5 top-5 rounded-md bg-primary p-2 text-white shadow-md' onClick={() => getFlowStructure()}>
        Get Structure
      </button>
    </div>
  );
};
