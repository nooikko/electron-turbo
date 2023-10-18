import { useHandleManager, useTaxonomyColor } from '#hooks';
import { useEffect, useMemo, useRef } from 'react';
import { Position, Handle as RFHandle, HandleProps as RFHandleProps, useEdges, useNodeId } from 'reactflow';
import { v4 as uuid } from 'uuid';
import { IOKey, MarkerKey, taxonomy } from '#taxonomy';

const buildStyle = (position: Position, baseStyle?: React.CSSProperties) => {
  const style: React.CSSProperties = {
    background: '#ff0000',
    width: '5px',
    height: '8px',
    border: 'none',
    minWidth: '0px',
    minHeight: '0px',
    zIndex: 9999,
    ...baseStyle,
  };

  switch (position) {
    case Position.Left:
      style.borderRadius = '0 100px 100px 0';
      style.left = 0;
      break;
    case Position.Right:
      style.borderRadius = '100px 0 0 100px';
      style.right = 0;
      break;
  }

  return style;
};

interface HandleProps extends Omit<RFHandleProps, 'position'> {
  position: 'left' | 'right';
  io: IOKey;
  marker: MarkerKey;
}

const positionDict = {
  left: Position.Left,
  right: Position.Right,
};

export const Handle: React.FC<HandleProps> = ({ type, position, io, marker }) => {
  const id = useRef(uuid());
  const edges = useEdges();
  const connectedEdges = useMemo(() => edges.filter((edge) => edge?.sourceHandle === id.current || edge?.targetHandle === id.current), [edges]);
  const isConnectable = useMemo(() => connectedEdges.length < taxonomy[io]?.configuration.connections.max, [connectedEdges]);
  const nodeId = useNodeId() as string;
  const manageHandle = useHandleManager();

  useEffect(() => {
    manageHandle({
      [id?.current]: {
        io,
        marker,
        nodeId,
        position: positionDict[position],
        type,
      },
    });
  }, []);

  return (
    <RFHandle
      className={`${!isConnectable && '!bg-gray-400'}`}
      style={buildStyle(positionDict[position], { background: useTaxonomyColor(io)?.hex })}
      id={id?.current}
      type={type}
      isConnectable={isConnectable}
      position={positionDict[position]}
    />
  );
};
