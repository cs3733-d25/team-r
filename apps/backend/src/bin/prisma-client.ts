import { PrismaClient } from "@prisma/client";
// Create the prisma client, this automatically connects to the database
const client = new PrismaClient();

// Export the client

export default client;
