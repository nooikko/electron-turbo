import React, { createContext } from 'react';
import { useNodesState } from 'reactflow';

interface NodeContextProps {
  nodes: ReturnType<typeof useNodesState<any>>[0];
  setNodes: ReturnType<typeof useNodesState<any>>[1];
  onNodesChange: ReturnType<typeof useNodesState<any>>[2];
}

const initialNodes = [
  { id: '1', type: 'image', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

export const NodeContext = createContext<NodeContextProps>({
  nodes: [],
  setNodes: () => {},
  onNodesChange: () => {},
});

interface NodeContextProviderProps {
  children?: React.ReactNode;
}

export const NodeContextProvider: React.FC<NodeContextProviderProps> = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);

  return (
    <NodeContext.Provider
      value={{
        nodes,
        setNodes,
        onNodesChange,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
