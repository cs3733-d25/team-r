import express, { Router, Request, Response } from "express";
const router: Router = express.Router();

interface NodeData {
  id: string;
  name: string;
  type: string;
  xPos: number;
  yPos: number;
}

class Node implements NodeData {
  //Node class for nodes in a graph, edges aren't here and are in graph class
  id: string;
  name: string;
  type: string;
  xPos: number;
  yPos: number;

  constructor(data: NodeData) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.xPos = data.xPos;
    this.yPos = data.yPos;
  }
  //currently causes problems when adding nodes to graphs
  // setXPos(xPos : number) {
  //     this.xPos = xPos;
  //     return this.xPos;
  // }
  // setYPos(yPos : number) {
  //     this.yPos = yPos;
  //     return this.yPos;
  // }
  // getXPos() : number {
  //     return this.xPos;
  // }
  // getYPos() : number {
  //     return this.yPos;
  // }
}

class Graph {
  //stores all nodes and each of their neighbors
  private nodes: Map<string, Node> = new Map(); // id -> Node
  private adjacencyList: Map<string, Set<string>> = new Map(); // id -> Set (a list) of neighbor ids

  addNode(node: Node): void {
    //add node to the graph
    this.nodes.set(node.id, node); //add id and node pair
    this.adjacencyList.set(node.id, new Set());
  }

  addEdge(node1Id: string, node2Id: string): boolean {
    //add edge between two nodes using their string IDs
    if (this.nodes.has(node1Id) && this.nodes.has(node2Id)) {
      // Ensure both nodes exist in the graph
      //
      // // If the adjacency list for node1Id is undefined, initialize it as a new Set
      // if (!this.adjacencyList.has(node1Id)) {
      //     this.adjacencyList.set(node1Id, new Set());
      // }
      //
      // // Similarly, ensure the adjacency list for node2Id is initialized
      // if (!this.adjacencyList.has(node2Id)) {
      //     this.adjacencyList.set(node2Id, new Set());
      // }

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
    //return all neighbors of a node as string list
    const neighborsSet = this.adjacencyList.get(nodeId);
    return neighborsSet ? Array.from(neighborsSet) : []; // Safely return an empty array if the neighbors don't exist
  }
}
class Pathfinder {
  //does the Breadth First Search (BFS)
  private graph: Graph; //take a graph to do BFS on

  constructor(graph: Graph) {
    this.graph = graph;
  }

