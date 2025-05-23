import express, { Router, Request, Response } from "express";
import client from "../../bin/prisma-client.ts";
import { Prisma } from "database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    const requests = await client.deviceRequest.findMany({
      orderBy: { priority: "asc" },
    });
    console.log(requests);
    res.status(200).json(requests); // Send employee data as JSON
  } catch (error) {
    console.error("Error fetching med device:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/priority", async function (req: Request, res: Response) {
  try {
    const requests = await client.deviceRequest.findMany({
      orderBy: { priority: "asc" },
    });
    const priorities = requests.map((request) => request.priority);
    console.log(priorities);
    res.status(200).json(priorities); // Send priorities data as JSON
  } catch (error) {
    console.error("Error fetching sanitation priorities data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/location", async function (req: Request, res: Response) {
  try {
    const requests = await client.deviceRequest.findMany({
      orderBy: { priority: "asc" },
    });
    const locations = requests.map((request) => request.building);
    console.log(locations);
    res.status(200).json(locations); // Send priorities data as JSON
  } catch (error) {
    console.error("Error fetching sanitation priorities data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/", async function (req: Request, res: Response) {
  console.log("A user entered a med device request");
  const {
    priority,
    status,
    department,
    comment,
    patient,
    building,
    request,
    device,
    room,
    employeeName,
    assignedEmployee,
  } = req.body;
  console.log("HERE BUILDING: ", req.body.building);
  try {
    console.log("deviceType: ", device);
    const createRequest = await client.deviceRequest.create({
      data: {
        deviceType: device,
        comments: comment,
        //patient: { connect: { id: parseInt(request.patientID, 10) } },
        priority,
        building,
        department,
        status,
        room,
        employeeName: {
          connect: {
            id: employeeName,
          },
        },
        assignedEmployee: {
          connect: {
            id: assignedEmployee,
          },
        },
      },
    });
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

router.post("/single-request", async function (req: Request, res: Response) {
  const id = req.body.id;
  try {
    const request = await client.deviceRequest.findMany({
      where: {
        requestId: id,
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
