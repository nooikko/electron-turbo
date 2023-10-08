import React, { PropsWithChildren, createContext, useRef } from 'react';
import { ReactFlowInstance } from 'reactflow';

interface FlowContextProps {
  container: React.MutableRefObject<HTMLDivElement | null>;
  instance: React.MutableRefObject<ReactFlowInstance | null>;
}

export const FlowContext = createContext<FlowContextProps>({
  container: { current: null },
  instance: { current: null },
});

export const FlowProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const container = useRef<HTMLDivElement>(null);
  const instance = useRef<ReactFlowInstance | null>(null);

  return (
    <FlowContext.Provider
      value={{
        container,
        instance,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
