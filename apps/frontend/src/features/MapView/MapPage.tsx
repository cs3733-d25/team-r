import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InternalMap from '@/features/MapView/InternalMap.tsx';
import React, { useEffect, useState } from 'react';
import {
    floorConfig,
    getBuildingConstant,
    getBuildingFromLocation,
    getShortLocationName,
} from '@/features/MapView/mapUtils';
import TextDirections from '@/components/TextDirections.tsx';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { fetchPath, useMapData } from '@/features/MapView/mapService';
import { VoiceControl } from '@/components/VoiceControl.tsx';
import { Node } from '../../../../backend/src/routes/maps/mapData.ts';
import {displayInfo} from "@/features/MapView/DisplayInformation.tsx";


declare global {
    interface Window {
        goToFloor?: (floor: number, building?: string) => void;
    }
}

export function MapPage() {
    const location = useLocation();
    const selectedLocation = location.state?.selectedLocation || '';
    const buildingIdentifier = location.state?.buildingIdentifier;
    const [selectedParkinglot, setSelectedParkinglot] = useState<string>('');
    const [filterParkingLots, setFilterParkingLots] = useState<
        { building: string; nodeID: string; shortName: string }[]
    >([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [currentFloor, setCurrentFloor] = useState<number>(1);
    // the building name (e.g. "Healthcare Center (20 Patriot Pl.)")
    const [selectedBuilding] = useState<string>(
        buildingIdentifier || getBuildingFromLocation(selectedLocation)
    );
    const [accessibleRoute, setAccessibleRoute] = useState<boolean>(false);
    const [pathCoordinates, setPathCoordinates] = useState<[number, number][]>([]);

    /**
     * This function gets the parking lots and departments, removes duplicates, then sorts the departments alphabetically.
     */
    function getParkingAndDepartments() {
        const mapData = useMapData(selectedBuilding);
        const dups : string[] = [];
        //filter to remove duplicates
        mapData.departments = mapData.departments.filter((dep) => {
            if (dups.includes(dep.name)) {
                console.log("duplicate!");
                return false;
            } else {
                dups.push(dep.name);
                return true;
            }
        })
        //sorting alphabetically by name
        mapData.departments = mapData.departments.sort((a, b) => {
            if (a.name > b.name) return 1;
            else return -1;
        });

        return mapData;
    }
    const { parkingLots, departments } = getParkingAndDepartments();
    const [directionStrings, setDirectionStrings] = useState<string[]>([]);
    const [lastUsedNodes, setLastUsedNodes] = useState<Node[] | null>(null);
    console.log('departments: ', departments);
    const [showDirections, setShowDirections] = useState(false);
    const [flashingFloors, setFlashingFloors] = useState<number[] | null>(null);
    const [pathByFloor, setPathByFloor] = useState<Record<number, [number, number][]>>({});
    const [useMeters, setUseMeters] = useState(false);
    const [hasClickedGetDirections, setHasClickedGetDirections] = useState(false);

    useEffect(() => {
        if (hasClickedGetDirections && selectedParkinglot && selectedDepartment) {
            handleGetDirections();
        }
    }, [selectedParkinglot, selectedDepartment, accessibleRoute, hasClickedGetDirections]);

    useEffect(() => {
        const filtered = parkingLots.filter((lot) => {
            const buildingMap: { [key: string]: string[] } = {
                'Healthcare Center (20 Patriot Pl.)': [
                    'PATRIOT_PLACE_20',
                    'Patriot Place 20',
                    '20 Patriot',
                ],
                'Healthcare Center (22 Patriot Pl.)': [
                    'PATRIOT_PLACE_22',
                    'Patriot Place 22',
                    '22 Patriot',
                ],
                'Healthcare Center (Chestnut Hill)': ['CHESTNUT_HILL', 'Chestnut Hill'],
                'Faulkner Hospital': ['FAULKNER', 'Faulkner'],
                'Main Campus Hospital (75 Francis St.)': ['WOMENS', 'Main Campus Hospital (75 Francis St.)'],
            };

            // keep the parking lot if its name matches the one of the selected building
            return buildingMap[selectedBuilding]?.some((buildingName) =>
                lot.building.toUpperCase().includes(buildingName.toUpperCase())
            );
        });
        setFilterParkingLots(filtered);
    }, [parkingLots, selectedBuilding]);

    useEffect(() => {
        if (lastUsedNodes) {
            calculateTextDirections(lastUsedNodes, useMeters);
        }
    }, [useMeters]);

    // Main “Get Directions” handler
    const handleGetDirections = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setHasClickedGetDirections(true);

        if (!selectedParkinglot || !selectedDepartment) {
            alert('Please select both a parking lot and a department.');
            return;
        }
        //get the algorithm set by the admin - stored in database
        const response = await axios.get('/api/algo');
        const algorithm = response.data.algo;

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

            // get the sequence of node IDs - use accessible route if selected
            let nodes;
            if (accessibleRoute) {
                const routeResponse = await axios.post('/api/algo/accessible-route', {
                    startingPoint: selectedParkinglot,
                    endingPoint: receptionNodeID,
                    algorithm: algorithm,
                });
                nodes = routeResponse.data;
            } else {
                nodes = await fetchPath(selectedParkinglot, receptionNodeID, algorithm);
            }

            // fetch their full data, reverse to start→end
            // group coordinates by floor
            const pathByFloor: Record<number, [number, number][]> = {};
            nodes.forEach((node: Node) => {
                if (!pathByFloor[node.floor]) {
                    pathByFloor[node.floor] = [];
                }
                pathByFloor[node.floor].push([node.xcoord, node.ycoord]);
            });

            // set both full path and floor segments
            const coords = nodes.map((n: Node) => [n.xcoord, n.ycoord] as [number, number]);
            const reversedCoords = [];
            for (let i = coords.length - 1; i >= 0; i--) {
                reversedCoords.push(coords[i]);
            }
            console.log('computed pathCoordinates:', coords);
            // const OwenCoords = [[711, 314], [702, 630]];
            // 3) update map
            setPathCoordinates(coords);
            setPathByFloor(pathByFloor);
            // give the node ID's to the calculateTextDirections function to turn into text directions
            await calculateTextDirections(nodes, useMeters);
            //set last use nodes
            setLastUsedNodes(nodes);
            // set the floors that need to flash
            await floorsTraveled(nodes);
        } catch (err) {
            console.error('Error fetching path:', err);
        }
    };

    /**
     * Given a string array of nodeIDs, this function converts them to their shortNames
     * @param nodes - an array of nodes (path)
     * @param useMeters
     */
    const calculateTextDirections = async (nodes: Node[], useMeters: boolean) => {
        /**
         * Calculates the distance between two nodes in units (raw coordinates)
         * @param node1 - the first node
         * @param node2 - the second node
         */
        const calculateDistanceUnits = (node1: Node, node2: Node) => {
            const dx = node2.xcoord - node1.xcoord;
            const dy = node2.ycoord - node1.ycoord;
            return Math.sqrt(dx * dx + dy * dy);
        };

        /**
         * Converts a distance in units (coordinates) to feet
         * @param distance - the distance in units
         */
        const convertDistanceToFeet = (distance: number) => {
            // conversion factor for units to feet
            // calculated by using the distance from the faulkner parking lot to entrance (309 units = 231 feet)
            return distance * 0.7475;
        };

        const convertDistance = (distance: number) => {
            const feet = convertDistanceToFeet(distance);
            return useMeters
                ? `${(feet * 0.3048).toFixed(1)} meters`
                : `${Math.round(feet)} feet`;
        }


        try {
            if (nodes.length < 2) {
                setDirectionStrings([]);
                return;
            }
            // be sure to show the directions since we have a valid path
            setShowDirections(true);

            const enhancedDirections: string[] = [];

            // First node is starting point
            enhancedDirections.push(`Start at ${nodes[0].shortName}`);

            // For the first segment, just head toward without turn instructions since we don't have an initial direction
            if (nodes.length > 1) {
                enhancedDirections.push(`Head toward ${nodes[1].shortName}`);
            }

            // Process middle segments to determine turns
            for (let i = 1; i < nodes.length - 1; i++) {
                const prevNode = nodes[i - 1];
                const currentNode = nodes[i];
                const nextNode = nodes[i + 1];
                const rawDistance = calculateDistanceUnits(prevNode, currentNode);
                const distanceText = convertDistance(rawDistance);



                if (currentNode.floor !== prevNode.floor) {
                    const goingUp = currentNode.floor > prevNode.floor;
                    const direction = goingUp ? 'up' : 'down';

                    if (currentNode.nodeType.toLowerCase().includes('stairs')) {
                        enhancedDirections.push(`In ${distanceText}, go ${direction} the stairs to floor ${currentNode.floor}`);
                    } else {
                        enhancedDirections.push(`In ${distanceText}, go ${direction} to floor ${currentNode.floor}`);
                    }
                    continue;
                }
                const directionChange = calculateDirectionChange(prevNode, currentNode, nextNode);
                enhancedDirections.push(
                    `In ${distanceText}, ${directionChange} toward ${nextNode.shortName}`
                );
            }

            // Final arrival
            enhancedDirections.push(`Arrive at ${nodes[nodes.length - 1].shortName}`);

            setDirectionStrings(enhancedDirections);
        } catch (error) {
            console.error('Error processing directions:', error);
            setDirectionStrings([]);
        }
    };

    /**
     * Calculates the relative direction change between path segments
     * @param prev - previous node
     * @param current - current node
     * @param next - next node
     * @return - string indicating the direction change
     */
    const calculateDirectionChange = (prev: Node, current: Node, next: Node): string => {
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
            return "turn right";
        } else if (angleDiff <= -30 && angleDiff > -150) {
            return "turn left";
        } else {
            return "continue straight";
        }
    };

    /**
     * Given a string array of nodeIDs, this function determines the floors the user will travel
     * Note: Excludes floor 1 since user is already on that floor
     * @param nodes - the string of node objects (path)
     */
    const floorsTraveled = async (nodes: Node[]) => {

        // get the floors of the nodes
        const floors = nodes.map((node) => node.floor);
        // remove floor 1 (user is already on that floor)
        // TODO: find out the floor the user is on rather than assuming floor 1
        const floorsExcluding1 = floors.filter((floor) => floor !== 1);

        console.log(`floors traveled: ${floorsExcluding1}`);
        setFlashingFloors(floorsExcluding1);
    };

    /**
     * Returns an array of available floors for the selected building
     */
    const availableFloors = floorConfig[selectedBuilding as keyof typeof floorConfig] || [1];

    return (
        <div className="flex flex-col h-[calc(100vh-65px)] overflow-hidden">
            <div className="flex-1 w-full relative">
                {/* Internal map with the computed path overlaid */}
                <InternalMap
                    location={{
                        building: selectedBuilding,
                        floor: currentFloor,
                    }}
                    pathCoordinates={pathCoordinates}
                    pathByFloor={pathByFloor}
                    showEdges={false}
                    showNodes={false}
                />



                {/* Sidebar controls */}
                <div className="absolute top-4 left-4 bg-white dark:bg-background rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <Label className="font-bold text-xl">Selected Location</Label>
                            {displayInfo(
                            <VoiceControl
                                selectedBuilding={buildingIdentifier}
                                onParkingLotSelected={setSelectedParkinglot}
                                onDepartmentSelected={setSelectedDepartment}
                                onSelectionComplete={(lotId, deptId) => {
                                    setSelectedParkinglot(lotId);
                                    setSelectedDepartment(deptId);
                                    handleGetDirections();
                                }}
                            />,
                                "Click on this button to enable microphone use for voice control. To find a path, say something like, \"Take me from Patient Parking to Dialysis\".")}
                        </div>
                        <div className={'font-bold text-secondary text-lg'}>
                            {getShortLocationName(selectedLocation)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label>
                            Select a parking lot and department to get directions to the appropriate check-in desk.
                        </Label>
                        {/* Parking lot picker */}
                        <Select
                            value={selectedParkinglot}
                            onValueChange={setSelectedParkinglot}
                        >
                            <div>
                                {displayInfo(
                                <SelectTrigger>
                                    <SelectValue placeholder="Parking Lot" />
                                </SelectTrigger>,
                                "Click here to choose a parking lot as a starting location.")}
                            </div>
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
                            <div>
                                {displayInfo(
                                    <SelectTrigger>
                                        <SelectValue placeholder="Department" />
                                    </SelectTrigger>,
                                    "Click here to choose a department as a destination."
                                )}
                            </div>
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

                        <div>
                            {displayInfo(
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="accessibleRoute"
                                    checked={accessibleRoute}
                                    onCheckedChange={(checked) => setAccessibleRoute(checked as boolean)}
                                />
                                <Label htmlFor="accessibleRoute" className="text-sm font-medium">
                                    Show Accessible Route
                                </Label>
                            </div>,
                            "Click on this checkbox to select only accessible routes.")}
                        </div>

                        {/* Trigger pathfinding */}
                        {displayInfo(
                        <Button className="w-full" onClick={handleGetDirections}>
                            Get Directions
                        </Button>,
                        "Once a parking lot and department are selected, click here to display directions.")}
                    </div>

                    {/* Floor navigation */}
                    {selectedBuilding.includes("22") &&
                    <div className="mt-4 pt-4 border-t">
                        <Label className="font-bold mb-2">Floors</Label>
                        {availableFloors.map((floor) => (
                            displayInfo(
                                <Button
                                    key={floor}
                                    variant={
                                        currentFloor === floor
                                            ? 'secondary'
                                            : flashingFloors?.includes(floor)
                                                ? 'outline'
                                                : 'unselected'
                                    }
                                    className={`${flashingFloors?.includes(floor) ? 'animate-flash' : ''} w-full mb-1`}
                                    onClick={() => {
                                        setCurrentFloor(floor);
                                        window.goToFloor?.(
                                            floor,
                                            getBuildingConstant(selectedBuilding)
                                        );

                                        if (flashingFloors?.includes(floor)) {
                                            setFlashingFloors((prev) => prev?.filter((f) => f !== floor) || null);
                                        }
                                    }}
                                >
                                    Floor {floor}
                                </Button>,
                                `Click here to display the route on Floor ${floor}.`)
                        ))}
                    </div>}
                </div>
                {showDirections && (
                    <div>
                        <TextDirections
                            steps={directionStrings}
                            useMeters={useMeters}
                            onUseMetersChange={(useMeters) => setUseMeters(useMeters)}
                            isInternal={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}