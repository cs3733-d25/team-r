import express, { Router, Request, Response } from "express";
import PrismaClient from "../../bin/prisma-client.ts";
const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  console.log("hello employee");

  try {
    const employee = await PrismaClient.employee.findMany();
    console.log(employee);
    res.status(200).json(employee); // Send employee data as JSON
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
