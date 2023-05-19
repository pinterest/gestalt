// @flow strict
/* eslint-disable flowtype/no-mutable-array */
import { type NodeData } from './types.js';

type Edge = {|
  score: number,
  // eslint-disable-next-line no-use-before-define
  node: GraphNodeInterface,
|};

export interface GraphNodeInterface {
  data: NodeData;
  edges: Array<Edge>;
  addEdge(node: GraphNodeInterface, score: number): void;
  removeEdge(node: GraphNodeInterface): GraphNodeInterface | null;
  getEdges(): Array<Edge>;
  isEdge(node: GraphNodeInterface): boolean;
}

export default class GraphNode implements GraphNodeInterface {
  data: NodeData;

  edges: Array<Edge>;

  constructor(data: NodeData) {
    this.data = data;
    this.edges = [];
  }

  addEdge(node: GraphNodeInterface, score: number) {
    this.edges.push({ node, score });
  }

  removeEdge(node: GraphNodeInterface): GraphNodeInterface | null {
    if (this.isEdge(node)) {
      const index = this.edges.map((edge) => edge.node).indexOf(node);
      this.edges.splice(index, 1);
      return node;
    }
    return null;
  }

  getEdges(): Array<Edge> {
    return this.edges;
  }

  isEdge(node: GraphNodeInterface): boolean {
    return this.edges.map((edge) => edge.node).includes(node);
  }
}
/* eslint-enable flowtype/no-mutable-array */
