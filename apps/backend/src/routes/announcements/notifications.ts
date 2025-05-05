import express, { Router, Request, Response } from "express";
import client from "../../bin/prisma-client.ts";

const router: Router = express.Router();

// get notifs for the current user
router.post("/user", async function (req: Request, res: Response): Promise<void> {
  const { email } = req.body;

  try {
    const user = await client.user.findUnique({
      where: { email },
      include: {employee: true},
    });

    if (!user || !user.employee) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const now = new Date();

    // get notifs that haven't expired
    const notifications = await client.notification.findMany({
      where: {
        userId: user.id,
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// mark notifs as read
router.put("/:id/read", async function (req: Request, res: Response) {
  const { id } = req.params;

  try {
    const updatedNotification = await client.notification.update({
      where: { id },
      data: { isRead: true },
    });

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
