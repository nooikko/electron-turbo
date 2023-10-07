import React, { PropsWithChildren } from 'react';
import { PropsWithTailwind } from '#ui/types';
import { twMerge } from 'tailwind-merge';

export const NodeHeader: React.FC<PropsWithChildren<PropsWithTailwind>> = ({ children, className }) => {
  const classes = twMerge('w-full px-2 bg-red-500 py-0.5 text-xs text-white', className);
  return <div className={classes}>{children}</div>;
};
