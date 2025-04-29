import express, { Request, Response, Router } from "express";
import client from "../../bin/prisma-client.ts";

const router: Router = express.Router();

// function to create a node
router.post("/create", async (req: Request, res: Response) => {
  try {
    const newNode = req.body;
    console.log(newNode);
    await client.node.create({
      data: newNode,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error creating node:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// return all the nodes to the front
router.get("/", async (req: Request, res: Response) => {
  try {
    // return all the nodes on that floor
    const nodes = await client.node.findMany({});
    // console.log(nodes);
    res.status(200).json(nodes); // Send node data as JSON
  } catch (error) {
    console.error("Error fetching node data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// function to update node data
router.post("/update", async (req: Request, res: Response) => {
  try {
    const nodeID = req.body.id; // get the nodeID
    console.log("Updating node: " + nodeID);
    console.log(req.body);
    // replace the whole entry of whatever node had that ID
    await client.node.update({
      where: { nodeID: nodeID },
      data: req.body,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating node:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// function to delete a node
router.post("/delete", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const nodeID = req.body.nodeID; // get the nodeID
    console.log("Deleting node: " + nodeID);
    await client.node.delete({ where: { nodeID: nodeID } });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting node:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
