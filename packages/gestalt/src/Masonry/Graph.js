// @flow strict
import GraphNode, { type GraphNodeInterface } from './GraphNode.js';
import { type NodeData } from './types.js';

type NodesList<T> = Map<NodeData<T>, GraphNode<T>>;

interface GraphInterface<T> {
  nodes: NodesList<T>;
  addEdge(
    source: NodeData<T>,
    destination: NodeData<T>,
    edgeScore: number,
  ): $ReadOnlyArray<GraphNodeInterface<T>>;
  addNode(data: NodeData<T>): GraphNodeInterface<T>;
  removeNode(data: NodeData<T>): boolean | void;
  removeEdge(source: NodeData<T>, destination: NodeData<T>): $ReadOnlyArray<?GraphNodeInterface<T>>;
}

export default class Graph<T> implements GraphInterface<T> {
  constructor() {
    this.nodes = new Map();
  }

  nodes: NodesList<T>;

  addEdge(
    source: NodeData<T>,
    destination: NodeData<T>,
    edgeScore: number,
  ): $ReadOnlyArray<GraphNodeInterface<T>> {
    const sourceNode = this.addNode(source);
    const destinationNode = this.addNode(destination);

    sourceNode.addEdge(destinationNode, edgeScore);
    return [sourceNode, destinationNode];
  }

  addNode(data: NodeData<T>): GraphNodeInterface<T> {
    if (this.nodes.has(data)) {
      const nodeData = this.nodes.get(data);
      if (nodeData) {
        return nodeData;
      }
    }
    const node = new GraphNode(data);
    this.nodes.set(data, node);
    return node;
  }

  removeNode(data: NodeData<T>): boolean | void {
    const current = this.nodes.get(data);
    if (current) {
      current.edges.forEach(({ node }) => {
        node.removeEdge(current);
      });
    }
    return this.nodes.delete(data);
  }

  removeEdge(
    source: NodeData<T>,
    destination: NodeData<T>,
  ): $ReadOnlyArray<?GraphNodeInterface<T>> {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);

    if (sourceNode && destinationNode) {
      sourceNode.removeEdge(destinationNode);
    }

    return [sourceNode, destinationNode];
  }

  findLowestScore(startNode: NodeData<T>): {|
    lowestScore: number | null,
    lowestScoreNode: NodeData<T>,
  |} {
    let lowestScore = null;
    let lowestScoreNode = startNode;

    function findLowestScoreRecursive(node: GraphNodeInterface<T>): void {
      const edges = node.getEdges();
      if (edges.length === 0) {
        return;
      }
      const scores = edges.map((edge) => edge.score);
      const minScore = Math.min(...scores);
      if (lowestScore === null || minScore < lowestScore) {
        lowestScore = minScore;
        lowestScoreNode = node.data;
      }

      edges.forEach((edge) => {
        findLowestScoreRecursive(edge.node);
      });
    }

    const startGraphNode = this.nodes.get(startNode);
    if (startGraphNode) {
      findLowestScoreRecursive(startGraphNode);
    }
    return { lowestScore, lowestScoreNode };
  }
}
