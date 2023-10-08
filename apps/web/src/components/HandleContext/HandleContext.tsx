import { IOKey } from '#taxonomy';
import React, { createContext, useState, PropsWithChildren } from 'react';
interface HandleData {
  io: IOKey;
}
interface HandleContextType {
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
