import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";

const router: Router = express.Router();
/*
router.get("/", async function (req: Request, res: Response) {
  console.log("hello assigned");

  try {
    const assigned = await PrismaClient.deviceRequest.findMany({
      where: {
        assignedEmployeeId: { not: null },
      },
    });
    console.log(assigned);
    res.status(200).json(assigned); // Send employee data as JSON
  } catch (error) {
    console.error("Error fetching assigned employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});*/

export default router;
