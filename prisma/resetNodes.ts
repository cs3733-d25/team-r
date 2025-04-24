// Create a script called resetNodes.ts
import client from "../apps/backend/src/bin/prisma-client.ts";

async function reset() {
    try {
        // Delete all existing nodes
        await client.edge.deleteMany({});  // Delete edges first due to foreign key constraints
        await client.node.deleteMany({});
        console.log('All nodes and edges deleted successfully');
    } catch (error) {
        console.error('Error deleting nodes:', error);
    } finally {
        await client.$disconnect();
    }
}

reset();