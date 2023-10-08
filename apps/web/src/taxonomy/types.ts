export enum IOType {
  Screenshot = 'screenshot',
}

export interface IOStructure {
  name: IOType;
  colors: {
    hex: string;
    class: string;
  };
  structures: {
    input: IOType[];
    output: IOType;
  };
  configuration: {
    connections: {
      max: number;
    };
  };
}
