import { IOKey } from 'taxonomy/io';
import React, { createContext, useState, PropsWithChildren } from 'react';
import { MarkerKey } from '#taxonomy';
import { Position, HandleType } from 'reactflow';

export interface HandleData {
  io: IOKey;
  nodeId: string;
  marker: MarkerKey;
  position: Position;
  type: HandleType;
}
export interface HandleContextType {
  handles: Record<string, HandleData>;
  setHandles: React.Dispatch<React.SetStateAction<Record<string, HandleData>>>;
}

export const HandleContext = createContext<HandleContextType>({
  handles: {},
  setHandles: () => {},
});

export const HandleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [handles, setHandles] = useState<Record<string, HandleData>>({});

  return <HandleContext.Provider value={{ handles, setHandles }}>{children}</HandleContext.Provider>;
};
