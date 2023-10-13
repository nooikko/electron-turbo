import { IOStructure, IOType, IOKey } from './types';

export const boundingBox: IOStructure = {
  name: IOKey.BoundingBox,
  colors: {
    hex: '#22c55e',
    class: 'bg-green-500',
  },
  structures: {
    input: IOType.BoundingBox,
    output: IOType.BoundingBox,
  },
  configuration: {
    connections: {
      max: 1,
    },
  },
};

export const boundingBoxLeft: IOStructure = {
  name: IOKey.BoundingBoxLeft,
  colors: {
    hex: '#22c55e',
    class: 'bg-green-500',
  },
  structures: {
    input: IOType.BoundingBoxLeft,
    output: IOType.BoundingBoxLeft,
  },
  configuration: {
    connections: {
      max: 1,
    },
  },
};

export const boundingBoxRight: IOStructure = {
  name: IOKey.BoundingBoxRight,
  colors: {
    hex: '#22c55e',
    class: 'bg-green-500',
  },
  structures: {
    input: IOType.BoundingBoxRight,
    output: IOType.BoundingBoxRight,
  },
  configuration: {
    connections: {
      max: 1,
    },
  },
};

export const boundingBoxTop: IOStructure = {
  name: IOKey.BoundingBoxTop,
  colors: {
    hex: '#22c55e',
    class: 'bg-green-500',
  },
  structures: {
    input: IOType.BoundingBoxTop,
    output: IOType.BoundingBoxTop,
  },
  configuration: {
    connections: {
      max: 1,
    },
  },
};

export const boundingBoxBottom: IOStructure = {
  name: IOKey.BoundingBoxBottom,
  colors: {
    hex: '#22c55e',
    class: 'bg-green-500',
  },
  structures: {
    input: IOType.BoundingBoxBottom,
    output: IOType.BoundingBoxBottom,
  },
  configuration: {
    connections: {
      max: 1,
    },
  },
};

export const boundingBoxY: IOStructure = {
  name: IOKey.BoundingBoxY,
  colors: {
    hex: '#22c55e',
    class: 'bg-green-500',
  },
  structures: {
    input: IOType.BoundingBoxY,
    output: IOType.BoundingBoxY,
  },
  configuration: {
    connections: {
      max: 1,
    },
  },
};

export const boundingBoxX: IOStructure = {
  name: IOKey.BoundingBoxX,
  colors: {
    hex: '#22c55e',
    class: 'bg-green-500',
  },
  structures: {
    input: IOType.BoundingBoxX,
    output: IOType.BoundingBoxX,
  },
  configuration: {
    connections: {
      max: 1,
    },
  },
};
