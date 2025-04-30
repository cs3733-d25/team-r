


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