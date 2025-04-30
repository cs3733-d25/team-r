

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
  private async getNodePair(a: string, b: string): Promise<[Node,Node]> {
        const nodes = await getNodeObjects([a, b]);
        return [nodes[0], nodes[1]];
      }

  /**
      * Compute straight-line distance by unpacking the Node coords.
      */
  private async euclideanDistance(a: string, b: string): Promise<number> {
        const [nA, nB] = await this.getNodePair(a, b);
        return Math.hypot(nA.x - nB.x, nA.y - nB.y);
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
    //const openSet = new PriorityQueue<string>();

    this.openSet = new PriorityQueue<string>();
    this.openSet.enqueue(start, 0);

    const cameFrom = new Map<string, string>();
    const gScore = new Map<string, number>();
    gScore.set(start, 0);

    const fScore = new Map<string, number>();
    fScore.set(start, await this.heuristic(start, end));

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

          const f = tentativeG + await this.heuristic(neighbor, end);
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