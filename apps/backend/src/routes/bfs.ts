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
    type: string;
    neighbors: string[] = []; //neighbors (edges -> other nodes)

    constructor(data: NodeData) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
    }

    addNeighbor(neighborId: string): void {
        this.neighbors.push(neighborId);
    }
}

class Graph {
    private nodes: Node[] = []; //a list of the nodes
    private nodeIndex: number = 0;
    private adjacencyList: Node[] = [];
    private adjacentIndex: number = 0;

    addNode(nodeData: NodeData): Node {
        const newNode = new Node(nodeData);
        this.nodes.push(newNode);
        return newNode;
    }

    //give proper ID of each NODE to connect
    addEdge(node1Id: string, node2Id: string): Boolean {
        const node1 = this.nodes.getNodeByID(node1Id);
        const node2 = this.nodes.getNodeByID(node1Id);
        node1.addNeighbor(node2Id);
        node2.addNeighbor(node1Id);

        return true;
    }

    getNodeByID(nodeId: string): Node | null {
        for (let i = 0; i < this.nodes.length; i++) {
            let curNode = this.nodes[i];
            if (curNode.id === nodeId) {
                return curNode;
            }
        }
        return null;
    }
    getNodeByName(nodeName: string): Node | null {
        for (let i = 0; i < this.nodes.length; i++) {
            let curNode = this.nodes[i];
            if (curNode.name === nodeName) {
                return curNode;
            }
        }
        return null;
    }

    getNeighbors(nodeId: String): string[] | undefined {


    }
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