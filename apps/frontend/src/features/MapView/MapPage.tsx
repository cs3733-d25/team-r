import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select';
import InternalMap from '@/features/MapView/InternalMap.tsx';
import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {useMapData} from '@/features/MapView/mapService';
import {
    floorConfig,
    getBuildingConstant,
    getBuildingFromLocation,
    getShortLocationName
} from '@/features/MapView/mapUtils';
import TextDirections from "@/components/TextDirections.tsx";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import {postNode, postNodeDeletion, useMapData} from '@/features/MapView/mapService';
import { getBuildingFromLocation, floorConfig, getShortLocationName } from '@/features/MapView/mapUtils';
import { getBuildingConstant } from '@/features/MapView/mapUtils';
import {Node} from "../../../../backend/src/routes/mapData.ts";

interface CustomWindow extends Window {
    goToFloor?: (floor: number, building?: string) => void;
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


interface MapNode{
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
    const [filterParkingLots, setFilterParkingLots] = useState<{
        building: string;
        nodeID: string;
        shortName: string
    }[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const buildingIdentifier = location.state?.buildingIdentifier;
    const [currentFloor, setCurrentFloor] = useState(1);
    const [selectedBuilding] = useState<string>(
        buildingIdentifier || getBuildingFromLocation(selectedLocation)
    );

    const {parkingLots, departments} = useMapData(selectedBuilding);
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

            return buildingMap[selectedBuilding]?.some(buildingName =>
                lot.building.toUpperCase().includes(buildingName.toUpperCase())
            );
        });
        setFilterParkingLots(filterLots);
    }, [parkingLots, selectedBuilding]);

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
    const getNodeObjs = async (nodeIDArray: string[]): Promise<MapNode[]> => {
        try {
            const response = await axios.get("/api/map/getNodeObjs", {
                params: {
                    nodeIDs: nodeIDArray
                }
            });
            return response.data;
        } catch (e) {
            console.error("Error converting node ID to name: ", e);
            return []; // Return empty array on error
        }
    }

    /**
     * Given a string array of nodeIDs, this function converts them to their shortNames
     * @param directions - the string array of nodeIDs
     */
    const processDirections = async (directions: string[]) => {
        try {
            const nodes = await getNodeObjs(directions);
            if (nodes.length < 2) {
                setDirectionStrings([]);
                return;
            }

            // reverse the order of the nodes to get the correct path
            nodes.reverse();

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
                <InternalMap location={selectedLocation}/>
                {/* Overlay sidebar */}
                <div
                    className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10 flex flex-col">
                    <div>
                        <Label className={'p-2 pb-0 font-bold text-2xl'}>Selected Location:</Label>
                        <Label className={'p-2 pt-0 font-bold text-xl text-secondary'}>
                            {getShortLocationName(selectedLocation)}
                        </Label>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4 flex-grow overflow-auto">
                            <div className="flex flex-col space-y-2">
                                <Select onValueChange={setSelectedParkinglot}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Parking Lot"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Parking Lots</SelectLabel>
                                            {filterParkingLots.map((lot) => (
                                                <SelectItem key={lot.nodeID} value={lot.shortName}>
                                                    {lot.shortName}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>

                                    {/*<Select onValueChange={setSelectedDepartment}>*/}
                                    <SelectTrigger>
                                        <SelectValue placeholder="Department"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Departments</SelectLabel>
                                            {departments.map((dept) => (
                                                <SelectItem key={dept.id} value={dept.name}>
                                                    {dept.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {/* currently passing in hardcoded directions to see on page, replace with return from bfs for actual text directions */}
                                {/* test paths: */}
                                {/* ["swEntrance", "100.00F", "100.09", "100.10"] */}
                                {/* ["3B", "3A", "3000A", "3E"] */}
                                <Button type="button" onClick={() => processDirections(["swEntrance", "100.00F", "100.09", "100.10"])}>Get Directions</Button>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label className={'px-2 mb-3'}>Floor selection</Label>
                                <div className="flex flex-col space-y-2">
                                    {availableFloors.map(floor => (
                                        <Button
                                            key={floor}
                                            variant={currentFloor === floor ? 'default' : 'secondary'}
                                            onClick={() => {
                                                setCurrentFloor(floor);
                                                const buildingConstant = getBuildingConstant(selectedBuilding);
                                                (window as CustomWindow).goToFloor?.(floor, buildingConstant);
                                            }}
                                            type="button"
                                        >
                                            Floor {floor}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <TextDirections steps={directionStrings}/>
            </div>
        </div>
    );
}