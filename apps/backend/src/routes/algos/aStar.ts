import prismaClient from "../../bin/prisma-client.ts";
import { PriorityQueue } from "../datastructures/dataStructures.ts";
import router from "../maps/mapData.ts";
import { Graph } from "../maps/Graph.ts";
import { PathfindingAlgorithm } from "./algoSelection.ts";

export class AStar implements PathfindingAlgorithm {
  graph: Graph;
  private openSet: PriorityQueue<string> | undefined;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  private heuristic(a: string, b: string): number {
    // Placeholder: returns zero (Dijkstra). Replace if you have coords.
    // I was thinking we either use the distance between the nodes or the number of edges between them.
    // we can also use E-disance, Minkowski, or chebyshev distance.
    return 0;
  }

  public findPath(start: string, end: string): string[] {
    //const openSet = new PriorityQueue<string>();
    this.openSet = new PriorityQueue<string>();
    this.openSet.enqueue(start, 0);

    const cameFrom = new Map<string, string>();
    const gScore = new Map<string, number>();
    gScore.set(start, 0);

    const fScore = new Map<string, number>();
    fScore.set(start, this.heuristic(start, end));

    while (!this.openSet.isEmpty()) {
      const current = this.openSet.dequeue()!;
      if (current === end) {
        const path: string[] = [];
        let node: string | undefined = end;
        while (node) {
          path.push(node);
          node = cameFrom.get(node);
        }
        return path.reverse();
      }

      for (const neighbor of this.graph.getNeighbors(current)) {
        const tentativeG = (gScore.get(current) ?? Infinity) + 1; // assume unweighted
        if (tentativeG < (gScore.get(neighbor) ?? Infinity)) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentativeG);
          const f = tentativeG + this.heuristic(neighbor, end);
          fScore.set(neighbor, f);
          this.openSet.enqueue(neighbor, f);
        }
      }
    }

    return [];
  }
}

export default router;
