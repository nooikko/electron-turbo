import { NodeCard } from '#ui/NodeCard';
import { NodeHeader } from '#ui/NodeHeader';
import { Handle } from '#components/Handle';
import { IOKey } from '#taxonomy';
import { Accordion } from '#ui/Accordion';
import { HandleLayout } from '#ui/HandleLayout';

export const FindOnScreenNode = () => {
  return (
    <NodeCard className='w-52'>
      <NodeHeader className='bg-gray-700'>Find On Screen</NodeHeader>
      <div className='nodrag relative grid cursor-default grid-cols-2 py-1'>
        <div>
          <HandleLayout.Left title='Screenshot'>
            <Handle io={IOKey.Screenshot} type='target' position='left' />
          </HandleLayout.Left>
        </div>
        <div>
          <Accordion handlePosition='right'>
            <HandleLayout.Right title='Bounding Box'>
              <Handle io={IOKey.BoundingBox} type='source' position='right' />
            </HandleLayout.Right>
            <div>
              <HandleLayout.Right title='Top Bound'>
                <Handle io={IOKey.BoundingBoxTop} type='source' position='right' />
              </HandleLayout.Right>
              <HandleLayout.Right title='Bottom Bound'>
                <Handle io={IOKey.BoundingBoxBottom} type='source' position='right' />
              </HandleLayout.Right>
              <HandleLayout.Right title='Right Bound'>
                <Handle io={IOKey.BoundingBoxRight} type='source' position='right' />
              </HandleLayout.Right>
              <HandleLayout.Right title='Left Bound'>
                <Handle io={IOKey.BoundingBoxLeft} type='source' position='right' />
              </HandleLayout.Right>
            </div>
          </Accordion>
        </div>
      </div>
    </NodeCard>
  );
};
