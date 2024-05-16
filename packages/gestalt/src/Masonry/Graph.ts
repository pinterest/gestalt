import GraphNode, { GraphNodeInterface } from './GraphNode';
import { NodeData } from './types';

type NodesList<T> = Map<NodeData<T>, GraphNode<T>>;

interface GraphInterface<T> {
  nodes: NodesList<T>;
  addEdge(
    source: NodeData<T>,
    destination: NodeData<T>,
    edgeScore: number,
  ): ReadonlyArray<GraphNodeInterface<T>>;
  addNode(data: NodeData<T>): GraphNodeInterface<T>;
  removeNode(data: NodeData<T>): boolean | undefined;
  removeEdge(
    source: NodeData<T>,
    destination: NodeData<T>,
  ): ReadonlyArray<GraphNodeInterface<T> | null | undefined>;
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
  ): ReadonlyArray<GraphNodeInterface<T>> {
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

  removeNode(data: NodeData<T>): boolean | undefined {
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
  ): ReadonlyArray<GraphNodeInterface<T> | null | undefined> {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);

    if (sourceNode && destinationNode) {
      sourceNode.removeEdge(destinationNode);
    }

    return [sourceNode, destinationNode];
  }

  findLowestScore(startNode: NodeData<T>): {
    lowestScore: number | null;
    lowestScoreNode: NodeData<T>;
  } {
// @ts-expect-error - TS7034 - Variable 'lowestScore' implicitly has type 'any' in some locations where its type cannot be determined.
    let lowestScore = null;
    let lowestScoreNode = startNode;

    const findLowestScoreRecursive = (node: GraphNodeInterface<T>) => {
      node.getEdges().forEach((edge) => {
        const { score, node: edgeNode } = edge;
// @ts-expect-error - TS7005 - Variable 'lowestScore' implicitly has an 'any' type. | TS7005 - Variable 'lowestScore' implicitly has an 'any' type.
        if (lowestScore === null || score < lowestScore) {
          lowestScore = score;
          lowestScoreNode = edgeNode.data;
        }
        findLowestScoreRecursive(edgeNode);
      });
    };

    const startGraphNode = this.nodes.get(startNode);
    if (startGraphNode) {
      findLowestScoreRecursive(startGraphNode);
    }
    return { lowestScore, lowestScoreNode };
  }
}
