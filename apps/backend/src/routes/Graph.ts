import client from "../bin/prisma-client";

export class Graph {
  private adjacencyList = new Map<string, Set<string>>();

  constructor() {}

  //building graph from prisma
  public async loadGraph(): Promise<void> {
    const edges = await client.edge.findMany();
    for (const { fromID, toID } of edges) {
      if (!this.adjacencyList.has(fromID))
        this.adjacencyList.set(fromID, new Set());
      if (!this.adjacencyList.has(toID))
        this.adjacencyList.set(toID, new Set());
      this.adjacencyList.get(fromID)!.add(toID);
      this.adjacencyList.get(toID)!.add(fromID);
    }
  }

  // public getNeighbors(node: string): Set<string> {
  //   return this.adjacencyList.get(node) ?? new Set();
  // }
  getNeighbors(node: string): string[] {
    return Array.from(this.adjacencyList.get(node) ?? []);
  }

  public getNodes(): IterableIterator<string> {
    return this.adjacencyList.keys();
  }

  getAllNodeIDs(): string[] {
    return Array.from(this.adjacencyList.keys());
  }
}
