import prismaClient from "../bin/prisma-client";

export class Graph {
  private adjacencyList = new Map<string, Set<string>>();

    constructor() {}

    //building graph from prisma
    public async loadGraph(): Promise<void> {
        const edges = await prismaClient.edge.findMany();
        for (const { fromID, toID } of edges) {
            if (!this.adjacencyList.has(fromID)) this.adjacencyList.set(fromID, new Set());
            if (!this.adjacencyList.has(toID)) this.adjacencyList.set(toID, new Set());
            this.adjacencyList.get(fromID)!.add(toID);
            this.adjacencyList.get(toID)!.add(fromID);
        }
    }

    public getNeighbors(node: string): Set<string> {
        return this.adjacencyList.get(node) ?? new Set();
    }

    public getNodes(): IterableIterator<string> {
        return this.adjacencyList.keys();
    }
}