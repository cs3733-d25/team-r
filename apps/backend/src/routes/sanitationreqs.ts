import express, { Router, Request, Response } from "express";
import client from "../bin/prisma-client.ts";
import { Prisma } from "../../../../packages/database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    const requests = await client.sanitationRequest.findMany({
      orderBy: { priority: "asc" },
    });
    console.log(requests);
    res.status(200).json(requests); // Send sanitation data as JSON
  } catch (error) {
    console.error("Error fetching sanitation request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async function (req: Request, res: Response) {
  console.log("A user entered a sanitation request");
  const {
    priority,
    status,
    department,
    location,
    roomNumber,
    //employeeName,
    comments,
    sanitationType,
  } = req.body;
  const employeeName = req.session?.username;

  try {
    const createRequest = await client.sanitationRequest.create({
      data: {
        employeeID: employeeName,
        sanitationType,
        priority,
        department,
        location,
        roomNumber,
        comments,
        status,
      },
    });
    // console.log(createRequest);
    res
      .status(200)
      .json({ message: "Successfully entered sanitation request" });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      console.log(error);
      console.log("that user may not exist");
    } else {
      console.error("Error entering service request data:", error);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
