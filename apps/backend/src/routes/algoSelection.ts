import { Graph } from "./Graph";
import DFS from "./dfs.ts";
import { BFS } from "./bfs.ts";
import { AStar } from "./aStar.ts";

export interface PathfindingAlgorithm {
  graph: Graph;
  findPath(
    startingPoint: string,
    endingPoint: string,
    algorithm: string,
  ): string[];
}

const graph = new Graph();

export async function findPath(
  startingPoint: string,
  endingPoint: string,
  algorithm: string,
) {
  console.log("IN FIND PATH HELLO");
  await graph.loadGraph(); // Load graph once

  if (algorithm === "dfs") {
    console.log("in findPath dfs: ", startingPoint, endingPoint);
    const dfs = new DFS(graph);
    return dfs.findPath(startingPoint, endingPoint);
  }
  if (algorithm === "dijkstra") {
    console.log("in findPath dijkstra: ", startingPoint, endingPoint);

    return new AStar(graph).findPath(startingPoint, endingPoint);
  }
  if (algorithm === "bfs") {
    console.log("in findPath bfs: ", startingPoint, endingPoint);
    const bfs = new BFS(graph);
    const bfsPath = bfs.findPath(startingPoint, endingPoint);
    // return bfs.findPath(startingPoint, endingPoint);
    console.log("bfsPath IN FIND PATH: ", bfsPath);
    return bfsPath;
  } else {
    throw new Error(`Algorithm: "${algorithm}" not supported.`);
  }
}
