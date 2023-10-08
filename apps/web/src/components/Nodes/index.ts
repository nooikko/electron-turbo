import { ImageNode } from './ImageNode';
import { FindOnScreenNode } from './FindOnScreenNode';
import React from 'react';

interface NodeType {
  id: string;
  key: string;
  name: string;
  description: string;
  component: React.FC<any>;
}

const nodes: NodeType[] = [
  {
    id: 'palette-screenshot-node',
    key: 'image',
    name: 'Screenshot',
    description: 'Use an image as a variable',
    component: ImageNode,
  },
  {
    id: 'palette-find-on-screen-node',
    key: 'find-on-screen',
    name: 'Find on screen',
    description: 'Find an image on screen',
    component: FindOnScreenNode,
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
