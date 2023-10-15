export interface MarkerStructure {
  io: 'input' | 'output';
  group: 'main' | 'partial';
  isGeneric: boolean;
}

export enum MarkerKey {
  InputOne = 'input-1',
  InputTwo = 'input-2',
  InputThree = 'input-3',
  InputFour = 'input-4',
  OutputOne = 'output-1',
  OutputTwo = 'output-2',
  OutputThree = 'output-3',
  OutputFour = 'output-4',
  InputPartialOne = 'input-partial-1',
  InputPartialTwo = 'input-partial-2',
  InputPartialThree = 'input-partial-3',
  InputPartialFour = 'input-partial-4',
  OutputPartialOne = 'output-partial-1',
  OutputPartialTwo = 'output-partial-2',
  OutputPartialThree = 'output-partial-3',
  OutputPartialFour = 'output-partial-4',
}

export interface ValidMarkers {
  input: MarkerKey[];
  output: MarkerKey[];
}
