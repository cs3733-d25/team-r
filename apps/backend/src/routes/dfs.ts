import prismaClient from "../bin/prisma-client";
import { Stack } from "./dataStructures.ts"; // update path if yours differs
import { Graph } from "./Graph";
import { PathfindingAlgorithm } from "./algoSelection.ts";

export default class DFS implements PathfindingAlgorithm {
  graph: Graph;
  private stack: Stack<string[]> | undefined;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  public findPath(start: string, end: string): string[] {
    console.log("in dfs.pathFind()");
    console.log(" startingPoint in DFS pathfind: ", start);
    console.log(" endingPoint in DFS pathfind: ", end);
    const visited = new Set<string>();
    //const stack = new Stack<string[]>();
    this.stack = new Stack<string[]>();
    this.stack.push([start]);

    console.log(" Stack snapshot:");
    while (!this.stack.isEmpty()) {
      const path = this.stack.pop()!;
      const currentID = path[path.length - 1];
      
      if (currentID === end) return path;

      if (!visited.has(currentID)) {
        visited.add(currentID);
        for (const neighbor of this.graph.getNeighbors(currentID)) {
          console.log(`Visiting: ${currentID}`);
          if (!visited.has(neighbor)) {
            this.stack.push([...path, neighbor]);
          }
        }
      }
    }

    return [];
  }
}
