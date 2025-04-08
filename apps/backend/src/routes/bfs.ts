//we are getting starting and endpoint from front end
import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
const router: Router = express.Router();

interface NodeData {
    id: string;
    name: string;
    type: string;
}

class Node implements NodeData {
    id: string;
    name: string;
    neighbors: string[] = [];

    constructor(data: NodeData) {
        this.id = data.id;
        this.name = data.name;
    }

    addNeighbor(neighborId: string): void {
        this.neighbors.push(neighborId);
    }
}

class Graph {
    private nodes: Node[] = [];
    private nodeIndex: number = 0;
    private adjacencyList: Node[] = [];
    private adjacentIndex: number = 0;

    addNode(nodeData: NodeData): Boolean {
        if (this.nodeIndex < this.nodes.length) {
            nodes[nodeIndex] = nodeData;
            nodeIndex++;
            return true;
        }
        return false;
    }




    addEdge(node1Id: string, node2Id: string): Boolean {}

    getNeighbors(nodeId: String): string[] {}
}




class Pathfinder{
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    BFSShortestPath(start: string, end: string): string {

    }
}


const hospitalGraph = new Graph();
// add all hospital node data and outside data
hospitalGraph.addNode({id: 'parking21324', name: 'Parking A', type: 'parking'});
hospitalGraph.addEdge({})

const pathFinder = new Pathfinder(hospitalGraph);

router.post("/", async function (req: Request, res: Response) {
    const {startingPoint, endingPoint} = req.body;
    console.log("hello algorithm");

    try {
        const pf = new Pathfinder();
        //console.log(e);
        const path = pf.findPath(startingPoint, endingPoint);
        res.status(200).json(path); // Send path data as JSON
    } catch (error) {
        console.error("Pathfinding:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;