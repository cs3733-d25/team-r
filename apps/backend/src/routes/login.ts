import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import session from "express-session";

const router: Router = express.Router();

//receive the username and password from the client
router.post("/", async function (req: Request, res: Response) {
  const { username, password } = req.body;
  //check if the password is in the users database
  try {
    const user = await PrismaClient.user.findUnique({
      where: {
        username: username,
      },
    });
    //check if the username has password associated
    if (user !== null) {
      if (user.password == password) {
        if (req.session) {
          req.session.userId = user.id;
          req.session.username = user.username;
          req.session.userType = user.userTypeID;
          console.log("req session: ", user.id);
          res.status(200).json({
            message: "User verified",
            username: username,
            userType: user.userTypeID,
          });
        } else {
          console.log("No req.session");
        }
      } else {
        res.status(200).json({ message: "The password entered is incorrect." });
      }
    } else {
      res.status(200).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(200).json({ message: "Error: something went wrong." });
  }
});

export default router;
