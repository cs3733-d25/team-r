import express, { Router, Request, Response } from "express";
import prismaClient from "../bin/prisma-client.ts";
const router: Router = express.Router();

import { Graph } from "./Graph";

export class BFS {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  public findPath(start: string, end: string): string[] {
    const visited = new Set<string>();
    const queue: string[][] = [[start]];

    while (queue.length > 0) {
      const path = queue.shift();
      if (!path) continue;

      const currentID = path[path.length - 1];
      if (currentID === end) return path;

      if (!visited.has(currentID)) {
        visited.add(currentID);

        const neighbors = this.graph.getNeighbors(currentID);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push([...path, neighbor]);
          }
        }
      }
    }

    return []; // No path found
  }
}
/*
//does the Breadth First Search (BFS)
async function BFS(start: string, end: string): Promise<string[]> {


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
