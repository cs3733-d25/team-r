import express, { Router, Request, Response } from "express";
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
}

class Graph {
    private nodes: Map<string, Node> = new Map(); // id -> Node
    private adjacencyList: Map<string, Set<string>> = new Map(); // id -> Set (a list) of neighbor ids

    addNode(node: Node): void {
        this.nodes.set(node.id, node); //add id and node pair
        this.adjacencyList.set(node.id, new Set());
    }

    addEdge(node1Id: string, node2Id: string): boolean {
        if (this.nodes.has(node1Id) && this.nodes.has(node2Id)) {
            // Ensure both nodes exist in the graph

            // If the adjacency list for node1Id is undefined, initialize it as a new Set
            if (!this.adjacencyList.has(node1Id)) {
                this.adjacencyList.set(node1Id, new Set());
            }

            // Similarly, ensure the adjacency list for node2Id is initialized
            if (!this.adjacencyList.has(node2Id)) {
                this.adjacencyList.set(node2Id, new Set());
            }

            // Add the edges to both nodes
            this.adjacencyList.get(node1Id)!.add(node2Id);
            this.adjacencyList.get(node2Id)!.add(node1Id);
            return true;
        }
        return false;
    }

    getNodeByID(nodeId: string): Node | null {
        return this.nodes.get(nodeId) || null;
    }

    getNeighbors(nodeId: string): string[] {
        const neighborsSet = this.adjacencyList.get(nodeId);
        return neighborsSet ? Array.from(neighborsSet) : [];  // Safely return an empty array if the neighbors don't exist
    }

}
class Pathfinder {
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    BFS(start: string, end: string): string[] {
        const visited = new Set<string>;
        const queue: string[][] = [[start]];

        while (queue.length > 0) {
            const path = queue.shift();
            if (!path) continue;

            const currentID = path[path.length - 1];

            if (currentID === end) {
                return path;
            }

            if (!visited.has(currentID)) {
                visited.add(currentID);
                const neighbors = this.graph.getNeighbors(currentID);

                for (const neighborId of neighbors) {
                    if (!visited.has(neighborId)) {
                        queue.push([...path, neighborId]);
                    }
                }
            }
        }

        return []; // No path found
    }

}

const hospitalGraph = new Graph();
// add all hospital node data and outside data
hospitalGraph.addNode({id: 'p1', name: 'Extended Parking', type: 'parking'})
hospitalGraph.addNode({id: 'p2', name: 'Patient Parking', type: 'parking'});
hospitalGraph.addNode({id: 'p3', name: 'Valet Parking', type: 'parking'});

hospitalGraph.addNode({id: 'e1', name: '22 Patriot Place', type: 'entrance'});
hospitalGraph.addNode({id: 'e2', name: '20A Patriot Place', type: 'entrance'});
hospitalGraph.addNode({id: 'e3', name: '20B Patriot Place', type: 'entrance'});

hospitalGraph.addNode({id: 'r1', name: '20', type: 'reception'});
hospitalGraph.addNode({id: 'r2', name: '22A', type: 'reception'});
hospitalGraph.addNode({id: 'r3', name: '22B', type: 'reception'});

//edges
hospitalGraph.addEdge('p1', 'p2');
hospitalGraph.addEdge('p1', 'e1');

hospitalGraph.addEdge('p2', 'e2');
hospitalGraph.addEdge('p2', 'e3');

hospitalGraph.addEdge('p3', 'e1');
hospitalGraph.addEdge('p3', 'e2');

hospitalGraph.addEdge('e1', 'e2');
hospitalGraph.addEdge('e1', 'r1');
hospitalGraph.addEdge('e2', 'r2');
hospitalGraph.addEdge('e3', 'r3');

hospitalGraph.addEdge('r2', 'r3');


const pathFinder = new Pathfinder(hospitalGraph);


router.post("/", async function (req: Request, res: Response) {
    const {startingPoint, endingPoint} = req.body;
    console.log("Starting BFS algorithm");

    try {
        const pf = pathFinder.BFS(startingPoint, endingPoint);
        if (pf.length > 0) {
            res.status(200).json(pf);
        } else {
            res.status(404).json({message: "Path not found between " + startingPoint + " and " + endingPoint + " and " + endingPoint});
        }
    } catch (error) {
        console.error("Pathfinding error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;