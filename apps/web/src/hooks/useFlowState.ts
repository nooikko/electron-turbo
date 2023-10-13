import { NodeContext } from '#components/NodeContext';
import { useState, useContext } from 'react';
import { useNodeId } from 'reactflow';

export const useFlowState = <T>(initialValue: T) => {
  const id = useNodeId();
  const [state, setState] = useState<T>(initialValue);

  const { setNodes } = useContext(NodeContext);

  const updateLocalState = (data: T) => {
    setState(data);
  };

  const updateGlobalState = (data: T) => {
    if (data !== null && data !== undefined) {
      // Add this check
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
  };

  const updateState = (data: T) => {
    updateLocalState(data);
    if (data !== null && data !== undefined) {
      // Add this check
      updateGlobalState(data);
    }
  };

  return [state, updateState] as const;
};
