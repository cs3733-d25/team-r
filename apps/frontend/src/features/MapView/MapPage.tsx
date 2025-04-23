import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import InternalMap from '@/features/MapView/InternalMap.tsx';
import React, { useEffect, useState } from 'react';
import {
    floorConfig,
    getBuildingConstant,
    getBuildingFromLocation,
    getShortLocationName
} from '@/features/MapView/mapUtils';
import TextDirections from "@/components/TextDirections.tsx";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { postNode, postNodeDeletion, useMapData } from '@/features/MapView/mapService';
import { Node } from "../../../../backend/src/routes/mapData.ts";

interface CustomWindow extends Window {
    goToFloor?: (floor: number, building?: string) => void;
}

const blankNode: Node = {
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
    const [selectedParkinglot, setSelectedParkinglot] = useState<string>('');
    const [filterParkingLots, setFilterParkingLots] = useState<{ building: string; nodeID: string; shortName: string }[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [algorithm, setAlgorithm] = useState<'dfs' | 'bfs' | 'aStar'>('dfs');
    const buildingIdentifier = location.state?.buildingIdentifier;
    const [currentFloor, setCurrentFloor] = useState(1);
    const [selectedBuilding] = useState<string>(
        buildingIdentifier || getBuildingFromLocation(selectedLocation)
    );

    const { parkingLots, departments } = useMapData(selectedBuilding);
    const [directionStrings, setDirectionStrings] = useState<string[]>([]);
    console.log('departments: ', departments);

    useEffect(() => {
        const filterLots = parkingLots.filter(lot => {
            const buildingMap: { [key: string]: string[] } = {
                'Patriot Place 20': ['PATRIOT_PLACE_20', 'Patriot Place 20', '20 Patriot'],
                'Patriot Place 22': ['PATRIOT_PLACE_22', 'Patriot Place 22', '22 Patriot'],
                'Chestnut Hill': ['CHESTNUT_HILL', 'Chestnut Hill'],
                'Faulkner': ['FAULKNER', 'Faulkner']
            };
            return buildingMap[selectedBuilding]?.some(name =>
                lot.building.toUpperCase().includes(name.toUpperCase())
            );
        });
        setFilterParkingLots(filterLots);
    }, [parkingLots, selectedBuilding]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("parking lot: ", selectedParkinglot);
            console.log("department lot: ", selectedDepartment);
            console.log("algorithm: ", algorithm);
        } catch {}
    };

    const getNodeObjs = async (nodeIDs: string[]): Promise<MapNode[]> => {
        try {
            const response = await axios.get("/api/map/getNodeObjs", { params: { nodeIDs } });
            return response.data;
        } catch (e) {
            console.error("Error converting node ID to object:", e);
            return [];
        }
    };

    const processDirections = async (directions: string[]) => {
        try {
            const nodes = await getNodeObjs(directions);
            if (nodes.length < 2) { setDirectionStrings([]); return; }
            nodes.reverse();
            const enhanced: string[] = [];
            enhanced.push(`Start at ${nodes[0].shortName}`);
            enhanced.push(`Head toward ${nodes[1].shortName}`);
            for (let i = 1; i < nodes.length - 1; i++) {
                const prev = nodes[i - 1], curr = nodes[i], next = nodes[i + 1];
                // calculate direction ...
                enhanced.push(`Continue toward ${next.shortName}`);
            }
            enhanced.push(`Arrive at ${nodes[nodes.length - 1].shortName}`);
            setDirectionStrings(enhanced);
        } catch (err) {
            console.error(err);
            setDirectionStrings([]);
        }
    };

    const availableFloors = floorConfig[selectedBuilding as keyof typeof floorConfig] || [1];

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="flex-1 w-full relative">
                <InternalMap location={selectedLocation} />
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10 flex flex-col">
                    <div>
                        <Label className="p-2 pb-0 font-bold text-2xl">Selected Location:</Label>
                        <Label className="p-2 pt-0 font-bold text-xl text-secondary">
                            {getShortLocationName(selectedLocation)}
                        </Label>
                    </div>
                    <form className="space-y-6 flex-grow overflow-auto" onSubmit={handleSubmit}>
                        <Select onValueChange={setSelectedParkinglot}>
                            <SelectTrigger><SelectValue placeholder="Parking Lot"/></SelectTrigger>
                            <SelectContent>
                                <SelectGroup><SelectLabel>Parking Lots</SelectLabel>
                                    {filterParkingLots.map(lot => (<SelectItem key={lot.nodeID} value={lot.nodeID}>{lot.shortName}</SelectItem>))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                            <SelectTrigger><SelectValue placeholder="Department"/></SelectTrigger>
                            <SelectContent>
                                <SelectGroup><SelectLabel>Departments</SelectLabel>
                                    {departments.map(dept => (<SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>))}
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
                                <SelectTrigger><SelectValue placeholder="Select algorithm"/></SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="dfs">DFS</SelectItem>
                                        <SelectItem value="bfs">BFS</SelectItem>
                                        <SelectItem value="aStar">A* Search</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="button" onClick={() => processDirections(["swEntrance","100.00F","100.09","100.10"])}>Get Directions</Button>
                        <div className="mt-4">
                            <Label className="px-2 mb-1">Floor selection</Label>
                            {availableFloors.map(f => (
                                <Button key={f} variant={currentFloor===f?'default':'secondary'} onClick={() => {
                                    setCurrentFloor(f);
                                    (window as CustomWindow).goToFloor?.(f, getBuildingConstant(selectedBuilding));
                                }}>{`Floor ${f}`}</Button>
                            ))}
                        </div>
                    </form>
                </div>
                <TextDirections steps={directionStrings} />
            </div>
        </div>
    );
}