import { Flow } from '#components/Flow';
import { FlowProvider } from '#components/FlowContext';
import { NodeProvider } from '#components/NodeContext';
import { CommandPaletteProvider } from '#ui/CommandPalette';
import { FlowCommandPalette } from '#components/FlowCommandPalette';
import { HandleProvider } from '#components/HandleContext';
import { EdgeProvider } from '#components/EdgeContext';
import { NodeContextMenuProvider } from '#components/NodeContextMenuContext';

const App = () => {
  return (
    <FlowProvider>
      <NodeProvider>
        <EdgeProvider>
          <NodeContextMenuProvider>
            <CommandPaletteProvider>
              <HandleProvider>
                <FlowCommandPalette />
                <div className='h-full w-full'>
                  <Flow />
                </div>
              </HandleProvider>
            </CommandPaletteProvider>
          </NodeContextMenuProvider>
        </EdgeProvider>
      </NodeProvider>
    </FlowProvider>
  );
};

export default App;
