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

import {fetchParkingLots} from "@/features/MapView/mapService.ts";
import type {Node} from '../../../../backend/src/routes/mapData.ts';

export function InternalMapNew() {
    const [parkingLots, setParkingLots] = useState<Node[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const lots = await fetchParkingLots();
            setParkingLots(lots);
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
                                        <SelectItem key="20-arthroplasty" value="20-arthroplasty">Arthroplasty</SelectItem>
                                        <SelectItem key="20-pediatric-trauma" value="20-pediatric-trauma">Pediatric Trauma</SelectItem>
                                        <SelectItem key="20-physiatry-2" value="20-physiatry-2">Physiatry (2nd Floor)</SelectItem>
                                        <SelectItem key="20-podiatry" value="20-podiatry">Podiatry</SelectItem>
                                        <SelectItem key="20-rehab-services" value="20-rehab-services">Rehabilitation Services</SelectItem>
                                        <SelectItem key="20-cardiac-rehab" value="20-cardiac-rehab">Cardiac Rehab</SelectItem>
                                        <SelectItem key="20-occupational-therapy" value="20-occupation-therapy">Occupational Therapy</SelectItem>
                                        <SelectItem key="20-hand-therapy" value="20-hand-therapy">Hand Therapy</SelectItem>
                                        <SelectItem key="20-upper-extremity" value="20-upper-extremity">Upper Extremity</SelectItem>
                                        <SelectItem key="20-physical-therapy" value="20-physical-therapy">Physical Therapy</SelectItem>
                                        <SelectItem key="20-speech-language" value="20-speech-language">Speech - Language</SelectItem>
                                        <SelectItem key="20-clinical-lab" value="20-clinical-lab">Clinical Lab</SelectItem>
                                        <SelectItem key="20-surgi-care" value="20-surgi-care">Surgi-Care</SelectItem>
                                        <SelectItem key="20-surgical-specialities" value="20-surgical-specialties">Surgical Specialties</SelectItem>
                                        <SelectItem key="20-audiology" value="20-audiology">Audiology</SelectItem>
                                        <SelectItem key="20-ent" value="20-ent">ENT</SelectItem>
                                        <SelectItem key="20-general-gastro-surgery" value="20-general-gastro-surgery">General and Gastrointestinal Surgery</SelectItem>
                                        <SelectItem key="20-plastic-surgery" value="20-plastic-surgery">Plastic Surgery</SelectItem>
                                        <SelectItem key="20-thoracic-surgery" value="20-thoracic-surgery">Thoracic Surgery</SelectItem>
                                        <SelectItem key="20-vascular-surgery" value="20-vascular-surgery">Vascular Surgery</SelectItem>
                                        <SelectItem key="20-weight-wellness" value="20-weight-wellness">Weight Management and Wellness</SelectItem>
                                        <SelectItem key="20-sports" value="20-sports">Sports</SelectItem>
                                        <SelectItem key="20-xray-suite" value="20-xray-suite">X-Ray Suite</SelectItem>
                                        <SelectItem key="20-electromyography" value="20-electromyography">Electromyography</SelectItem>
                                        <SelectItem key="20-nutrition" value="20-nutrition">Nutrition</SelectItem>
                                        <SelectItem key="20-pain-medicine" value="20-pain-medicine">Pain Medicine</SelectItem>
                                        <SelectItem key="20-physiatry-4" value="20-physiatry-4">Physiatry (4th Floor)</SelectItem>
                                        <SelectItem key="20-pulmonary-testing" value="20-pulmonary-testing">Pulmonary Function Testing</SelectItem>
                                        <SelectItem key="20-day-surgery" value="20-day-surgery">Day Surgery Center</SelectItem>
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