// @flow strict
/* eslint-disable flowtype/no-mutable-array */
import { type NodeData } from './types.js';

type Edge<T> = {|
  score: number,
  // eslint-disable-next-line no-use-before-define
  node: GraphNodeInterface<T>,
|};

export interface GraphNodeInterface<T> {
  data: NodeData<T>;
  edges: Array<Edge<T>>;
  addEdge(node: GraphNodeInterface<T>, score: number): void;
  removeEdge(node: GraphNodeInterface<T>): GraphNodeInterface<T> | null;
  getEdges(): Array<Edge<T>>;
  isEdge(node: GraphNodeInterface<T>): boolean;
}

export default class GraphNode<T> implements GraphNodeInterface<T> {
  data: NodeData<T>;

  edges: Array<Edge<T>>;

  constructor(data: NodeData<T>) {
    this.data = data;
    this.edges = [];
  }

  addEdge(node: GraphNodeInterface<T>, score: number) {
    this.edges.push({ node, score });
  }

  removeEdge(node: GraphNodeInterface<T>): GraphNodeInterface<T> | null {
    if (this.isEdge(node)) {
      const index = this.edges.map((edge) => edge.node).indexOf(node);
      this.edges.splice(index, 1);
      return node;
    }
    return null;
  }

  getEdges(): Array<Edge<T>> {
    return this.edges;
  }

  isEdge(node: GraphNodeInterface<T>): boolean {
    return this.edges.map((edge) => edge.node).includes(node);
  }
}
/* eslint-enable flowtype/no-mutable-array */
