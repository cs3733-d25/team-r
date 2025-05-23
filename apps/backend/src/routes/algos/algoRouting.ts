import express, { Router, Request, Response } from "express";
import { findPath } from "./algoSelection.ts";
import client from "../../bin/prisma-client.ts";
import { Graph } from "../maps/Graph.ts";
import { BFS } from "./bfs.ts";
import DFS from "./dfs.ts";
import { AStar } from "./aStar.ts";

const router: Router = express.Router();

router.post(
  "/reception",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { department, location } = req.body;
      let locationFormat = "";
      if (location.includes("Chestnut Hill")) {
        locationFormat = "Healthcare Center (Chestnut Hill)";
      } else if (location.includes("20 Patriot")) {
        locationFormat = "Healthcare Center (20 Patriot Pl.)";
      } else if (location.includes("22 Patriot")) {
        locationFormat = "Healthcare Center (22 Patriot Pl.)";
      } else if (location.includes("Faulkner")) {
        locationFormat = "Faulkner Hospital";
      } else if (location.includes("75 Francis St")) {
        locationFormat = "Main Campus Hospital (75 Francis St.)";
      }
      if (!department || !location) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const response = await client.directory.findFirst({
        where: {
          id: department,
          building: locationFormat,
        },
        select: { receptionNodeID: true },
      });

      //find the algorithm in the database
      let algorithm: string;
      const algorithmDB = await client.algorithm.findFirst();
      if (!algorithmDB) {
        algorithm = "bfs";
      } else {
        algorithm = algorithmDB.algo.toString();
      }
      console.log("this is the algorithm in algoRouting: ", algorithm);

      if (!response) {
        res.status(404).json({ error: "Department not found" });
        return;
      }
      console.log("response: ", response.receptionNodeID);

      res.json({ receptionNodeID: response.receptionNodeID });
    } catch (err) {
      console.error("Error fetching receptionNodeID:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

router.post("/fetchPath", async function (req: Request, res: Response) {
  const { startingPoint, endingPoint, algorithm } = req.body;
  console.log(" startingPoint in algoRouting", startingPoint);
  console.log(" endingPoint in algoRouting", endingPoint);
  console.log(" algorithm in algoRouting", algorithm);

  try {
    const path = await findPath(startingPoint, endingPoint, algorithm);
    console.log("path in algoRouting.ts", path);

    res.status(200).json(path);
  } catch (error) {
    console.error("Pathfinding error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/setalgo", async function (req: Request, res: Response) {
  const { algo } = req.body;

  try {
    const updatedAlgo = await client.algorithm.updateMany({
      where: {},
      data: { algo: algo },
    });

    res.status(200).json(updatedAlgo);
  } catch (error) {
    console.error("Error updating algorithm:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/accessible-route", async function (req: Request, res: Response) {
  const { startingPoint, endingPoint, algorithm } = req.body;

  try {
    const graph = new Graph();
    await graph.loadGraph();

    await graph.filterAccessibleNodes();

    let path;
    switch (algorithm) {
      case "bfs":
        const bfs = new BFS(graph);
        path = await bfs.findPath(startingPoint, endingPoint);
        break;
      case "dfs":
        const dfs = new DFS(graph);
        path = await dfs.findPath(startingPoint, endingPoint);
        break;
      case "astar":
        const astar = new AStar(graph);
        path = await astar.findPath(startingPoint, endingPoint);
        break;
      default:
        const defaultAstar = new AStar(graph);
        path = await defaultAstar.findPath(startingPoint, endingPoint);
    }

    res.status(200).json(path);
  } catch (error) {
    console.error("Accessible route error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/", async function (req: Request, res: Response) {
  console.log("in /algo/ requests");

  try {
    const algorithm = await client.algorithm.findFirst();

    console.log("Algorithm:", algorithm);
    res.status(200).json(algorithm); // Send employee data as JSON
  } catch (error) {
    console.error("Error fetching algorithm:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
