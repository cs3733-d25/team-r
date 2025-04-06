import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    const request = await PrismaClient.deviceRequest.findMany();
    console.log(request);
    res.status(200).json(request); // Send sanitation data as JSON
  } catch (error) {
    console.error("Error fetching sanitation request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
