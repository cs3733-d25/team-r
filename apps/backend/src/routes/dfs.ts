import prismaClient from "../bin/prisma-client";
import { Stack } from "./dataStructures.ts";  // update path if yours differs
import { Graph } from "./Graph";

export default class DFS {

  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  public findPath(start: string, end: string): string[] {
    const visited = new Set<string>();
    const stack = new Stack<string[]>();
    stack.push([start]);

    while (!stack.isEmpty()) {
      const path = stack.pop()!;
      const current = path[path.length - 1];

      if (current === end) return path;

      if (!visited.has(current)) {
        visited.add(current);
        for (const neighbor of this.graph.getNeighbors(current)) {
          if (!visited.has(neighbor)) {
            stack.push([...path, neighbor]);
          }
        }
      }
    }

    return [];
  }
}
