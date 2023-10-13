import { NodeKeys } from '#components/Nodes';

import { XYPosition } from 'reactflow';

export interface GraphNodeData<T = any> {
  data: T;
  height?: number | null;
  id: string;
  position?: XYPosition;
  positionAbsolute?: XYPosition;
  type?: NodeKeys;
  width?: number | null;
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}
