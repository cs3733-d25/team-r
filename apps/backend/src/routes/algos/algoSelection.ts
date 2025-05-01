import { Graph } from "../maps/Graph.ts";
import DFS from "./dfs.ts";
import { BFS } from "./bfs.ts";
import { AStar } from "./aStar.ts";
import { Node } from "../maps/mapData.ts";
import prismaClient from "../../bin/prisma-client.ts";

export interface PathfindingAlgorithm {
  graph: Graph;
  findPath(
    startingPoint: string,
    endingPoint: string,
    algorithm: string,
  ): Promise<Node[]>;
}

/**
 * Fetches node objects from the database based on the provided node IDs.
 * @param nodeIDs - a string array of node IDs to fetch.
 */
export async function getNodeObjects(nodeIDs: string[]): Promise<Node[]> {
  const nodes = await prismaClient.node.findMany({
    where: {
      nodeID: { in: nodeIDs },
    },
  });

  // Create a map for quick lookups
  const nodeMap = new Map(nodes.map((node) => [node.nodeID, node]));

  // Return nodes in the same order as the input nodeIDs array
  return nodeIDs
    .map((id) => nodeMap.get(id))
    .filter((node) => node !== undefined) as Node[];
}

const graph = new Graph();

export async function findPath(
  startingPoint: string,
  endingPoint: string,
  algorithm: string,
): Promise<Node[]> {
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
