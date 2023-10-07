import { useViewport } from 'reactflow';
import { useEffect } from 'react';

export const ViewportLogger = () => {
  const { x, y, zoom } = useViewport();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    console.log(x, y, zoom); // eslint-disable-line no-console
  }, [x, y, zoom]);

  return null;
};
