import { Flow } from '#components/Flow';
import { NodeContextProvider } from '#components/NodeContext';

const App = () => {
  return (
    <NodeContextProvider>
      <div className='h-full w-full'>
        <Flow />
      </div>
    </NodeContextProvider>
  );
};

export default App;
