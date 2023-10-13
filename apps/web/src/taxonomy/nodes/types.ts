interface NodeConfiguration {
  inputs: string[];
  outputs: string[];
}

export interface NodeStructure {
  name: string;
  configurations: NodeConfiguration[];
}
