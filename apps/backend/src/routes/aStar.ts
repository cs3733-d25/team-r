import prismaClient from "../bin/prisma-client";
import { PriorityQueue } from "../routes/dataStructures";

function heuristic(a: string, b: string): number {
  // Placeholder: returns zero (Dijkstra). Replace if you have coords.
  // I was thinking we either use the distance between the nodes or the number of edges between them.
  // we can also use E-disance, Minkowski, or chebyshev distance.
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

  // 2) Preparing  scores and queue
  const openSet = new PriorityQueue<string>();
  openSet.enqueue(start, 0);

  const cameFrom = new Map<string, string>();
  const gScore = new Map<string, number>();
  gScore.set(start, 0);

  const fScore = new Map<string, number>();
  fScore.set(start, heuristic(start, end));
// main loop here
  while (!openSet.isEmpty()) {
      const current = openSet.dequeue()!;
      if (current === end) {
        // reconstruct path
        const path: string[] = [];
        let node: string | undefined = end;
        while (node) {
          path.push(node);
          node = cameFrom.get(node);
        }
        return path.reverse();
      }

      const neighbors = graph.get(current) || new Set();
      for (const neighbor of neighbors) {
        const tentativeG = (gScore.get(current) ?? Infinity) + 1;
        if (tentativeG < (gScore.get(neighbor) ?? Infinity)) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentativeG);
          const f = tentativeG + heuristic(neighbor, end);
          fScore.set(neighbor, f);
          openSet.enqueue(neighbor, f);
        }
      }
    }

    // no path
    return [];
  }
