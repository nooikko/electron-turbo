import { NodeTypes } from '#components/Nodes';
import { useAddNode } from '#hooks';
import { CommandPalette, CommandPaletteContext, PaletteItem } from '#ui/CommandPalette';
import React, { useMemo, useContext } from 'react';

export const FlowCommandPalette: React.FC = () => {
  const addNode = useAddNode();
  const { mousePos } = useContext(CommandPaletteContext);
  const nodes: PaletteItem[] = useMemo(() => {
    return NodeTypes.map((node) => {
      return {
        id: node.id,
        name: node.name,
        category: 'Nodes',
        description: node.description,
        onItemClick: () => {
          addNode(node?.key, mousePos);
        },
      };
    });
  }, [mousePos]);

  return <CommandPalette items={[...nodes]} />;
};
