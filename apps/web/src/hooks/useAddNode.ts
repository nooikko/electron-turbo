import { NodeContext } from '#components/NodeContext';
import { NodeKeys } from '#components/Nodes';
import { CommandPaletteContext } from '#ui/CommandPalette';
import { useCallback, useContext, useRef, useEffect } from 'react';
import { Node, XYPosition } from 'reactflow';
import { v4 as uuid } from 'uuid';

export const useAddNode = () => {
  const { setNodes } = useContext(NodeContext);
  const { mousePos } = useContext(CommandPaletteContext);
  const mousePosRef = useRef(mousePos);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  const addNode = useCallback(
    (type: NodeKeys, position: XYPosition) => {
      const node: Node = {
        id: uuid(),
        type,
        position,
        data: {},
      };

      setNodes((nodes) => [node, ...nodes]);

      return node;
    },
    [setNodes],
  );

  return addNode;
};
