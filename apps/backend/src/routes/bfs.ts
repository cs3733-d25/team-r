import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
const router: Router = express.Router();
const prisma = new PrismaClient();



  //does the Breadth First Search (BFS)
  async function BFS(start: string, end: string): Promise<string[]> {
    const visited = new Set<string>(); //visited list
    const queue: string[][] = [[start]]; //where to go next

    //const nodes = await prisma.nodes.findMany()
    const edges = await prisma.edge.findMany();

    const graph = new Map<string, Set<string>>();

    for (const edge of edges) {
      if (!graph.has(edge.fromNodeID)) graph.set(edge.fromNodeID, new Set());
      if (!graph.has(edge.toNodeID)) graph.set(edge.toNodeID, new Set());

      graph.get(edge.fromNodeID)!.add(edge.toNodeID);
      graph.get(edge.toNodeID)!.add(edge.fromNodeID);
    }

    while (queue.length > 0) {
      //while we have nodes to visit
      const path = queue.shift();
      if (!path) continue;

      const currentID = path[path.length - 1];

      if (currentID === end) {
        //at destination
        return path;
      }

      if (!visited.has(currentID)) {
        //have we been here? If not...
        visited.add(currentID); //add to visited list
        const neighbors = graph.get(currentID) || new Set();

        for (const neighborId of neighbors) {
          if (!visited.has(neighborId)) {
            queue.push([...path, neighborId]); //add neighbors to the queue
          }
        }
      }
    }

    return []; // No path found
  }


//send data to front end
router.post("/", async function (req: Request, res: Response) {
  const { startingPoint, endingPoint } = req.body;
  console.log("Starting BFS algorithm");

  try {
    const path = await BFS(startingPoint, endingPoint);
    //const pf = BFS(startingPoint, endingPoint);
    if (path.length > 0) {
      res.status(200).json(path);
    } else {
      res.status(404).json({
        message:
          "Path not found between " +
          startingPoint +
          " and " +
          endingPoint +
          " and " +
          endingPoint,
      });
    }
  } catch (error) {
    console.error("Pathfinding error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/full", async (req: Request, res: Response) => {
  try {
    const nodes: Node[] = await prisma.node.findMany();
    const edges: Edge[] = await prisma.edge.findMany();

    res.json({
      nodes,
      edges
    });
  } catch (error) {
    console.error("Failed to load full graph:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

