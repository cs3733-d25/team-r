import prismaClient from "../../bin/prisma-client.ts";
import { Stack } from "../datastructures/dataStructures.ts"; // update path if yours differs
import { Graph } from "../maps/Graph.ts";
import { getNodeObjects, PathfindingAlgorithm } from "./algoSelection.ts";
import { Node } from "../maps/mapData.ts";

export default class DFS implements PathfindingAlgorithm {
  graph: Graph;
  private stack: Stack<string[]> | undefined;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  public findPath(start: string, end: string): Promise<Node[]> {
    const visited = new Set<string>();
    //const stack = new Stack<string[]>();
    this.stack = new Stack<string[]>();
    this.stack.push([start]);

    while (!this.stack.isEmpty()) {
      const path = this.stack.pop()!;
      const current = path[path.length - 1];

      if (current === end) return getNodeObjects(path);

      if (!visited.has(current)) {
        visited.add(current);
        for (const neighbor of this.graph.getNeighbors(current)) {
          if (!visited.has(neighbor)) {
            this.stack.push([...path, neighbor]);
          }
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
