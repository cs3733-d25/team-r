import express, { Router } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { Prisma } from "database";

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
      where: { nodeType: "Parking" },
    });
    //console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/departments", async (req, res) => {
  try {
    //const buildingStr = req.query.building as string;
    const buildingStr = req.query.building as string;
    //console.log("building str", buildingStr);

    const request = await PrismaClient.directory.findMany({
      where: { building: buildingStr },
    });
    //console.log("departments: ", request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/check-in", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "Reception" },
    });
    //console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/entrances", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "Entrance" },
    });
    //console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/elevators", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "Elevator" },
    });
    //console.log(request);
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
          building: "Patriot Place 20",
          floor: 1,
        },
        toNode: {
          building: "Patriot Place 20",
          floor: 1,
        },
      },
      include: {
        fromNode: true,
        toNode: true,
      },
    });
    //console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
