import { NodeContext } from '#components/NodeContext';
import { useContext, useCallback, useMemo } from 'react';
import { useNodeId } from 'reactflow';

interface UseFlowStateArgs<T> {
  initialValue?: T;
  id?: string;
}

export const useFlowState = <T>({ initialValue, id: passedId }: UseFlowStateArgs<T>) => {
  const defaultId = useNodeId();
  const id = useMemo(() => passedId ?? defaultId, [passedId, defaultId]);
  const { nodes, setNodes } = useContext(NodeContext);

  const nodeData: T | undefined = useMemo(() => {
    const node = nodes.find((node) => node.id === id);
    if (!node) {
      console.error(`Node with id ${id} not found`); // eslint-disable-line no-console
      return initialValue;
    }
    return node.data.custom;
  }, [id, nodes, initialValue]);

  const updateGlobalState = useCallback(
    (data: T) => {
      if (data !== null && data !== undefined) {
        setNodes((ns) => {
          const updatedNodes = ns.slice(); // Create a shallow copy of the array
          const index = updatedNodes.findIndex((node) => node.id === id);
          if (index !== -1) {
            updatedNodes[index] = {
              ...updatedNodes[index],
              data: {
                ...updatedNodes[index].data,
                custom: {
                  ...updatedNodes[index].data.custom, // Spread existing custom object properties
                  ...data, // Spread new data properties
                },
              },
            };
          } else {
            console.error(`Node with id ${id} not found`); // eslint-disable-line no-console
          }
          return updatedNodes;
        });
      }
    },
    [id, setNodes],
  );

  return [nodeData, updateGlobalState] as const;
};