  BFS(start: string, end: string): string[] {
    const visited = new Set<string>(); //visited list
    const queue: string[][] = [[start]]; //where to go next

    while (queue.length > 0) {
      //while we have nodes to visit
      const path = queue.shift();
      if (!path) continue;

      const currentID = path[path.length - 1];

      if (currentID === end) {
        //at destination
        return path;
      }

      if (!visited.has(currentID)) {
        //have we been here? If not...
        visited.add(currentID); //add to visited list
        const neighbors = this.graph.getNeighbors(currentID);

        for (const neighborId of neighbors) {
          if (!visited.has(neighborId)) {
            queue.push([...path, neighborId]); //add neighbors to the queue
          }
        }
      }
    }
    return []; // No path found
  }
}

const hospitalGraph = new Graph();

// add all hospital node data and outside data
//parking
hospitalGraph.addNode({
  id: "p1",
  name: "Extended Parking",
  type: "parking",
  xPos: 0,
  yPos: 0,
});
hospitalGraph.addNode({
  id: "p2",
  name: "Patient Parking",
  type: "parking",
  xPos: 0,
  yPos: 0,
});
hospitalGraph.addNode({
  id: "p3",
  name: "Valet Parking",
  type: "parking",
  xPos: 0,
  yPos: 0,
});
//entrances
hospitalGraph.addNode({
  id: "e1",
  name: "22 Patriot Place",
  type: "entrance",
  xPos: 0,
  yPos: 0,
});
hospitalGraph.addNode({
  id: "e2",
  name: "20A Patriot Place",
  type: "entrance",
  xPos: 0,
  yPos: 0,
});
hospitalGraph.addNode({
  id: "e3",
  name: "20B Patriot Place",
  type: "entrance",
  xPos: 0,
  yPos: 0,
});
//reception
hospitalGraph.addNode({
  id: "r1",
  name: "Reception 20",
  type: "reception",
  xPos: 0,
  yPos: 0,
});
hospitalGraph.addNode({
  id: "r2",
  name: "Reception 22-1",
  type: "reception",
  xPos: 0,
  yPos: 0,
});
hospitalGraph.addNode({
  id: "r3",
  name: "Reception 22-2",
  type: "reception",
  xPos: 0,
  yPos: 0,
});
//hallway (internal)
hospitalGraph.addNode({
  id: "h1",
  name: "Hallway 22-1",
  type: "reception",
  xPos: 0,
  yPos: 0,
}); //22 patriot place
hospitalGraph.addNode({
  id: "h2",
  name: "Hallway 22-2",
  type: "reception",
  xPos: 0,
  yPos: 0,
});
hospitalGraph.addNode({
  id: "h3",
  name: "Hallway 22-3",
  type: "reception",
  xPos: 690,
  yPos: 190,
});
hospitalGraph.addNode({
  id: "h4",
  name: "Hallway 22-4",
  type: "reception",
  xPos: 730,
  yPos: 235,
});
hospitalGraph.addNode({
  id: "h5",
  name: "Hallway 22-5",
  type: "reception",
  xPos: 760,
  yPos: 235,
});
hospitalGraph.addNode({
  id: "h6",
  name: "Hallway 22-6",
  type: "reception",
  xPos: 760,
  yPos: 210,
});
//sidewalk
hospitalGraph.addNode({
  id: "s1",
  name: "22-1",
  type: "sidewalk",
  xPos: 790,
  yPos: 210,
});
hospitalGraph.addNode({
  id: "s2",
  name: "22-2",
  type: "sidewalk",
  xPos: 750,
  yPos: 90,
});

//add all edges between nodes on the graph
//NOTE: p = parking, e = entrance, r = reception, h = hallway, s = sidewalk
//p1
hospitalGraph.addEdge("p1", "p2");
//p2
hospitalGraph.addEdge("p2", "e1");
hospitalGraph.addEdge("p2", "e2");
hospitalGraph.addEdge("p2", "s1");
//p3
hospitalGraph.addEdge("p3", "e1");
hospitalGraph.addEdge("p3", "e2");
//e1-3
hospitalGraph.addEdge("e1", "e2");
hospitalGraph.addEdge("e1", "r1");
hospitalGraph.addEdge("e2", "r2");
//h
hospitalGraph.addEdge("r2", "h1");
hospitalGraph.addEdge("h1", "h2");
hospitalGraph.addEdge("h2", "h3");
hospitalGraph.addEdge("h3", "h4");
hospitalGraph.addEdge("h4", "h5");
hospitalGraph.addEdge("h5", "h6");
//more connections
hospitalGraph.addEdge("h2", "r3");
hospitalGraph.addEdge("h6", "e3");
//sidewalk outside 22 place
hospitalGraph.addEdge("s1", "s2");
hospitalGraph.addEdge("s2", "e3");

const pathFinder = new Pathfinder(hospitalGraph);
//send data to front end
router.post("/", async function (req: Request, res: Response) {
  const { startingPoint, endingPoint } = req.body;
  console.log("Starting BFS algorithm");

  try {
    const pf = pathFinder.BFS(startingPoint, endingPoint);
    if (pf.length > 0) {
      res.status(200).json(pf);
    } else {
      res.status(404).json({
        message:
          "Path not found between " +
          startingPoint +
          " and " +
          endingPoint +
          " and " +
          endingPoint,
      });
    }
  } catch (error) {
    console.error("Pathfinding error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
