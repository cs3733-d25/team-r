import express, { Router } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { Prisma } from "database";
import { Building } from "database";

export interface Node {
  nodeID: string;
  nodeType: string;
  building: string;
  floor: number;
  xcoord: number;
  ycoord: number;
  longName: string;
  shortName: string;
}

export interface Edge {
  edgeID: string;
  fromID: string;
  toID: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

const router: Router = express.Router();

// get parking lots
router.get("/parking-lots", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "parking" },
    });
    console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/departments", async (req, res) => {
  try {
    const buildingStr = req.query.building as string;

    // Create the where clause with correct enum reference
    const whereClause = buildingStr
      ? { building: buildingStr as Building }
      : {};

    const request = await PrismaClient.directory.findMany({
      where: whereClause,
    });

    // Transform to match frontend expectations
    const formattedDepartments = request.map((dept) => ({
      key: dept.id.toString(),
      value: dept.id.toString(),
      label: dept.name,
    }));

    res.json(formattedDepartments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/check-in", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "reception" },
    });
    console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/entrances", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "entrance" },
    });
    console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/elevators", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "elevator" },
    });
    console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/edges-20-1", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "PATRIOT_PLACE_20",
          floor: 1,
        },
        toNode: {
          building: "PATRIOT_PLACE_20",
          floor: 1,
        },
      },
      include: {
        fromNode: true,
        toNode: true,
      },
    });
    console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
