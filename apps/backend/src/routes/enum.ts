import express, { Request, Response, Router } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { Department, Prisma, RequestPriority } from "database";
import Prisma__DepartmentsClient = Prisma.Prisma__DepartmentsClient;

const router: Router = express.Router();

// a function to cast a string to a RequestPriority enum type
// value must match the exact name of the Enum (so can not have spaces, slashes, etc)
export function parseRequestPriority(value: string): RequestPriority {
  return RequestPriority[value as keyof typeof RequestPriority];
}

// a function to cast a string to a Department enum type
// uses look up table in database so that special characters can be stored
export async function parseDepartment(value: string): Promise<Department> {
  // return Department type
  return PrismaClient.departments
    .findFirstOrThrow({
      where: { name: value },
    })
    .then((row) => {
      return row.type;
    });
}

router.get("/:table", async function (req: Request, res: Response) {
  try {
    console.log("priorities types requested");
    // format departments as an array of strings, and then return it to the client

    // query the database to get an array of rows
    let names: string[] = [];
    let rows;
    switch (req.params.table) {
      case "departments":
        rows = await PrismaClient.departments.findMany({
          select: { name: true },
        });
        names = rows.map((row) => {
          return row.name;
        });
        console.log(names);
        break;
      case "priorities":
        rows = await PrismaClient.priorities.findMany({
          select: { name: true },
        });
        names = rows.map((row) => {
          return row.name;
        });
        break;
      case "statuses":
        rows = await PrismaClient.statuses.findMany({
          select: { name: true },
        });
        names = rows.map((row) => {
          return row.name;
        });
        break;
    }
    if (names.length > 0) {
      // return the names
      res.status(200).json(names);
    } else {
      console.error(
        "Error fetching department data: that table does NOT exist",
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error fetching department data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
