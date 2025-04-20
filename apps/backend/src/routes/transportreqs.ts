import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import {  Prisma } from "../../../../packages/database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    const requests = await PrismaClient.transportRequest.findMany({
      orderBy: { priority: "asc" },
    });
    console.log(requests);
    res.status(200).json(requests); // Send transportation data as JSON
  } catch (error) {
    console.error("Error fetching transportation request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async function (req: Request, res: Response) {
  console.log("A user entered a transportation request");
  const {priority, status, patient, department, roomNumber, employeeName, comments, transportationType, currentBuilding, desiredBuilding} = req.body;
  try {
    const createRequest = await PrismaClient.transportRequest.create({
      data: {
        employeeName,
        //employee: { connect: { id: parseInt(request.employeeID, 10) } }, //connect here
        patient,
        transportationType,
        currentBuilding,
        desiredBuilding,
        priority,
        department,
        comments,
        status,
        //assignedEmployee: employeeName //connect later
        //user: { connect: { id: request.userID } }, // connect to whatever user has that ID number
      },
    });
    // console.log(createRequest);
    res
      .status(200)
      .json({ message: "Successfully entered transportation request" });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      console.log(error);
      console.log("that user may not exist");
    } else {
      console.error("Error entering transportation request data:", error);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
