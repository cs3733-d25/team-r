import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import * as fs from "node:fs";
import * as path from "node:path";
import { toCSV } from "common/src/toCSV.ts";
import { parseCSV } from "common/src/parseCSV.ts";
import { Buildings } from "../../../../packages/database";

const router: Router = express.Router();

// export directory data as CSV
router.get("/export", async (req: Request, res: Response) => {
  try {
    const directoryData = await PrismaClient.directory.findMany();
    const csv = toCSV(directoryData);

    // set response headers
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=directory.csv");
    res.status(200).send(csv);
  } catch (error) {
    console.error("Error exporting directory data:", error);
    res.sendStatus(500);
  }
});

// a function to cast a string to a Buildings enum type
function parseBuilding(value: string): Buildings {
  return Buildings[value as keyof typeof Buildings];
}

// import directory from CSV
router.post("/import", async (req: Request, res: Response) => {
  try {
    // const absolutePath = path.join(__dirname, "../../data/csv/Directory.csv");
    // const csvFile = fs.readFileSync(absolutePath, "utf8");

    // const records = parseCSV(csvFile);
    const records = parseCSV(req.body.toString());

    const transformation = records.map((row) => ({
      id: parseInt(row.ID),
      name: row.Name,
      floorNumber: parseInt(row.floor),
      building: parseBuilding(row.Location),
    }));

    await PrismaClient.directory.createMany({
      data: transformation,
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error importing directory data:", error);
    res.sendStatus(500);
  }
});

//get all data for display
router.get("/", async (req: Request, res: Response) => {
  try {
    const currentDirectory = await PrismaClient.directory.findMany();
    //console.log("current directory", currentDirectory);
    select: {
      id: true,
          floorNumber: true,


    }
    if (currentDirectory != null) {
      res.status(200).json({
        id: currentDirectory.id,
        name: currentDirectory.name,
      });
    } else {
      res.sendStatus(200).json({ message: "Directory not found" });
    }
  } catch (error) {
    console.log("error in /");
    res.sendStatus(500);
  }
});

export default router;
