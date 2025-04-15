import express, { Request, Response, Router } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { Department, RequestPriority } from "database";

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
      where: { departmentName: value },
    })
    .then((row) => {
      return row.departmentType;
    });
}

router.get("/departments", async function (req: Request, res: Response) {
  try {
    console.log("department types requested");
    // format departments as an array of strings, and then return it to the client

    // res.status(200).json(Object.values(Department));
    // ^^ this uses the Enum names, so it does not make an SQL call, but it also
    // does not include support for special characters (including spaces)

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

export default router;
