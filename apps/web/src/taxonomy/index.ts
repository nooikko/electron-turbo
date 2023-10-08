import { IOStructure, IOType } from './types';
import { screenshot } from './screenshot';

export const taxonomy: Record<IOType, IOStructure> = {
  [IOType.Screenshot]: screenshot,
};

export * from './types';
