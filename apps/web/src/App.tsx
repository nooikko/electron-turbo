import { Flow } from '#components/Flow';
import { FlowProvider } from '#components/FlowContext';
import { NodeProvider } from '#components/NodeContext';
import { CommandPaletteProvider } from '#ui/CommandPalette';
import { FlowCommandPalette } from '#components/FlowCommandPalette';

const App = () => {
  return (
    <FlowProvider>
      <NodeProvider>
        <CommandPaletteProvider>
          <FlowCommandPalette />
          <div className='h-full w-full'>
            <Flow />
          </div>
        </CommandPaletteProvider>
      </NodeProvider>
    </FlowProvider>
  );
};

export default App;
