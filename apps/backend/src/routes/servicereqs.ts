import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { Prisma } from "database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;
import {
  parseBuilding,
  parseDepartment,
  parseDevice,
  parsePriority,
  parseStatus,
} from "./enum.ts";


const router: Router = express.Router();

// router.get("/", async function (req: Request, res: Response) {
//   console.log("hello requests");
//
//   try {
//     const request = await PrismaClient.devices.findMany();
//     console.log(request);
//     res.status(200).json(request); // Send employee data as JSON
//   } catch (error) {
//     console.error("Error fetching assigned employee:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
router.get("/", async function (req: Request, res: Response) {
  console.log("hello requests");

  try {
    const requests = await PrismaClient.deviceRequest.findMany({
      orderBy: { priority: "asc" },
    });
    console.log(requests);
    res.status(200).json(requests); // Send employee data as JSON
  } catch (error) {
    console.error("Error fetching med device:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async function (req: Request, res: Response) {
  console.log("A user entered a med device request");
  const request = req.body;

  try {
    console.log(request);
    const createRequest = await PrismaClient.deviceRequest.create({
      data: {
        deviceType: await parseDevice(request.device),
        //patient: { connect: { id: parseInt(request.patientID, 10) } },
        priority: await parsePriority(request.priority),
        department: await parseDepartment(request.department),
        status: await parseStatus(request.status),
        room: request.room,
        comments: request.comments,
        employeeName: request.employeeName,
        employeeID: parseInt(request.employeeID),
      },
    });
    // console.log(createRequest);
    res.status(200).json({ message: "Successfully entered patient request" });
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
