import { Graph } from "./Graph";
import DFS from "./dfs.ts";
import { BFS } from "./bfs.ts";
import { AStar } from "./aStar.ts";

export interface PathfindingAlgorithm {
  graph: Graph;
  findPath(startingPoint: string, endingPoint: string, algorithm: string): string[];
}

const graph = new Graph();

export async function findPath(
  startingPoint: string,
  endingPoint: string,
  algorithm: string,
) {
  await graph.loadGraph(); // Load graph once

  if (algorithm === "dfs") {
    console.log('in findPath dfs: ',startingPoint, endingPoint);
    const dfs = new DFS(graph);
    return dfs.findPath(startingPoint, endingPoint);
  }
  if (algorithm === "aStar") {
    console.log('in findPath aStar: ',startingPoint, endingPoint);

    return new AStar(graph).findPath(startingPoint, endingPoint);
  }
  if (algorithm === "bfs") {
    console.log('in findPath bfs: ',startingPoint, endingPoint);
    const bfs = new BFS(graph);
    return bfs.findPath(startingPoint, endingPoint);
  } else {
    throw new Error(`Algorithm: "${algorithm}" not supported.`);
  }
}
