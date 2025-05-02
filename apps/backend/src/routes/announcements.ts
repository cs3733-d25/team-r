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

// get announcement by ID
router.get("/:id", async function (req: Request, res: Response) {
  const { id } = req.params;
  try {
    const announcement = await client.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.status(200).json(announcement);
  } catch (error) {
    console.error("Error fetching announcement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create new announcement
router.post("/", async function (req: Request, res: Response) {
  console.log("Creating a new announcement");
  const { title, content, author, priority, expirationDate } = req.body;

  try {
    const newAnnouncement = await client.announcement.create({
      data: {
        title,
        content,
        date: new Date().toISOString(),
        author,
        priority: priority || "medium",
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

// update an announcement
router.put("/:id", async function (req: Request, res: Response) {
  const { id } = req.params;
  const { title, content, priority, expirationDate } = req.body;

  try {
    const updatedAnnouncement = await client.announcement.update({
      where: { id },
      data: {
        title,
        content,
        priority,
        expirationDate,
      },
    });
    res.status(200).json({
      message: "Announcement updated successfully",
      announcement: updatedAnnouncement,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Announcement not found" });
      }
    }
    console.error("Error updating announcement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete an announcement
router.delete("/:id", async function (req: Request, res: Response) {
  const { id } = req.params;

  try {
    await client.announcement.delete({
      where: { id },
    });
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Announcement not found" });
      }
    }
    console.error("Error deleting announcement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
