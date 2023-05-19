// @flow strict
/* eslint-disable flowtype/no-mutable-array */
import { type NodeData } from './types.js';

export interface GraphNodeInterface {
  data: NodeData;
  edges: Array<GraphNodeInterface>;
  addEdge(node: GraphNodeInterface): void;
  removeEdge(node: GraphNodeInterface): GraphNodeInterface | null;
  getEdges(): Array<GraphNodeInterface>;
  isEdge(node: GraphNodeInterface): boolean;
}

export default class GraphNode implements GraphNodeInterface {
  data: NodeData;

  edges: Array<GraphNodeInterface>;

  constructor(data: NodeData) {
    this.data = data;
    this.edges = [];
  }

  addEdge(node: GraphNodeInterface) {
    this.edges.push(node);
  }

  removeEdge(node: GraphNodeInterface): GraphNodeInterface | null {
    if (this.isEdge(node)) {
      const index = this.edges.indexOf(node);
      this.edges.splice(index, 1);
      return node;
    }
    return null;
  }

  getEdges(): Array<GraphNodeInterface> {
    return this.edges;
  }

  isEdge(node: GraphNodeInterface): boolean {
    return this.edges.includes(node);
  }
}
/* eslint-enable flowtype/no-mutable-array */
