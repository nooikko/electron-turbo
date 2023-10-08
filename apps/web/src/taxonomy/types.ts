enum IOPrimative {
  Screenshot = 'screenshot',
  BoundingBoxLeft = 'bounding-box-left',
  BoundingBoxRight = 'bounding-box-right',
  BoundingBoxTop = 'bounding-box-top',
  BoundingBoxBottom = 'bounding-box-bottom',
}

export enum IOKey {
  Screenshot = 'Screenshot',
  BoundingBox = 'BoundingBox',
  BoundingBoxLeft = 'BoundingBoxLeft',
  BoundingBoxRight = 'BoundingBoxRight',
  BoundingBoxTop = 'BoundingBoxTop',
  BoundingBoxBottom = 'BoundingBoxBottom',
  BoundingBoxY = 'BoundingBoxY',
  BoundingBoxX = 'BoundingBoxX',
}

type IOGroup = {
  [key: string]: IOPrimative[];
};

export const IOType: IOGroup = {
  [IOKey.Screenshot]: [IOPrimative.Screenshot],
  [IOKey.BoundingBox]: [IOPrimative.BoundingBoxLeft, IOPrimative.BoundingBoxRight, IOPrimative.BoundingBoxTop, IOPrimative.BoundingBoxBottom],
  [IOKey.BoundingBoxLeft]: [IOPrimative.BoundingBoxLeft],
  [IOKey.BoundingBoxRight]: [IOPrimative.BoundingBoxRight],
  [IOKey.BoundingBoxTop]: [IOPrimative.BoundingBoxTop],
  [IOKey.BoundingBoxBottom]: [IOPrimative.BoundingBoxBottom],
  [IOKey.BoundingBoxY]: [IOPrimative.BoundingBoxTop, IOPrimative.BoundingBoxBottom],
  [IOKey.BoundingBoxX]: [IOPrimative.BoundingBoxLeft, IOPrimative.BoundingBoxRight],
};

export interface IOStructure {
  name: IOKey;
  colors: {
    hex: string;
    class: string;
  };
  structures: {
    input: IOGroup[IOKey];
    output: IOGroup[IOKey];
  };
  configuration: {
    connections: {
      max: number;
    };
  };
}
