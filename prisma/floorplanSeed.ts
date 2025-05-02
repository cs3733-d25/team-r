import PrismaClient from "../apps/backend/src/bin/prisma-client.ts";


async function main() {
    // chestnut hill floor 1
    await PrismaClient.node.createMany({
        data:[
            {
                'nodeID': 'Entrance-1745475279866',
                'nodeType': 'Entrance',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 528.89,
                'ycoord': 323.08,
                'longName': 'Left Entrance',
                'shortName': 'Left Entrance',
            },
            {
                'nodeID': 'Entrance-1745475321572',
                'nodeType': 'Entrance',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 241.77,
                'ycoord': 506.1,
                'longName': 'Bottom Entrance',
                'shortName': 'Bottom Entrance',
            },
            {
                'nodeID': 'Reception-1745475750292',
                'nodeType': 'Reception',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 505.99,
                'ycoord': 391.5,
                'longName': 'Reception',
                'shortName': 'Reception',
            },
            {
                'nodeID': 'Reception-1745475823905',
                'nodeType': 'Reception',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 363.25,
                'ycoord': 625.24,
                'longName': 'Reception',
                'shortName': 'Reception',
            },
            {
                'nodeID': 'Parking-1745476124817',
                'nodeType': 'Parking',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 533.09,
                'ycoord': 213.06,
                'longName': 'Left Parking Lot',
                'shortName': 'Left Parking Lot',
            },
            {
                'nodeID': 'Parking-1745476137948',
                'nodeType': 'Parking',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 151.2,
                'ycoord': 675.12,
                'longName': 'Main Parking Lot',
                'shortName': 'Main Parking Lot',
            },
            {
                'nodeID': 'Hallway-1745476252825',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 379.12,
                'ycoord': 614.09,
                'longName': 'Central Reception Hallway',
                'shortName': 'Central Reception Hallway',
            },
            {
                'nodeID': 'Hallway-1745476261869',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 377.14,
                'ycoord': 715.13,
                'longName': 'West Central Corridor',
                'shortName': 'West Central Corridor',
            },
            {
                'nodeID': 'Hallway-1745476274839',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 315.15,
                'ycoord': 714.13,
                'longName': 'Northwest Corridor',
                'shortName': 'Northwest Corridor',
            },
            {
                'nodeID': 'Hallway-1745476286280',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 317.15,
                'ycoord': 804.14,
                'longName': 'Far Northwest Corridor',
                'shortName': 'Far Northwest Corridor',
            },
            {
                'nodeID': 'Hallway-1745476316023',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 590.07,
                'ycoord': 861.15,
                'longName': 'South Wing West Corridor',
                'shortName': 'South Wing West Corridor',
            },
            {
                'nodeID': 'Hallway-1745476325501',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 381.13,
                'ycoord': 956.16,
                'longName': 'Far Southwest Corridor',
                'shortName': 'Far Southwest Corridor',
            },
            {
                'nodeID': 'Hallway-1745476336196',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 425.12,
                'ycoord': 956.16,
                'longName': 'South Wing Central Hallway',
                'shortName': 'South Wing Central Hallway',
            },
            {
                'nodeID': 'Hallway-1745476355584',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 377.14,
                'ycoord': 801.14,
                'longName': 'West Wing Central Hallway',
                'shortName': 'West Wing Central Hallway',
            },
            {
                'nodeID': 'Hallway-1745476377768',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 385.13,
                'ycoord': 871.15,
                'longName': 'Southwest Corridor Junction',
                'shortName': 'Southwest Corridor Junction',
            },
            {
                'nodeID': 'Hallway-1745476392418',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 591.07,
                'ycoord': 921.16,
                'longName': 'South Wing East Corridor',
                'shortName': 'South Wing East Corridor',
            },
            {
                'nodeID': 'Hallway-1745476405531',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 436.12,
                'ycoord': 928.16,
                'longName': 'South Wing Central Junction',
                'shortName': 'South Wing Central Junction',
            },
            {
                'nodeID': 'Hallway-1745476418680',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 705.04,
                'ycoord': 922.16,
                'longName': 'Southeast Corner Hallway',
                'shortName': 'Southeast Corner Hallway',
            },
            {
                'nodeID': 'Hallway-1745476440148',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 710.04,
                'ycoord': 685.12,
                'longName': 'East Wing Central Corridor',
                'shortName': 'East Wing Central Corridor',
            },
            {
                'nodeID': 'Hallway-1745476454878',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 770.07,
                'ycoord': 683.1,
                'longName': 'Far East Corridor',
                'shortName': 'Far East Corridor',
            },
            {
                'nodeID': 'Hallway-1745476466618',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 771.02,
                'ycoord': 412.09,
                'longName': 'Northeast Corridor',
                'shortName': 'Northeast Corridor',
            },
            {
                'nodeID': 'Hallway-1745476477762',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 591.07,
                'ycoord': 411.09,
                'longName': 'North Wing East Hallway',
                'shortName': 'North Wing East Hallway',
            },
            {
                'nodeID': 'East Elevator Hallway CH',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 528.02,
                'ycoord': 411,
                'longName': 'East Elevator Hallway',
                'shortName': 'East Elevator Hallway',
            },
            {
                'nodeID': 'East Courtyard Hallway CH',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 531.15,
                'ycoord': 517.07,
                'longName': 'East Courtyard Hallway',
                'shortName': 'East Courtyard Hallway',
            },
            {
                'nodeID': 'North Entrance Hallway CH',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 328.18,
                'ycoord': 510.05,
                'longName': 'North Entrance Hallway',
                'shortName': 'North Entrance Hallway',
            },
            {
                'nodeID': 'North Reception Area CH',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 333,
                'ycoord': 624.04,
                'longName': 'North Reception Area',
                'shortName': 'North Reception Area',
            },
            {
                'nodeID': 'Northwest Corridor Entrance CH',
                'nodeType': 'Hallway',
                'building': 'Healthcare Center (Chestnut Hill)',
                'floor': 1,
                'xcoord': 356.18,
                'ycoord': 714.07,
                'longName': 'Northwest Corridor Entrance',
                'shortName': 'Northwest Corridor Entrance',
            },
        ],
        skipDuplicates: true
    })
    // patriot 20 floor 1
    await PrismaClient.node.createMany({
        data: [
            {
                "nodeID": "Main Entrance 20",
                "nodeType": "Entrance",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 211.67,
                "ycoord": 386,
                "longName": "Main Entrance",
                "shortName": "Main Entrance"
            },
            {
                "nodeID": "Entrance Corridor 20",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 216.67,
                "ycoord": 475,
                "longName": "Entrance Corridor",
                "shortName": "Entrance Corridor"
            },
            {
                "nodeID": "Hallway-1745538375613",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 314.83,
                "ycoord": 470,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Check-In Corridor 20",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 197.67,
                "ycoord": 761,
                "longName": "Check-In Corridor",
                "shortName": "Check-In Corridor"
            },
            {
                "nodeID": "Hallway-1745538474179",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 502.83,
                "ycoord": 470,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Imaging Suite",
                "nodeType": "Reception",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 504.83,
                "ycoord": 437,
                "longName": "",
                "shortName": "Left Reception"
            },
            {
                "nodeID": "Urology Corridor 20",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 315.92,
                "ycoord": 760,
                "longName": "Urology Corridor",
                "shortName": "Urology Corridor"
            },
            {
                "nodeID": "Hallway-1745538522550",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 317.92,
                "ycoord": 632.5,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Ambulatory/Urgent Care",
                "nodeType": "Reception",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 342.83,
                "ycoord": 631,
                "longName": "",
                "shortName": "Central Reception"
            },
            {
                "nodeID": "Hallway-1745538550406",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 314.83,
                "ycoord": 527,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Phlebotomy",
                "nodeType": "Reception",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 336.92,
                "ycoord": 528.5,
                "longName": "",
                "shortName": "Main Reception"
            },
            {
                "nodeID": "Entrance Sidewalk 20",
                "nodeType": "Sidewalk",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 225.67,
                "ycoord": 273,
                "longName": "Entrance Sidewalk",
                "shortName": "Entrance Sidewalk"
            },
            {
                "nodeID": "Valet Parking",
                "nodeType": "Parking",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 498.67,
                "ycoord": 296,
                "longName": "Valet Parking",
                "shortName": "Valet Parking"
            },
            {
                "nodeID": "Accessible Parking Sidewalk 20",
                "nodeType": "Sidewalk",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 74.67,
                "ycoord": 103,
                "longName": "Accessible Parking Sidewalk",
                "shortName": "Accessible Parking Sidewalk"
            },
            {
                "nodeID": "Accessible Parking 20",
                "nodeType": "Parking",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 9.67,
                "ycoord": 165,
                "longName": "Accessible Parking",
                "shortName": "Accessible Parking"
            },
            {
                "nodeID": "Stairs 20 1",
                "nodeType": "Elevator",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 188,
                "ycoord": 1039.1,
                "longName": "Patriot 20 Stairs 1",
                "shortName": "Patriot 20 Stairs 1"
            },
            {
                "nodeID": "Stairs 20 2",
                "nodeType": "Elevator",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 244,
                "ycoord": 600,
                "longName": "Patriot 20 Stairs 2",
                "shortName": "Patriot 20 Stairs 2"
            },
            {
                "nodeID": "Stairs 20 3",
                "nodeType": "Elevator",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 771.4,
                "ycoord": 454,
                "longName": "Patriot 20 Stairs 3",
                "shortName": "Patriot 20 Stairs 3"
            },
            {
                "nodeID": "Elevator 20",
                "nodeType": "Elevator",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 256,
                "ycoord": 992,
                "longName": "Patriot 20 Elevator",
                "shortName": "Patriot 20 Elevator"
            },
            {
                "nodeID": "hallway20stairs1",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 199,
                "ycoord": 992.2,
                "longName": "Hallway 20 Stairs 1",
                "shortName": "Hallway 20 Stairs 1"
            },
            {
                "nodeID": "Stairway Corridor 20",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 211,
                "ycoord": 587,
                "longName": "Stairway Corridor",
                "shortName": "Stairway Corridor"
            },
            {
                "nodeID": "hallwayaroundthatcorner20",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 541.7,
                "ycoord": 489.8,
                "longName": "Hallway Around A Corner",
                "shortName": "Hallway Around A Corner"
            },
            {
                "nodeID": "hallway20stairs3",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 767,
                "ycoord": 482,
                "longName": "Hallway 20 Stairs 3",
                "shortName": "Hallway 20 Stairs 3"
            },
            {
                "nodeID": "Main Reception 20",
                "nodeType": "Reception",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 279.12,
                "ycoord": 444.13,
                "longName": "Main Reception",
                "shortName": "Main Reception"
            },
            {
                "nodeID": "Patient Parking 20",
                "nodeType": "Parking",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": -256.9,
                "ycoord": -123.97,
                "longName": "Patient Parking",
                "shortName": "Patient Parking"
            },
            {
                "nodeID": "Patient Parking Sidewalk 20",
                "nodeType": "Sidewalk",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": -164.05,
                "ycoord": -203.95,
                "longName": "Patient Parking",
                "shortName": "Patient Parking"
            },
            {
                "nodeID": "Secondary Reception Entrance 20",
                "nodeType": "Hallway",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 304.96,
                "ycoord": 791.56,
                "longName": "Secondary Reception Entrance",
                "shortName": "Secondary Reception Entrance"
            },
            {
                "nodeID": "Secondary Reception 20",
                "nodeType": "Reception",
                "building": "Healthcare Center (20 Patriot Pl.)",
                "floor": 1,
                "xcoord": 262.5,
                "ycoord": 839.29,
                "longName": "Secondary Reception Entrance",
                "shortName": "Secondary Reception Entrance"
            }
        ],
        skipDuplicates: true
    });
    // all faulkner nodes
    await PrismaClient.node.createMany({
        data: [
            {
                "nodeID": "Hallway-1745468089659",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 582.42,
                "ycoord": 620.75,
                "longName": "",
                "shortName": "East Central Hallway"
            },
            {
                "nodeID": "Hallway-1745468105189",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 581.83,
                "ycoord": 668,
                "longName": "",
                "shortName": "Southeast Hallway"
            },
            {
                "nodeID": "Hallway-1745468111109",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 582.83,
                "ycoord": 578,
                "longName": "",
                "shortName": "Northeast Hallway"
            },
            {
                "nodeID": "Hallway-1745468120025",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 559.42,
                "ycoord": 576,
                "longName": "",
                "shortName": "East Wing Hallway"
            },
            {
                "nodeID": "Hallway-1745468125283",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 510.42,
                "ycoord": 670.5,
                "longName": "",
                "shortName": "South Hallway"
            },
            {
                "nodeID": "Hallway-1745468129629",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 480.17,
                "ycoord": 621.5,
                "longName": "",
                "shortName": "Central Hallway"
            },
            {
                "nodeID": "Hallway-1745468133623",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 478.83,
                "ycoord": 669,
                "longName": "",
                "shortName": "South Central Hallway"
            },
            {
                "nodeID": "Hallway-1745468140562",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 480.42,
                "ycoord": 515.5,
                "longName": "",
                "shortName": "Northeast Central"
            },
            {
                "nodeID": "Reception-1745468181591",
                "nodeType": "Reception",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 561.42,
                "ycoord": 591,
                "longName": "",
                "shortName": "East Reception"
            },
            {
                "nodeID": "Reception-1745468203626",
                "nodeType": "Reception",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 561.71,
                "ycoord": 553,
                "longName": "",
                "shortName": "Northeast Reception"
            },
            {
                "nodeID": "Reception-1745468225241",
                "nodeType": "Reception",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 568.92,
                "ycoord": 631.75,
                "longName": "",
                "shortName": "Pre-Admit Reception"
            },
            {
                "nodeID": "Reception-1745468241433",
                "nodeType": "Reception",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 596.92,
                "ycoord": 668,
                "longName": "",
                "shortName": "MRI Reception"
            },
            {
                "nodeID": "Reception-1745468256681",
                "nodeType": "Reception",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 581.92,
                "ycoord": 721,
                "longName": "",
                "shortName": "Radiology Reception"
            },
            {
                "nodeID": "Reception-1745468279713",
                "nodeType": "Reception",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 481.42,
                "ycoord": 498,
                "longName": "",
                "shortName": "North Reception"
            },
            {
                "nodeID": "Reception-1745468288835",
                "nodeType": "Reception",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 451.33,
                "ycoord": 514.75,
                "longName": "",
                "shortName": "GI Reception"
            },
            {
                "nodeID": "Reception-1745468299003",
                "nodeType": "Reception",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 466.08,
                "ycoord": 629.5,
                "longName": "",
                "shortName": "Pulmonary Reception"
            },
            {
                "nodeID": "Reception-1745468308859",
                "nodeType": "Reception",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 449.21,
                "ycoord": 630.75,
                "longName": "",
                "shortName": "Central Reception"
            },
            {
                "nodeID": "Hallway-1745468326007",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 383.42,
                "ycoord": 669.5,
                "longName": "",
                "shortName": "West Hallway"
            },
            {
                "nodeID": "Hallway-1745468331257",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 385.58,
                "ycoord": 789.25,
                "longName": "",
                "shortName": "Southwest Hallway"
            },
            {
                "nodeID": "Reception-1745468408887",
                "nodeType": "Reception",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 495,
                "ycoord": 807.5,
                "longName": "",
                "shortName": "South Reception"
            },
            {
                "nodeID": "Hallway-1745468416845",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 511.5,
                "ycoord": 807.25,
                "longName": "",
                "shortName": "South Corridor"
            },
            {
                "nodeID": "Parking-1745468723599",
                "nodeType": "Parking",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 719.67,
                "ycoord": 313,
                "longName": "THE Faulkner Hospital Parking Lot",
                "shortName": "Faulkner Hospital Parking Lot"
            },
            {
                "nodeID": "Hallway-1745469182158",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 450.42,
                "ycoord": 668.5,
                "longName": "",
                "shortName": "West Central Hallway"
            },
            {
                "nodeID": "Faulkner Hospital Entrance",
                "nodeType": "Entrance",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 722.0,
                "ycoord": 622.0,
                "longName": "Faulkner Hospital front entrance",
                "shortName": "Front Entrance"
            },
            {
                "nodeID": "a Faulkner Hospital hallway",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 630.5,
                "ycoord": 620.5,
                "longName": "",
                "shortName": "East Entrance Hallway"
            },
            {
                "nodeID": "Dialysis Entrance",
                "nodeType": "Entrance",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 795,
                "ycoord": 316,
                "longName": "",
                "shortName": "Dialysis Entrance"
            },
            {
                "nodeID": "Hallway-1745546310011",
                "nodeType": "Hallway",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 750,
                "ycoord": 364,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Dialysis Reception",
                "nodeType": "Reception",
                "building": "Faulkner Hospital",
                "floor": 1,
                "xcoord": 823,
                "ycoord": 291,
                "longName": "",
                "shortName": "Dialysis Reception"
            }

        ],
        skipDuplicates: true
    });

    // patriot 22 floor 1
    await PrismaClient.node.createMany({
        data: [
            {
                "nodeID": "Hallway-1745548970535",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 706.84,
                "ycoord": 243.07,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745548978154",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 704.84,
                "ycoord": 347.08,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745548984596",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 541.89,
                "ycoord": 240.07,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745548991063",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 362.94,
                "ycoord": 244.07,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745548997460",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 364.94,
                "ycoord": 348.08,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549004162",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 538.89,
                "ycoord": 348.08,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549017987",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 553.88,
                "ycoord": 424.09,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549029846",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 542.89,
                "ycoord": 452.09,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549037167",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 504.9,
                "ycoord": 455.09,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745549050767",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 515.9,
                "ycoord": 430.09,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549056484",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 703.84,
                "ycoord": 448.09,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549062268",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 709.84,
                "ycoord": 567.11,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549068752",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 544.89,
                "ycoord": 570.11,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549077216",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 398.93,
                "ycoord": 453.09,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549084403",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 400.93,
                "ycoord": 544.11,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549091013",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 545.89,
                "ycoord": 668.12,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549099183",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 544.89,
                "ycoord": 770.14,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549107928",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 546.89,
                "ycoord": 875.15,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549114718",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 710.84,
                "ycoord": 672.12,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549121974",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 709.84,
                "ycoord": 768.14,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549128133",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 706.84,
                "ycoord": 868.15,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549138964",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 703.84,
                "ycoord": 996.17,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549145776",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 599.87,
                "ycoord": 871.15,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549154027",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 598.87,
                "ycoord": 934.16,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549160169",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 674.85,
                "ycoord": 993.16,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549171203",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 456.91,
                "ycoord": 777.14,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745549178298",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 679.85,
                "ycoord": 1028.17,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745549196973",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 408.93,
                "ycoord": 573.11,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745549209837",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 405.93,
                "ycoord": 697.13,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549215833",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 364.94,
                "ycoord": 704.13,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745549231579",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 337.95,
                "ycoord": 496.1,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745549317519",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 401.93,
                "ycoord": 496.1,
                "longName": "",
                "shortName": ""
            },

            {
                "nodeID": "Extended Patient Parking",
                "nodeType": "Parking",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 15.83,
                "ycoord": 10,
                "longName": "",
                "shortName": "Extended Patient Parking"
            },
            {
                "nodeID": "Valet Parking",
                "nodeType": "Parking",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 1.67,
                "ycoord": 707,
                "longName": "",
                "shortName": "Accessible Parking Lot"
            },
            {
                "nodeID": "Valet Parking Lot",
                "nodeType": "Parking",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 424.67,
                "ycoord": 923,
                "longName": "Valet Parking Lot",
                "shortName": "Valet Parking Lot"
            },
            {
                "nodeID": "Sidewalk-1745515004862",
                "nodeType": "Sidewalk",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 119.67,
                "ycoord": 690,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745515017629",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 130.67,
                "ycoord": 691,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745515041197",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 258.67,
                "ycoord": 792,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Entrance-1745515055030",
                "nodeType": "Entrance",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 357.67,
                "ycoord": 746,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745515093551",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 1,
                "xcoord": 412.67,
                "ycoord": 682,
                "longName": "",
                "shortName": ""
            }

        ],
        skipDuplicates: true
    });
    // patriot 22 floor 3
    await PrismaClient.node.createMany({
        data: [
            {
                "nodeID": "Elevator-1745530797419",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 441.67,
                "ycoord": 694,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530802852",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 396.83,
                "ycoord": 697.5,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530806495",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 401.67,
                "ycoord": 778,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530812008",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 557.67,
                "ycoord": 772,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530816898",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 567.67,
                "ycoord": 672,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530821770",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 569.67,
                "ycoord": 868,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530827906",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 725.67,
                "ycoord": 772,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530836846",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 727.67,
                "ycoord": 670,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530842426",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 725.67,
                "ycoord": 872,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530850336",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 397.67,
                "ycoord": 548,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530855313",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 425.67,
                "ycoord": 522,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530859661",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 429.67,
                "ycoord": 464,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530864206",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 563.67,
                "ycoord": 462,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530869011",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 571.67,
                "ycoord": 572,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530885789",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 566.67,
                "ycoord": 352,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530891145",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 560.67,
                "ycoord": 248,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530895797",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 720.67,
                "ycoord": 352,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745530900471",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 722.67,
                "ycoord": 248,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745531120923",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 384.67,
                "ycoord": 248,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745531125317",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 388.67,
                "ycoord": 356,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745531142253",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 722.67,
                "ycoord": 458,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745531147438",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 726.67,
                "ycoord": 570,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745531167025",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 694.67,
                "ycoord": 990,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745531176179",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 727.83,
                "ycoord": 988,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745531180756",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 616.67,
                "ycoord": 934,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745531232798",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 617.42,
                "ycoord": 876,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "all-patriot-22-3-departments",
                "nodeType": "Reception",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 591.42,
                "ycoord": 587.5,
                "longName": "",
                "shortName": "all-patriot-22-3-departments"
            },

            {
                "nodeID": "Elevator-1745548453562",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 429.92,
                "ycoord": 576.11,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745548471290",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 373.94,
                "ycoord": 492.1,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745548477950",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 426.92,
                "ycoord": 491.1,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745548528982",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 535.89,
                "ycoord": 434.09,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745548551707",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 692.84,
                "ycoord": 1028.17,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745548601064",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 3,
                "xcoord": 537.89,
                "ycoord": 461.09,
                "longName": "",
                "shortName": ""
            },

        ],
        skipDuplicates: true
    });
    // patriot 22 floor 4
    await PrismaClient.node.createMany({
        data: [

            {
                "nodeID": "Elevator-1745548135350",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 367.94,
                "ycoord": 546.11,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745548156316",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 639.86,
                "ycoord": 1072.18,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745548183505",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 285.96,
                "ycoord": 498.1,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745548192350",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 337.95,
                "ycoord": 552.11,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745548206618",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 705.84,
                "ycoord": 1056.17,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745548218279",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 666.85,
                "ycoord": 1053.17,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745548270903",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 581.88,
                "ycoord": 946.16,
                "longName": "",
                "shortName": ""
            },


            {
                "nodeID": "Elevator-1745547664565",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 645.86,
                "ycoord": 572.11,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745547680792",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 654.86,
                "ycoord": 786.14,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745547819933",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 649.86,
                "ycoord": 592.11,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745547827857",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 655.86,
                "ycoord": 810.14,
                "longName": "",
                "shortName": ""
            },

            {
                "nodeID": "Hallway-1745532856923",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 555.67,
                "ycoord": 808,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532862197",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 557.67,
                "ycoord": 698,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532884703",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 707.67,
                "ycoord": 694,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532889474",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 709.67,
                "ycoord": 808,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532895073",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 707.67,
                "ycoord": 922,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532907419",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 709.67,
                "ycoord": 590,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532911792",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 705.67,
                "ycoord": 462,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532916746",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 709.67,
                "ycoord": 350,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532920640",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 707.67,
                "ycoord": 234,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532926189",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 551.67,
                "ycoord": 232,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532934749",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 555.67,
                "ycoord": 350,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532940204",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 321.67,
                "ycoord": 232,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532945413",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 323.67,
                "ycoord": 352,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532949809",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 555.67,
                "ycoord": 460,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532954933",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 557.67,
                "ycoord": 592,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532960565",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 551.67,
                "ycoord": 506,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532969426",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 511.67,
                "ycoord": 508,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532974069",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 341.67,
                "ycoord": 506,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532978783",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 339.67,
                "ycoord": 716,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745532984035",
                "nodeType": "Elevator",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 370.83,
                "ycoord": 719,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532989467",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 339.83,
                "ycoord": 819,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745532994775",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 556.83,
                "ycoord": 924,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745533011435",
                "nodeType": "Hallway",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 552.83,
                "ycoord": 869,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Primary Care",
                "nodeType": "Reception",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 586.83,
                "ycoord": 870,
                "longName": "",
                "shortName": "Primary Care"
            },
            {
                "nodeID": "Community Room",
                "nodeType": "Reception",
                "building": "Healthcare Center (22 Patriot Pl.)",
                "floor": 4,
                "xcoord": 298.83,
                "ycoord": 232,
                "longName": "",
                "shortName": "Community Room"
            }
        ],
        skipDuplicates: true
    });

    // create Main Campus Hospital (75 Francis St.) nodes
    await PrismaClient.node.createMany({
        data: [
            {
                "nodeID": "Parking-1745977271629",
                "nodeType": "Parking",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 505.92,
                "ycoord": 668.45,
                "longName": "",
                "shortName": "Valet Parking"
            },
            {
                "nodeID": "Entrance-1745978697506",
                "nodeType": "Entrance",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 555.42,
                "ycoord": 664.95,
                "longName": "",
                "shortName": "Main Entrance"
            },
            {
                "nodeID": "Hallway-1745978726808",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 577.67,
                "ycoord": 665.7,
                "longName": "",
                "shortName": "Elevator Bay"
            },
            {
                "nodeID": "Elevator-1745978735954",
                "nodeType": "Elevator",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 590.17,
                "ycoord": 668.93,
                "longName": "",
                "shortName": "Elevator"
            },
            {
                "nodeID": "Hallway-1745978877180",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 583.42,
                "ycoord": 721.69,
                "longName": "",
                "shortName": "Entrance Side Hallway"
            },
            {
                "nodeID": "Hallway-1745978885516",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 604.96,
                "ycoord": 721.98,
                "longName": "",
                "shortName": "Main Hallway Center"
            },
            {
                "nodeID": "Hallway-1745978900809",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 617.67,
                "ycoord": 792.44,
                "longName": "",
                "shortName": "C Department Hallway"
            },
            {
                "nodeID": "Reception-1745978920070",
                "nodeType": "Reception",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 609.58,
                "ycoord": 796.35,
                "longName": "",
                "shortName": "Reception Desk"
            },
            {
                "nodeID": "Reception-1745978956684",
                "nodeType": "Reception",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 637.33,
                "ycoord": 827.92,
                "longName": "",
                "shortName": "Reception Desk"
            },
            {
                "nodeID": "Hallway-1745978979376",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 600.46,
                "ycoord": 684.46,
                "longName": "",
                "shortName": "E Department Hallway"
            },
            {
                "nodeID": "Hallway-1745978988044",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 598.46,
                "ycoord": 630.23,
                "longName": "",
                "shortName": "H Department Hallway"
            },
            {
                "nodeID": "Hallway-1745978998036",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 599.46,
                "ycoord": 522.99,
                "longName": "",
                "shortName": "J Department Hallway"
            },
            {
                "nodeID": "Reception-1745979021528",
                "nodeType": "Reception",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 587.67,
                "ycoord": 523.2,
                "longName": "",
                "shortName": "Reception Desk"
            },
            {
                "nodeID": "Hallway-1745979028694",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 599.42,
                "ycoord": 465.97,
                "longName": "",
                "shortName": "L Department Hallway"
            },
            {
                "nodeID": "Hallway-1745979034269",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 506.17,
                "ycoord": 466.96,
                "longName": "",
                "shortName": "M Department Hallway"
            },
            {
                "nodeID": "Hallway-1745979044044",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 504.67,
                "ycoord": 500.96,
                "longName": "",
                "shortName": "Side Entrance"
            },
            {
                "nodeID": "Reception-1745979064138",
                "nodeType": "Reception",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 493.92,
                "ycoord": 501.46,
                "longName": "",
                "shortName": "Reception Desk"
            },
            {
                "nodeID": "Hallway-1745979074658",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 505.92,
                "ycoord": 343.49,
                "longName": "",
                "shortName": "To Shapiro Hallway"
            },
            {
                "nodeID": "Reception-1745979105794",
                "nodeType": "Reception",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 508.92,
                "ycoord": 317.48,
                "longName": "",
                "shortName": "Reception Desk"
            },
            {
                "nodeID": "Hallway-1745979113844",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 378.83,
                "ycoord": 336.93,
                "longName": "",
                "shortName": "Shapiro Lobby"
            },
            {
                "nodeID": "Hallway-1745979120586",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 380.83,
                "ycoord": 248.95,
                "longName": "",
                "shortName": "N Department Hallway"
            },
            {
                "nodeID": "Hallway-1745979131954",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 204.83,
                "ycoord": 331.93,
                "longName": "",
                "shortName": "R Department Hallway"
            },
            {
                "nodeID": "Reception-1745979160598",
                "nodeType": "Reception",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 355.42,
                "ycoord": 248.71,
                "longName": "",
                "shortName": "Reception Desk"
            },
            {
                "nodeID": "Hallway-1745979171184",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 192.42,
                "ycoord": 307.98,
                "longName": "",
                "shortName": "Hale Lobby"
            },
            {
                "nodeID": "Hallway-1745979183112",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 150.42,
                "ycoord": 304.97,
                "longName": "",
                "shortName": "S Department Hallway"
            },
            {
                "nodeID": "Hallway-1745979190434",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 148.42,
                "ycoord": 258.97,
                "longName": "",
                "shortName": "Hale South Hallway"
            },
            {
                "nodeID": "Reception-1745979202834",
                "nodeType": "Reception",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 152.42,
                "ycoord": 240.47,
                "longName": "",
                "shortName": "Reception Desk"
            },
            {
                "nodeID": "Entrance-1745979219810",
                "nodeType": "Entrance",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 636.83,
                "ycoord": 968.89,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Sidewalk-1745979230530",
                "nodeType": "Sidewalk",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 509.92,
                "ycoord": 742.46,
                "longName": "",
                "shortName": "Sidewalk"
            },
            {
                "nodeID": "Sidewalk-1745979242998",
                "nodeType": "Sidewalk",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 434.42,
                "ycoord": 742.95,
                "longName": "",
                "shortName": "Sidewalk"
            },
            {
                "nodeID": "Sidewalk-1745979249708",
                "nodeType": "Sidewalk",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 435.83,
                "ycoord": 992.85,
                "longName": "",
                "shortName": "Sidewalk"
            },
            {
                "nodeID": "Sidewalk-1745979258676",
                "nodeType": "Sidewalk",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 611.92,
                "ycoord": 955.44,
                "longName": "",
                "shortName": "Sidewalk"
            },
            {
                "nodeID": "Hallway-1745979293578",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 660.67,
                "ycoord": 959.69,
                "longName": "",
                "shortName": "A Department Hallway"
            },
            {
                "nodeID": "Hallway-1745980436047",
                "nodeType": "Hallway",
                "building": "Main Campus Hospital (75 Francis St.)",
                "floor": 1,
                "xcoord": 627.92,
                "ycoord": 832.96,
                "longName": "",
                "shortName": "B Department Hallway"
            }
        ]
    })

    // chestnut hill edges
    await PrismaClient.edge.createMany({
        data:[
                {
                    "fromID": "Parking-1745476124817",
                    "toID": "Entrance-1745475279866",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                    {

                        "fromID": "Hallway-1745476466618",
                        "toID": "Hallway-1745476454878",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476466618",
                        "toID": "Hallway-1745476477762",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476440148",
                        "toID": "Hallway-1745476418680",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476454878",
                        "toID": "Hallway-1745476440148",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476418680",
                        "toID": "Hallway-1745476392418",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476392418",
                        "toID": "Hallway-1745476316023",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476316023",
                        "toID": "Hallway-1745476377768",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476392418",
                        "toID": "Hallway-1745476405531",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476405531",
                        "toID": "Hallway-1745476336196",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476336196",
                        "toID": "Hallway-1745476325501",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476325501",
                        "toID": "Hallway-1745476377768",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476377768",
                        "toID": "Hallway-1745476355584",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476355584",
                        "toID": "Hallway-1745476286280",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476274839",
                        "toID": "Hallway-1745476286280",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Hallway-1745476261869",
                        "toID": "Hallway-1745476252825",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Parking-1745476137948",
                        "toID": "Entrance-1745475321572",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Entrance-1745475279866",
                        "toID": "Reception-1745475750292",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {

                        "fromID": "Entrance-1745475279866",
                        "toID": "Hallway-1745476477762",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
            {

                "fromID": "Entrance-1745475321572",
                "toID": "North Entrance Hallway CH",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {

                "fromID": "North Reception Area CH",
                "toID": "North Entrance Hallway CH",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {

                "fromID": "North Reception Area CH",
                "toID": "Northwest Corridor Entrance CH",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {

                "fromID": "North Reception Area CH",
                "toID": "Reception-1745475823905",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {

                "fromID": "Hallway-1745476274839",
                "toID": "Northwest Corridor Entrance CH",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {

                "fromID": "Reception-1745475750292",
                "toID": "East Elevator Hallway CH",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {

                "fromID": "East Courtyard Hallway CH",
                "toID": "East Elevator Hallway CH",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {

                "fromID": "East Courtyard Hallway CH",
                "toID": "North Entrance Hallway CH",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            }

        ]
    })

    // patriot 20 edges
    await PrismaClient.edge.createMany({
        data: [
            {
                "fromID": "hallway20stairs1",
                "toID": "Check-In Corridor 20"
            },
            {
                "fromID": "hallway20stairs1",
                "toID": "Elevator 20"
            },
            {
                "fromID": "hallway20stairs1",
                "toID": "Stairs 20 1"
            },
            {
                "fromID": "Check-In Corridor 20",
                "toID": "Stairway Corridor 20"
            },
            {
                "fromID": "Stairway Corridor 20",
                "toID": "Entrance Corridor 20"
            },
            {
                "fromID": "Stairway Corridor 20",
                "toID": "Stairs 20 2"
            },
            {
                "fromID": "Entrance Corridor 20",
                "toID": "Main Entrance 20"
            },
            {
                "fromID": "Hallway-1745538375613",
                "toID": "Entrance Corridor 20"
            },
            {
                "fromID": "Imaging Suite",
                "toID": "Hallway-1745538474179"
            },
            {
                "fromID": "Hallway-1745538474179",
                "toID": "Hallway-1745538375613"
            },
            {
                "fromID": "Hallway-1745538474179",
                "toID": "hallwayaroundthatcorner20"
            },
            {
                "fromID": "hallwayaroundthatcorner20",
                "toID": "hallway20stairs3"
            },
            {
                "fromID": "hallway20stairs3",
                "toID": "Stairs 20 3"
            },
            {
                "fromID": "Hallway-1745538375613",
                "toID": "Hallway-1745538550406"
            },
            {
                "fromID": "Phlebotomy",
                "toID": "Hallway-1745538550406"
            },
            {
                "fromID": "Hallway-1745538522550",
                "toID": "Hallway-1745538550406"
            },
            {
                "fromID": "Ambulatory/Urgent Care",
                "toID": "Hallway-1745538522550"
            },
            {
                "fromID": "Hallway-1745538522550",
                "toID": "Urology Corridor 20"
            },
            {
                "fromID": "Entrance Sidewalk 20",
                "toID": "Main Entrance 20"
            },
            {
                "fromID": "Handicap Parking",
                "toID": "Entrance Sidewalk 20"
            },
            {
                "fromID": "Entrance Sidewalk 20",
                "toID": "Accessible Parking Sidewalk 20"
            },
            {
                "fromID": "Accessible Parking Sidewalk 20",
                "toID": "Accessible Parking 20"
            },
            {
                "fromID": "Main Reception 20",
                "toID": "Main Entrance 20"
            },
            {
                "fromID": "Check-In Corridor 20",
                "toID": "Urology Corridor 20"
            },
            {
                "fromID": "Secondary Reception Entrance 20",
                "toID": "Urology Corridor 20"
            },
            {
                "fromID": "Secondary Reception Entrance 20",
                "toID": "Secondary Reception 20"
            }
        ],
        skipDuplicates: true
    });

    // patriot 22 floor 1 edges
    await PrismaClient.edge.createMany({
        data: [

                {
                    "fromID": "Elevator-1745549050767",
                    "toID": "Elevator-1745548528982"
                },
                {
                    "fromID": "Elevator-1745549178298",
                    "toID": "Elevator-1745548551707"
                },

                {

                    "fromID": "Hallway-1745548970535",
                    "toID": "Hallway-1745548978154",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745548970535",
                    "toID": "Hallway-1745548984596",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {

                    "fromID": "Hallway-1745548984596",
                    "toID": "Hallway-1745548991063",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {

                    "fromID": "Hallway-1745548991063",
                    "toID": "Hallway-1745548997460",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {

                    "fromID": "Hallway-1745548997460",
                    "toID": "Hallway-1745549004162",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {

                    "fromID": "Hallway-1745548978154",
                    "toID": "Hallway-1745549004162",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {

                    "fromID": "Hallway-1745549004162",
                    "toID": "Hallway-1745549017987",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {

                    "fromID": "Hallway-1745549017987",
                    "toID": "Elevator-1745549050767",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Elevator-1745549050767",
                    "toID": "Hallway-1745549037167",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549037167",
                    "toID": "Hallway-1745549029846",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549029846",
                    "toID": "Hallway-1745549017987",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549029846",
                    "toID": "Hallway-1745549056484",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549056484",
                    "toID": "Hallway-1745549062268",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549062268",
                    "toID": "Hallway-1745549068752",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549029846",
                    "toID": "Hallway-1745549068752",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549037167",
                    "toID": "Hallway-1745549077216",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549077216",
                    "toID": "Hallway-1745549317519",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549317519",
                    "toID": "Elevator-1745549231579",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549317519",
                    "toID": "Hallway-1745549084403",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549084403",
                    "toID": "Elevator-1745549196973",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549068752",
                    "toID": "Hallway-1745549091013",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549091013",
                    "toID": "Hallway-1745549114718",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549114718",
                    "toID": "Hallway-1745549121974",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549121974",
                    "toID": "Hallway-1745549099183",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549091013",
                    "toID": "Hallway-1745549099183",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549121974",
                    "toID": "Hallway-1745549128133",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549099183",
                    "toID": "Hallway-1745549107928",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549107928",
                    "toID": "Hallway-1745549145776",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549145776",
                    "toID": "Hallway-1745549128133",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549128133",
                    "toID": "Hallway-1745549138964",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549138964",
                    "toID": "Hallway-1745549160169",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549145776",
                    "toID": "Hallway-1745549154027",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549154027",
                    "toID": "Hallway-1745549160169",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549160169",
                    "toID": "Elevator-1745549178298",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549099183",
                    "toID": "Hallway-1745549171203",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549171203",
                    "toID": "Entrance-1745515055030",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Entrance-1745515055030",
                    "toID": "Hallway-1745549215833",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745549215833",
                    "toID": "Elevator-1745549209837",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },

            {
                "fromID": "Hallway-1745468326007",
                "toID": "Hallway-1745468331257"
            },
            {
                "fromID": "Hallway-1745515017629",
                "toID": "Valet Parking"
            },
            {
                "fromID": "Hallway-1745515017629",
                "toID": "Extended Patient Parking"
            },
            {
                "fromID": "Entrance-1745515055030",
                "toID": "Hallway-1745515041197"
            },
            {
                "fromID": "Valet Parking Lot",
                "toID": "Hallway-1745515041197"
            },
            {
                "fromID": "Hallway-1745515041197",
                "toID": "Hallway-1745515017629"
            },
            {
                "fromID": "Elevator-1745515093551",
                "toID": "Entrance-1745515055030"
            }
        ]
    });

    // patriot 22 floor 3 edges
    await PrismaClient.edge.createMany({
        data: [
                {
                    "fromID": "Elevator-1745548551707",
                    "toID": "Hallway-1745531167025",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745548477950",
                    "toID": "Hallway-1745530859661",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745548477950",
                    "toID": "Hallway-1745530855313",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745548477950",
                    "toID": "Elevator-1745548471290",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745530859661",
                    "toID": "Hallway-1745548601064",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745530864206",
                    "toID": "Hallway-1745548601064",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745548601064",
                    "toID": "Elevator-1745548528982",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745530855313",
                    "toID": "Elevator-1745548453562",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },

            {
                "fromID": "Hallway-1745530900471",
                "toID": "Hallway-1745530895797"
            },
            {
                "fromID": "Hallway-1745530895797",
                "toID": "Hallway-1745530885789"
            },
            {
                "fromID": "Hallway-1745530885789",
                "toID": "Hallway-1745530864206"
            },
            {
                "fromID": "Hallway-1745530900471",
                "toID": "Hallway-1745530891145"
            },
            {
                "fromID": "Hallway-1745530885789",
                "toID": "Hallway-1745530891145"
            },
            {
                "fromID": "Hallway-1745530864206",
                "toID": "Hallway-1745530869011"
            },
            {
                "fromID": "Hallway-1745530864206",
                "toID": "Hallway-1745530859661"
            },
            {
                "fromID": "Hallway-1745530869011",
                "toID": "Hallway-1745530816898"
            },
            {
                "fromID": "Hallway-1745530836846",
                "toID": "Hallway-1745530816898"
            },
            {
                "fromID": "Hallway-1745530836846",
                "toID": "Hallway-1745530827906"
            },
            {
                "fromID": "Hallway-1745530827906",
                "toID": "Hallway-1745530842426"
            },
            {
                "fromID": "Hallway-1745530842426",
                "toID": "Hallway-1745530821770"
            },
            {
                "fromID": "Hallway-1745530827906",
                "toID": "Hallway-1745530812008"
            },
            {
                "fromID": "Hallway-1745530821770",
                "toID": "Hallway-1745530812008"
            },
            {
                "fromID": "Hallway-1745530812008",
                "toID": "Hallway-1745530816898"
            },
            {
                "fromID": "Hallway-1745530812008",
                "toID": "Hallway-1745530806495"
            },
            {
                "fromID": "Hallway-1745530806495",
                "toID": "Hallway-1745530802852"
            },
            {
                "fromID": "Elevator-1745530797419",
                "toID": "Hallway-1745530802852"
            },
            {
                "fromID": "Hallway-1745530802852",
                "toID": "Hallway-1745530850336"
            },
            {
                "fromID": "Hallway-1745530855313",
                "toID": "Hallway-1745530850336"
            },
            {
                "fromID": "Hallway-1745530855313",
                "toID": "Hallway-1745530859661"
            },
            {
                "fromID": "Hallway-1745530891145",
                "toID": "Hallway-1745531120923"
            },
            {
                "fromID": "Hallway-1745531120923",
                "toID": "Hallway-1745531125317"
            },
            {
                "fromID": "Hallway-1745531125317",
                "toID": "Hallway-1745530885789"
            },
            {
                "fromID": "Hallway-1745531147438",
                "toID": "Hallway-1745531142253"
            },
            {
                "fromID": "Hallway-1745531147438",
                "toID": "Hallway-1745530869011"
            },
            {
                "fromID": "Hallway-1745531142253",
                "toID": "Hallway-1745530864206"
            },
            {
                "fromID": "Hallway-1745530842426",
                "toID": "Hallway-1745531176179"
            },
            {
                "fromID": "Hallway-1745531176179",
                "toID": "Hallway-1745531167025"
            },
            {
                "fromID": "Hallway-1745531167025",
                "toID": "Hallway-1745531180756"
            },
            {
                "fromID": "Hallway-1745531180756",
                "toID": "Hallway-1745531232798"
            },
            {
                "fromID": "Hallway-1745531232798",
                "toID": "Hallway-1745530821770"
            },
            {
                "fromID": "Hallway-1745530842426",
                "toID": "Hallway-1745531232798"
            },
            {
                "fromID": "all-patriot-22-3-departments",
                "toID": "Hallway-1745530869011"
            }
        ]
    });

    //22 floor 4 edges
    await PrismaClient.edge.createMany({
        data: [

            {
                "fromID": "Hallway-1745532974069",
                "toID": "Elevator-1745548183505",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {
                "fromID": "Hallway-1745548192350",
                "toID": "Elevator-1745548135350",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {
                "fromID": "Hallway-1745532895073",
                "toID": "Hallway-1745548206618",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {
                "fromID": "Hallway-1745548206618",
                "toID": "Hallway-1745548218279",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {
                "fromID": "Hallway-1745532994775",
                "toID": "Hallway-1745548270903",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {
                "fromID": "Hallway-1745548270903",
                "toID": "Hallway-1745548218279",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },
            {
                "fromID": "Hallway-1745548218279",
                "toID": "Elevator-1745548156316",
                "fromX": null,
                "fromY": null,
                "toX": null,
                "toY": null
            },

                {
                    "fromID": "Elevator-1745547664565",
                    "toID": "Hallway-1745547819933",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {

                    "fromID": "Elevator-1745547680792",
                    "toID": "Hallway-1745547827857",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745547819933",
                    "toID": "Hallway-1745532954933",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745547827857",
                    "toID": "Hallway-1745532856923",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745532907419",
                    "toID": "Hallway-1745547819933",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                {
                    "fromID": "Hallway-1745532889474",
                    "toID": "Hallway-1745547827857",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },

            {
                "fromID": "Hallway-1745532895073",
                "toID": "Hallway-1745532889474"
            },
            {
                "fromID": "Hallway-1745532889474",
                "toID": "Hallway-1745532884703"
            },
            {
                "fromID": "Hallway-1745532884703",
                "toID": "Hallway-1745532907419"
            },
            {
                "fromID": "Hallway-1745532911792",
                "toID": "Hallway-1745532907419"
            },
            {
                "fromID": "Hallway-1745532911792",
                "toID": "Hallway-1745532916746"
            },
            {
                "fromID": "Hallway-1745532916746",
                "toID": "Hallway-1745532920640"
            },
            {
                "fromID": "Hallway-1745532920640",
                "toID": "Hallway-1745532926189"
            },
            {
                "fromID": "Hallway-1745532926189",
                "toID": "Hallway-1745532940204"
            },
            {
                "fromID": "Hallway-1745532934749",
                "toID": "Hallway-1745532926189"
            },
            {
                "fromID": "Hallway-1745532940204",
                "toID": "Hallway-1745532945413"
            },
            {
                "fromID": "Hallway-1745532934749",
                "toID": "Hallway-1745532945413"
            },
            {
                "fromID": "Hallway-1745532916746",
                "toID": "Hallway-1745532934749"
            },
            {
                "fromID": "Hallway-1745532911792",
                "toID": "Hallway-1745532949809"
            },
            {
                "fromID": "Hallway-1745532949809",
                "toID": "Hallway-1745532934749"
            },
            {
                "fromID": "Hallway-1745532907419",
                "toID": "Hallway-1745532954933"
            },
            {
                "fromID": "Hallway-1745532884703",
                "toID": "Hallway-1745532862197"
            },
            {
                "fromID": "Hallway-1745532889474",
                "toID": "Hallway-1745532856923"
            },
            {
                "fromID": "Hallway-1745532895073",
                "toID": "Hallway-1745532994775"
            },
            {
                "fromID": "Hallway-1745532994775",
                "toID": "Hallway-1745533011435"
            },
            {
                "fromID": "Hallway-1745533011435",
                "toID": "Hallway-1745532856923"
            },
            {
                "fromID": "Hallway-1745532856923",
                "toID": "Hallway-1745532989467"
            },
            {
                "fromID": "Hallway-1745532989467",
                "toID": "Hallway-1745532978783"
            },
            {
                "fromID": "Elevator-1745532984035",
                "toID": "Hallway-1745532978783"
            },
            {
                "fromID": "Hallway-1745532978783",
                "toID": "Hallway-1745532974069"
            },
            {
                "fromID": "Hallway-1745532969426",
                "toID": "Hallway-1745532974069"
            },
            {
                "fromID": "Hallway-1745532949809",
                "toID": "Hallway-1745532960565"
            },
            {
                "fromID": "Hallway-1745532960565",
                "toID": "Hallway-1745532969426"
            },
            {
                "fromID": "Hallway-1745532960565",
                "toID": "Hallway-1745532954933"
            },
            {
                "fromID": "Hallway-1745532954933",
                "toID": "Hallway-1745532862197"
            },
            {
                "fromID": "Hallway-1745532862197",
                "toID": "Hallway-1745532856923"
            },
            {
                "fromID": "Primary Care",
                "toID": "Hallway-1745533011435"
            },
            {
                "fromID": "Hallway-1745532940204",
                "toID": "Community Room"
            },
            { //elevator between floor 1 and 4
                "fromID": "Elevator-1745549209837",
                "toID": "Elevator-1745532984035"
            }
        ]
    });

    // create faulkner edges
    await PrismaClient.edge.createMany({
        data: [
            {
                "fromID": "Faulkner Hospital Entrance",
                "toID": "a Faulkner Hospital hallway"
            },
            {
                "fromID": "a Faulkner Hospital hallway",
                "toID": "Hallway-1745468089659"
            },
            {
                "fromID": "Hallway-1745468089659",
                "toID": "Hallway-1745468111109"
            },
            {
                "fromID": "Hallway-1745468111109",
                "toID": "Hallway-1745468120025"
            },
            {
                "fromID": "Hallway-1745468120025",
                "toID": "Reception-1745468203626"
            },
            {
                "fromID": "Hallway-1745468120025",
                "toID": "Reception-1745468181591"
            },
            {
                "fromID": "Hallway-1745468089659",
                "toID": "Hallway-1745468105189"
            },
            {
                "fromID": "Reception-1745468241433",
                "toID": "Hallway-1745468105189"
            },
            {
                "fromID": "Hallway-1745468105189",
                "toID": "Reception-1745468256681"
            },
            {
                "fromID": "Hallway-1745468089659",
                "toID": "Hallway-1745468129629"
            },
            {
                "fromID": "Hallway-1745468089659",
                "toID": "Reception-1745468225241"
            },
            {
                "fromID": "Hallway-1745468105189",
                "toID": "Hallway-1745468125283"
            },
            {
                "fromID": "Hallway-1745468416845",
                "toID": "Hallway-1745468125283"
            },
            {
                "fromID": "Hallway-1745468416845",
                "toID": "Reception-1745468408887"
            },
            {
                "fromID": "Parking-1745468723599",
                "toID": "Faulkner Hospital Entrance"
            },
            {
                "fromID": "Hallway-1745468125283",
                "toID": "Hallway-1745468133623"
            },
            {
                "fromID": "Hallway-1745468133623",
                "toID": "Hallway-1745469182158"
            },
            {
                "fromID": "Hallway-1745468133623",
                "toID": "Hallway-1745468129629"
            },
            {
                "fromID": "Hallway-1745468129629",
                "toID": "Hallway-1745468140562"
            },
            {
                "fromID": "Hallway-1745468140562",
                "toID": "Reception-1745468279713"
            },
            {
                "fromID": "Hallway-1745468140562",
                "toID": "Reception-1745468288835"
            },
            {
                "fromID": "Hallway-1745468129629",
                "toID": "Reception-1745468299003"
            },
            {
                "fromID": "Hallway-1745468129629",
                "toID": "Reception-1745468308859"
            },
            {
                "fromID": "Hallway-1745469182158",
                "toID": "Hallway-1745468326007"
            },
            {
                "fromID": "Hallway-1745468326007",
                "toID": "Hallway-1745468331257"
            },

            {
                "fromID": "Dialysis Entrance",
                "toID": "Hallway-1745546310011",
            },
            {
                "fromID": "Hallway-1745546310011",
                "toID": "Faulkner Hospital Entrance",
            },
            {
                "fromID": "Dialysis Reception",
                "toID": "Dialysis Entrance",
            },
            {
                "fromID": "Hallway-1745546310011",
                "toID": "Parking-1745468723599"
            }
        ]
    });

    // create Main Campus edges
    await PrismaClient.edge.createMany({
        data: [
            {
                "fromID": "Entrance-1745978697506",
                "toID": "Parking-1745977271629"
            },
            {
                "fromID": "Hallway-1745978726808",
                "toID": "Entrance-1745978697506"
            },
            {
                "fromID": "Elevator-1745978735954",
                "toID": "Hallway-1745978726808"
            },
            {
                "fromID": "Hallway-1745978877180",
                "toID": "Hallway-1745978726808"
            },
            {
                "fromID": "Hallway-1745978885516",
                "toID": "Hallway-1745978877180"
            },
            {
                "fromID": "Hallway-1745978979376",
                "toID": "Hallway-1745978885516"
            },
            {
                "fromID": "Hallway-1745978885516",
                "toID": "Hallway-1745978900809"
            },
            {
                "fromID": "Hallway-1745978900809",
                "toID": "Reception-1745978920070"
            },
            {
                "fromID": "Hallway-1745978979376",
                "toID": "Hallway-1745978988044"
            },
            {
                "fromID": "Hallway-1745978988044",
                "toID": "Hallway-1745978998036"
            },
            {
                "fromID": "Hallway-1745978998036",
                "toID": "Reception-1745979021528"
            },
            {
                "fromID": "Hallway-1745978998036",
                "toID": "Hallway-1745979028694"
            },
            {
                "fromID": "Hallway-1745979028694",
                "toID": "Hallway-1745979034269"
            },
            {
                "fromID": "Hallway-1745979034269",
                "toID": "Hallway-1745979044044"
            },
            {
                "fromID": "Hallway-1745979044044",
                "toID": "Reception-1745979064138"
            },
            {
                "fromID": "Hallway-1745979074658",
                "toID": "Hallway-1745979034269"
            },
            {
                "fromID": "Hallway-1745979074658",
                "toID": "Reception-1745979105794"
            },
            {
                "fromID": "Hallway-1745979074658",
                "toID": "Hallway-1745979113844"
            },
            {
                "fromID": "Hallway-1745979113844",
                "toID": "Hallway-1745979120586"
            },
            {
                "fromID": "Hallway-1745979120586",
                "toID": "Reception-1745979160598"
            },
            {
                "fromID": "Hallway-1745979113844",
                "toID": "Hallway-1745979131954"
            },
            {
                "fromID": "Hallway-1745979131954",
                "toID": "Hallway-1745979171184"
            },
            {
                "fromID": "Hallway-1745979171184",
                "toID": "Hallway-1745979183112"
            },
            {
                "fromID": "Hallway-1745979183112",
                "toID": "Hallway-1745979190434"
            },
            {
                "fromID": "Hallway-1745979190434",
                "toID": "Reception-1745979202834"
            },
            {
                "fromID": "Parking-1745977271629",
                "toID": "Sidewalk-1745979230530"
            },
            {
                "fromID": "Sidewalk-1745979230530",
                "toID": "Sidewalk-1745979242998"
            },
            {
                "fromID": "Sidewalk-1745979242998",
                "toID": "Sidewalk-1745979249708"
            },
            {
                "fromID": "Sidewalk-1745979258676",
                "toID": "Sidewalk-1745979249708"
            },
            {
                "fromID": "Entrance-1745979219810",
                "toID": "Sidewalk-1745979258676"
            },
            {
                "fromID": "Hallway-1745979293578",
                "toID": "Entrance-1745979219810"
            },
            {
                "fromID": "Hallway-1745978900809",
                "toID": "Hallway-1745980436047"
            },
            {
                "fromID": "Reception-1745978956684",
                "toID": "Hallway-1745980436047"
            },
            {
                "fromID": "Hallway-1745979293578",
                "toID": "Hallway-1745980436047"
            }
        ]
    })

    console.log('Floorplan seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        return Promise.reject(e);
    })
    .finally(async () => {
        await PrismaClient.$disconnect();
    });