import { useCallback, useContext } from 'react';
import { NodeContext } from '#components/NodeContext'; // Make sure this import is correct

export const useDeleteNode = () => {
  const { setNodes } = useContext(NodeContext);
  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    },
    [setNodes],
  );
  return deleteNode;
};
