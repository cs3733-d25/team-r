import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { Prisma } from "database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;
import {
  RequestPriority,
  Department,
  Building,
  RequestStatus,
} from "database";

const router: Router = express.Router();
router.get("/", async function (req: Request, res: Response) {
  try {
    const requests = await PrismaClient.patientRequest.findMany({
      orderBy: { priority: "asc" },
    });
    console.log(requests);
    res.status(200).json(requests); // Send sanitation data as JSON
  } catch (error) {
    console.error("Error fetching sanitation request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//generic enum parse
function parseEnum<T extends { [key: string]: string | number }>(
  enumType: T,
  value: string,
): T[keyof T] {
  if (value in enumType) {
    return enumType[value as keyof T];
  }
  throw new Error(`Invalid enum value: ${value}`);
}

router.post("/", async function (req: Request, res: Response) {
  console.log("A user entered a patient request");
  const request = req.body;

  try {
    const createRequest = await PrismaClient.patientRequest.create({
      data: {
        patient: { connect: { id: parseInt(request.patientID, 10) } },
        priority: parseEnum(RequestPriority, request.priority),
        department: parseEnum(Department, request.department),
        location: parseEnum(Building, request.location),
        status: RequestStatus.cancelled,
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