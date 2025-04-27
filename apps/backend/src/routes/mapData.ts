import express, { Request, Response, Router } from "express";
import PrismaClient from "../bin/prisma-client.ts";

export interface Node {
  nodeID: string;
  nodeType: string;
  building: string;
  floor: number;
  xcoord: number;
  ycoord: number;
  longName: string;
  shortName: string;
  departments?: string[];
}

export interface Edge {
  edgeID: string;
  fromID: string;
  toID: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fromNode: Node;
  toNode: Node;
}

const router: Router = express.Router();

// get parking lots
router.get("/parking-lots", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "Parking" },
    });
    console.log("found " + request.length + " parking lots");
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/departments", async (req, res) => {
  try {
    //const buildingStr = req.query.building as string;
    const buildingStr = req.query.building as string;
    //console.log("building str", buildingStr);

    const request = await PrismaClient.directory.findMany({
      where: { building: buildingStr },
    });
    //console.log("departments: ", request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/check-in", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "Reception" },
    });
    //console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/entrances", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "Entrance" },
    });
    //console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/elevators", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "Elevator" },
    });
    //console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/hallways", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "Hallway" },
    });
    // console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/other", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "Other" },
    });
    // console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/edges-20-1", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "Patriot Place 20",
          floor: 1,
        },
        toNode: {
          building: "Patriot Place 20",
          floor: 1,
        },
      },
      include: {
        fromNode: true,
        toNode: true,
      },
    });
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/edges-20-3", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "Patriot Place 20",
          floor: 3,
        },
        toNode: {
          building: "Patriot Place 20",
          floor: 3,
        },
      },
      include: {
        fromNode: true,
        toNode: true,
      },
    });
    // console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/edges-22-1", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "Patriot Place 22",
          floor: 1,
        },
        toNode: {
          building: "Patriot Place 22",
          floor: 1,
        },
      },
      include: {
        fromNode: true,
        toNode: true,
      },
    });
    if (request.length === 0) {
      console.log("no edges on that floor");
    } else {
      console.log("found " + request.length + " edges");
    }
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/edges-22-3", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "Patriot Place 22",
          floor: 3,
        },
        toNode: {
          building: "Patriot Place 22",
          floor: 3,
        },
      },
      include: {
        fromNode: true,
        toNode: true,
      },
    });
    // console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/edges-22-4", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "Patriot Place 22",
          floor: 4,
        },
        toNode: {
          building: "Patriot Place 22",
          floor: 4,
        },
      },
      include: {
        fromNode: true,
        toNode: true,
      },
    });
    // console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/edges-chestnut", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "Chestnut Hill",
        },
        toNode: {
          building: "Chestnut Hill",
        },
      },
      include: {
        fromNode: true,
        toNode: true,
      },
    });
    // console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
// TODO: have a single edges path that gets them with a /: request property
router.get("/edges-faulkner", async (req, res) => {
  try {
    const request = await PrismaClient.edge.findMany({
      where: {
        fromNode: {
          building: "Faulkner",
        },
        toNode: {
          building: "Faulkner",
        },
      },
      include: {
        fromNode: true,
        toNode: true,
      },
    });
    // console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/internal", async (req, res) => {
  try {
    const request = await PrismaClient.node.findMany({
      where: { nodeType: "parking" },
    });
    console.log(request);
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/*
// get departments
router.get("/departments", async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT * FROM "Node"
        WHERE "nodeType" = 'department';
        `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
*/

router.get("/getNodeObjs", async (req, res) => {
  try {
    const nodeIDs = req.query.nodeIDs as string[];
    console.log("nodeIDs: ", nodeIDs);
    const nodes = [];
    for (const nodeID of nodeIDs) {
      nodes.push(
        await PrismaClient.node.findUnique({
          where: {
            nodeID: nodeID,
          },
        }),
      );
    }
    // console.log("nodes: ", nodes);
    res.json(nodes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.post("/edit-node", async (req: Request, res: Response) => {
  try {
    const newNode = req.body;
    console.log(newNode);
    // if there are departments, link them by ID
    if (newNode.departments.length > 0) {
      // map the departments to a list of names so that the departments can be linked
      let d = newNode.departments.map((departmentId: string) => ({
        id: departmentId,
      }));
      newNode.departments = { connect: d };
      console.log(newNode.departments);
      console.log(d);
    } else {
      newNode.departments = {};
    }
    await PrismaClient.node.update({
      where: { nodeID: newNode.nodeID },
      data: req.body,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error creating node:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create-node", async (req: Request, res: Response) => {
  try {
    const newNode = req.body;
    console.log(newNode);
    // if there are departments, link them by ID
    if (newNode.departments.length > 0) {
      // map the departments to a list of names so that the departments can be linked
      let d = newNode.departments.map((departmentId: string) => ({
        id: departmentId,
      }));
      newNode.departments = { connect: d };
      console.log(newNode.departments);
      console.log(d);
    } else {
      newNode.departments = {};
    }
    await PrismaClient.node.create({
      data: newNode,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error creating node:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create-edge", async (req: Request, res: Response) => {
  try {
    const newEdge = req.body;
    console.log(newEdge);
    await PrismaClient.edge.create({
      data: {
        fromNode: { connect: { nodeID: newEdge.fromID } },
        toNode: { connect: { nodeID: newEdge.toID } },
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error creating node:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// function to delete a node
router.post("/delete-node", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const nodeID = req.body.nodeID; // get the nodeID
    console.log("Deleting node: " + nodeID);
    await PrismaClient.node.delete({ where: { nodeID: nodeID } });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting node:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// function to delete an edge
router.post("/delete-edge", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const edgeID = req.body.edgeID; // get the nodeID
    console.log("Deleting node: " + edgeID);
    await PrismaClient.edge.delete({ where: { edgeID: edgeID } });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting edge:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/reset", async (req: Request, res: Response) => {
  try {
    console.log("Resetting map to default state");
    await PrismaClient.$transaction(async (prisma) => {
      await prisma.edge.deleteMany({});
      await prisma.node.deleteMany({});

      // import default map data from JSON
      const defaultMapData = await import(
        "../../../../API-testing/defaultMapData.json"
      );

      const { nodes, edges } = defaultMapData.default;

      // insert nodes
      for (const node of nodes) {
        const typedNode = node as Node;

        // extract base fields without departments
        const baseNodeData = {
          nodeID: typedNode.nodeID,
          nodeType: typedNode.nodeType,
          building: typedNode.building,
          floor: typedNode.floor,
          xcoord: typedNode.xcoord,
          ycoord: typedNode.ycoord,
          longName: typedNode.longName,
          shortName: typedNode.shortName,
        };

        // add departments connection only if needed
        const createData =
          typedNode.departments && typedNode.departments.length > 0
            ? {
                ...baseNodeData,
                departments: {
                  connect: typedNode.departments.map((id: string) => ({
                    id: Number(id),
                  })),
                },
              }
            : baseNodeData;

        await prisma.node.create({
          data: createData,
        });
      }

      // insert edges
      for (const edge of edges) {
        await prisma.edge.create({
          data: {
            fromNode: { connect: { nodeID: edge.fromID } },
            toNode: { connect: { nodeID: edge.toID } },
          },
        });
      }
    });

    res.status(200).json({ message: "Map reset successfully" });
  } catch (error) {
    console.error("Error resetting map:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
