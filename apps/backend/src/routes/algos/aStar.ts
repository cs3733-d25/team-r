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

  private heuristic(a: string, b: string): number {
    // Placeholder: returns zero (Dijkstra). Replace if you have coords.
    // I was thinking we either use the distance between the nodes or the number of edges between them.
    // we can also use E-disance, Minkowski, or chebyshev distance.
    return 0;
  }

  public findPath(start: string, end: string): Promise<Node[]> {
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

        return getNodeObjects(path.reverse());
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

    return {
      then: function <TResult1 = Node[], TResult2 = never>(
        onfulfilled?:
          | ((value: Node[]) => TResult1 | PromiseLike<TResult1>)
          | null
          | undefined,
        onrejected?:
          | ((reason: any) => TResult2 | PromiseLike<TResult2>)
          | null
          | undefined,
      ): Promise<TResult1 | TResult2> {
        throw new Error("Function not implemented.");
      },
      catch: function <TResult = never>(
        onrejected?:
          | ((reason: any) => TResult | PromiseLike<TResult>)
          | null
          | undefined,
      ): Promise<Node[] | TResult> {
        throw new Error("Function not implemented.");
      },
      finally: function (
        onfinally?: (() => void) | null | undefined,
      ): Promise<Node[]> {
        throw new Error("Function not implemented.");
      },
      [Symbol.toStringTag]: "",
    };
  }
}

export default router;
