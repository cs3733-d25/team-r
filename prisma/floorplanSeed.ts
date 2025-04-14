import { PrismaClient } from "../packages/database";
import { NodeType, Building } from "../packages/database";

const prisma = new PrismaClient();

async function main() {
    // chestnut hill


    // patriot 20 floor 1


    // patriot 22 floor 3


    // patriot 22 floor 4


    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        return Promise.reject(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });