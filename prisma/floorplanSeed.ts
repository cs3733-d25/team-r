import client from "../apps/backend/src/bin/prisma-client.ts";


async function main() {
    // chestnut hill floor 1
    await client.node.createMany({
        data:[
            {nodeID: 'canopyEntrance', nodeType: 'Entrance', building: 'Chestnut Hill', floor: 1, xcoord: 160.01, ycoord: 342.94, longName: '', shortName: 'canopyEntrance'},
            {nodeID: 'leftEntrance', nodeType: 'Entrance', building: 'Chestnut Hill', floor: 1, xcoord: 496.92, ycoord: 127.98, longName: '', shortName: 'leftEntrance'},
            {nodeID: 'frontLot', nodeType: 'Parking', building: 'Chestnut Hill', floor: 1, xcoord: 130.02, ycoord: 592.90, longName: 'Front Parking Lot', shortName: 'Front Parking Lot'},
            {nodeID: 'leftWaiting', nodeType: 'Other', building: 'Chestnut Hill', floor: 1, xcoord: 437.93, ycoord: 152.98, longName: '', shortName: 'leftWaiting'},
            {nodeID: 'leftLot', nodeType: 'Parking', building: 'Chestnut Hill', floor: 1, xcoord: 587.89, ycoord: 20.00, longName: 'Left Parking Lot', shortName: 'Left Parking Lot'},
            {nodeID: 'specialtyCheckIn', nodeType: 'Reception', building: 'Chestnut Hill', floor: 1, xcoord: 262.98, ycoord: 449.93, longName: '', shortName: 'specialtyCheckIn'},
            {nodeID: 'canopyEntranceHallway', nodeType: 'Hallway', building: 'Chestnut Hill', floor: 1, xcoord: 179.01, ycoord: 343.94, longName: '', shortName: 'canopyEntranceHallway'},
        ],
        skipDuplicates: true
    })

    await client.edge.createMany({
        data:[
            {fromID: 'frontLot', toID: 'canopyEntrance', fromX: 130.02, fromY: 592.90, toX: 160.01, toY: 342.94},
            {fromID: 'leftLot', toID: 'leftEntrance', fromX: 587.89, fromY: 20.00, toX: 496.92, toY: 127.98},
            {fromID: 'leftEntrance', toID: 'leftWaiting', fromX: 496.92, fromY: 127.98, toX: 437.93, toY: 152.98},
            {fromID: 'canopyEntrance', toID: 'canopyEntranceHallway', fromX: 160.01, fromY: 342.94, toX: 179.01, toY: 343.94},
            {fromID: 'canopyEntranceHallway', toID: 'specialtyCheckIn', fromX: 179.01, fromY: 343.94, toX: 262.98, toY: 449.93}
        ]
    })

    // patriot 20 floor 1
    await client.node.createMany({
        data: [
            {
                nodeID: 'valetParking20',
                nodeType: 'Parking',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 594.87,
                ycoord: 43.05,
                longName: 'Valet Parking 20 Patriot',
                shortName: 'Valet Parking 20 Patriot',
            },
            {
                nodeID: 'patientParking20',
                nodeType: 'Parking',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 166.45,
                ycoord: 36.50,
                longName: 'Patient Parking 20 Patriot',
                shortName: 'Patient Parking 20 Patriot',
            },
            {
                nodeID: 'extendedParking20',
                nodeType: 'Parking',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 125.94,
                ycoord: 265.92,
                longName: 'Extended Patient Parking 20 Patriot',
                shortName: 'Extended Patient Parking 20 Patriot',
            },
            {
                nodeID: 'swEntrance',
                nodeType: 'Entrance',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 186.48,
                ycoord: 134.00,
                longName: 'SW Entrance',
                shortName: 'Entrance',
            },
            {
                nodeID: 'seEntrance',
                nodeType: 'Entrance',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 253.24,
                ycoord: 841.50,
                longName: 'SE Entrance',
                shortName: 'Entrance',
            },
            {
                nodeID: '130.01',
                nodeType: 'Reception',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 333.24,
                ycoord: 342.00,
                longName: 'Reception 130.01',
                shortName: 'Reception 130.01',
            },
            {
                nodeID: '110.01',
                nodeType: 'Reception',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 412.74,
                ycoord: 221.00,
                longName: 'Check-In 110.01',
                shortName: 'Check-In 110.01',
            },
            {
                nodeID: '120.01',
                nodeType: 'Reception',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 256.24,
                ycoord: 466.00,
                longName: 'Check-In 120.01',
                shortName: 'Check-In 120.01',
            },
            {
                nodeID: '100.00F',
                nodeType: 'Reception',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 190.74,
                ycoord: 589.50,
                longName: 'Check-In 100.00F',
                shortName: 'Check-In 100.00F',
            },
            {
                nodeID: '100.13',
                nodeType: 'Stairs',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 767.24,
                ycoord: 243.00,
                longName: 'Stairs 100.13',
                shortName: 'Stairs 100.13',
            },
            {
                nodeID: '100.14',
                nodeType: 'Stairs',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 218.74,
                ycoord: 818.00,
                longName: 'Stairs 100.14',
                shortName: 'Stairs 100.14',
            },
            {
                nodeID: '100.10',
                nodeType: 'Elevator',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 191.74,
                ycoord: 757.50,
                longName: 'Elevator 100.10',
                shortName: 'Elevator 100.10',
            },
            {
                nodeID: '100.00',
                nodeType: 'Hallway',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 192.74,
                ycoord: 234.50,
                longName: 'Lobby 100.00 intersection',
                shortName: 'Lobby 100.00',
            },
            {
                nodeID: '100.04',
                nodeType: 'Other',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 458.74,
                ycoord: 234.50,
                longName: 'Pharmacy Consult',
                shortName: 'Pharmacy Consult',
            },
            {
                nodeID: '110.20A',
                nodeType: 'Other',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 519.24,
                ycoord: 231.50,
                longName: 'Patient Toilet 110.20A',
                shortName: 'Patient Toilet 110.20A',
            },
            {
                nodeID: '110.03',
                nodeType: 'Other',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 520.24,
                ycoord: 258.00,
                longName: 'Public Toilet 110.03',
                shortName: 'Public Toilet 110.03',
            },
            {
                nodeID: '110.20',
                nodeType: 'Other',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 570.24,
                ycoord: 258.50,
                longName: 'Ultrasound 6 110.20',
                shortName: 'Ultrasound 6 110.20',
            },
            {
                nodeID: '110.09',
                nodeType: 'Hallway',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 682.24,
                ycoord: 259.50,
                longName: 'Corridor 110.09',
                shortName: 'Corridor 110.09',
            },
            {
                nodeID: '110.12A',
                nodeType: 'Other',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 721.74,
                ycoord: 254.50,
                longName: 'Water Service 110.12A',
                shortName: 'Water Service 110.12A',
            },
            {
                nodeID: '110.33',
                nodeType: 'Hallway',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 575.24,
                ycoord: 518.50,
                longName: 'Corridor 110.33',
                shortName: 'Corridor 110.33',
            },
            {
                nodeID: '110.60',
                nodeType: 'Other',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 549.74,
                ycoord: 536.00,
                longName: 'Sub Wait 110.60',
                shortName: 'Sub Wait 110.60',
            },
            {
                nodeID: '120.26',
                nodeType: 'Other',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 418.24,
                ycoord: 532.50,
                longName: 'Practice Manager 120.26',
                shortName: 'Practice Manager 120.26',
            },
            {
                nodeID: '100.09',
                nodeType: 'Hallway',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 191.24,
                ycoord: 530.50,
                longName: 'Corridor 100.09',
                shortName: 'Corridor 100.09',
            },
            {
                nodeID: '120.00B',
                nodeType: 'Other',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 196.74,
                ycoord: 451.50,
                longName: 'Wheelchair Storage 120.00B',
                shortName: 'Wheelchair Storage 120.00B',
            },
            {
                nodeID: '150.30',
                nodeType: 'Hallway',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 338.74,
                ycoord: 702.50,
                longName: 'Corridor 150.30',
                shortName: 'Corridor 150.30',
            },
            {
                nodeID: '150.36',
                nodeType: 'Hallway',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 311.24,
                ycoord: 672.50,
                longName: 'Corridor 150.36',
                shortName: 'Corridor 150.36',
            },
            {
                nodeID: '130.00',
                nodeType: 'Other',
                building: 'Patriot Place 20',
                floor: 1,
                xcoord: 324.74,
                ycoord: 247.00,
                longName: 'Waiting Room 130.00',
                shortName: 'Waiting Room 130.00',
            }
        ],
        skipDuplicates: true
    });

        // patriot 20 floor 3
        await client.node.createMany({
            data: [
                {nodeID: 'bridgePatriot20', nodeType: 'Entrance', building: 'Patriot Place 20', floor: 3, xcoord: 237.41, ycoord: 111.00, longName: 'Bridge from 20 Patriot', shortName: 'Bridge'},
                {nodeID: '300.13', nodeType: 'Stairs', building: 'Patriot Place 20', floor: 3, xcoord: 767.24, ycoord: 243.00, longName: '3rd Floor Stairs', shortName: '3rd Floor Stairs'},
                {nodeID: '300.14', nodeType: 'Stairs', building: 'Patriot Place 20', floor: 3, xcoord: 218.74, ycoord: 818.00, longName: '3rd Floor Stairs', shortName: '3rd Floor Stairs'},
                {nodeID: '300.10', nodeType: 'Elevator', building: 'Patriot Place 20', floor: 3, xcoord: 191.74, ycoord: 757.50, longName: '3rd Floor Elevator', shortName: '3rd Floor Elevator'}
            ],
            skipDuplicates: true
        });

        await client.edge.createMany({
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
                {fromID: '150.30', toID: '150.36', fromX: 338.74, fromY: 702.50, toX: 311.24, toY: 672.50},
                {fromID: '100.13', toID: '300.13', fromX: 767.24, fromY: 243.00, toX: 767.24, toY: 243.00},
                {fromID: '100.14', toID: '300.14', fromX: 218.74, fromY: 818.00, toX: 218.74, toY: 818.00},
                {fromID: '100.10', toID: '300.10', fromX: 191.74, fromY: 757.50, toX: 191.74, toY: 757.50}
            ]
        });

        // patriot 22 floor 1
        await client.node.createMany({
            data: [
                {nodeID: 'valetParking22', nodeType: 'Parking', building: 'Patriot Place 22', floor: 1, xcoord: 576.44, ycoord: 35.10, longName: 'Valet Parking 22 Patriot', shortName: 'Valet Parking 22 Patriot',},
                {nodeID: 'patientParking22', nodeType: 'Parking', building: 'Patriot Place 22', floor: 1, xcoord: 217.98, ycoord: 221.99, longName: 'Patient Parking 22 Patriot', shortName: 'Patient Parking 22 Patriot',},
                {nodeID: 'extendedParking22', nodeType: 'Parking', building: 'Patriot Place 22', floor: 1, xcoord: 128.70, ycoord: 226.15, longName: 'Extended Patient Parking 22 Patriot', shortName: 'Extended Patient Parking 22 Patriot',},
                {nodeID: '1ST01', nodeType: 'Stairs', building: 'Patriot Place 22', floor: 1, xcoord: 419.75, ycoord: 455.00, longName: '', shortName: ''},
                { nodeID: '1ST02', nodeType: 'Stairs', building: 'Patriot Place 22', floor: 1, xcoord: 355.25, ycoord: 280.50, longName: '', shortName: ''},
                { nodeID: '1EA', nodeType: 'Elevator', building: 'Patriot Place 22', floor: 1, xcoord: 351.25, ycoord: 535.50, longName: 'Elevator 1A', shortName: 'Elevator 1A'},
                { nodeID: '22entrance1', nodeType: 'Entrance', building: 'Patriot Place 22', floor: 1, xcoord: 333.39, ycoord: 719.00, longName: 'Entrance', shortName: 'Entrance'}
            ],
            skipDuplicates: true
        });

        // patriot 22 floor 3
        await client.node.createMany({
            data: [
                {nodeID: 'ST02', nodeType: 'Stairs', building: 'Patriot Place 22', floor: 3, xcoord: 442.88, ycoord: 327.00, longName: 'Stair ST02', shortName: 'Stair ST02'},
                {nodeID: '3000C', nodeType: 'Other', building: 'Patriot Place 22', floor: 3, xcoord: 444.25, ycoord: 344.00, longName: 'Copy 3000C', shortName: 'Copy 3000C'},
                {nodeID: '3E', nodeType: 'Hallway', building: 'Patriot Place 22', floor: 3, xcoord: 466.88, ycoord: 345.00, longName: 'Corridor 3E', shortName: 'Corridor 3E'},
                {nodeID: '3001', nodeType: 'Other', building: 'Patriot Place 22', floor: 3, xcoord: 466.63, ycoord: 432.00, longName: 'Touchdown 3001', shortName: 'Touchdown 3001'},
                {nodeID: '3000A', nodeType: 'Reception', building: 'Patriot Place 22', floor: 3, xcoord: 418.63, ycoord: 419.25, longName: 'Check-In 3000A', shortName: 'Check-In 3000A'},
                {nodeID: 'ST01', nodeType: 'Stairs', building: 'Patriot Place 22', floor: 3, xcoord: 436.13, ycoord: 470.25, longName: 'Tenant Stair ST01', shortName: 'Tenant Stair ST01'},
                {nodeID: '3A', nodeType: 'Elevator', building: 'Patriot Place 22', floor: 3, xcoord: 438.88, ycoord: 538.75, longName: 'Elevator 3A', shortName: 'Elevator 3A'},
                {nodeID: '3B', nodeType: 'Hallway', building: 'Patriot Place 22', floor: 3, xcoord: 438.13, ycoord: 592.50, longName: 'Corridor 3B', shortName: 'Corridor 3B'},
                {nodeID: '3000B', nodeType: 'Other', building: 'Patriot Place 22', floor: 3, xcoord: 436.13, ycoord: 643.75, longName: 'Waiting 3000B', shortName: 'Waiting 3000B'},
                {nodeID: '3104', nodeType: 'Other', building: 'Patriot Place 22', floor: 3, xcoord: 595.13, ycoord: 639.00, longName: 'EQ Alcohol 3104', shortName: 'EQ Alcohol 3104'},
                {nodeID: '3S', nodeType: 'Hallway', building: 'Patriot Place 22', floor: 3, xcoord: 595.13, ycoord: 733.25, longName: 'Corridor 3S', shortName: 'Corridor 3S'},
                {nodeID: '3112', nodeType: 'Other', building: 'Patriot Place 22', floor: 3, xcoord: 645.88, ycoord: 732.50, longName: 'Exam 3112', shortName: 'Exam 3112'},
                {nodeID: 'ST03', nodeType: 'Stairs', building: 'Patriot Place 22', floor: 3, xcoord: 660.63, ycoord: 805.25, longName: 'Stair ST03', shortName: 'Stair ST03'},
                {nodeID: '307', nodeType: 'Hallway', building: 'Patriot Place 22', floor: 3, xcoord: 275.38, ycoord: 693.50, longName: 'Bridge 307', shortName: 'Bridge 307'}
            ],
            skipDuplicates: true
        });

        await client.edge.createMany({
            data: [
                {fromID: 'ST02', toID: '3000C', fromX: 442.88, fromY: 327.00, toX: 444.25, toY: 344.00},
                { fromID: '3000C', toID: '3E', fromX: 444.25, fromY: 344.00, toX: 466.88, toY: 345.00 },
                { fromID: '3E', toID: '3001', fromX: 466.88, fromY: 345.00, toX: 466.63, toY: 432.00 },
                { fromID: '3001', toID: '3000A', fromX: 466.63, fromY: 432.00, toX: 418.63, toY: 419.25 },
                { fromID: '3000A', toID: 'ST01', fromX: 418.63, fromY: 419.25, toX: 436.13, toY: 470.25 },
                { fromID: 'ST01', toID: '3A', fromX: 436.13, fromY: 470.25, toX: 438.88, toY: 538.75 },
                { fromID: '3000A', toID: '3B', fromX: 418.63, fromY: 419.25, toX: 438.13, toY: 592.50 },
                { fromID: '3A', toID: '3B', fromX: 438.88, fromY: 538.75, toX: 438.13, toY: 592.50 },
                { fromID: '3B', toID: '307', fromX: 438.13, fromY: 592.50, toX: 275.38, toY: 693.50 },
                { fromID: '3A', toID: '3000B', fromX: 438.88, fromY: 538.75, toX: 436.13, toY: 643.75 },
                { fromID: '3000B', toID: '3104', fromX: 436.13, fromY: 643.75, toX: 595.13, toY: 639.00 },
                { fromID: '3104', toID: '3S', fromX: 595.13, fromY: 639.00, toX: 595.13, toY: 733.25 },
                { fromID: '3S', toID: '3112', fromX: 595.13, fromY: 733.25, toX: 645.88, toY: 732.50 },
                { fromID: '3112', toID: 'ST03', fromX: 645.88, fromY: 732.50, toX: 660.63, toY: 805.25 },
                { fromID: 'bridgePatriot20', toID: '307', fromX: 237.41, fromY: 111.00, toX: 275.38, toY: 693.50 }
            ]
        });


        // patriot 22 floor 4
        await client.node.createMany({
            data: [
                { nodeID: 'checkIn4000B', nodeType: 'Reception', building: 'Patriot Place 22', floor: 4, xcoord: 319.25, ycoord: 654.50, longName: 'rightCheckIn', shortName: 'rightCheckIn'},
                { nodeID: 'waiting4000', nodeType: 'Other', building: 'Patriot Place 22', floor: 4, xcoord: 299.25, ycoord: 579.50, longName: 'rightEntranceWaiting', shortName: 'rightEntranceWaiting'},
                { nodeID: 'rightWaitingHallway', nodeType: 'Hallway', building: 'Patriot Place 22', floor: 4, xcoord: 250.25, ycoord: 633.50, longName: 'rightWaitingHallway', shortName: 'rightWaitingHallway'},
                { nodeID: 'rightEntranceHallway', nodeType: 'Hallway', building: 'Patriot Place 22', floor: 4, xcoord: 353.25, ycoord: 655.50, longName: 'rightEntranceHallway', shortName: 'rightEntranceHallway'},
                { nodeID: 'elevatorLobby4A', nodeType: 'Elevator', building: 'Patriot Place 22', floor: 4, xcoord: 351.25, ycoord: 535.50, longName: 'elevatorLobby', shortName: 'elevatorLobby'},
                { nodeID: 'lobbyStairsHallway', nodeType: 'Stairs', building: 'Patriot Place 22', floor: 4, xcoord: 350.75, ycoord: 455.50, longName: 'lobbyStairsHallway', shortName: 'lobbyStairsHallway'},
                { nodeID: 'stairST01', nodeType: 'Stairs', building: 'Patriot Place 22', floor: 4, xcoord: 419.75, ycoord: 455.00, longName: 'lobbyStairs', shortName: 'lobbyStairs'},
                { nodeID: 'stairST02', nodeType: 'Stairs', building: 'Patriot Place 22', floor: 4, xcoord: 355.25, ycoord: 280.50, longName: 'leftStairs', shortName: 'leftStairs'},
                { nodeID: 'corridor4R', nodeType: 'Hallway', building: 'Patriot Place 22', floor: 4, xcoord: 468.75, ycoord: 653.50, longName: 'checkOutHallway', shortName: 'checkOutHallway'},
                { nodeID: 'checkOutWait4083', nodeType: 'Other', building: 'Patriot Place 22', floor: 4, xcoord: 470.25, ycoord: 615.00, longName: 'checkOutWait', shortName: 'checkOutWait'},
                { nodeID: 'checkOut4090', nodeType: 'Other', building: 'Patriot Place 22', floor: 4, xcoord: 497.25, ycoord: 708.00, longName: 'checkOut', shortName: 'checkOut'}
            ],
            skipDuplicates: true
        });

        await client.edge.createMany({
            data: [
                { fromID:'checkIn4000B', toID:'rightEntranceHallway', fromX: 319.25, fromY: 654.50, toX: 353.25, toY: 655.50 },
                { fromID:'rightEntranceHallway', toID:'elevatorLobby4A', fromX: 353.25, fromY: 655.50, toX: 351.25, toY: 535.50 },
                { fromID:'elevatorLobby4A', toID:'lobbyStairsHallway', fromX: 351.25, fromY: 535.50, toX: 350.75, toY: 455.50 },
                { fromID:'lobbyStairsHallway', toID:'stairST01', fromX: 350.75, fromY: 455.50, toX: 419.75, toY: 455.00 },
                { fromID:'lobbyStairsHallway', toID:'stairST02', fromX: 350.75, fromY: 455.50, toX: 355.25, toY: 280.50 },
                { fromID:'rightWaitingHallway', toID:'waiting4000', fromX: 250.25, fromY: 633.50, toX: 353.25, toY: 655.50 },
                { fromID:'checkIn4000B', toID:'rightWaitingHallway', fromX: 319.25, fromY: 654.50, toX: 250.25, toY: 633.50 },
                { fromID:'checkIn4000B', toID:'waiting4000', fromX: 319.25, fromY: 654.50, toX: 353.25, toY: 655.50 },
                { fromID:'rightEntranceHallway', toID:'corridor4R', fromX: 353.25, fromY: 655.50, toX: 468.75, toY: 653.50 },
                { fromID:'corridor4R', toID:'checkOutWait4083', fromX: 468.75, fromY: 653.50, toX: 470.25, toY: 615.00 },
                { fromID:'corridor4R', toID:'checkOut4090', fromX: 468.75, fromY: 653.50, toX: 497.25, toY: 708.00 },
                {fromID: 'ST02', toID: 'stairST02', fromX: 442.88, fromY: 327.00, toX: 355.25, toY: 280.50},
                {fromID: 'ST01', toID: 'stairST01', fromX: 436.13, fromY: 470.25, toX: 419.75, toY: 455.00},
                {fromID: '3A', toID: 'elevatorLobby4A', fromX: 438.88, fromY: 538.75, toX: 351.25, toY: 535.50}
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
            await client.$disconnect();
        });