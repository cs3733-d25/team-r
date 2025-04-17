import { NavbarMGH } from '@/components/NavbarMGH.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InternalMap from '@/features/MapView/InternalMap.tsx';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {fetchParkingLots, fetchDepartments} from '@/features/MapView/mapService';

interface Node {
    nodeID: string;
    nodeType: string;
    building: string;
    floor: number;
    xcoord: number;
    ycoord: number;
    longName: string;
    shortName: string;
}

interface CustomWindow extends Window {
    goToFloor?: (floor: number) => void;
}

export function InternalMapNew() {
    const [parkingLots, setParkingLots] = useState<Node[]>([]);
    const [departments, setDepartments] = useState<{key: string; value: string; label: string}[]>([]);
    const location = useLocation();
    const selectedLocation = location.state?.selectedLocation || '';
    const [selectedParkinglot, setSelectedParkinglot] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const buildingIdentifier = location.state?.buildingIdentifier;
    const [currentFloor, setCurrentFloor] = useState(1);

    const getBuildingFromLocation = (location: string) => {
        if (location.includes('20 Patriot Pl')) return 'PATRIOT_PLACE_20';
        if (location.includes('22 Patriot Pl')) return 'PATRIOT_PLACE_22';
        if (location.includes('Chestnut Hill')) return 'CHESTNUT_HILL';
        return 'PATRIOT_PLACE_22';
    };

    const [selectedBuilding, setSelectedBuilding] = useState<string>(
        buildingIdentifier || getBuildingFromLocation(selectedLocation)
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // const response = await axios.post('/api/map/internal',{
            //     selectedParkinglot,
            //     selectedDepartment
            // });
            console.log("selected parking lot: ", selectedParkinglot);
            console.log("selected department lot: ", selectedDepartment);
        } catch {}
    };

    useEffect(() => {
        const loadParkingLots = async () => {
            try {
                const data = await fetchParkingLots();
                setParkingLots(data);
            } catch (err) {
                console.error('Error fetching parking lots:', err);
            }
        };

        loadParkingLots();
    }, []);

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                const data = await fetchDepartments(selectedBuilding);
                const formattedDepartments = data.map((dept: { id?: string; key?: string; value?: string; name?: string; label?: string }) => ({
                    key: dept.id || dept.key,
                    value: dept.id || dept.value,
                    label: dept.name || dept.label
                }));
                setDepartments(formattedDepartments);
            } catch (err) {
                console.error('Error fetching departments:', err);
            }
        };

        loadDepartments();
    }, [selectedBuilding]);

    const floorConfig = {
        PATRIOT_PLACE_20: [1, 3, 4],
        PATRIOT_PLACE_22: [1, 3],
        CHESTNUT_HILL: [1],
    };

    // Get floors for current building
    const availableFloors = floorConfig[selectedBuilding as keyof typeof floorConfig] || [1];

    const getShortLocationName = (location: string) => {
        if (location.includes('20 Patriot Pl')) return '20 Patriot Place';
        if (location.includes('22 Patriot Pl')) return '22 Patriot Place';
        if (location.includes('Chestnut Hill')) return 'Chestnut Hill';
        return location;
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className={'sticky top-0 z-30'}>
                <NavbarMGH />
            </div>
            <div className="flex-1 w-full relative">
                <InternalMap location={selectedLocation} />
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
                                            {parkingLots
                                                .filter(lot => lot.building === selectedBuilding)
                                                .map((lot) => (
                                                    <SelectItem key={lot.nodeID} value={lot.shortName}>
                                                        {lot.shortName}
                                                    </SelectItem>
                                                ))}
                                        </SelectGroup>
                                    </SelectContent>
                            </Select>

                            <Select onValueChange={setSelectedDepartment}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Departments</SelectLabel>
                                            {departments.map(dept => (
                                                <SelectItem key={dept.key} value={dept.value}>
                                                    {dept.label}
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
                                            (window as CustomWindow).goToFloor?.(floor);
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