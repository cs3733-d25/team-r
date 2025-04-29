import prismaClient from "../../bin/prisma-client.ts";
import { Stack } from "../datastructures/dataStructures.ts"; // update path if yours differs
import { Graph } from "../maps/Graph.ts";
import { PathfindingAlgorithm } from "./algoSelection.ts";

export default class DFS implements PathfindingAlgorithm {
  graph: Graph;
  private stack: Stack<string[]> | undefined;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  public findPath(start: string, end: string): string[] {
    const visited = new Set<string>();
    //const stack = new Stack<string[]>();
    this.stack = new Stack<string[]>();
    this.stack.push([start]);

    while (!this.stack.isEmpty()) {
      const path = this.stack.pop()!;
      const current = path[path.length - 1];

      if (current === end) return path;

      if (!visited.has(current)) {
        visited.add(current);
        for (const neighbor of this.graph.getNeighbors(current)) {
          if (!visited.has(neighbor)) {
            this.stack.push([...path, neighbor]);
          }
        }
      }
    }

    return [];
  }
}
