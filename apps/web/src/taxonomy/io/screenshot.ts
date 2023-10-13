import { IOStructure, IOType, IOKey } from './types';

export const screenshot: IOStructure = {
  name: IOKey.Screenshot,
  colors: {
    hex: '#EC4899',
    class: 'bg-pink-500',
  },
  structures: {
    input: IOType.Screenshot,
    output: IOType.Screenshot,
  },
  configuration: {
    connections: {
      max: 1,
    },
  },
};
