import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import * as fs from "node:fs";
import * as path from "node:path";

const router: Router = express.Router();

// fetch all directory records in database
router.get("/", async (req: Request, res: Response) => {
    try {
        const entries = await PrismaClient.directoryEntry.findMany();
        res.status(200).json(entries);
    } catch (error) {
        console.error("Error fetching directory data:", error);
        res.status(500).json({ error: "Failed to fetch directory" });
    }
})

// export directory data as CSV
router.get("/export", async (req: Request, res: Response) => {
    try {
        const entries = await PrismaClient.directoryEntry.findMany();

        // check if any entries exist
        if (!entries.length) {
            return res.status(404).json({ error: "No entries found" });
        }

        // format CSV data
        const columns = Object.keys(entries[0]);
        const csvData = [columns.join(",")];

        entries.forEach((entry) => {
            const row = columns.map((col) => {
                const val = entry[col] !== null? entry[col] : "";
                return `"${String(val).replace(/"/g, '""')}"`;
            });
            csvData.push(row.join(","));
        });

        // Generate filename with timestamp
        const filename = `directory-export-${Date.now()}.csv`;
        // Create full file path in exports directory
        const filepath = path.join(__dirname, "../../exports", filename);

        fs.writeFileSync(filepath, csvData.join("\n"));

        // Send file as download and delete temp file after
        res.download(filepath, filename, (err) => {
            if (err) console.error("Download error:", err);
            // Clean up: delete the temporary file
            fs.unlinkSync(filepath);
        });
    } catch (error) {
        console.error("Error exporting directory data:", error);
        res.status(500).json({ error: "Failed to export directory" });
    }
})


// import directory from CSV