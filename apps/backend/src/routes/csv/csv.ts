import express, { Router, Request, Response } from "express";
import client from "../../bin/prisma-client.ts";
import * as fs from "node:fs";
import * as path from "node:path";
import { toCSV } from "common/src/toCSV.ts";
import { parseCSV } from "common/src/parseCSV.ts";
import multer from "multer";

const router: Router = express.Router();

// Set up Multer storage and file handling
const storage = multer.memoryStorage(); // Store the file in memory for easier processing
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}); // Limit file size to 10MB

/**
 * This function filters the directory to the four fields, whether from Directory or CSVDatabase.
 * @param directoryData the data from the database
 */
function filterDirectory(
  directoryData:
    | { id: number; name: string; floorNumber: number; building: string }[]
    | {
        id: number;
        name: string;
        floorNumber: number;
        building: string;
        receptionNodeID: string | null;
      }[],
) {
  return directoryData.map((directory) => {
    //CSV files will allow commas if encased in double quotes, which is why the two string fields (name and building) are
    //concatenated with double quotes. This does mean that if a directory name contains double quotes then it will not be
    //exported properly and will likely break the CSV, but no names have double quotes in our database.
    return {
      id: directory.id,
      name: addDoubleQuotes(directory.name),
      floorNumber: directory.floorNumber,
      building: addDoubleQuotes(directory.building),
    };
  });
}

/**
 * This function takes in a string and returns the same string but with no double quotes.
 * @param str the string that should not have double quotes
 */
function removeDoubleQuotes(str: string) {
  const regex = new RegExp('"', "g");
  return str.replace(regex, "");
}

/**
 * What if you decided that you regretted running the last function? Here's where this one
 * comes in to save you. This function takes in a string and adds double quotes around it,
 * which I suppose you can remove again if you want to.
 * @param str the string that should have double quotes
 */
function addDoubleQuotes(str: string) {
  return '"'.concat(str).concat('"');
}

// export directory data as CSV
router.get("/export", async (req: Request, res: Response) => {
  try {
    //returns directory info if there is nothing in the CSV database
    if ((await client.cSVDatabase.count()) < 1) {
      const directoryData = await client.directory.findMany();
      //filters directory data since it includes reception ids, which shouldn't be in the CSV database
      const directoryDataFiltered = filterDirectory(directoryData);
      const csv = toCSV(directoryDataFiltered);

      // set response headers
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=directory.csv",
      );
      res.status(200).send(csv);
    } else {
      //otherwise, gets and exports the CSV file that was imported
      const directoryData = await client.cSVDatabase.findMany();
      const directoryDataFiltered = filterDirectory(directoryData);
      const csv = toCSV(directoryDataFiltered);

      // set response headers
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=directory.csv",
      );
      res.status(200).send(csv);
    }
  } catch (error) {
    console.error("Error exporting directory data:", error);
    res.sendStatus(500);
  }
});

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

        //removes double quotes to stop any errors caused by adding the double quotes in export
        const transformation = records.map((row) => ({
          id: parseInt(row.id),
          name: removeDoubleQuotes(row.name),
          floorNumber: parseInt(row.floorNumber),
          building: removeDoubleQuotes(row.building),
        }));

        //checks if transformed correctly
        for (const row of transformation) {
          if (
            !row.name ||
            !row.building ||
            Number.isNaN(row.id) ||
            Number.isNaN(row.floorNumber)
          ) {
            throw new Error("File not formatted correctly.");
          }
        }

        // deletes everything from the directory database
        await client.cSVDatabase.deleteMany({});

        // create a call to prisma to insert the new entries to the directory table
        client.cSVDatabase
          .createMany({
            data: transformation,
          })
          .then(() => {
            // wait until the call has finished to send the sendStatus
            res.sendStatus(200);
          });

        const currentDirectory = await client.cSVDatabase.findMany({
          orderBy: [{ building: "asc" }, { floorNumber: "asc" }],
        });
        console.log("current directory", currentDirectory);
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
    //displays directoy data instead of CSV database data if there is nothing imported
    if ((await client.cSVDatabase.count()) < 1) {
      //gets data and sorts by building and then floor number
      const currentDirectoryUnfiltered = await client.directory.findMany({
        orderBy: [{ building: "asc" }, { floorNumber: "asc" }],
      });
      //has to filter the directory database since it has reception in addition to the other fields
      const currentDirectory = currentDirectoryUnfiltered.map((directory) => {
        return {
          id: directory.id,
          name: directory.name,
          floorNumber: directory.floorNumber,
          building: directory.building,
        };
      });
      //this is shared code between this and the else statement, but not sure how to combine without causing errors
      if (currentDirectory != null) {
        res.status(200).json({
          currentDirectory,
        });
      } else {
        res.sendStatus(200).json({ message: "Directory not found" });
      }
    } else {
      //gets data and sorts by building and then floor number
      const currentDirectory = await client.cSVDatabase.findMany({
        orderBy: [{ building: "asc" }, { floorNumber: "asc" }],
      });

      if (currentDirectory != null) {
        res.status(200).json({
          currentDirectory,
        });
      } else {
        res.sendStatus(200).json({ message: "Directory not found" });
      }
    }
  } catch (error) {
    console.log("error in /");
    res.sendStatus(500);
  }
});

export default router;
