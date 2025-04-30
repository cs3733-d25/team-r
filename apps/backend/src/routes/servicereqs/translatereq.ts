import express, { Router, Request, Response } from "express";
import client from "../../bin/prisma-client.ts";
import { Prisma } from "database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    const requests = await client.translateRequest.findMany({
      orderBy: { priority: "asc" },
    });
    console.log("TRANSLATE: ", requests);
    res.status(200).json(requests); // Send sanitation data as JSON
  } catch (error) {
    console.error("Error fetching translate request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async function (req: Request, res: Response) {
  console.log("A user entered a patient request");
  const {
    priority,
    status,
    department,
    notes,
    location,
    language,
    roomNumber,
    employeeName,
  } = req.body;

  try {
    const createRequest = await client.translateRequest.create({
      data: {
        priority,
        department,
        building: location,
        status,
        roomNumber: parseInt(roomNumber, 10),
        employeeName: {
          connect: {
            id: employeeName,
          },
        },
        language,
        comments: notes,
        //assignedEmployee: employeeName //fix this to connect correctly
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

router.post("/single-request", async function (req: Request, res: Response) {
  const id = req.body.id;
  try {
    const request = await client.translateRequest.findMany({
      where: {
        translateRequestID: id,
      },
    });
    console.log("Got request TRANSLATE", request);
    res.status(200).json(request);
  } catch (error) {
    console.error("Error fetching pharmacy request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
