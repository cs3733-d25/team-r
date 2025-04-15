import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
const prisma = new PrismaClient();
const router: Router = express.Router();

interface NodeData {
  id: string;
  name: string;
  type: string;
  xPos: number;
  yPos: number;
}

  //does the Breadth First Search (BFS)
  async function BFS(start: string, end: string): Promise<string[]> {
    const visited = new Set<string>(); //visited list
    const queue: string[][] = [[start]]; //where to go next

    const startNode = await PrismaClient.Node.findMany({
      where: {
        
    });
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
        const neighbors = graph.get(currentID);

        for (const neighborId of neighbors) {
          if (!visited.has(neighborId)) {
            queue.push([...path, neighborId]); //add neighbors to the queue
          }
        }
      }
    }

    return []; // No path found
  }
}

//send data to front end
router.post("/", async function (req: Request, res: Response) {
  const { startingPoint, endingPoint } = req.body;
  console.log("Starting BFS algorithm");

  try {
    const pf = BFS(startingPoint, endingPoint);
    if (pf.length > 0) {
      res.status(200).json(pf);
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

export default router;
