import {PrismaClient} from "../packages/database";
import { NodeType, Building } from "../packages/database";

const prisma = new PrismaClient();

async function main() {
    await prisma.node.createMany({
        data:[
            {nodeID: 'canopyEntrance', nodeType: NodeType.entrance, building: Building.CHESTNUT_HILL, floor: 1, xcoord: null, ycoord: null, longName: '', shortName: 'canopyEntrance'},
            {nodeID: 'leftEntrance', nodeType: NodeType.entrance, building: Building.CHESTNUT_HILL, floor: 1, xcoord: null, ycoord: null, longName: '', shortName: 'leftEntrance'},
            {nodeID: 'frontLot', nodeType: NodeType.parking, building: Building.CHESTNUT_HILL, floor: 1, xcoord: null, ycoord: null, longName: '', shortName: 'frontLot'},
            {nodeID: 'leftWaiting', nodeType: NodeType.other, building: Building.CHESTNUT_HILL, floor: 1, xcoord: null, ycoord: null, longName: '', shortName: 'leftWaiting'},
            {nodeID: 'leftLot', nodeType: NodeType.parking, building: Building.CHESTNUT_HILL, floor: 1, xcoord: null, ycoord: null, longName: '', shortName: 'leftLot'},
            {nodeID: 'specialtyCheckIn', nodeType: NodeType.reception, building: Building.CHESTNUT_HILL, floor: 1, xcoord: null, ycoord: null, longName: '', shortName: 'specialtyCheckIn'},
            {nodeID: 'canopyEntranceHallway', nodeType: NodeType.hallway, building: Building.CHESTNUT_HILL, floor: 1, xcoord: null, ycoord: null, longName: '', shortName: 'canopyEntranceHallway'},
        ]
    })

    await prisma.edge.createMany({
        data:[
            {fromID: 'frontLot', toID: 'canopyEntrance', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: 'leftLot', toID: 'leftEntrance', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: 'leftEntrance', toID: 'leftWaiting', fromX: null, fromY: null, toX: null, toY: null,},
            {fromID: 'canopyEntrance', toID: 'canopyEntranceHallway', fromX: null, fromY: null, toX: null, toY: null},
            {fromID: 'canopyEntranceHallway', toID: 'specialtyCheckIn', fromX: null, fromY: null, toX: null, toY: null},
        ]
    })


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
            {nodeID: '100.04', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Pharmacy Consult', shortName: 'Pharmacy Consult',},
            {nodeID: '110.20A', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Patient Toilet 110.20A', shortName: 'Patient Toilet 110.20A',},
            {nodeID: '110.03', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Public Toilet 110.03', shortName: 'Public Toilet 110.03',},
            {nodeID: '110.20', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Ultrasound 6 110.20', shortName: 'Ultrasound 6 110.20',},
            {nodeID: '110.09', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Corridor 110.09', shortName: 'Corridor 110.09',},
            {nodeID: '110.12A', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Water Service 110.12A', shortName: 'Water Service 110.12A',},
            {nodeID: '110.33', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Corridor 110.33', shortName: 'Corridor 110.33',},
            {nodeID: '110.60', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Sub Wait 110.60', shortName: 'Sub Wait 110.60',},
            {nodeID: '120.26', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Practice Manager 120.26', shortName: 'Practice Manager 120.26',},
            {nodeID: '100.09', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Corridor 100.09', shortName: 'Corridor 100.09',},
            {nodeID: '120.00B', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Wheelchair Storage 120.00B', shortName: 'Wheelchair Storage 120.00B',},
            {nodeID: '150.30', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Corridor 150.30', shortName: 'Corridor 150.30',},
            {nodeID: '150.36', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Corridor 150.36', shortName: 'Corridor 150.36',},
            {nodeID: '130.00', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: null, ycoord: null, longName: 'Waiting Room 130.00', shortName: 'Waiting Room 130.00',}
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
    await prisma.node.createMany({
        data: [
            {nodeID: 'ST02', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Stair ST02', shortName: 'Stair ST02'},
            {nodeID: '3000C', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Copy 3000C', shortName: 'Copy 3000C'},
            {nodeID: '3E', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Corridor 3E', shortName: 'Corridor 3E'},
            {nodeID: '3001', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Touchdown 3001', shortName: 'Touchdown 3001'},
            {nodeID: '3000A', nodeType: NodeType.reception, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Check-In 3000A', shortName: 'Check-In 3000A'},
            {nodeID: 'ST01', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Tenant Stair ST01', shortName: 'Tenant Stair ST01'},
            {nodeID: '3A', nodeType: NodeType.elevator, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Elevator 3A', shortName: 'Elevator 3A'},
            {nodeID: '3B', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Corridor 3B', shortName: 'Corridor 3B'},
            {nodeID: '307', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Bridge 307', shortName: 'Bridge 307'},
            {nodeID: '3000B', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Waiting 3000B', shortName: 'Waiting 3000B'},
            {nodeID: '3104', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'EQ Alcohol 2104', shortName: 'EQ Alcohol 2104'},
            {nodeID: '3S', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Corridor 3S', shortName: 'Corridor 3S'},
            {nodeID: '3112', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Exam 3112', shortName: 'Exam 3112'},
            {nodeID: 'ST03', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_22, floor: 3, xcoord: null, ycoord: null, longName: 'Stair ST03', shortName: 'Stair ST03'}
        ]
    });

    await prisma.edge.createMany({
        data: [
            {fromID: 'ST02', toID: '3000C', fromX: null, fromY: null, toX: null, toY: null},
            { fromID: '3000C', toID: '3E', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: '3E', toID: '3001', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: '3001', toID: '3000A', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: '3000A', toID: 'ST01', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: 'ST01', toID: '3A', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: '3000A', toID: '3B', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: '3A', toID: '3B', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: '3B', toID: '307', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: '3A', toID: '3000B', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: '3000B', toID: '3104', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: '3104', toID: '3S', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: '3S', toID: '3112', fromX: null, fromY: null, toX: null, toY: null },
            { fromID: '3112', toID: 'ST03', fromX: null, fromY: null, toX: null, toY: null }
        ]
    });


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
            { fromID:'checkIn4000B', toID:'rightEntranceHallway', fromX: null, fromY: null, toX: null, toY: null },
            { fromID:'rightEntranceHallway', toID:'elevatorLobby4A', fromX: null, fromY: null, toX: null, toY: null },
            { fromID:'elevatorLobby4A', toID:'lobbyStairsHallway', fromX: null, fromY: null, toX: null, toY: null },
            { fromID:'lobbyStairsHallway', toID:'stairST01', fromX: null, fromY: null, toX: null, toY: null },
            { fromID:'lobbyStairsHallway', toID:'stairST02', fromX: null, fromY: null, toX: null, toY: null },
            { fromID:'rightEntrance4', toID:'rightWaitingHallway', fromX: null, fromY: null, toX: null, toY: null },
            { fromID:'rightWaitingHallway', toID:'waiting4000', fromX: null, fromY: null, toX: null, toY: null },
            { fromID:'', toID:'', fromX: null, fromY: null, toX: null, toY: null },
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