import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    const requests = await PrismaClient.sanitationRequest.findMany();
    console.log(requests);
    res.status(200).json(requests); // Send sanitation data as JSON
  } catch (error) {
    console.error("Error fetching sanitation request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async function (req: Request, res: Response) {
  console.log("A user entered a sanitation request");
  const request = req.body;
  console.log("Room: " + request.room);
  try {
    // assumes that the request is formatted with the exact fields as the SanitationRequest table in the prisma schema (packages/database/prisma/schema.prisma)
    const createRequest = await PrismaClient.sanitationRequest.create({
      data: request,
    });
    // console.log(createRequest);
    res
      .status(200)
      .json({ message: "Successfully entered sanitation request" });
  } catch (error) {
    console.error("Error entering service request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
