import { NavbarMGH } from '@/components/NavbarMGH.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select';
import InternalMap from '@/features/MapView/InternalMap.tsx';
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

type AsyncFunc  = () => Promise<void>;

export function MapPage() {
    const location = useLocation();
    const selectedLocation = location.state?.selectedLocation || '';
    const [selectedParkinglot, setSelectedParkinglot] = useState<string>('');
    const [filterParkingLots, setFilterParkingLots] = useState<{ building: string; nodeID: string; shortName: string }[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const buildingIdentifier = location.state?.buildingIdentifier;
    const [currentFloor, setCurrentFloor] = useState(1);
    const [pendingNode, setPendingNode] = useState<Node>(blankNode); // store the node attributes until it is ready to be submitted
    const [lNodes, setLNodes] = useState<Promise<void>>(); // allows for the internal map to know when to reload nodes after the map page has created them

    // used by the internal map element to access the pendingNode attributes
    function handleNodeChange (name:string, value:string|number) {
        setPendingNode(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function deleteNode (nodeID:string) {
        // function from mapService that makes axios request
        await postNodeDeletion(nodeID);
    }

    async function createNode () {
        // function from mapService that makes an axios post request
        // this function is redundant but I thought we might need it later
        console.log("Posting node!");
        // TODO: check all fields are filled out
        if(pendingNode.xcoord !== 0) {
            await postNode(pendingNode)
        }else{
            // for testing, wait a second to simulate backend processing
            await new Promise(resolve => {
                setTimeout(() => {
                    console.log("Created node!");
                    resolve('resolved');
                }, 1000);
            });
        }
    }

    const [selectedBuilding] = useState<string>(
        buildingIdentifier || getBuildingFromLocation(selectedLocation)
    );

    const {parkingLots, departments} = useMapData(selectedBuilding);
    console.log('departments: ', departments);

    useEffect(() => {
        const filterLots = parkingLots.filter(lot => {
            const buildingMap: {[key: string]: string[]} = {
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
            setLNodes(createNode());
        } catch {}
    };

    const availableFloors = floorConfig[selectedBuilding as keyof typeof floorConfig] || [1];

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className={'sticky top-0 z-30'}>
                <NavbarMGH />
            </div>
            <div className="flex-1 w-full relative">
                <InternalMap location={selectedLocation} onDataChange={handleNodeChange} onNodeDelete={deleteNode} loadNodes={lNodes}/>
                {/* Overlay sidebar */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10 flex flex-col">
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
                                    <SelectValue placeholder="Parking Lot" />
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
                                    <SelectValue placeholder="Department" />
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
                            <Button type="submit">Get Directions</Button>
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
            </div>
        </div>
    );
}