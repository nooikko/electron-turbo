import { NodeCard } from '#ui/NodeCard';
import { NodeHeader } from '#ui/NodeHeader';
import { Handle } from '#components/Handle';
import { IOKey } from 'taxonomy/io';
import { Accordion } from '#ui/Accordion';
import { HandleLayout } from '#ui/HandleLayout';

export const FindOnScreenNode = () => {
  return (
    <NodeCard className='w-52'>
      <NodeHeader className='bg-gray-700'>Find On Screen</NodeHeader>
      <div className='nodrag relative grid cursor-default grid-cols-2 py-1'>
        <div>
          <HandleLayout.Left title='Screenshot'>
            <Handle marker='input-1' io={IOKey.Screenshot} type='target' position='left' />
          </HandleLayout.Left>
        </div>
        <div>
          <Accordion handlePosition='right'>
            <HandleLayout.Right title='Bounding Box'>
              <Handle marker='output-main-1' io={IOKey.BoundingBox} type='source' position='right' />
            </HandleLayout.Right>
            <div>
              <HandleLayout.Right title='Top Bound'>
                <Handle marker='output-partial-1' io={IOKey.BoundingBoxTop} type='source' position='right' />
              </HandleLayout.Right>
              <HandleLayout.Right title='Bottom Bound'>
                <Handle marker='output-partial-2' io={IOKey.BoundingBoxBottom} type='source' position='right' />
              </HandleLayout.Right>
              <HandleLayout.Right title='Right Bound'>
                <Handle marker='output-partial-3' io={IOKey.BoundingBoxRight} type='source' position='right' />
              </HandleLayout.Right>
              <HandleLayout.Right title='Left Bound'>
                <Handle marker='output-partial-4' io={IOKey.BoundingBoxLeft} type='source' position='right' />
              </HandleLayout.Right>
            </div>
          </Accordion>
        </div>
      </div>
    </NodeCard>
  );
};
