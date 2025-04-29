import express, { Router, Request, Response } from "express";
import client from "../../bin/prisma-client.ts";
import session from "express-session";
import PrismaClient from "../../bin/prisma-client.ts";

const router: Router = express.Router();


// router.post("/signup", async function (req: Request, res: Response) {
//   const { userType, email, id } = req.body;
//   console.log("inside /signup: ", userType);
//   await PrismaClient.user.create({
//     data: {
//       id: id,
//       email: email,
//       userType: userType,
//     },
//   });
// });


router.post("/userInfo", async (req, res ) => {
  console.log("IN USERTYPE");
  const user = await PrismaClient.user.findUnique({
    where: { email: req.body.email },
  });
  if (!user) {
    console.error("User not found for email:", req.body.email);
    res.status(404).json({ error: "User not found" });
  } else{
    console.log("User from database: ", user);
    console.log("firstName: ", user.firstName);
    res.status(200).json({ userType: user.userType, firstName: user.firstName});
  }
});

router.post("/reset", async (req, res) => {
  if (req.session) {
    req.session.destroy(() => {});
  }
});

export default router;
