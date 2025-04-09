import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { Prisma } from "../../../../packages/database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;
import { RequestPriority, Department } from "../../../../packages/database";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    const requests = await PrismaClient.sanitationRequest.findMany();
    console.log(requests);
    res.status(200).json(requests); // Send sanitation data as JSON
  } catch (error) {
    console.error("Error fetching sanitation request data:", error);
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

router.post("/", async function (req: Request, res: Response) {
  console.log("A user entered a sanitation request");
  const request = req.body;
  console.log("Room: " + request.room);
  try {
    // assumes that the request is formatted with the exact fields as the SanitationRequest table in the prisma schema (packages/database/prisma/schema.prisma)
    console.log(parseRequestPriority(request.priority));
    console.log(request.priority);
    const createRequest = await PrismaClient.sanitationRequest.create({
      data: {
        sanitationType: request.sanitationType,
        priority: parseRequestPriority(request.priority),
        department: parseDepartment(request.department),
        roomNumber: request.room,
        comments: request.comments,
        user: { connect: { id: request.userID } }, // connect to whatever user has that ID number
      },
    });
    // console.log(createRequest);
    res
      .status(200)
      .json({ message: "Successfully entered sanitation request" });
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
