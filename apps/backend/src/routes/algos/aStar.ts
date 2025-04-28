

import prismaClient from "../../bin/prisma-client";
import { PriorityQueue }    from "../datastructures/dataStructures";
import router                from "../maps/mapData";
import { Graph }             from "../maps/Graph";
import { PathfindingAlgorithm } from "./algoSelection";



export class AStar implements PathfindingAlgorithm {
  graph: Graph;
  private openSet: PriorityQueue<string> | undefined;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  // ——— MINIMAL CHANGE HERE ———
  // Now scales straight‐line distance by the true edge weight
  private heuristic(a: string, b: string): number {
    // get node coordinates
    const pa = this.graph.getNodePosition(a);
    const pb = this.graph.getNodePosition(b);
    const dx = pa.x - pb.x;
    const dy = pa.y - pb.y;
    const euclid = Math.hypot(dx, dy);

    // get the actual weight for edge a→b
    const w = this.graph.getEdgeWeight(a, b);

    // return weighted heuristic
    return w * euclid;
  }

  public findPath(start: string, end: string): string[] {
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
        // ——— MINIMAL CHANGE HERE ———
        // use the true edge weight instead of +1
        const w = this.graph.getEdgeWeight(current, neighbor);
        const tentativeG = (gScore.get(current) ?? Infinity) + w;

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