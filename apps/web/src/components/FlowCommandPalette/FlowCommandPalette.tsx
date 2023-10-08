import { NodeTypes } from '#components/Nodes';
import { useAddNode } from '#hooks';
import { CommandPalette, PaletteItem } from '#ui/CommandPalette';
import React, { useMemo } from 'react';

export const FlowCommandPalette: React.FC = () => {
  const addNode = useAddNode();

  const items: PaletteItem[] = useMemo(() => {
    return NodeTypes.map((node) => {
      return {
        id: node.id,
        name: node.name,
        category: 'Nodes',
        onItemClick: () => {
          addNode(node?.key);
        },
      };
    });
  }, []);

  return <CommandPalette items={items} />;
};
