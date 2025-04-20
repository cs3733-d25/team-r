import express, { Request, Response, Router } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { Prisma } from "database";

import PrismaClientValidationError = Prisma.PrismaClientValidationError;

const router: Router = express.Router();

router.get("/all-requests", async function (req: Request, res: Response) {
  try {
    const requests = await PrismaClient.pharmacyRequest.findMany({
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
  console.log("A user entered a pharmacy request");
  const {priority, status, department, comment, patient, location, request, employeeName, patientID,
  drugName, morningPillCount, middayPillCount, eveningPillCount, nightPillCount, days, numberOfPills, refills, additionalInstructions} = req.body;
  // console.log(request);
  try {
    await PrismaClient.pharmacyRequest.create({
      data: {
        employeeName,
        priority,
        department,
        patientID,
        // patient: { connect: { id: parseInt(request.patientID) } }, // connect to whatever patient has that ID number
        drugName,
        morningPillCount,
        middayPillCount,
        eveningPillCount,
        nightPillCount,
        days,
        numberOfPills,
        refills,
        additionalInstructions,
        status,
        //assignedEmployee: employeeName //connect later
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
