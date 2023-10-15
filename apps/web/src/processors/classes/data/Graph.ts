import { NodeKeys } from '#components/Nodes';
import { XYPosition, ReactFlowJsonObject } from 'reactflow';
import { HandleData } from '#components/HandleContext';

class NodeError extends Error {}
class EdgeError extends Error {}
class GraphError extends Error {}

interface GraphNodeData<T = any> {
  data: T;
  height?: number | null;
  id: string;
  position?: XYPosition;
  positionAbsolute?: XYPosition;
  type?: NodeKeys;
  width?: number | null;
  inputHandles?: string[];
  outputHandles?: string[];
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  sourceHandleId?: string | null;
  targetHandleId?: string | null;
}

class GraphNode<T = any> {
  data: GraphNodeData<T>;
  private _children: GraphNode<T>[] = [];
  private _parents: GraphNode<T>[] = [];

  constructor(data: GraphNodeData<T>) {
    if (!data.id) {
      throw new NodeError('GraphNode must have an id');
    }
    this.data = data;
  }

  addChild(node: GraphNode<T>): void {
    if (!this._children.some((child) => child.data.id === node.data.id)) {
      this._children.push(node);
    }
  }

  addParent(node: GraphNode<T>): void {
    if (!this._parents.some((parent) => parent.data.id === node.data.id)) {
      this._parents.push(node);
    }
  }

  parents(): GraphNode<T>[] {
    return this._parents;
  }

  children(): GraphNode<T>[] {
    return this._children;
  }

  addInputHandle(handleId: string): void {
    this.data.inputHandles = this.data.inputHandles || [];
    this.data.inputHandles.push(handleId);
  }

  addOutputHandle(handleId: string): void {
    this.data.outputHandles = this.data.outputHandles || [];
    this.data.outputHandles.push(handleId);
  }
}

class Edge {
  data: EdgeData;

  constructor(data: EdgeData) {
    if (!data.id || !data.source || !data.target) {
      throw new EdgeError('Edge must have an id, source, and target');
    }
    this.data = data;
  }

  setSourceHandleId(id: string): void {
    this.data.sourceHandleId = id;
  }

  setTargetHandleId(id: string): void {
    this.data.targetHandleId = id;
  }
}

export class Graph<T = any> {
  nodes: Map<string, GraphNode<T>> = new Map();
  edges: Map<string, Edge> = new Map();
  handles: Map<string, HandleData> = new Map();
  structure: GraphNode<T>[] = [];

  constructor(nodeDataArray: ReactFlowJsonObject<T>['nodes'], edgeDataArray: ReactFlowJsonObject['edges'], handlesData?: Record<string, HandleData>) {
    for (const data of nodeDataArray) {
      const node = new GraphNode(data);
      this.nodes.set(data.id, node);
    }

    for (const data of edgeDataArray) {
      const edge = new Edge(data);
      this.addEdge(edge);
    }

    if (handlesData) {
      Object.keys(handlesData).forEach((handleId) => {
        const handleData = handlesData[handleId];
        this.handles.set(handleId, handleData);
        this.addHandleToNode(handleData.nodeId, handleId);
      });
    }

    this.processStructure();
  }

  processStructure(): void {
    this.edges.forEach((edge) => {
      const sourceNode = this.nodes.get(edge.data.source);
      const targetNode = this.nodes.get(edge.data.target);

      if (sourceNode && targetNode) {
        sourceNode.addChild(targetNode);
        targetNode.addParent(sourceNode);
      } else {
        throw new GraphError('Invalid edge data: source or target node not found');
      }
    });

    this.nodes.forEach((node) => {
      if (node.parents().length === 0) {
        this.structure.push(node);
      }
    });
  }

  addEdge(edge: Edge): void {
    const sourceNode = this.nodes.get(edge.data.source);
    const targetNode = this.nodes.get(edge.data.target);

    if (sourceNode && targetNode) {
      sourceNode.addChild(targetNode);
      targetNode.addParent(sourceNode);
      this.edges.set(edge.data.id, edge);
    } else {
      throw new GraphError('Invalid edge data: source or target node not found');
    }
  }

  addHandleToNode(nodeId: string, handleId: string): void {
    const node = this.findNode(nodeId);
    const handle = this.findHandle(handleId);
    if (node && handle) {
      if (handle.type === 'source') {
        node.addOutputHandle(handleId);
      } else if (handle.type === 'target') {
        node.addInputHandle(handleId);
      }
    } else {
      throw new GraphError('Node or handle not found');
    }
  }

  findNode(id: string): GraphNode<T> | null {
    if (!id) {
      throw new GraphError('Id must be provided');
    }
    return this.nodes.get(id) || null;
  }

  findEdge(id: string): Edge | null {
    if (!id) {
      throw new GraphError('Id must be provided');
    }
    return this.edges.get(id) || null;
  }

  findHandle(id: string): HandleData | null {
    if (!id) {
      throw new GraphError('Id must be provided');
    }
    return this.handles.get(id) || null;
  }

  getRootNodes(): GraphNode<T>[] {
    const rootNodes: GraphNode<T>[] = [];
    this.nodes.forEach((node) => {
      if (node.parents.length === 0) {
        rootNodes.push(node);
      }
    });
    return rootNodes;
  }

  getStructure(): GraphNode<T>[] {
    return this.structure;
  }
}
