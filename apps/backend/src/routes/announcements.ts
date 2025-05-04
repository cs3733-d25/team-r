import express, { Router, Request, Response } from "express";
import client from "../bin/prisma-client.ts";
import { Prisma } from "database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

const router: Router = express.Router();

// get all announcements
router.get("/", async function (req: Request, res: Response) {
  try {
    const announcements = await client.announcement.findMany({
      orderBy: { date: "desc" },
    });
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create new announcement
router.post("/", async function (req: Request, res: Response) {
  console.log("Creating a new announcement");
  const { title, content, author, priority, type, expirationDate } = req.body;

  try {
    const newAnnouncement = await client.announcement.create({
      data: {
        title,
        content,
        date: new Date().toISOString(),
        author,
        priority: priority || "medium",
        type: type || "general",
        expirationDate: expirationDate || null,
      },
    });
    res.status(201).json({
      message: "Announcement created successfully",
      announcement: newAnnouncement,
    });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      console.log(error);
      res.status(400).json({ error: "Invalid data provided" });
    } else {
      console.error("Error creating announcement:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

export default router;
