import { NodeStructure } from './types';

export const findonscreen: NodeStructure = {
  name: 'find-on-screen',
  configurations: [
    {
      inputs: ['input-1'],
      outputs: ['output-main-1'],
    },
    {
      inputs: ['input-1'],
      outputs: ['output-partial-*'],
    },
  ],
};
