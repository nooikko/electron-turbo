import { ImageNodeMeta } from './ImageNode';
import { FindOnScreenNodeMeta } from './FindOnScreenNode';
import React from 'react';

const nodes = [ImageNodeMeta, FindOnScreenNodeMeta];

export const NodeTypes = [...nodes] as const;

// Generate NodeKeys type dynamically
export type NodeKeys = (typeof NodeTypes)[number]['key'];

export const NodeTypeDict: Record<NodeKeys, React.FC<any>> = NodeTypes.reduce(
  (acc, cur) => {
    acc[cur.key as NodeKeys] = cur.component;
    return acc;
  },
  {} as Record<NodeKeys, React.FC<any>>,
);
