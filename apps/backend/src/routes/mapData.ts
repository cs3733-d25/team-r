import express, { Router, Request, Response } from "express";
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

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

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

router.get("/edges-20-3", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "PATRIOT_PLACE_20",
          floor: 3,
        },
        toNode: {
          building: "PATRIOT_PLACE_20",
          floor: 3,
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

router.get("/edges-22-1", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "PATRIOT_PLACE_22",
          floor: 1,
        },
        toNode: {
          building: "PATRIOT_PLACE_22",
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

router.get("/edges-22-3", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "PATRIOT_PLACE_22",
          floor: 3,
        },
        toNode: {
          building: "PATRIOT_PLACE_22",
          floor: 3,
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

router.get("/edges-22-4", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "PATRIOT_PLACE_22",
          floor: 4,
        },
        toNode: {
          building: "PATRIOT_PLACE_22",
          floor: 4,
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

router.get("/edges-chestnut", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "CHESTNUT_HILL",
        },
        toNode: {
          building: "CHESTNUT_HILL",
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

router.post("/internal", async (req, res) => {
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

/*
// get departments
router.get("/departments", async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT * FROM "Node"
        WHERE "nodeType" = 'department';
        `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
*/

export default router;
