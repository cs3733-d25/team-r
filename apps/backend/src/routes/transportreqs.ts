import express, { Router, Request, Response } from "express";
import client from "../bin/prisma-client.ts";
import { Prisma } from "../../../../packages/database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    const requests = await client.transportRequest.findMany({
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
  const {
    priority,
    status,
    patientID,
    department,
    roomNumber,
    //employeeName,
    comments,
    transportationType,
    currentBuilding,
    desiredBuilding,
  } = req.body;
  const employeeID = req.session?.username;
  try {
    const createRequest = await client.transportRequest.create({
      data: {
        employeeName: {
          connect: {
            id: employeeID,
          },
        },
        //employee: { connect: { id: parseInt(request.employeeID, 10) } }, //connect here
        patient: {
          connect: { id: req.body.patientID }, // <-- Use relation connect
        },
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

router.post("/single-request", async function (req: Request, res: Response) {
  const id = req.body.id;
  try {
    const request = await client.transportRequest.findMany({
      where: {
        employeeRequestID: id,
      },
    });
    console.log("Got request ", request);
    res.status(200).json(request);
  } catch (error) {
    console.error("Error fetching pharmacy request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
