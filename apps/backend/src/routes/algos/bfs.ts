// import express, { Router, Request, Response } from "express";
// import prismaClient from "../bin/prisma-client.ts";
// const router: Router = express.Router();
import { Graph } from "../maps/Graph.ts";
import { Queue, Stack } from "../datastructures/dataStructures.ts";
import { getNodeObjects, PathfindingAlgorithm } from "./algoSelection.ts";
import { Node } from "../maps/mapData.ts";

export class BFS implements PathfindingAlgorithm {
  graph: Graph;
  private queue: Queue<string[]> | undefined;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  public findPath(start: string, end: string): Promise<Node[]> {
    console.log("in bfs.pathFind()");
    console.log(" startingPoint inf BFS pathfind: ", start);
    console.log(" endingPoint in BFS pathfind: ", end);

    const visited = new Set<string>();
    //const queue = new Queue<string[]>();
    //const queue: string[][] = [[start]]; //now using Queue class
    this.queue = new Queue<string[]>();
    this.queue.enqueue([start]);

    console.log("Graph snapshot:");
    for (const node of this.graph.getAllNodeIDs()) {
      console.log(`${node} -> ${this.graph.getNeighbors(node)}`);
    }
    while (!this.queue.isEmpty()) {
      const path = this.queue.dequeue()!;
      const currentID = path[path.length - 1];
      if (!path) continue;
      if (currentID === end) return getNodeObjects(path);

      if (!visited.has(currentID)) {
        visited.add(currentID);

        const neighbors = this.graph.getNeighbors(currentID);
        console.log(`Visiting: ${currentID}`);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            this.queue.enqueue([...path, neighbor]);
          }
        }
      }
    }

    return {
      then: function <TResult1 = Node[], TResult2 = never>(
        onfulfilled?:
          | ((value: Node[]) => TResult1 | PromiseLike<TResult1>)
          | null
          | undefined,
        onrejected?:
          | ((reason: any) => TResult2 | PromiseLike<TResult2>)
          | null
          | undefined,
      ): Promise<TResult1 | TResult2> {
        throw new Error("Function not implemented.");
      },
      catch: function <TResult = never>(
        onrejected?:
          | ((reason: any) => TResult | PromiseLike<TResult>)
          | null
          | undefined,
      ): Promise<Node[] | TResult> {
        throw new Error("Function not implemented.");
      },
      finally: function (
        onfinally?: (() => void) | null | undefined,
      ): Promise<Node[]> {
        throw new Error("Function not implemented.");
      },
      [Symbol.toStringTag]: "",
    }; // No path found
  }
}
/*
//does the Breadth First Search (BFS)
async function BFS(start: string, end: string): Promise<string[]> {


export default router;
/*
//does the Breadth First Search (BFS)
async function BFS(start: string, end: string): Promise<string[]> {


  while (queue.length > 0) {
    //while we have nodes to visit
    const path = queue.shift();
    if (!path) continue;

    const currentID = path[path.length - 1];


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
      const neighbors = graph.get(currentID) || new Set();



    if (!visited.has(currentID)) {
      //have we been here? If not...
      visited.add(currentID); //add to visited list
      const neighbors = graph.get(currentID) || new Set();


      for (const neighborId of neighbors) {
        if (!visited.has(neighborId)) {
          queue.push([...path, neighborId]); //add neighbors to the queue
        }
      }
    }
  }

  return []; // No path found
}

//send data to front end

*/
