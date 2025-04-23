import {NavbarMGH} from '@/components/NavbarMGH.tsx';
import {Label} from '@/components/ui/label.tsx';
import {Button} from '@/components/ui/button.tsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
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
import axios from "axios";
import TextDirections from "@/components/TextDirections.tsx";

interface CustomWindow extends Window {
    goToFloor?: (floor: number, building?: string) => void;
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

    const processDirections = async (directions: string[]) => {
        try {
            const nodes = await getNodeObjs(directions);
            const nodeNames = nodes.map(node => node.shortName);

            setDirectionStrings(nodeNames);
            console.log("Directions: ", nodeNames);
        } catch (error) {
            console.error("Error processing directions: ", error);
            setDirectionStrings([]);
        }
    }

    const availableFloors = floorConfig[selectedBuilding as keyof typeof floorConfig] || [1];



    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className={'sticky top-0 z-30'}>
                <NavbarMGH/>
            </div>
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
                                <Button type="submit" onClick={() => processDirections(["canopyEntrance", "leftEntrance", "frontLotChestnut"])}>Get Directions</Button>
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