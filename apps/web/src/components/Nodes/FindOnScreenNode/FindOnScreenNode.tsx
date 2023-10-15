import { Handle } from '#components/Handle';
import { Accordion } from '#ui/Accordion';
import { HandleLayout } from '#ui/HandleLayout';
import { NodeCard } from '#ui/NodeCard';
import { NodeHeader } from '#ui/NodeHeader';
import { IOKey, MarkerKey, ValidMarkers } from '#taxonomy';
import { NodeType } from '#types';

export const FindOnScreenNode = () => {
  return (
    <NodeCard className='w-52 origin-top'>
      <NodeHeader className='bg-gray-700'>Find On Screen</NodeHeader>
      <div className='nodrag relative grid cursor-default grid-cols-2 py-1'>
        <div>
          <HandleLayout.Left title='Screenshot'>
            <Handle marker={MarkerKey.InputOne} io={IOKey.Screenshot} type='target' position='left' />
          </HandleLayout.Left>
        </div>
        <div>
          <Accordion handlePosition='right'>
            <HandleLayout.Right title='Bounding Box'>
              <Handle marker={MarkerKey.OutputOne} io={IOKey.BoundingBox} type='source' position='right' />
            </HandleLayout.Right>
            <div>
              <HandleLayout.Right title='Top Bound'>
                <Handle marker={MarkerKey.OutputPartialOne} io={IOKey.BoundingBoxTop} type='source' position='right' />
              </HandleLayout.Right>
              <HandleLayout.Right title='Bottom Bound'>
                <Handle marker={MarkerKey.OutputPartialTwo} io={IOKey.BoundingBoxBottom} type='source' position='right' />
              </HandleLayout.Right>
              <HandleLayout.Right title='Right Bound'>
                <Handle marker={MarkerKey.OutputPartialThree} io={IOKey.BoundingBoxRight} type='source' position='right' />
              </HandleLayout.Right>
              <HandleLayout.Right title='Left Bound'>
                <Handle marker={MarkerKey.OutputPartialFour} io={IOKey.BoundingBoxLeft} type='source' position='right' />
              </HandleLayout.Right>
            </div>
          </Accordion>
        </div>
      </div>
    </NodeCard>
  );
};

export const FindOnScreenNodeMeta: NodeType = {
  id: 'palette-find-on-screen-node',
  key: 'find-on-screen',
  name: 'Find on screen',
  description: 'Find an image on screen',
  component: FindOnScreenNode,
};

export const FindOnScreenConfiguration: ValidMarkers[] = [
  {
    input: [MarkerKey.InputOne],
    output: [MarkerKey.OutputOne],
  },
  {
    input: [MarkerKey.InputOne],
    output: [MarkerKey.OutputPartialOne, MarkerKey.OutputPartialTwo, MarkerKey.OutputPartialThree, MarkerKey.OutputPartialFour],
  },
];
