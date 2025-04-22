
import { Graph } from "./Graph";
import DFS from "./dfs.ts";
import { BFS } from "./bfs.ts";
import { AStar } from "./aStar.ts";

const graph = new Graph();

export async function findPath(
  start: string,
  end: string,
  algorithm: "dfs" | "bfs" | "aStar" = "dfs",
) {
  await graph.loadGraph(); // Load graph once

  if (algorithm === "dfs") {
    const dfs = new DFS(graph);
    return dfs.findPath(start, end);
  }
  if (algorithm === "aStar") {
    return new AStar(graph).findPath(start, end);
  }
  if (algorithm === "bfs") {
    const bfs = new BFS(graph);
    return bfs.findPath(start, end);
  } else {
    throw new Error(`Algorithm: "${algorithm}" not supported.`);
  }
}


import { Graph } from "./Graph";
import { DFS } from "./dfs.ts";
import { BFS } from "./bfs.ts";
import {AStar} from "./aStar.ts";

const graph = new Graph();

export async function findPath(start: string, end: string, algorithm: "dfs" | "bfs" | "aStar" = "dfs") {
    await graph.loadGraph(); // Load graph once

    if (algorithm === "dfs") {
        const dfs = new DFS(graph);
        return dfs.findPath(start, end);
    }
    if (algorithm === "aStar") {
        return new AStar(graph).findPath(start, end);
    }
    if (algorithm === "bfs") {
        const bfs = new BFS(graph);
        return bfs.findPath(start, end);
    }
    else{
        throw new Error(`Algorithm: "${algorithm}" not supported.`)
    }
}

