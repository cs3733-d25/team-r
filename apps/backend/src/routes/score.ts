import express, { Router, Request, Response } from "express";
import { Prisma } from "database";
import PrismaClient from "../bin/prisma-client";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  const scoreAttempt: Prisma.ScoreCreateInput = req.body;
  // Attempt to save the score
  try {
    // Attempt to create in the database
    await PrismaClient.score.create({ data: scoreAttempt });
    console.info("Successfully saved score"); // Log that it was successful
  } catch (error) {
    // Log any failures
    console.error(`Unable to save score attempt ${scoreAttempt}: ${error}`);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }

  res.sendStatus(200); // Otherwise say it's fine
});

// Whenever a get request is made, return the latest score
router.get("/", async function (req: Request, res: Response) {
  // Fetch the latest score from database
  console.log("score");
  const score = await PrismaClient.score.findFirst({
    orderBy: {
      time: "desc",
    },
  });

  // If the score doesn't exist
  if (score == null) {
    // Log that (it's a problem)
    console.error("No score found in database!");
    res.sendStatus(204); // Send HTTP code 204 (no data)
  } else {
    // Otherwise, send the score
    res.send(score);
  }
});

export default router;
