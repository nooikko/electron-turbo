import { ImageNode } from './ImageNode';
import React from 'react';

interface NodeType {
  id: string;
  key: string;
  name: string;
  component: React.FC<any>;
}

const nodes: NodeType[] = [
  {
    id: 'palette-screenshot-node',
    key: 'image',
    name: 'Screenshot',
    component: ImageNode,
  },
];

export const NodeTypes = [...nodes] as const;

export type NodeKeys = (typeof NodeTypes)[number]['key']; // 'image'

export const NodeTypeDict = NodeTypes.reduce(
  (acc, cur) => {
    acc[cur.key] = cur.component;
    return acc;
  },
  {} as Record<string, React.FC<any>>,
);
