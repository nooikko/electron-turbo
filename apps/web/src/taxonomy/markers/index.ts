import { MarkerStructure, MarkerKey } from './types';
import { InputOne, InputTwo, InputThree, InputFour, InputGeneric, OutputOne, OutputTwo, OutputThree, OutputFour, OutputGeneric } from './markers';
export const Marker: Record<MarkerKey, MarkerStructure> = {
  [MarkerKey.InputOne]: InputOne,
  [MarkerKey.InputTwo]: InputTwo,
  [MarkerKey.InputThree]: InputThree,
  [MarkerKey.InputFour]: InputFour,
  [MarkerKey.OutputOne]: OutputOne,
  [MarkerKey.OutputTwo]: OutputTwo,
  [MarkerKey.OutputThree]: OutputThree,
  [MarkerKey.OutputFour]: OutputFour,
  [MarkerKey.InputPartialOne]: InputGeneric,
  [MarkerKey.InputPartialTwo]: OutputGeneric,
  [MarkerKey.InputPartialThree]: InputGeneric,
  [MarkerKey.InputPartialFour]: OutputGeneric,
  [MarkerKey.OutputPartialOne]: InputGeneric,
  [MarkerKey.OutputPartialTwo]: OutputGeneric,
  [MarkerKey.OutputPartialThree]: InputGeneric,
  [MarkerKey.OutputPartialFour]: OutputGeneric,
};

export * from './types';
