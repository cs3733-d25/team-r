import {PrismaClient} from "../packages/database";
import { NodeType, Building } from "../packages/database";

const prisma = new PrismaClient();

async function main() {
    // chestnut hill floor 1
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
            {nodeID: 'swEntrance', nodeType: NodeType.entrance, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 186.48, ycoord: 134.00, longName: 'SW Entrance', shortName: 'Entrance',},
            {nodeID: 'seEntrance', nodeType: NodeType.entrance, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 253.24, ycoord: 841.50, longName: 'SE Entrance', shortName: 'Entrance',},
            {nodeID: '130.01', nodeType: NodeType.reception, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 333.24, ycoord: 342.00, longName: 'Reception 130.01', shortName: 'Reception 130.01',},
            {nodeID: '110.01', nodeType: NodeType.reception, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 412.74, ycoord: 221.00, longName: 'Check-In 110.01', shortName: 'Check-In 110.01',},
            {nodeID: '120.01', nodeType: NodeType.reception, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 256.24, ycoord: 466.00, longName: 'Check-In 120.01', shortName: 'Check-In 120.01',},
            {nodeID: '100.00F', nodeType: NodeType.reception, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 190.74, ycoord: 589.50, longName: 'Check-In 100.00F', shortName: 'Check-In 100.00F',},
            {nodeID: '100.13', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 767.24, ycoord: 243.00, longName: 'Stairs 100.13', shortName: 'Stairs 100.13',},
            {nodeID: '100.14', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 218.74, ycoord: 818.00, longName: 'Stairs 100.14', shortName: 'Stairs 100.14',},
            {nodeID: '100.10', nodeType: NodeType.stairs, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 191.74, ycoord: 757.50, longName: 'Elevator 100.10', shortName: 'Elevator 100.10',},
            {nodeID: '100.00', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 192.74, ycoord: 234.50, longName: 'Lobby 100.00 intersection', shortName: 'Lobby 100.00',},
            {nodeID: '100.04', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 458.74, ycoord: 234.50, longName: 'Pharmacy Consult', shortName: 'Pharmacy Consult',},
            {nodeID: '110.20A', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 519.24, ycoord: 231.50, longName: 'Patient Toilet 110.20A', shortName: 'Patient Toilet 110.20A',},
            {nodeID: '110.03', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 520.24, ycoord: 258.00, longName: 'Public Toilet 110.03', shortName: 'Public Toilet 110.03',},
            {nodeID: '110.20', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 570.24, ycoord: 258.50, longName: 'Ultrasound 6 110.20', shortName: 'Ultrasound 6 110.20',},
            {nodeID: '110.09', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 682.24, ycoord: 259.50, longName: 'Corridor 110.09', shortName: 'Corridor 110.09',},
            {nodeID: '110.12A', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 721.74, ycoord: 254.50, longName: 'Water Service 110.12A', shortName: 'Water Service 110.12A',},
            {nodeID: '110.33', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 575.24, ycoord: 518.50, longName: 'Corridor 110.33', shortName: 'Corridor 110.33',},
            {nodeID: '110.60', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 549.74, ycoord: 536.00, longName: 'Sub Wait 110.60', shortName: 'Sub Wait 110.60',},
            {nodeID: '120.26', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 418.24, ycoord: 532.50, longName: 'Practice Manager 120.26', shortName: 'Practice Manager 120.26',},
            {nodeID: '100.09', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 191.24, ycoord: 530.50, longName: 'Corridor 100.09', shortName: 'Corridor 100.09',},
            {nodeID: '120.00B', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 196.74, ycoord: 451.50, longName: 'Wheelchair Storage 120.00B', shortName: 'Wheelchair Storage 120.00B',},
            {nodeID: '150.30', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 338.74, ycoord: 702.50, longName: 'Corridor 150.30', shortName: 'Corridor 150.30',},
            {nodeID: '150.36', nodeType: NodeType.hallway, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 311.24, ycoord: 672.50, longName: 'Corridor 150.36', shortName: 'Corridor 150.36',},
            {nodeID: '130.00', nodeType: NodeType.other, building: Building.PATRIOT_PLACE_20, floor: 1, xcoord: 324.74, ycoord: 247.00, longName: 'Waiting Room 130.00', shortName: 'Waiting Room 130.00',}
        ],
    });

    await prisma.edge.createMany({
        data: [
            {fromID: 'swEntrance', toID: '100.00', fromX: 186.48, fromY: 134.00, toX: 192.74, toY: 234.50},
            {fromID: '100.00', toID: '120.00B', fromX: 192.74, fromY: 234.50, toX: 196.74, toY: 451.50},
            {fromID: '120.00B', toID: '120.01', fromX: 196.74, fromY: 451.50, toX: 256.24, toY: 466.00},
            {fromID: '120.00B', toID: '100.09', fromX: 196.74, fromY: 451.50, toX: 191.24, toY: 530.50},
            {fromID: '100.09', toID: '100.00F', fromX: 191.24, fromY: 530.50, toX: 190.74, toY: 589.50},
            {fromID: '100.09', toID: '100.10', fromX: 191.24, fromY: 530.50, toX: 191.74, toY: 757.50},
            {fromID: 'seEntrance', toID: '100.14', fromX: 253.24, fromY: 841.50, toX: 218.74, toY: 818.00},
            {fromID: '100.14', toID: '100.10', fromX: 218.74, fromY: 818.00, toX: 191.74, toY: 757.50},
            {fromID: '100.00', toID: '130.00', fromX: 192.74, fromY: 234.50, toX: 324.74, toY: 247.00},
            {fromID: '130.00', toID: '130.01', fromX: 324.74, fromY: 247.00, toX: 333.24, toY: 342.00},
            {fromID: '130.00', toID: '100.04', fromX: 324.74, fromY: 247.00, toX: 458.74, toY: 234.50},
            {fromID: '100.04', toID: '110.20A', fromX: 458.74, fromY: 234.50, toX: 519.24, toY: 231.50},
            {fromID: '110.20A', toID: '110.03', fromX: 519.24, fromY: 231.50, toX: 520.24, toY: 258.00},
            {fromID: '110.03', toID: '110.20', fromX: 520.24, fromY: 258.00, toX: 570.24, toY: 258.50},
            {fromID: '110.20', toID: '110.09', fromX: 570.24, fromY: 258.50, toX: 682.24, toY: 259.50},
            {fromID: '110.09', toID: '110.12A', fromX: 682.24, fromY: 259.50, toX: 721.74, toY: 254.50},
            {fromID: '110.12A', toID: '100.13', fromX: 721.74, fromY: 254.50, toX: 767.24, toY: 243.00},
            {fromID: '110.20', toID: '110.33', fromX: 570.24, fromY: 258.50, toX: 575.24, toY: 518.50},
            {fromID: '110.33', toID: '110.60', fromX: 575.24, fromY: 518.50, toX: 549.74, toY: 536.00},
            {fromID: '110.60', toID: '150.30', fromX: 549.74, fromY: 536.00, toX: 338.74, toY: 702.50},
            {fromID: '110.60', toID: '120.26', fromX: 549.74, fromY: 536.00, toX: 418.24, toY: 532.50},
            {fromID: '120.26', toID: '100.09', fromX: 418.24, fromY: 532.50, toX: 191.24, toY: 530.50},
            {fromID: '150.30', toID: '150.36', fromX: 338.74, fromY: 702.50, toX: 311.24, toY: 672.50}
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
            { fromID:'', toID:'', fromX: null, fromY: null, toX: null, toY: null }
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