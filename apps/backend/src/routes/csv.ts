import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import * as fs from "node:fs";
import * as path from "node:path";
import { toCSV } from "common/src/toCSV.ts";
import { parseCSV } from "common/src/parseCSV.ts";
import { Building } from "../../../../packages/database";
import multer from "multer";

const router: Router = express.Router();

// Set up Multer storage and file handling
const storage = multer.memoryStorage(); // Store the file in memory for easier processing
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}); // Limit file size to 10MB

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
function parseBuilding(value: string): Building {
  return Building[value as keyof typeof Building];
}

// import directory from CSV
router.post(
  "/import",
  upload.single("csvfile"),
  async (req: Request, res: Response) => {
    try {
      // const absolutePath = path.join(__dirname, "../../data/csv/Directory.csv");
      // const csvFile = fs.readFileSync(absolutePath, "utf8");

      // const records = parseCSV(csvFile);
      // The uploaded file is available in req.file.buffer
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
      } else {
        const csvFileBuffer = req.file.buffer;

        // Convert buffer to string (UTF-8)
        const csvData = csvFileBuffer.toString("utf-8");

        // Parse the CSV data
        const records = parseCSV(csvData);

        const transformation = records.map((row) => ({
          id: parseInt(row.id),
          name: row.name,
          floorNumber: parseInt(row.floorNumber),
          building: parseBuilding(row.building),
        }));

        // create a call to prisma to insert the new entries to the directory table
        PrismaClient.directory
          .createMany({
            data: transformation,
          })
          .then(() => {
            // wait until the call has finished to send the sendStatus
            res.sendStatus(200);
          });
      }
    } catch (error) {
      console.error("Error importing directory data:", error);
      res.sendStatus(500);
    }
  },
);

//get all data for display
router.get("/", async (req: Request, res: Response) => {
  try {
    const currentDirectory = await PrismaClient.directory.findMany({
      orderBy: [{ building: "asc" }, { floorNumber: "asc" }],
    });
    //console.log("current directory", currentDirectory);
    if (currentDirectory != null) {
      res.status(200).json({
        currentDirectory,
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
