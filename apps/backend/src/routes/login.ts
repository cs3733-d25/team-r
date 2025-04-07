import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";

const router: Router = express.Router();

//receive the username and password from the client
router.post("/", async function (req: Request, res: Response) {
  //////////////////////////////////////////////////////////////////////
  //this is where communication is important - frontend is sending 'username' and 'password'
  //we will get an error if we do not use the exact same names as they do not exist in req.body

  const { username, password } = req.body;
  //const (usernameEntered, passwordEntered} = req.body
  console.log("username: ", username);

  //check if the password is in the users database
  try {
    const user = await PrismaClient.user.findUnique({
      where: {
        ////////////////////////////////////////////////////////////////////////////
        //a note for backend - this is where things get a bit confusing - lots of variables with the same name
        //username PURPLE - the field in the DATABASE we want to acces
        //username WHITE - the variable we pulled from req.body (username sent by the client)
        username: username,
      },
    });
    //check if the username has password associated
    if (user !== null) {
      if (user.password == password) {
        ///////////////////////////////////////////////////////////////////////////
        //frontend needs to know what variables we are sending them back - they will not be able
        //to access what we give them without the variable names
        res.status(200).json({
          //we can send multiple fields to the client
          message: "User verified",
          userType: user.userType
        });
      } else {
        res.status(200).json({ message: "Incorrect password" });
      }
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(200).json({ message: "error" });
  }
});

export default router;
