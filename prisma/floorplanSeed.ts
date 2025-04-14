import {PrismaClient} from "../packages/database";
import { NodeType, Building } from "../packages/database";

const prisma = new PrismaClient();

async function main() {
    // chestnut hill


    // patriot 20 floor 1


    // patriot 22 floor 3


    // patriot 22 floor 4
    await prisma.node.createMany({
        data: [
            { nodeID: 'rightEntrance4', nodeType: NodeType.enterance, building: Building.PATRIOT_PLACE_22, floor: "4", xcoord: null, ycoord: null, longName: null, shortName: 'rightEntranceFourth'},
            { nodeID: 'checkIn4000B', nodeType: NodeType.reception, building: Building.PATRIOT_PLACE_22, floor: "4", xcoord: null, ycoord: null, longName: null, shortName: 'rightCheckIn'},
            { nodeID: 'waiting4000', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_22, floor: "4", xcoord: null, ycoord: null, longName: null, shortName: 'rightEntranceWaiting'},
            { nodeID: 'rightWaitingHallway', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_22, floor: "4", xcoord: null, ycoord: null, longName: null, shortName: 'rightWaitingHallway'},
            { nodeID: 'elevatorLobby4A', nodeType: NodeType.elevator, building: Building.PATRIOT_PLACE_22, floor: "4", xcoord: null, ycoord: null, longName: null, shortName: 'elevatorLobby'},
            { nodeID: 'lobbyStairsHallway', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_22, floor: "4", xcoord: null, ycoord: null, longName: null, shortName: 'lobbyStairsHallway'},
            { nodeID: 'stairST01', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_22, floor: "4", xcoord: null, ycoord: null, longName: null, shortName: 'lobbyStairs'},
            { nodeID: 'stairST02', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_22, floor: "4", xcoord: null, ycoord: null, longName: null, shortName: 'leftStairs'},
            { nodeID: 'corridor4R', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_22, floor: "4", xcoord: null, ycoord: null, longName: null, shortName: 'checkOutHallway'},
            { nodeID: 'checkOutWait4083', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_22, floor: "4", xcoord: null, ycoord: null, longName: null, shortName: 'checkOutWait'},
            { nodeID: 'checkOut4090', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_22, floor: "4", xcoord: null, ycoord: null, longName: null, shortName: 'checkOut'},
        ]
    });

    await prisma.edge.createMany({
        data: [
            { fromID:'rightEntrance4', toID:'checkIn4000B', fromX: null, fromY: null, toX: null, toY: null },
        ]
    });


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