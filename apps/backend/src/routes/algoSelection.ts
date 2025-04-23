import { Graph } from "./Graph";
import DFS from "./dfs.ts";
import { BFS } from "./bfs.ts";
import { AStar } from "./aStar.ts";

export interface PathfindingAlgorithm {
  graph: Graph;
  findPath(start: string, end: string): string[];
}

const graph = new Graph();

export async function findPath(
  startingPoint: string,
  endingPoint: string,
  algorithm: string,
) {
  await graph.loadGraph(); // Load graph once

  if (algorithm === "dfs") {
    const dfs = new DFS(graph);
    return dfs.findPath(startingPoint, endingPoint);
  }
  if (algorithm === "aStar") {
    return new AStar(graph).findPath(startingPoint, endingPoint);
  }
  if (algorithm === "bfs") {
    const bfs = new BFS(graph);
    return bfs.findPath(startingPoint, endingPoint);
  } else {
    throw new Error(`Algorithm: "${algorithm}" not supported.`);
  }
}
