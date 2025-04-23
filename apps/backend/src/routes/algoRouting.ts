import express, { Router, Request, Response } from "express";
import prismaClient from "../bin/prisma-client.ts";
import {findPath} from "./algoSelection.ts";
const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
    const { startingPoint, endingPoint, algorithm} = req.body;
    console.log("");

    try {
        const path = await findPath(startingPoint, endingPoint, algorithm);
        res.status(200).json(path);
    } catch (error) {
        console.error("Pathfinding error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
