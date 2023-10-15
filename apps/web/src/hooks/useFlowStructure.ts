import { useContext, useCallback } from 'react';
import { FlowContext } from '#components/FlowContext';
import { Graph } from '#processors';
import { HandleContext } from '#components/HandleContext';

export const useFlowStructure = () => {
  const { instance } = useContext(FlowContext);
  const { handles } = useContext(HandleContext);

  const getFlowStructure = useCallback(() => {
    if (!instance) {
      throw new Error('Flow instance not found');
    }

    const structure = instance?.current?.toObject();

    if (!structure) {
      throw new Error('Flow structure not found');
    }

    const graph = new Graph(structure?.nodes, structure?.edges, handles);
    console.log(graph.getStructure()); // eslint-disable-line no-console
  }, [instance, handles]);

  return getFlowStructure;
};
