import prismaClient from "../bin/prisma-client";
import { PriorityQueue } from "../src/dataStructures";

function heuristic(a: string, b: string): number {
  // Placeholder: returns zero (Dijkstra). Replace if you have coords.
  return 0;
}

export async function aStar(start: string, end: string): Promise<string[]> {
  // 1) Build graph
  const edges = await prismaClient.edge.findMany();
  const graph = new Map<string, Set<string>>();
  for (const { fromID, toID } of edges) {
    if (!graph.has(fromID)) graph.set(fromID, new Set());
    if (!graph.has(toID))   graph.set(toID, new Set());
    graph.get(fromID)!.add(toID);
    graph.get(toID)!.add(fromID);
  }

  // 2) Prepare scores and queue
  const openSet = new PriorityQueue<string>();
  openSet.enqueue(start, 0);

  const cameFrom = new Map<string, string>();
  const gScore = new Map<string, number>();
  gScore.set(start, 0);

  const fScore = new Map<string, number>();
  fScore.set(start, heuristic(start, end));
