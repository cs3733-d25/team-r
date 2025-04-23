import express, { Router, Request, Response } from "express";
import { findPath } from "./algoSelection.ts";
import PrismaClient from "../bin/prisma-client.ts";
import { Prisma } from "database";
const router: Router = express.Router();

router.post("/reception", async (req: Request, res: Response) => {
  try {
    const { department, location } = req.body;

    if (!department || !location ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await PrismaClient.directory.findFirst({
      where: {
        name: department,
        building: location,
      },
      select: { receptionNodeID: true },
    });

    if (!response) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.json({ receptionNodeID: response.receptionNodeID });
  } catch (err) {
    console.error("Error fetching receptionNodeID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/", async function (req: Request, res: Response) {
  const { startingPoint, endingPoint, algorithm } = req.body;
  console.log(" startingPoint in algoRouting", startingPoint);
  console.log(" endingPoint in algoRouting", endingPoint.toString());
  console.log(" algorithm in algoRouting", algorithm);

  try {
    const path = await findPath(
      startingPoint,
      endingPoint.toString(),
      algorithm,
    );
    console.log("path in algoRouting.ts", path);

    res.status(200).json(path);
  } catch (error) {
    console.error("Pathfinding error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
