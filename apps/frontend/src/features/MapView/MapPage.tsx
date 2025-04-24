import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select';
import InternalMap from '@/features/MapView/InternalMap.tsx';
import React, {useEffect, useState} from 'react';
import {
    floorConfig,
    getBuildingConstant,
    getBuildingFromLocation,
    getShortLocationName
} from '@/features/MapView/mapUtils';
import TextDirections from "@/components/TextDirections.tsx";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import {fetchPath, useMapData} from '@/features/MapView/mapService';
import {Node} from "../../../../backend/src/routes/mapData.ts";
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { InternalMapControls } from '@/components/InternalMapControls.tsx';

declare global {
    interface Window {
        goToFloor?: (floor: number, building?: string) => void;
    }
}

const blankNode:Node = {
    nodeID: "",
    nodeType: "",
    building: "",
    floor: 0,
    xcoord: 0,
    ycoord: 0,
    longName: "",
    shortName: "",
}


interface MapNode {
    nodeID: string;
    nodeType: string;
    building: string;
    floor: number;
    xcoord: number;
    ycoord: number;
    longName: string;
    shortName: string;
}

export function MapPage() {
    const location = useLocation();
    const selectedLocation = location.state?.selectedLocation || '';
    const buildingIdentifier = location.state?.buildingIdentifier;

    // --- Component state ---
    const [selectedParkinglot, setSelectedParkinglot] = useState<string>('');
    const [filterParkingLots, setFilterParkingLots] = useState<
        { building: string; nodeID: string; shortName: string }[]
    >([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [currentFloor, setCurrentFloor] = useState<number>(1);
    const [selectedBuilding] = useState<string>(
        buildingIdentifier || getBuildingFromLocation(selectedLocation)
    );
    const [accessibleRoute, setAccessibleRoute] = useState<boolean>(false);
    const [algorithm, setAlgorithm] = useState<'dfs' | 'bfs' | 'dijkstra'>('dfs');
    const [pathCoordinates, setPathCoordinates] = useState<[number, number][]>([]);

    const {parkingLots, departments} = useMapData(selectedBuilding);
    const [directionStrings, setDirectionStrings] = useState<string[]>([]);
    console.log('departments: ', departments);

    const [showDirections, setShowDirections] = useState(false);

    useEffect(() => {
        const filtered = parkingLots.filter((lot) => {
            const buildingMap: { [key: string]: string[] } = {
                'Patriot Place 20': ['PATRIOT_PLACE_20', 'Patriot Place 20', '20 Patriot'],
                'Patriot Place 22': ['PATRIOT_PLACE_22', 'Patriot Place 22', '22 Patriot'],
                'Chestnut Hill': ['CHESTNUT_HILL', 'Chestnut Hill'],
                'Faulkner': ['FAULKNER', 'Faulkner'],
            };

            return buildingMap[selectedBuilding]?.some(buildingName =>
                lot.building.toUpperCase().includes(buildingName.toUpperCase())
            );
        });
        setFilterParkingLots(filtered);
    }, [parkingLots, selectedBuilding]);

    //from iteration 3
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            console.log("parking lot: ", selectedParkinglot);
            console.log("department lot: ", selectedDepartment);
        } catch {

        }
    };

    /**
     * Given an array of node IDs, this function will convert them to their corresponding node objects
     * @param nodeIDArray
     */
    // Helper: convert node IDs → full node objects
    const getNodeObjs = async (nodeIDs: string[]): Promise<MapNode[]> => {
        console.log('nodeIDs before get: ', nodeIDs);
        try {
            const resp = await axios.get('/api/map/getNodeObjs', { params: { nodeIDs } });
            console.log("node coords after get: ", resp.data);
            return resp.data;
        } catch (e) {
            console.error("Error converting node ID to name: ", e);
            return []; // Return empty array on error
        }
    };

    // Main “Get Directions” handler
    const handleGetDirections = async () => {
        if (!selectedParkinglot || !selectedDepartment) {
            alert('Please select both a parking lot and a department.');
            return;
        }
        try {
            console.log('selected location sending to router: ', selectedLocation);
            console.log('selected department sending to router: ', selectedDepartment);

            //change the end node to receptionNodeID based on department
            const response = await axios.post('/api/algo/reception', {
                department: selectedDepartment,
                location: selectedLocation,
            });
            const receptionNodeID = response.data.receptionNodeID;
            console.log('in handle get directions receptionNodeID: ', receptionNodeID);
            console.log('ALGO IN HANDLE: ', algorithm);

            // 1) get the sequence of node IDs
            const nodeIDs = await fetchPath(
                selectedParkinglot,
                receptionNodeID,
                algorithm
            );
            console.log('got nodeIDs:', nodeIDs);
            // 2) fetch their full data, reverse to start→end
            const nodes = await getNodeObjs(nodeIDs);
            console.log('nodeIDs from getNodeObjs: ', nodes);
            const coords = nodes.map((n) => [n.xcoord, n.ycoord] as [number, number]);
            const reversedCoords = [];
            for (let i=coords.length-1; i>=0; i--) {
                reversedCoords.push(coords[i]);
            }
            console.log('computed pathCoordinates:', coords);
            // const OwenCoords = [[711, 314], [702, 630]];
            // 3) update map
            setPathCoordinates(coords);
            // give the node ID's to the calculateTextDirections function to turn into text directions
            calculateTextDirections(nodeIDs)

        } catch (err) {
            console.error('Error fetching path:', err);
        }
    };

    /**
     * Given a string array of nodeIDs, this function converts them to their shortNames
     * @param directions - the string array of nodeIDs
     */
    const calculateTextDirections = async (directions: string[]) => {
        try {
            const nodes = await getNodeObjs(directions);
            if (nodes.length < 2) {
                setDirectionStrings([]);
                return;
            }
            // be sure to show the directions since we have a valid path
            setShowDirections(true);

            // reverse the order of the nodes to get the correct path
            // nodes.reverse();

            const enhancedDirections: string[] = [];

            // First node is starting point
            enhancedDirections.push(`Start at ${nodes[0].shortName}`);

            // For the first segment, just head toward without turn instruction
            if (nodes.length > 1) {
                enhancedDirections.push(`Head toward ${nodes[1].shortName}`);
            }

            // Process middle segments to determine turns
            for (let i = 1; i < nodes.length - 1; i++) {
                const prevNode = nodes[i - 1];
                const currentNode = nodes[i];
                const nextNode = nodes[i + 1];

                const directionChange = calculateDirectionChange(prevNode, currentNode, nextNode);
                enhancedDirections.push(`${directionChange} toward ${nextNode.shortName}`);
            }

            // Final arrival
            enhancedDirections.push(`Arrive at ${nodes[nodes.length-1].shortName}`);
            console.log("enhanced Directions: ", enhancedDirections);

            setDirectionStrings(enhancedDirections);
        } catch (error) {
            console.error("Error processing directions:", error);
            setDirectionStrings([]);
        }
    };

    /**
     * Calculates the relative direction change between path segments
     */
    const calculateDirectionChange = (prev: MapNode, current: MapNode, next: MapNode): string => {
        // Calculate vectors for previous and current segments
        const prevVector = {
            dx: current.xcoord - prev.xcoord,
            dy: current.ycoord - prev.ycoord
        };

        const currentVector = {
            dx: next.xcoord - current.xcoord,
            dy: next.ycoord - current.ycoord
        };

        // Calculate angle between vectors using atan2
        const angle1 = Math.atan2(prevVector.dy, prevVector.dx);
        const angle2 = Math.atan2(currentVector.dy, currentVector.dx);

        // Calculate angle difference in degrees
        let angleDiff = (angle2 - angle1) * 180 / Math.PI;

        // Normalize to -180 to 180 range
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;

        // Determine direction based on angle difference
        if (angleDiff >= 30 && angleDiff < 150) {
            return "Turn right";
        } else if (angleDiff <= -30 && angleDiff > -150) {
            return "Turn left";
        } else {
            return "Continue straight";
        }
    }

    const availableFloors = floorConfig[selectedBuilding as keyof typeof floorConfig] || [1];



    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="flex-1 w-full relative">
                {/* Internal map with the computed path overlaid */}
                <InternalMap
                    location={selectedLocation}
                    pathCoordinates={pathCoordinates}
                />

                {/* Sidebar controls */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10">
                    <div className="mb-4">
                        <Label className="font-bold text-xl">Selected Location</Label>
                        <div>{getShortLocationName(selectedLocation)}</div>
                    </div>

                    <div className="space-y-4">
                        {/* Parking lot picker */}
                        <Select
                            value={selectedParkinglot}
                            onValueChange={setSelectedParkinglot}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Parking Lot" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {filterParkingLots.map((lot) => (
                                        <SelectItem key={lot.nodeID} value={lot.nodeID}>
                                            {lot.shortName}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Department picker */}
                        <Select
                            value={selectedDepartment}
                            onValueChange={setSelectedDepartment}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Algorithm selector */}
                        <div className="flex flex-col space-y-2">
                            <Label>Algorithm</Label>
                            <Select
                                value={algorithm}
                                onValueChange={(value: string) => setAlgorithm(value as "dfs" | "bfs" | "dijkstra")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select algorithm" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="dfs">DFS</SelectItem>
                                        <SelectItem value="bfs">BFS</SelectItem>
                                        <SelectItem value="dijkstra">Dijkstra's</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Trigger pathfinding */}
                        <Button className="w-full" onClick={handleGetDirections}>
                            Get Directions
                        </Button>
                    </div>

                    {/* Floor navigation */}
                    <div className="mt-4 pt-4 border-t">
                        <Label className="font-bold mb-2">Floors</Label>
                        {availableFloors.map((floor) => (
                            <Button
                                key={floor}
                                variant={currentFloor === floor ? 'default' : 'secondary'}
                                className="w-full mb-1"
                                onClick={() => {
                                    setCurrentFloor(floor);
                                    window.goToFloor?.(
                                        floor,
                                        getBuildingConstant(selectedBuilding)
                                    );
                                }}
                            >
                                Floor {floor}
                            </Button>
                        ))}
                    </div>
                </div>
                {showDirections && (
                    <div>
                        <TextDirections
                            steps={directionStrings}
                        />
                        <InternalMapControls/>
                    </div>
                )}
            </div>
        </div>
    );
}