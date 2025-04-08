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

    constructor(data: NodeData) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
    }

    // addNewNeighbor(data: NodeData): void {
    //     this.neighbors.push(new Node(data));
    // }
    // addExistingNeighbor(node: Node): void {
    //
    // }
}

class Graph {
    private nodes: Map<string, Node> = new Map(); // id -> Node
    private adjacencyList: Map<string, Set<string>> = new Map(); // id -> Set (a list) of neighbor ids

    addNode(node: Node): void {
        this.nodes.set(node.id, node); //add id and node pair
        this.adjacencyList.set(node.id, new Set());
    }

    addEdge(node1Id: string, node2Id: string): boolean {
        //get each node by ID from first mapping
        // if (!this.adjacencyList.has(node1Id)) this.adjacencyList.set(id1, new Set());
        // if (!this.adjacencyList.has(node2Id)) this.adjacencyList.set(id2, new Set());

        if (this.nodes.has(node1Id) && this.nodes.has(node2Id)) { //if valid node ID
            this.adjacencyList.get(node1Id)!.add(node2Id); //add string ID of 2nd to 1st
            this.adjacencyList.get(node2Id)!.add(node1Id); //add string ID of 1st to 2nd
            return true;
        }
        return false;
    }

    getNodeByID(nodeId: string): Node | null {
        return this.nodes.get(nodeId) || null;
    }

    getNeighbors(nodeId: string): string[] {
        return Array.from(this.adjacencyList.get(nodeId) || []);
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

}


class Pathfinder{
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    BFS(start: string, end: string): string[] {
        const visited = new Set<string>;
        const queue: string[][] = [[start]];

        while (queue.length > 0) {
            const path = queue.shift();
            if(!path) continue;

            const currentID = path[path.length-1];

            if(currentID === end){
                return path;
            }

        }
        

    }
}


const hospitalGraph = new Graph();
// add all hospital node data and outside data
hospitalGraph.addNode({id: 'parking21324', name: 'Parking A', type: 'parking'});
hospitalGraph.addEdge('abc', 'def');

const pathFinder = new Pathfinder(hospitalGraph);

router.post("/", async function (req: Request, res: Response) {
    const {startingPoint, endingPoint} = req.body;
    console.log("hello algorithm");

    try {
        const pf = pathFinder.BFS(startingPoint, endingPoint);
        if (pf) {
            res.status(200).json(pf);
        } else {
            res.status(404).json({message: "Shortest path not found"});
        }
    } catch (error) {
        console.error("Pathfinding:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;