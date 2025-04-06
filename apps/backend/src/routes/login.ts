import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";

const router: Router = express.Router();

//receive the username and password from the client
router.get("/", async function (req:Request, res:Response){
   const {enteredUsername, enteredPassword} = req.body;
   console.log("username: ", enteredUsername);

   //check if the password is in the users database
    try{
        const user = await PrismaClient.user.findUnique({
            where: {
                email: enteredUsername,
            }
        })
        //check if the username has password associated
        if(user !== null) {
            if (user.password == enteredPassword) {
                res.status(200).json({message: "User verified"})
            } else {
                res.status(200).json({message: "Incorrect password"})
            }
        } else{
            res.status(200).json({message: "User not found"})
        }
    } catch(error){
        res.status(200).json({message: "error"})
    }

});

export default router;