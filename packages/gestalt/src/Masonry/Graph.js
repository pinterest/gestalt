// @flow strict
import GraphNode, { type GraphNodeInterface } from './GraphNode.js';
import { type NodeData } from './types.js';

type NodesList = Map<NodeData, GraphNode>;

interface GraphInterface {
  nodes: NodesList;
  addEdge(source: NodeData, destination: NodeData): $ReadOnlyArray<GraphNodeInterface>;
  addNode(data: NodeData): GraphNodeInterface;
  removeNode(data: NodeData): boolean | void;
  removeEdge(source: NodeData, destination: NodeData): $ReadOnlyArray<?GraphNodeInterface>;
}

export default class Graph implements GraphInterface {
  constructor() {
    this.nodes = new Map();
  }

  nodes: NodesList;

  addEdge(source: NodeData, destination: NodeData): $ReadOnlyArray<GraphNodeInterface> {
    const sourceNode = this.addNode(source);
    const destinationNode = this.addNode(destination);

    sourceNode.addEdge(destinationNode);
    return [sourceNode, destinationNode];
  }

  addNode(data: NodeData): GraphNodeInterface {
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

  removeNode(data: NodeData): boolean | void {
    const current = this.nodes.get(data);
    if (current) {
      current.edges.forEach((node) => {
        node.removeEdge(current);
      });
    }
    return this.nodes.delete(data);
  }

  removeEdge(source: NodeData, destination: NodeData): $ReadOnlyArray<?GraphNodeInterface> {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);

    if (sourceNode && destinationNode) {
      sourceNode.removeEdge(destinationNode);
    }

    return [sourceNode, destinationNode];
  }

  prettyPrintGraph(startNode: NodeData, identifier?: string): string {
    const thisGraph = this;

    function prettyPrintNode(node: NodeData, level: number): string {
      const prefix = ' '.repeat(level * 4);
      const graphNode = thisGraph.nodes.get(node);
      if (!graphNode) {
        return '';
      }
      const graphNodeData = identifier
        ? graphNode.data.id[identifier] ?? graphNode.data.id
        : graphNode.data.id;
      let result = `${prefix}${JSON.stringify(graphNodeData)}\n`;
      graphNode.edges.forEach((edge) => {
        result += prettyPrintNode(edge.data, level + 1);
      });
      return result;
    }

    return prettyPrintNode(startNode, 0);
  }
}
