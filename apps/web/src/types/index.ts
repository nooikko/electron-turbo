export interface NodeType {
  id: string;
  key: string; // Leave it as a string type
  name: string;
  description: string;
  component: React.FC<any>;
}
