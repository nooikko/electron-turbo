import type { IconType } from 'react-icons';
import type { Node } from 'reactflow';
export interface NodeType {
  id: string;
  key: string; // Leave it as a string type
  name: string;
  description: string;
  component: React.FC<any>;
}

export interface ContextMenuItem {
  name: string;
  onClick: (node: Node) => void;
  Icon: IconType;
}
