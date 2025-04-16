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
import {useEffect, useState} from 'react';

import {fetchParkingLots, fetchDepartments} from "@/features/MapView/mapService.ts";
import type {Node} from '../../../../backend/src/routes/mapData.ts';

export function InternalMapNew() {
    const [parkingLots, setParkingLots] = useState<Node[]>([]);
    const [departments, setDepartments] = useState<Node[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const lots = await fetchParkingLots();
            const depts = await fetchDepartments();
            setParkingLots(lots);
            setDepartments(depts);
        };
        loadData();
    }, []);

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className={"sticky top-0 z-30"}>
                <NavbarMGH />
            </div>
            <div className="flex-1 w-full relative">
                <InternalMap />
                {/* Overlay sidebar */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10 flex flex-col">
                    <div>
                        <Label className={'p-2 pb-0 font-bold text-2xl'}>Selected Location:</Label>
                        <Label className={'p-2 pt-0 font-bold text-xl text-secondary'}>
                            Patriot Place
                        </Label>
                    </div>
                    <div className="space-y-4 flex-grow overflow-auto">
                        <div className="flex flex-col space-y-2">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Parking Lot" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Parking Lots</SelectLabel>
                                        // TODO: filter choices based on campus
                                        {parkingLots.map((lot) => (
                                            <SelectItem key={lot.nodeID} value={lot.shortName}>
                                                {lot.shortName}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Departments</SelectLabel>
                                        // TODO: filter choices based on campus
                                        <SelectItem key="20-blood-draw" value="20-blood-draw">Blood Draw/Phlebotomy</SelectItem>
                                        <SelectItem key="20-pharmacy" value="20-pharmacy">Pharmacy</SelectItem>
                                        <SelectItem key="20-radiology" value="20-radiology">Radiology</SelectItem>
                                        <SelectItem key="20-cardio-services" value="20-cardio-services">Cardiovascular Services</SelectItem>
                                        <SelectItem key="20-urology" value="20-urology">Urology</SelectItem>
                                        <SelectItem key="20-urgentcare" value="20-urgentcare">Urgent Care Center</SelectItem>
                                        <SelectItem key="20-orthopaedics" value="20-orthopaedics">Orthopaedics</SelectItem>
                                        <SelectItem key="20-hand-upper-extremity" value="20-hand-upper-extremity">Hand and Upper Extremity</SelectItem>

                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Button>Get Directions</Button>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label className={'px-2 mb-3'}>Floor selection</Label>
                            <div className="flex flex-col space-y-2">
                                <Button variant={'secondary'}>Floor 1</Button>
                                <Button variant={'secondary'}>Floor 2</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}