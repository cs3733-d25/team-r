import express, { Router, Request, Response } from "express";
import PrismaClient from "../../bin/prisma-client.ts";
const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    const employee = async () => {
      await PrismaClient.employee.findMany();
    };
    console.log(employee);
    res.status(200).json(employee); // Send employee data as JSON
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/assigned", async function (req: Request, res: Response) {
  try {
    const employees = await PrismaClient.employee.findMany({
      where: { role: { notIn: ["Admin", "Administrator"] } },
    });
    console.log("employees from /assigned route: ", employees);
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employee:", error);
  }
});

export default router;
