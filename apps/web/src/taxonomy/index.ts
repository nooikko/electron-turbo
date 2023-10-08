import { IOStructure, IOKey } from './types';
import { screenshot } from './screenshot';
import { boundingBox, boundingBoxBottom, boundingBoxLeft, boundingBoxRight, boundingBoxTop, boundingBoxX, boundingBoxY } from './bounding-box';

export const taxonomy: Record<IOKey, IOStructure> = {
  [IOKey.Screenshot]: screenshot,
  [IOKey.BoundingBox]: boundingBox,
  [IOKey.BoundingBoxLeft]: boundingBoxLeft,
  [IOKey.BoundingBoxRight]: boundingBoxRight,
  [IOKey.BoundingBoxTop]: boundingBoxTop,
  [IOKey.BoundingBoxBottom]: boundingBoxBottom,
  [IOKey.BoundingBoxY]: boundingBoxY,
  [IOKey.BoundingBoxX]: boundingBoxX,
};

export * from './types';
