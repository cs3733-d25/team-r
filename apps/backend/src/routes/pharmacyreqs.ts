import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { Prisma, RequestPriority, Department } from "database";
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

router.get("/departments", async function (req: Request, res: Response) {
  try {
    console.log("department types requested");
    // format departments as an array of strings, and then return it to the client

    // res.status(200).json(Object.values(Department)); // uglier way to do it

    // query the database to get an array of rows
    let departmentList = await PrismaClient.departments
      .findMany({
        select: {
          departmentName: true,
        },
      })
      .then((rows) => {
        // parse the names out of their rows
        return rows.map((row) => {
          return row.departmentName;
        });
      });

    // return the rows
    res.status(200).json(departmentList);
  } catch (error) {
    console.error("Error fetching department data:", error);
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
  console.log("A user entered a pharmacy request");
  const request = req.body;
  console.log(request);
  try {
    // assumes that the request is formatted with the exact fields as the SanitationRequest table in the prisma schema (packages/database/prisma/schema.prisma)
    console.log(parseDepartment(request.department));
    console.log(parseRequestPriority(request.priority));
    await PrismaClient.pharmacyRequest.create({
      data: {
        employee: { connect: { id: request.employeeID } }, // connect to whatever employee has that ID number
        priority: parseRequestPriority(request.priority),
        department: parseDepartment(request.department),
        patient: { connect: { id: request.patientID } }, // connect to whatever patient has that ID number
        drugName: request.drugName,
        morningPillCount: request.morningPillCount,
        middayPillCount: request.middayPillCount,
        eveningPillCount: request.eveningPillCount,
        nightPillCount: request.nightPillCount,
        days: request.days,
        numberOfPills: request.numberOfPills,
        refills: request.refills,
        additionalInstructions: request.additionalInstructions,
        // also a timestamp of when it was submitted?
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
