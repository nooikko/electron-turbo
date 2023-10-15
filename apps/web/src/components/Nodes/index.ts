import { ValidMarkers } from '#taxonomy';
import React from 'react';
import { FindOnScreenConfiguration, FindOnScreenNodeMeta } from './FindOnScreenNode';
import { ImageConfiguration, ImageNodeMeta } from './ImageNode';

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

export const NodeConfigurations: Record<NodeKeys, ValidMarkers[]> = {
  [ImageNodeMeta.key]: ImageConfiguration,
  [FindOnScreenNodeMeta.key]: FindOnScreenConfiguration,
};
