import { useContext, useMemo } from 'react';
import { FaTrash } from 'react-icons/fa';
import { NodeContextMenuContext } from '#components/NodeContextMenuContext';
import { ContextMenuButton } from './ContextMenuButton';
import { useDeleteNode } from '#hooks';
import { buttons } from './Buttons';

export const ContextMenu: React.FC = () => {
  const { isContextMenuOpen, contextMenuPosition, closeContextMenu, node } = useContext(NodeContextMenuContext);
  const deleteNode = useDeleteNode();
  const typeButtons = useMemo(() => (node?.type ? Object.values(buttons[node?.type]) : []), [node?.type]);

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
            deleteNode(node?.id as string);
            closeContextMenu();
          }}
          Icon={FaTrash}
        >
          Delete Node
        </ContextMenuButton>
        {Boolean(typeButtons) && typeButtons}
      </div>
    </div>
  ) : null;
};
