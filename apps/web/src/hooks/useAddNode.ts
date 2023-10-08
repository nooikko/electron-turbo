import { NodeContext } from '#components/NodeContext';
import { NodeKeys } from '#components/Nodes';
import { CommandPaletteContext } from '#ui/CommandPalette';
import { useCallback, useContext, useRef, useEffect } from 'react';
import { Node } from 'reactflow';
import { v4 as uuid } from 'uuid';

export const useAddNode = () => {
  const { setNodes } = useContext(NodeContext);
  const { mousePos } = useContext(CommandPaletteContext);
  const mousePosRef = useRef(mousePos);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  const addNode = useCallback(
    (type: NodeKeys) => {
      const node: Node = {
        id: uuid(),
        type,
        position: mousePosRef.current,
        data: {},
      };

      setNodes((nodes) => [node, ...nodes]);
    },
    [setNodes],
  );

  return addNode;
};
