import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import * as fs from "node:fs";
import * as path from "node:path";
import { toCSV } from "common/src/toCSV.ts";
import { parseCSV } from "common/src/parseCSV.ts";

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
        res.sendStatus(500)
    }
});

// import directory from CSV
router.post("/import", async (req: Request, res: Response) => {
    try {
        const absolutePath = path.join(__dirname, "../../data/csv/Directory.csv");
        const csvFile = fs.readFileSync(absolutePath, "utf8");

        const records = parseCSV(csvFile);

        const transformation = records.map((row) => ({
            id: parseInt(row.ID),
            name: row.Name,
            type: row.Type,
            location: row.Location
        }));

        await PrismaClient.directory.createMany({
            data: transformation
        });

        res.sendStatus(200);
    } catch (error) {
        console.error("Error importing directory data:", error);
        res.sendStatus(500);
    }
});

export default router;