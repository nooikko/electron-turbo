import { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import { NodeContextMenuContext } from '#components/NodeContextMenuContext';
import { ContextMenuButton, ContextMenuButtonProps } from './ContextMenuButton';
import { useDeleteNode } from '#hooks';

interface ContextMenuProps {
  nodeButtons: React.FC<ContextMenuButtonProps>[];
}

export const ContextMenu: React.FC<ContextMenuProps> = () => {
  const { isContextMenuOpen, contextMenuPosition, closeContextMenu, nodeId } = useContext(NodeContextMenuContext);
  const deleteNode = useDeleteNode();

  const menuStyles = {
    left: `${contextMenuPosition.x}px`,
    top: `${contextMenuPosition.y}px`,
    zIndex: 10,
  };

  // Render the context menu only if it's open
  return isContextMenuOpen ? (
    <div className='absolute w-56 rounded-md bg-base-100 shadow-md' style={menuStyles}>
      <div className='flex flex-col p-1'>
        <ContextMenuButton
          onClick={() => {
            deleteNode(nodeId);
            closeContextMenu();
          }}
          Icon={FaTrash}
        >
          Delete Node
        </ContextMenuButton>
      </div>
    </div>
  ) : null;
};
