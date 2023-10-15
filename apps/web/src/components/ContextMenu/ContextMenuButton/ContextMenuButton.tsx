import React, { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

interface ContextMenuButtonProps {
  onClick: () => void;
  Icon: IconType;
}

export const ContextMenuButton: React.FC<PropsWithChildren<ContextMenuButtonProps>> = ({ children, onClick, Icon }) => {
  return (
    <button className='group flex w-full items-center space-x-2 rounded-md px-1.5 py-1.5 hover:bg-primary/70 hover:text-white' onClick={onClick}>
      <Icon className='text-primary/70 group-hover:text-white' />
      <span>{children}</span>
    </button>
  );
};
