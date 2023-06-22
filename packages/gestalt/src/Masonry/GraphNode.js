// @flow strict
import { type NodeData } from './types.js';

type Edge<T> = {|
  score: number,
  // eslint-disable-next-line no-use-before-define
  node: GraphNodeInterface<T>,
|};

export interface GraphNodeInterface<T> {
  data: NodeData<T>;
  edges: $ReadOnlyArray<Edge<T>>;
  addEdge(node: GraphNodeInterface<T>, score: number): void;
  removeEdge(node: GraphNodeInterface<T>): GraphNodeInterface<T> | null;
  getEdges(): $ReadOnlyArray<Edge<T>>;
  isEdge(node: GraphNodeInterface<T>): boolean;
}

export default class GraphNode<T> implements GraphNodeInterface<T> {
  data: NodeData<T>;

  edges: $ReadOnlyArray<Edge<T>>;

  constructor(data: NodeData<T>) {
    this.data = data;
    this.edges = [];
  }

  addEdge(node: GraphNodeInterface<T>, score: number) {
    this.edges = [...this.edges, { node, score }];
  }

  removeEdge(node: GraphNodeInterface<T>): GraphNodeInterface<T> | null {
    if (this.isEdge(node)) {
      const index = this.edges.map((edge) => edge.node).indexOf(node);
      const edgesCopy = [...this.edges];
      edgesCopy.splice(index, 1);
      this.edges = edgesCopy;
      return node;
    }
    return null;
  }

  getEdges(): $ReadOnlyArray<Edge<T>> {
    return this.edges;
  }

  isEdge(node: GraphNodeInterface<T>): boolean {
    return this.edges.map((edge) => edge.node).includes(node);
  }
}
