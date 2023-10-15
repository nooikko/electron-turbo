import { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import { NodeContextMenuContext } from '#components/NodeContextMenuContext';
import { ContextMenuButton } from './ContextMenuButton';

export const ContextMenu: React.FC = () => {
  const { isContextMenuOpen, contextMenuPosition, closeContextMenu } = useContext(NodeContextMenuContext);

  // Define the styles for positioning the context menu
  const menuStyles = {
    left: `${contextMenuPosition.x}px`, // Use the x-coordinate from contextMenuPosition
    top: `${contextMenuPosition.y}px`, // Use the y-coordinate from contextMenuPosition
    zIndex: 10,
  };

  // Render the context menu only if it's open
  return isContextMenuOpen ? (
    <div className='absolute w-56 rounded-md bg-base-100 shadow-md' style={menuStyles}>
      <div className='flex flex-col p-1'>
        <ContextMenuButton onClick={closeContextMenu} Icon={FaTrash}>
          Delete
        </ContextMenuButton>
        <ContextMenuButton onClick={closeContextMenu} Icon={FaTrash}>
          Delete
        </ContextMenuButton>
      </div>
    </div>
  ) : null;
};
