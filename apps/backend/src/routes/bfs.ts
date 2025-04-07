//we are getting starting and endpoint from front end
import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
    console.log("hello algorithm");

    try {
        const employee = await PrismaClient.employee.findMany();
        console.log(employee);
        res.status(200).json(employee); // Send employee data as JSON
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//hahaha


//client server communication

//import in app.ts
//step routers (app.use)



struct Node {

}

//updates constants.ts



export default router;