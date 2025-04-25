import express, { Router, Request, Response } from "express";
import client from "../bin/prisma-client.ts";
import session from "express-session";

const router: Router = express.Router();

//receive the username and password from the client
router.post("/", async function (req: Request, res: Response) {
  const { username, password } = req.body;
  //check if the password is in the users database
  try {
    const user = await client.user.findUnique({
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
