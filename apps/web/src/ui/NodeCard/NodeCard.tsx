import React, { PropsWithChildren } from 'react';
import { PropsWithTailwind } from '../types';
import { twMerge } from 'tailwind-merge';

interface NodeCardProps extends PropsWithTailwind, PropsWithChildren {
  disabled?: boolean;
  innerClassName?: string;
}

export const NodeCard: React.FC<NodeCardProps> = ({ children, className, innerClassName }) => {
  const classes = twMerge('card w-48 overflow-hidden rounded-md border border-gray-100 bg-base-100 shadow-xl', className);
  const innerClasses = twMerge('card-body gap-0 p-0', innerClassName);

  return (
    <div className={classes}>
      <div className={innerClasses}>{children}</div>
    </div>
  );
};
