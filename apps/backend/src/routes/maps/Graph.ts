import client from "../../bin/prisma-client";

export class Graph {
  private adjacencyList = new Map<string, Set<string>>();
  // map to store edge weights; default weight = 1 if not set
  private weightMap = new Map<string, Map<string, number>>();
  // optional: store node positions for heuristic (x,y)
  private positions = new Map<string, { x: number; y: number }>();

  constructor() {}

  // building graph from prisma; here we assume each edge has optional weight
  public async loadGraph(): Promise<void> {
    // 1) Load node positions from Prisma's Node model
    const nodes = await client.node.findMany();
    for (const node of nodes) {
      // Prisma Node fields: nodeID, xcoord, ycoord
      this.positions.set(node.nodeID, { x: node.xcoord, y: node.ycoord });
    }

    // 2) Load edges from Prisma's Edge model and build adjacency + weights
    const edges = await client.edge.findMany();
    for (const edge of edges) {
      const { fromID, toID } = edge;

      // initialize adjacency
      if (!this.adjacencyList.has(fromID)) this.adjacencyList.set(fromID, new Set());
      if (!this.adjacencyList.has(toID)) this.adjacencyList.set(toID,   new Set());
      this.adjacencyList.get(fromID)!.add(toID);
      this.adjacencyList.get(toID)!.add(fromID);

      // initialize weight maps
      if (!this.weightMap.has(fromID)) this.weightMap.set(fromID, new Map());
      if (!this.weightMap.has(toID))   this.weightMap.set(toID,   new Map());

      // compute Euclidean weight from stored positions
      const p1 = this.positions.get(fromID)!;
      const p2 = this.positions.get(toID)!;
      const w  = Math.hypot(p1.x - p2.x, p1.y - p2.y);

      this.weightMap.get(fromID)!.set(toID, w);
      this.weightMap.get(toID)!.set(fromID, w);
    }
  }

  /** Return neighbors of a node */
  getNeighbors(node: string): string[] {
    return Array.from(this.adjacencyList.get(node) ?? []);
  }

  /** Return all node IDs */
  getAllNodeIDs(): string[] {
    return Array.from(this.adjacencyList.keys());
  }

  /** Return the weight of edge u→v (or 1 if not set) */
  public getEdgeWeight(u: string, v: string): number {
    return this.weightMap.get(u)?.get(v) ?? 1;
  }

  /** Return stored position {x,y} of node (or origin if not set) */
  public getNodePosition(id: string): { x: number; y: number } {
    return this.positions.get(id) ?? { x: 0, y: 0 };
  }
}
