import { FlowContext } from '#components/FlowContext';
import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';
import { XYPosition } from 'reactflow';

type CommandPaletteContextType = {
  isOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  openPaletteWithClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
  mousePos: XYPosition;
};

export const CommandPaletteContext = createContext<CommandPaletteContextType>({
  isOpen: false,
  openPalette: () => {},
  closePalette: () => {},
  openPaletteWithClick: () => {},
  mousePos: { x: 0, y: 0 },
});

type CommandPaletteProviderProps = {
  children: React.ReactNode;
};

export const CommandPaletteProvider = ({ children }: CommandPaletteProviderProps) => {
  const { container, instance } = useContext(FlowContext);
  const [isOpen, setOpen] = useState(false);
  const [mousePos, setMousePos] = useState<XYPosition>({ x: 0, y: 0 });

  const openPalette = useCallback(() => {
    if (container.current && instance?.current) {
      const bounding = container.current.getBoundingClientRect();
      const { x, y } = instance?.current.project({ x: bounding.width / 2, y: bounding.height / 2 });
      setMousePos({ x, y });
      setOpen(true);
    }
  }, [container?.current, instance?.current]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      openPalette();
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const openPaletteWithClick = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
      if (container.current && instance?.current) {
        const bounding = container.current.getBoundingClientRect();
        const { x, y } = instance?.current.project({ x: event.clientX - bounding.left, y: event.clientY - bounding.top });
        setMousePos({ x, y });
        setOpen(true);
      }
    },
    [container, instance?.current],
  );
  const closePalette = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, openPalette, closePalette, openPaletteWithClick, mousePos }}>
      {children}
    </CommandPaletteContext.Provider>
  );
};
