import { useHandleManager, useTaxonomyColor } from '#hooks';
import { useEffect, useRef } from 'react';
import { Position, Handle as RFHandle, HandleProps as RFHandleProps } from 'reactflow';
import { v4 as uuid } from 'uuid';
import { IOKey } from 'taxonomy/io';

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
  marker: string;
}

const positionDict = {
  left: Position.Left,
  right: Position.Right,
};

export const Handle: React.FC<HandleProps> = ({ type, position, io, marker }) => {
  const id = useRef(uuid());
  const manageHandle = useHandleManager();

  useEffect(() => {
    manageHandle({
      [id?.current]: {
        io,
        marker,
      },
    });
  }, []);

  return (
    <RFHandle
      style={buildStyle(positionDict[position], { background: useTaxonomyColor(io)?.hex })}
      id={id?.current}
      type={type}
      position={positionDict[position]}
    />
  );
};
