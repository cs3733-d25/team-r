import prismaClient from "../../bin/prisma-client.ts";
import { PriorityQueue } from "../datastructures/dataStructures.ts";
import router, { Node } from "../maps/mapData.ts";
import { Graph } from "../maps/Graph.ts";
import { getNodeObjects, PathfindingAlgorithm } from "./algoSelection.ts";

export class AStar implements PathfindingAlgorithm {
  graph: Graph;
  private openSet: PriorityQueue<string> | undefined;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  /**
   * Fetch the two Node objects from the DB by ID,
   * then return them as a tuple.
   */
  private async getNodePair(a: string, b: string): Promise<[Node, Node]> {
    const nodes = await getNodeObjects([a, b]);
    return [nodes[0], nodes[1]];
  }

  /**
   * Compute straight-line distance by unpacking the Node coords.
   */
  private async euclideanDistance(a: string, b: string): Promise<number> {
    const [nA, nB] = await this.getNodePair(a, b);
    return Math.hypot(nA.xcoord - nB.xcoord, nA.ycoord - nB.ycoord);
  }

  /**
   * Now async: weight × straight-line distance.
   */
  private async heuristic(a: string, b: string): Promise<number> {
    const d = await this.euclideanDistance(a, b);
    const w = this.graph.getEdgeWeight(a, b);
    return w * d;
  }

  public async findPath(start: string, end: string): Promise<Node[]> {
    this.openSet = new PriorityQueue<string>();
    this.openSet.enqueue(start, 0);

    const cameFrom = new Map<string, string>();
    const gScore = new Map<string, number>([[start, 0]]);
    const fScore = new Map<string, number>([
      [start, await this.heuristic(start, end)],
    ]);

    while (!this.openSet.isEmpty()) {
      const current = this.openSet.dequeue()!;
      if (current === end) {
        // reconstruct the ID path
        const path: string[] = [];
        let cursor: string | undefined = end;
        while (cursor) {
          path.push(cursor);
          cursor = cameFrom.get(cursor);
        }
        path.reverse();
        // fetch full Node[] and return
        return getNodeObjects(path);
      }

      for (const neighbor of this.graph.getNeighbors(current)) {
        const w = this.graph.getEdgeWeight(current, neighbor);
        const tentative = (gScore.get(current) ?? Infinity) + w;

        if (tentative < (gScore.get(neighbor) ?? Infinity)) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentative);

          // invoke your async heuristic here
          const f = tentative + (await this.heuristic(neighbor, end));
          fScore.set(neighbor, f);
          this.openSet.enqueue(neighbor, f);
        }
      }
    }

    return Promise.reject(new Error("No path found"));
  }
}

export default router;
