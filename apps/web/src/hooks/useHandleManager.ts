import { useCallback, useContext } from 'react';
import { HandleContext } from '#components/HandleContext';

export const useHandleManager = () => {
  const { handles, setHandles } = useContext(HandleContext);

  const modifyHandle = useCallback(
    (data: Record<string, Record<string, any>>) => {
      const keys = Object.keys(data);

      if (keys.length > 1) {
        throw new Error('Only one ID is allowed');
      }

      const [key] = keys;

      // If the handle doesn't exist, create it
      if (!handles[key]) {
        setHandles((prev) => ({ ...prev, [key]: data[key] }));
        return;
      }

      // If the handle exists, modify it
      setHandles((prev) => ({ ...prev, [key]: { ...prev[key], ...data[key] } }));
    },
    [handles, setHandles],
  );

  return modifyHandle;
};
