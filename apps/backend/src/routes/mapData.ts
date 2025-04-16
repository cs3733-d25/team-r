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
