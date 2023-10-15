import React, { createContext } from 'react';
import { useEdgesState } from 'reactflow';

interface EdgeContextProps {
  edges: ReturnType<typeof useEdgesState<any>>[0];
  setEdges: ReturnType<typeof useEdgesState<any>>[1];
  onEdgesChange: ReturnType<typeof useEdgesState<any>>[2];
}

export const EdgeContext = createContext<EdgeContextProps>({
  edges: [],
  setEdges: () => {},
  onEdgesChange: () => {},
});

interface EdgeProviderProps {
  children?: React.ReactNode;
}

export const EdgeProvider: React.FC<EdgeProviderProps> = ({ children }) => {
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);

  return (
    <EdgeContext.Provider
      value={{
        edges,
        setEdges,
        onEdgesChange,
      }}
    >
      {children}
    </EdgeContext.Provider>
  );
};
