import { IsValidConnection } from 'reactflow';
import { IOType } from 'taxonomy/io';
import { useContext, useCallback } from 'react';
import { HandleContext } from '#components/HandleContext';

export const useValidateConnection = () => {
  const { handles } = useContext(HandleContext);

  const validateConnection = useCallback<IsValidConnection>(
    (args) => {
      const { sourceHandle, targetHandle } = args;

      if (!sourceHandle || !targetHandle) {
        return false;
      }

      const sourceIO = IOType[handles[sourceHandle].io];
      const targetIO = IOType[handles[targetHandle].io];

      if (sourceIO.length > 1) {
        throw new Error('Source IO cannot have more than one primitive');
      }

      return targetIO.includes(sourceIO[0]);
    },
    [handles],
  );

  return validateConnection;
};
