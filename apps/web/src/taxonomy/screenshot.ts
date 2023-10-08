import { IOStructure, IOType } from './types';

export const screenshot: IOStructure = {
  name: IOType.Screenshot,
  colors: {
    hex: '#EC4899',
    class: 'bg-pink-500',
  },
  structures: {
    input: [],
    output: IOType.Screenshot,
  },
  configuration: {
    connections: {
      max: 1,
    },
  },
};
