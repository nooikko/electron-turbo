import React, { PropsWithChildren, useContext, createContext, useCallback, useState, useMemo } from 'react';
import { FlowContext } from '#components/FlowContext';
import { NodeMouseHandler, XYPosition, Node } from 'reactflow'; // Import the necessary type
import { useNode } from '#hooks';

interface NodeContextMenuContextType {
  isContextMenuOpen: boolean;
  contextMenuPosition: XYPosition;
  openContextMenu: NodeMouseHandler;
  closeContextMenu: () => void;
  node?: Node<unknown>;
}

export const NodeContextMenuContext = createContext<NodeContextMenuContextType>({
  isContextMenuOpen: false,
  contextMenuPosition: { x: 0, y: 0 },
  openContextMenu: () => {},
  closeContextMenu: () => {},
  node: {} as Node<unknown>,
});

export const NodeContextMenuProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { container, instance } = useContext(FlowContext);
  const [nodeId, setNodeId] = useState('');
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const node = useNode(nodeId);

  const openContextMenu = useCallback<NodeMouseHandler>(
    (event, node) => {
      event.preventDefault();
      if (container.current && instance?.current) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const contextMenuWidth = 224; // Adjust this value to your context menu width
        const contextMenuHeight = 150; // Adjust this value to your context menu height
        const padding = 15; // Padding value

        let x = mouseX;
        let y = mouseY;

        // Check for overflow on the right edge with padding
        if (x + contextMenuWidth + padding > window.innerWidth) {
          x = window.innerWidth - contextMenuWidth - padding;
        }

        // Check for overflow on the left edge with padding
        if (x - padding < 0) {
          x = padding;
        }

        // Check for overflow on the bottom edge with padding
        if (y + contextMenuHeight + padding > window.innerHeight) {
          y = window.innerHeight - contextMenuHeight - padding;
        }

        setNodeId(node.id);
        setContextMenuPosition({ x, y });
        setIsContextMenuOpen(true);
      }
    },
    [container, instance?.current],
  );

  const closeContextMenu = () => {
    setNodeId('');
    setIsContextMenuOpen(false);
  };

  const contextValue = useMemo(
    () => ({
      isContextMenuOpen,
      contextMenuPosition,
      openContextMenu,
      closeContextMenu,
      node,
    }),
    [isContextMenuOpen, contextMenuPosition, openContextMenu, closeContextMenu, nodeId, node],
  );

  return <NodeContextMenuContext.Provider value={contextValue}>{children}</NodeContextMenuContext.Provider>;
};
