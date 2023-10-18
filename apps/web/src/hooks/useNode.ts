import { useMemo } from 'react';
import { useNodes } from 'reactflow';

export const useNode = (id: string) => {
  const nodes = useNodes();
  const node = useMemo(() => nodes.find((node) => node.id === id), [id, nodes]);

  return node;
};
