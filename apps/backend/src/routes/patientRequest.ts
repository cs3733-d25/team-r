import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { $Enums, Prisma } from "../../../../packages/database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;
import {
  RequestPriority,
  Department,
  Buildings,
  RequestStatus,
} from "../../../../packages/database";

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
// a function to cast a string to a RequestPriority enum type
function parseRequestPriority(value: string): RequestPriority {
  return RequestPriority[value as keyof typeof RequestPriority];
}
// a function to cast a string to a Department enum type
function parseDepartment(value: string): Department {
  return Department[value as keyof typeof Department];
}
// a function to cast a string to a Department enum type
function parseBuilding(value: string): Buildings {
  return Buildings[value as keyof typeof Buildings];
}

router.post("/", async function (req: Request, res: Response) {
  console.log("A user entered a patient request");
  const request = req.body;

  try {
    // console.log(parseRequestPriority(request.priority));
    console.log("priority: ", request.priority);
    console.log("unparsed department: ", request.department);
    console.log("parseDepartment parse: ", parseDepartment(request.department));
    console.log("parseenum parse: ", parseEnum(Department, request.department));
    console.log("pare priority: ", parseRequestPriority(request.priority));
    const createRequest = await PrismaClient.patientRequest.create({
      data: {
        //requestType: request.sanitationType,
        patient: { connect: { id: parseInt(request.patientID, 10) } },
        priority: parseRequestPriority(request.priority),
        department: parseDepartment(request.department),
        location: parseEnum(Buildings, request.location),
        status: RequestStatus.cancelled,
        //user: { connect: { id: request.userID } }, // connect to whatever user has that ID number
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
