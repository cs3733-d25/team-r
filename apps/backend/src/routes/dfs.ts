// apps/backend/src/algorithms/dfs.ts

import prismaClient from "../bin/prisma-client";
import { Stack } from "../routes/dataStructures";  // update path if yours differs

/**
 * DFSService
 * Builds the graph once (from your Prisma edge table) and exposes a method
 * to find a path via iterative DFS using an explicit Stack of paths.
 */
export class DFSService {
  private graph = new Map<string, Set<string>>();
  private built = false;

  /** Build adjacency map from your DB exactly once. */
  private async buildGraph(): Promise<void> {
    if (this.built) return;
    const edges = await prismaClient.edge.findMany();
    for (const { fromID, toID } of edges) {
      if (!this.graph.has(fromID)) this.graph.set(fromID, new Set());
      if (!this.graph.has(toID))   this.graph.set(toID, new Set());
      this.graph.get(fromID)!.add(toID);
      this.graph.get(toID)!.add(fromID);
    }
    this.built = true;
  }

  /**
   * findPath
   * @param start  ID of the start node
   * @param end    ID of the goal node
   * @returns      an array of node IDs representing the first path found, or []
   */
  public async findPath(start: string, end: string): Promise<string[]> {
    await this.buildGraph();

    // Visited set and stack of partial paths
    const visited = new Set<string>();
    const stack = new Stack<string[]>();
    stack.push([start]);

    while (!stack.isEmpty()) {
      const path = stack.pop()!;               // get latest path
      const current = path[path.length - 1];  // peek last node

      // Found the goal!
      if (current === end) {
        return path;
      }

      if (!visited.has(current)) {
        visited.add(current);

        // Push extended paths for each neighbor
        const neighbors = this.graph.get(current) ?? new Set();
        for (const nbr of neighbors) {
          if (!visited.has(nbr)) {
            stack.push([...path, nbr]);
          }
        }
      }
    }

    // No path found
    return [];
  }
}

// Export a singleton for easy import
export default new DFSService();
