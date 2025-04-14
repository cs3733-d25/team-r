import {PrismaClient} from "../packages/database";
import { NodeType, Building } from "../packages/database";

const prisma = new PrismaClient();

async function main() {
    // chestnut hill


    // patriot 20 floor 1
    await prisma.node.createMany({
        data: [
            {nodeID: 'swEntrance', nodeType: NodeType.entrance, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'SW Entrance', shortName: 'Entrance',},
            {nodeID: 'seEntrance', nodeType: NodeType.entrance, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'SE Entrance', shortName: 'Entrance',},
            {nodeID: '130.01', nodeType: NodeType.reception, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Reception 130.01', shortName: 'Reception 130.01',},
            {nodeID: '110.01', nodeType: NodeType.reception, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Check-In 110.01', shortName: 'Check-In 110.01',},
            {nodeID: '120.01', nodeType: NodeType.reception, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Check-In 120.01', shortName: 'Check-In 120.01',},
            {nodeID: '100.00F', nodeType: NodeType.reception, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Check-In 100.00F', shortName: 'Check-In 100.00F',},
            {nodeID: '100.13', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Stairs 100.13', shortName: 'Stairs 100.13',},
            {nodeID: '100.14', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Stairs 100.14', shortName: 'Stairs 100.14',},
            {nodeID: '100.10', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Elevator 100.10', shortName: 'Elevator 100.10',},
            {nodeID: '100.00', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Lobby 100.00 intersection', shortName: 'Lobby 100.00',},
            {nodeID: '100.04', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Pharmacy Consult', shortName: '',},
            {nodeID: '110.20A', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Patient Toilet 110.20A', shortName: '',},
            {nodeID: '110.03', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Public Toilet 110.03', shortName: '',},
            {nodeID: '110.20', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Ultrasound 6 110.20', shortName: '',},
            {nodeID: '110.09', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Corridor 110.09', shortName: '',},
            {nodeID: '110.12A', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Water Service 110.12A', shortName: '',},
            {nodeID: '110.33', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Corridor 110.33', shortName: '',},
            {nodeID: '110.60', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Sub Wait 110.60', shortName: '',},
            {nodeID: '120.26', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Practice Manager 120.26', shortName: '',},
            {nodeID: '100.09', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Corridor 100.09', shortName: '',},
            {nodeID: '120.00B', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Wheelchair Storage 120.00B', shortName: '',},
            {nodeID: '150.30', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Corridor 150.30', shortName: '',},
            {nodeID: '150.36', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Corridor 150.36', shortName: '',},
            {nodeID: '130.00', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Waiting Room 130.00', shortName: '',}
        ],
    });

    await prisma.edge.createMany({
        data: [
            {fromID: 'swEntrance', toID: '100.00', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '100.00', toID: '120.00B', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '120.00B', toID: '120.01', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '120.00B', toID: '100.09', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '100.09', toID: '100.00F', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '100.09', toID: '100.10', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: 'seEntrance', toID: '100.14', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '100.14', toID: '100.10', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '100.00', toID: '130.00', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '130.00', toID: '130.01', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '130.00', toID: '100.04', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '100.04', toID: '110.20A', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '110.20A', toID: '110.03', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '110.03', toID: '110.20', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '110.20', toID: '110.09', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '110.09', toID: '110.12A', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '110.12A', toID: '100.13', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '110.20', toID: '110.33', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '110.33', toID: '110.60', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '110.60', toID: '150.30', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '110.60', toID: '120.26', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '120.26', toID: '100.09', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: '150.30', toID: '150.36', fromX: null, fromY: null, toX: null, toY: null,}
        ]
    });


    // patriot 22 floor 3


    // patriot 22 floor 4
    await prisma.node.createMany({
        data: [
            { nodeID: 'rightEntrance4', nodeType: NodeType.entrance, building: Building.PATRIOT_PLACE_22, floor: 4, xcoord: null, ycoord: null, longName: '', shortName: 'rightEntranceFourth'},
            { nodeID: 'checkIn4000B', nodeType: NodeType.reception, building: Building.PATRIOT_PLACE_22, floor: 4, xcoord: null, ycoord: null, longName: '', shortName: 'rightCheckIn'},
            { nodeID: 'waiting4000', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_22, floor: 4, xcoord: null, ycoord: null, longName: '', shortName: 'rightEntranceWaiting'},
            { nodeID: 'rightWaitingHallway', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_22, floor: 4, xcoord: null, ycoord: null, longName: '', shortName: 'rightWaitingHallway'},
            { nodeID: 'elevatorLobby4A', nodeType: NodeType.elevator, building: Building.PATRIOT_PLACE_22, floor: 4, xcoord: null, ycoord: null, longName: '', shortName: 'elevatorLobby'},
            { nodeID: 'lobbyStairsHallway', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_22, floor: 4, xcoord: null, ycoord: null, longName: '', shortName: 'lobbyStairsHallway'},
            { nodeID: 'stairST01', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_22, floor: 4, xcoord: null, ycoord: null, longName: '', shortName: 'lobbyStairs'},
            { nodeID: 'stairST02', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_22, floor: 4, xcoord: null, ycoord: null, longName: '', shortName: 'leftStairs'},
            { nodeID: 'corridor4R', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_22, floor: 4, xcoord: null, ycoord: null, longName: '', shortName: 'checkOutHallway'},
            { nodeID: 'checkOutWait4083', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_22, floor: 4, xcoord: null, ycoord: null, longName: '', shortName: 'checkOutWait'},
            { nodeID: 'checkOut4090', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_22, floor: 4, xcoord: null, ycoord: null, longName: '', shortName: 'checkOut'},
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