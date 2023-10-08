import React, { PropsWithChildren } from 'react';

interface HandleLayoutProps {
  title: string;
}

export const HandleLayout: Record<'Left' | 'Right', React.FC<PropsWithChildren<HandleLayoutProps>>> = {
  Left: ({ children, title }) => (
    <div className='relative flex justify-start text-xs'>
      {children}
      <div className='pl-2 leading-tight'>{title}</div>
    </div>
  ),
  Right: ({ children, title }) => (
    <div className='relative flex justify-end text-xs'>
      {children}
      <div className='pr-2 leading-tight'>{title}</div>
    </div>
  ),
};
