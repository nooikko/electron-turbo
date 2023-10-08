import React, { createContext } from 'react';
import { useNodesState } from 'reactflow';

interface NodeContextProps {
  nodes: ReturnType<typeof useNodesState<any>>[0];
  setNodes: ReturnType<typeof useNodesState<any>>[1];
  onNodesChange: ReturnType<typeof useNodesState<any>>[2];
}

export const NodeContext = createContext<NodeContextProps>({
  nodes: [],
  setNodes: () => {},
  onNodesChange: () => {},
});

interface NodeContextProviderProps {
  children?: React.ReactNode;
}

export const NodeProvider: React.FC<NodeContextProviderProps> = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);

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
