import React, { useContext } from 'react';
import { ContextMenuButton } from '#components/ContextMenu';
import { NodeContextMenuContext } from '#components/NodeContextMenuContext';
import { useFlowState } from '#hooks';
import { FaImage } from 'react-icons/fa';

export const DeleteImage: React.FC = () => {
  const { node, closeContextMenu } = useContext(NodeContextMenuContext);
  const [data, setNodeData] = useFlowState<{ screenshot: string | null } | null>({
    id: node?.id,
  });

  return (
    <>
      {Boolean(data?.screenshot) && (
        <ContextMenuButton
          onClick={() => {
            setNodeData({ screenshot: null });
            closeContextMenu();
          }}
          Icon={FaImage}
        >
          Delete Image
        </ContextMenuButton>
      )}
    </>
  );
};
