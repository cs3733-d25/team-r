import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InternalMap from '@/features/MapView/InternalMap';
import { useMapData, fetchPath } from '@/features/MapView/mapService';
import {
    floorConfig,
    getBuildingConstant,
    getBuildingFromLocation,
    getShortLocationName,
} from '@/features/MapView/mapUtils';
import axios from 'axios';

declare global {
  interface Window {
    goToFloor?: (floor: number, building?: string) => void;
  }
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

    const { parkingLots, departments } = useMapData(selectedBuilding);
    const [algorithm, setAlgorithm] = useState<'dfs' | 'bfs' | 'aStar'>('dfs');
    const [pathCoordinates, setPathCoordinates] = useState<[number, number][]>([]);

    // Filter parking lots by the current building
    useEffect(() => {
        const filtered = parkingLots.filter((lot) => {
            const buildingMap: { [key: string]: string[] } = {
                'Patriot Place 20': ['PATRIOT_PLACE_20', 'Patriot Place 20', '20 Patriot'],
                'Patriot Place 22': ['PATRIOT_PLACE_22', 'Patriot Place 22', '22 Patriot'],
                'Chestnut Hill': ['CHESTNUT_HILL', 'Chestnut Hill'],
                'Faulkner': ['FAULKNER', 'Faulkner'],
            };
            return buildingMap[selectedBuilding]?.some((name) =>
                lot.building.toUpperCase().includes(name.toUpperCase())
            );
        });
        setFilterParkingLots(filtered);
    }, [parkingLots, selectedBuilding]);

    // Helper: convert node IDs → full node objects
    const getNodeObjs = async (nodeIDs: string[]): Promise<MapNode[]> => {
        try {
            const resp = await axios.get('/api/map/getNodeObjs', { params: { nodeIDs } });
            return resp.data;
        } catch (e) {
            console.error('Error fetching node objects:', e);
            return [];
        }
    };

    /*
    const response = await axios.post('/api/transportreq/', {
                ...formData,
                priority: formData.priority.toString()
            });
            console.log('message is here')
     */
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

            // 1) get the sequence of node IDs
            const nodeIDs = await fetchPath(
                selectedParkinglot,
                receptionNodeID,
                algorithm
            );
            console.log('got nodeIDs:', nodeIDs);
            // 2) fetch their full data, reverse to start→end
            const nodes = await getNodeObjs(nodeIDs);
            const coords = nodes.reverse().map((n) => [n.ycoord, n.xcoord] as [number, number]);
            console.log('computed pathCoordinates:', coords);
            // 3) update map
            setPathCoordinates(coords);
        } catch (err) {
            console.error('Error fetching path:', err);
        }
    };

    const availableFloors =
        floorConfig[selectedBuilding as keyof typeof floorConfig] || [1];

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
                                onValueChange={(value: string) => setAlgorithm(value as "dfs" | "bfs" | "aStar")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select algorithm" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="dfs">DFS</SelectItem>
                                        <SelectItem value="bfs">BFS</SelectItem>
                                        <SelectItem value="aStar">A* Search</SelectItem>
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
            </div>
        </div>
    );
}