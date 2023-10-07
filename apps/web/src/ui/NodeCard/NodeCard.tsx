import React, { PropsWithChildren } from 'react';
import { PropsWithTailwind } from '../types';

interface NodeCardProps {
  disabled?: boolean;
}

export const NodeCard: React.FC<PropsWithChildren<PropsWithTailwind<NodeCardProps>>> = ({ children }) => {
  return (
    <div className='card w-48 overflow-hidden rounded-md border border-gray-100 bg-base-100 shadow-xl'>
      <div className='card-body gap-0 p-0'>{children}</div>
    </div>
  );
};
