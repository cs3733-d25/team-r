import client from "../apps/backend/src/bin/prisma-client.ts";


async function main() {
    // chestnut hill floor 1
    await client.node.createMany({
        data:[
            {
                    "nodeID": "Entrance-1745475279866",
                    "nodeType": "Entrance",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 528.89,
                    "ycoord": 323.08,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Entrance-1745475321572",
                    "nodeType": "Entrance",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 241.77,
                    "ycoord": 506.1,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Reception-1745475750292",
                    "nodeType": "Reception",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 465.11,
                    "ycoord": 394.09,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Reception-1745475823905",
                    "nodeType": "Reception",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 364.14,
                    "ycoord": 660.12,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Parking-1745476124817",
                    "nodeType": "Parking",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 533.09,
                    "ycoord": 213.06,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Parking-1745476137948",
                    "nodeType": "Parking",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 151.2,
                    "ycoord": 675.12,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476252825",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 379.12,
                    "ycoord": 614.09,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476261869",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 377.14,
                    "ycoord": 715.13,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476274839",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 315.15,
                    "ycoord": 714.13,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476286280",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 317.15,
                    "ycoord": 804.14,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476316023",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 590.07,
                    "ycoord": 861.15,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476325501",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 381.13,
                    "ycoord": 956.16,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476336196",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 425.12,
                    "ycoord": 956.16,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476355584",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 377.14,
                    "ycoord": 801.14,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476377768",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 385.13,
                    "ycoord": 871.15,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476392418",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 591.07,
                    "ycoord": 921.16,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476405531",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 436.12,
                    "ycoord": 928.16,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476418680",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 705.04,
                    "ycoord": 922.16,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476440148",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 710.04,
                    "ycoord": 685.12,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476454878",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 770.07,
                    "ycoord": 683.1,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476466618",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 771.02,
                    "ycoord": 412.09,
                    "longName": "",
                    "shortName": ""
                },
                {
                    "nodeID": "Hallway-1745476477762",
                    "nodeType": "Hallway",
                    "building": "Chestnut Hill",
                    "floor": 1,
                    "xcoord": 591.07,
                    "ycoord": 411.09,
                    "longName": "",
                    "shortName": ""
                }

        ],
        skipDuplicates: true
    })

    await client.edge.createMany({
        data:[
                {
                    "edgeID": "e3519bcb-a853-4da1-ba2b-31142b151244",
                    "fromID": "Parking-1745476124817",
                    "toID": "Entrance-1745475279866",
                    "fromX": null,
                    "fromY": null,
                    "toX": null,
                    "toY": null
                },
                    {
                        "edgeID": "25cbdf9d-2f36-426d-a887-ebd578c3a3e3",
                        "fromID": "Hallway-1745476466618",
                        "toID": "Hallway-1745476454878",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "04525e00-1ac6-4a12-ac97-30b952e61bb4",
                        "fromID": "Hallway-1745476466618",
                        "toID": "Hallway-1745476477762",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "9d008868-3e64-4879-b288-47702e44b5d3",
                        "fromID": "Hallway-1745476440148",
                        "toID": "Hallway-1745476418680",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "f62e8c26-e49f-4d0b-801d-a79d84ad5d11",
                        "fromID": "Hallway-1745476454878",
                        "toID": "Hallway-1745476440148",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "67d5e250-7946-4269-82a4-bec57573faed",
                        "fromID": "Hallway-1745476418680",
                        "toID": "Hallway-1745476392418",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "2666f7ed-781c-4e56-b972-e8d355e320f6",
                        "fromID": "Hallway-1745476392418",
                        "toID": "Hallway-1745476316023",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "9ca61dfa-6448-43a7-83d3-ede06e306e78",
                        "fromID": "Hallway-1745476316023",
                        "toID": "Hallway-1745476377768",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "85f5b038-de17-406d-80c3-2874ff5f7f49",
                        "fromID": "Hallway-1745476392418",
                        "toID": "Hallway-1745476405531",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "17925112-bada-4dfb-bfc8-d838c39bcd93",
                        "fromID": "Hallway-1745476405531",
                        "toID": "Hallway-1745476336196",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "b8b37346-c04c-4bc3-bb4b-8f2628a7fd2b",
                        "fromID": "Hallway-1745476336196",
                        "toID": "Hallway-1745476325501",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "0cfb6592-666a-4d6f-9d78-33990c5749cc",
                        "fromID": "Hallway-1745476325501",
                        "toID": "Hallway-1745476377768",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "6e5b3d02-6036-49af-9dd5-9474e7e64698",
                        "fromID": "Hallway-1745476377768",
                        "toID": "Hallway-1745476355584",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "dd73e1c5-9884-458a-9d2e-54642840c206",
                        "fromID": "Hallway-1745476355584",
                        "toID": "Hallway-1745476286280",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "2c256ba2-f5ce-4dff-a30c-665cc57751ab",
                        "fromID": "Hallway-1745476274839",
                        "toID": "Hallway-1745476286280",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "cbbae1fe-be02-48b6-8a04-7eca0fea909b",
                        "fromID": "Hallway-1745476274839",
                        "toID": "Hallway-1745476261869",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "84d21992-474d-4d1a-b661-788f514acd29",
                        "fromID": "Hallway-1745476261869",
                        "toID": "Hallway-1745476252825",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "7b679f05-01af-4522-ab8b-685269030e93",
                        "fromID": "Parking-1745476137948",
                        "toID": "Entrance-1745475321572",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "ea7bea0a-ef04-4bf7-af4d-719bf52c113e",
                        "fromID": "Entrance-1745475321572",
                        "toID": "Hallway-1745476252825",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "dad3ff3c-1219-4966-a5a1-64a7303627c9",
                        "fromID": "Entrance-1745475321572",
                        "toID": "Reception-1745475823905",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "45c6b47f-4d95-4265-af1f-bc9b5c743e5b",
                        "fromID": "Entrance-1745475279866",
                        "toID": "Reception-1745475750292",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    },
                    {
                        "edgeID": "c5d0acfc-020c-41da-aa18-8e58b00d9591",
                        "fromID": "Entrance-1745475279866",
                        "toID": "Hallway-1745476477762",
                        "fromX": null,
                        "fromY": null,
                        "toX": null,
                        "toY": null
                    }

        ]
    })

    // patriot 20 floor 1
    /*await client.node.createMany({
        data: [],
        skipDuplicates: true
    });*/

    // all faulkner nodes
    await client.node.createMany({
        data: [
            {
                "nodeID": "Hallway-1745468089659",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 582.42,
                "ycoord": 620.75,
                "longName": "",
                "shortName": "East Central Hallway"
            },
            {
                "nodeID": "Hallway-1745468105189",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 581.83,
                "ycoord": 668,
                "longName": "",
                "shortName": "Southeast Hallway"
            },
            {
                "nodeID": "Hallway-1745468111109",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 582.83,
                "ycoord": 578,
                "longName": "",
                "shortName": "Northeast Hallway"
            },
            {
                "nodeID": "Hallway-1745468120025",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 559.42,
                "ycoord": 576,
                "longName": "",
                "shortName": "East Wing Hallway"
            },
            {
                "nodeID": "Hallway-1745468125283",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 510.42,
                "ycoord": 670.5,
                "longName": "",
                "shortName": "South Hallway"
            },
            {
                "nodeID": "Hallway-1745468129629",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 480.17,
                "ycoord": 621.5,
                "longName": "",
                "shortName": "Central Hallway"
            },
            {
                "nodeID": "Hallway-1745468133623",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 478.83,
                "ycoord": 669,
                "longName": "",
                "shortName": "South Central Hallway"
            },
            {
                "nodeID": "Hallway-1745468140562",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 480.42,
                "ycoord": 515.5,
                "longName": "",
                "shortName": "Northeast Central"
            },
            {
                "nodeID": "Reception-1745468181591",
                "nodeType": "Reception",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 561.42,
                "ycoord": 591,
                "longName": "",
                "shortName": "East Reception"
            },
            {
                "nodeID": "Reception-1745468203626",
                "nodeType": "Reception",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 561.71,
                "ycoord": 553,
                "longName": "",
                "shortName": "Northeast Reception"
            },
            {
                "nodeID": "Reception-1745468225241",
                "nodeType": "Reception",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 568.92,
                "ycoord": 631.75,
                "longName": "",
                "shortName": "Pre-Admit Reception"
            },
            {
                "nodeID": "Reception-1745468241433",
                "nodeType": "Reception",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 596.92,
                "ycoord": 668,
                "longName": "",
                "shortName": "MRI Reception"
            },
            {
                "nodeID": "Reception-1745468256681",
                "nodeType": "Reception",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 581.92,
                "ycoord": 721,
                "longName": "",
                "shortName": "Radiology Reception"
            },
            {
                "nodeID": "Reception-1745468279713",
                "nodeType": "Reception",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 481.42,
                "ycoord": 498,
                "longName": "",
                "shortName": "North Reception"
            },
            {
                "nodeID": "Reception-1745468288835",
                "nodeType": "Reception",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 451.33,
                "ycoord": 514.75,
                "longName": "",
                "shortName": "GI Reception"
            },
            {
                "nodeID": "Reception-1745468299003",
                "nodeType": "Reception",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 466.08,
                "ycoord": 629.5,
                "longName": "",
                "shortName": "Pulmonary Reception"
            },
            {
                "nodeID": "Reception-1745468308859",
                "nodeType": "Reception",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 449.21,
                "ycoord": 630.75,
                "longName": "",
                "shortName": "Central Reception"
            },
            {
                "nodeID": "Hallway-1745468326007",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 383.42,
                "ycoord": 669.5,
                "longName": "",
                "shortName": "West Hallway"
            },
            {
                "nodeID": "Hallway-1745468331257",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 385.58,
                "ycoord": 789.25,
                "longName": "",
                "shortName": "Southwest Hallway"
            },
            {
                "nodeID": "Reception-1745468408887",
                "nodeType": "Reception",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 495,
                "ycoord": 807.5,
                "longName": "",
                "shortName": "South Reception"
            },
            {
                "nodeID": "Hallway-1745468416845",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 511.5,
                "ycoord": 807.25,
                "longName": "",
                "shortName": "South Corridor"
            },
            {
                "nodeID": "Parking-1745468723599",
                "nodeType": "Parking",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 719.67,
                "ycoord": 313,
                "longName": "THE Faulkner Parking Lot",
                "shortName": "Parking Lot"
            },
            {
                "nodeID": "Hallway-1745469182158",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 450.42,
                "ycoord": 668.5,
                "longName": "",
                "shortName": "West Central Hallway"
            },
            {
                "nodeID": "Faulkner Entrance",
                "nodeType": "Entrance",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 722.0,
                "ycoord": 622.0,
                "longName": "Faulkner front entrance",
                "shortName": "Front Entrance"
            },
            {
                "nodeID": "a faulkner hallway",
                "nodeType": "Hallway",
                "building": "Faulkner",
                "floor": 1,
                "xcoord": 630.5,
                "ycoord": 620.5,
                "longName": "",
                "shortName": "East Entrance Hallway"
            }
        ],
        skipDuplicates: true
    });

    // patriot 22 floor 1
    await client.node.createMany({
        data: [
            {
                "nodeID": "Extended Patient Parking",
                "nodeType": "Parking",
                "building": "Patriot Place 22",
                "floor": 1,
                "xcoord": 15.83,
                "ycoord": 10,
                "longName": "",
                "shortName": "Extended Patient Parking"
            },
            {
                "nodeID": "Valet Parking",
                "nodeType": "Parking",
                "building": "Patriot Place 22",
                "floor": 1,
                "xcoord": 1.67,
                "ycoord": 707,
                "longName": "",
                "shortName": "Valet Parking"
            },
            {
                "nodeID": "Valet Parking Lot",
                "nodeType": "Parking",
                "building": "Patriot Place 22",
                "floor": 1,
                "xcoord": 424.67,
                "ycoord": 923,
                "longName": "",
                "shortName": "Valet Parking Lot"
            },
            {
                "nodeID": "Sidewalk-1745515004862",
                "nodeType": "Sidewalk",
                "building": "Patriot Place 22",
                "floor": 1,
                "xcoord": 119.67,
                "ycoord": 690,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745515017629",
                "nodeType": "Hallway",
                "building": "Patriot Place 22",
                "floor": 1,
                "xcoord": 130.67,
                "ycoord": 691,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Hallway-1745515041197",
                "nodeType": "Hallway",
                "building": "Patriot Place 22",
                "floor": 1,
                "xcoord": 258.67,
                "ycoord": 792,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Entrance-1745515055030",
                "nodeType": "Entrance",
                "building": "Patriot Place 22",
                "floor": 1,
                "xcoord": 357.67,
                "ycoord": 746,
                "longName": "",
                "shortName": ""
            },
            {
                "nodeID": "Elevator-1745515093551",
                "nodeType": "Elevator",
                "building": "Patriot Place 22",
                "floor": 1,
                "xcoord": 412.67,
                "ycoord": 682,
                "longName": "",
                "shortName": ""
            }
        ],
        skipDuplicates: true
    });

    await client.edge.createMany({
        data: [
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
            // {fromID: 'ST02', toID: '3000C', fromX: 442.88, fromY: 327.00, toX: 444.25, toY: 344.00},
            // { fromID: '3000C', toID: '3E', fromX: 444.25, fromY: 344.00, toX: 466.88, toY: 345.00 },
            // { fromID: '3E', toID: '3001', fromX: 466.88, fromY: 345.00, toX: 466.63, toY: 432.00 },
            // { fromID: '3001', toID: '3000A', fromX: 466.63, fromY: 432.00, toX: 418.63, toY: 419.25 },
            // { fromID: '3000A', toID: 'ST01', fromX: 418.63, fromY: 419.25, toX: 436.13, toY: 470.25 },
            // { fromID: 'ST01', toID: '3A', fromX: 436.13, fromY: 470.25, toX: 438.88, toY: 538.75 },
            // { fromID: '3000A', toID: '3B', fromX: 418.63, fromY: 419.25, toX: 438.13, toY: 592.50 },
            // { fromID: '3A', toID: '3B', fromX: 438.88, fromY: 538.75, toX: 438.13, toY: 592.50 },
            // { fromID: '3B', toID: '307', fromX: 438.13, fromY: 592.50, toX: 275.38, toY: 693.50 },
            // { fromID: '3A', toID: '3000B', fromX: 438.88, fromY: 538.75, toX: 436.13, toY: 643.75 },
            // { fromID: '3000B', toID: '3104', fromX: 436.13, fromY: 643.75, toX: 595.13, toY: 639.00 },
            // { fromID: '3104', toID: '3S', fromX: 595.13, fromY: 639.00, toX: 595.13, toY: 733.25 },
            // { fromID: '3S', toID: '3112', fromX: 595.13, fromY: 733.25, toX: 645.88, toY: 732.50 },
            // { fromID: '3112', toID: 'ST03', fromX: 645.88, fromY: 732.50, toX: 660.63, toY: 805.25 },
            // { fromID: 'bridgePatriot20', toID: '307', fromX: 237.41, fromY: 111.00, toX: 275.38, toY: 693.50 }
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

    // create faulkner edges
    await client.edge.createMany({
        data: [
            {
                "fromID": "Faulkner Entrance",
                "toID": "a faulkner hallway"
            },
            {
                "fromID": "a faulkner hallway",
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
                "toID": "Faulkner Entrance"
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
            }
        ]
    });

    console.log('Floorplan seeded successfully!');
    }

    main()
        .catch((e) => {
            console.error(e);
            return Promise.reject(e);
        })
        .finally(async () => {
            await client.$disconnect();
        });