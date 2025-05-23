import express, { Request, Response, Router } from "express";
import client from "../../bin/prisma-client.ts";
import { Prisma } from "database";

import PrismaClientValidationError = Prisma.PrismaClientValidationError;

const router: Router = express.Router();

router.get("/all-requests", async function (req: Request, res: Response) {
  try {
    const requests = await client.pharmacyRequest.findMany({
      orderBy: { priority: "asc" },
    });
    console.log(requests);
    res.status(200).json(requests); // Send sanitation data as JSON
  } catch (error) {
    console.error("Error fetching pharmacy request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/priority", async function (req: Request, res: Response) {
  try {
    const requests = await client.pharmacyRequest.findMany({
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
    const requests = await client.pharmacyRequest.findMany({
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
  console.log("A user entered a pharmacy request");
  const {
    priority,
    status,
    department,
    comment,
    patient,
    building,
    request,
    employeeName,
    patientID,
    drugName,
    morningPillCount,
    middayPillCount,
    eveningPillCount,
    nightPillCount,
    days,
    numberOfPills,
    refills,
    additionalInstructions,
    assignedEmployee,
  } = req.body;
  try {
    await client.pharmacyRequest.create({
      data: {
        employeeName: {
          connect: {
            id: employeeName,
          },
        },
        building,
        priority,
        department,
        patientID,
        // patient: { connect: { id: parseInt(request.patientID) } }, // connect to whatever patient has that ID number
        drugName,
        morningPillCount: parseInt(morningPillCount),
        middayPillCount: parseInt(middayPillCount, 10),
        eveningPillCount: parseInt(eveningPillCount, 10),
        nightPillCount: parseInt(nightPillCount, 10),
        days: parseInt(days),
        numberOfPills: parseInt(numberOfPills),
        refills: parseInt(refills),
        additionalInstructions,
        status,
        assignedEmployee: {
          connect: {
            id: assignedEmployee,
          },
        },
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

router.post("/single-request", async function (req: Request, res: Response) {
  const id = req.body.id;
  try {
    const request = await client.pharmacyRequest.findMany({
      where: {
        prescriptionID: id,
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
