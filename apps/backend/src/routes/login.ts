import express, { Router, Request, Response } from "express";
import client from "../bin/prisma-client.ts";
import session from "express-session";
import PrismaClient from "../bin/prisma-client.ts";

const router: Router = express.Router();

//receive the username and password from the client
router.post("/", async function (req: Request, res: Response) {
  const { email, userType } = req.body;
  //check if the password is in the users database
  try {
    const user = await client.user.findUnique({
      where: {
        email: email,
      },
    });
    //check if the username has password associated
    if (user !== null) {
      if (req.session) {
        req.session.userId = user.id;
        //req.session.username = user.username;
        req.session.userType = user.userType;
        console.log("req session: ", user.id);
        res.status(200).json({
          message: "User verified",
          //username: username,
          userType: user.userType,
        });
      } else {
        console.log("No req.session");
      }
    } else {
      res.status(200).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(200).json({ message: "Error: something went wrong." });
  }
});

router.post("/signup", async function (req: Request, res: Response) {
  const { userType, email, id } = req.body;
  console.log("inside /signup: ", userType);
  await PrismaClient.user.create({
    data: {
      id: id,
      email: email,
      userType: userType,
    },
  });
});

router.get("/session", async (req, res) => {
  if (req.session) {
    const userID = req.session.userId;
    const username = req.session.username;
    const userTypeID = req.session.userType;
    console.log("req session in /session: ", userID);
    console.log("req user type: ", userTypeID);
    res.status(200).json({
      message: "User verified",
      userID: userID,
      username: username,
      userType: userTypeID,
    });
  }
});

router.post("/reset", async (req, res) => {
  if (req.session) {
    req.session.destroy(() => {});
  }
});

export default router;
