import express, { Request, Response, Router } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { Prisma } from "database";
import {
  parseDepartment,
  parseRequestPriority,
  parseBuilding,
  parseStatus,
} from "./enum.ts";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

const router: Router = express.Router();

router.get("/all-requests", async function (req: Request, res: Response) {
  try {
    const requests = await PrismaClient.deviceRequest.findMany({
      orderBy: { priority: "asc" },
    });
    console.log(requests);
    res.status(200).json(requests); // Send sanitation data as JSON
  } catch (error) {
    console.error("Error fetching pharmacy request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async function (req: Request, res: Response) {
  console.log("A user entered a device request");
  const request = req.body;
  // console.log(request);
  try {
    await PrismaClient.deviceRequest.create({
      data: {
        deviceType: request.deviceType, // connect to whatever employee has that ID number
        priority: parseRequestPriority(request.priority),
        room: request.room,
        department: await parseDepartment(request.deparment),
        comments: request.comment,
        employeeName: request.employeeName,
        employeeID: request.employeeID,
        status: await parseStatus(request.status),
        // also a timestamp of when it was submitted?
      },
    });
    res.status(200).json({ message: "Successfully entered pharmacy request" });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      console.log(error);
      console.log("that user may not exist");
    } else {
      console.error("Error entering pharmacy request data:", error);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
