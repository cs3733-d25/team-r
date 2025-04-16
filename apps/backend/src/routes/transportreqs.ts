import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { $Enums, Prisma } from "../../../../packages/database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;
import {
  RequestPriority,
  Department,
  Building,
} from "../../../../packages/database";
import RequestStatus = $Enums.RequestStatus;
import {parseStatus} from "./enum.ts"; //here?

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

// a function to cast a string to a RequestPriority enum type
function parseRequestPriority(value: string): RequestPriority {
  return RequestPriority[value as keyof typeof RequestPriority];
}
// a function to cast a string to a Department enum type
function parseDepartment(value: string): Department {
  return Department[value as keyof typeof Department];
}

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
  console.log("A user entered a transportation request");
  const request = req.body;
  try {
    // assumes that the request is formatted with the exact fields as the TransporationRequest table in the prisma schema (packages/database/prisma/schema.prisma)
    // console.log(parseRequestPriority(request.priority));
    console.log("priority: ", request.priority);
    //console.log(request.department);
    console.log(parseDepartment(request.department));
    console.log(parseRequestPriority(request.priority));
    const createRequest = await PrismaClient.transportRequest.create({
      data: {
        employeeName: request.employeeName,
        employee: { connect: { id: parseInt(request.employeeID, 10) } }, //connect here
        patient: { connect: { id: parseInt(request.patientID, 10) } },

        transportationType: request.transportationType,
        currentBuilding: parseEnum(Building, request.currentBuilding),
        desiredBuilding: parseEnum(Building, request.desiredBuilding),

        priority: parseRequestPriority(request.priority),
        department: parseDepartment(request.department),
        comments: request.comments,
        status: await parseStatus(request.status),//
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
