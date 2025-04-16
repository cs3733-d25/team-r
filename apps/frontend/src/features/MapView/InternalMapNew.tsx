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
import { useState } from 'react';

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

export function InternalMapNew() {
    const [parkingLots, setParkingLots] = useState<Node[]>([]);
    const location = useLocation();
    const selectedLocation = location.state?.selectedLocation || '';
    const buildingIdentifier = location.state?.buildingIdentifier;

    const departmentsByBuilding: Record<string, { key: string; value: string; label: string; }[]> = {
        PATRIOT_PLACE_20: [
            { key: "20-blood-draw", value: "20-blood-draw", label: "Blood Draw/Phlebotomy" },
            { key: "20-pharmacy", value: "20-pharmacy", label: "Pharmacy" },
            { key: "20-radiology", value: "20-radiology", label: "Radiology" },
            { key: "20-cardio-services", value: "20-cardio-services", label: "Cardiovascular Services" },
            { key: "20-urology", value: "20-urology", label: "Urology" },
            { key: "20-urgentcare", value: "20-urgentcare", label: "Urgent Care Center" },
            { key: "20-orthopaedics", value: "20-orthopaedics", label: "Orthopaedics" },
            { key: "20-hand-upper-extremity", value: "20-hand-upper-extremity", label: "Hand and Upper Extremity" },
            { key: "20-arthroplasty", value: "20-arthroplasty", label: "Arthroplasty" },
            { key: "20-pediatric-trauma", value: "20-pediatric-trauma", label: "Pediatric Trauma" },
            { key: "20-physiatry-2", value: "20-physiatry-2", label: "Physiatry (2nd Floor)" },
            { key: "20-podiatry", value: "20-podiatry", label: "Podiatry" },
            { key: "20-rehab-services", value: "20-rehab-services", label: "Rehabilitation Services" },
            { key: "20-cardiac-rehab", value: "20-cardiac-rehab", label: "Cardiac Rehab" },
            { key: "20-occupational-therapy", value: "20-occupation-therapy", label: "Occupational Therapy" },
            { key: "20-hand-therapy", value: "20-hand-therapy", label: "Hand Therapy" },
            { key: "20-upper-extremity", value: "20-upper-extremity", label: "Upper Extremity" },
            { key: "20-physical-therapy", value: "20-physical-therapy", label: "Physical Therapy" },
            { key: "20-speech-language", value: "20-speech-language", label: "Speech - Language" },
            { key: "20-clinical-lab", value: "20-clinical-lab", label: "Clinical Lab" },
            { key: "20-surgi-care", value: "20-surgi-care", label: "Surgi-Care" },
            { key: "20-surgical-specialities", value: "20-surgical-specialties", label: "Surgical Specialties" },
            { key: "20-audiology", value: "20-audiology", label: "Audiology" },
            { key: "20-ent", value: "20-ent", label: "ENT" },
            { key: "20-general-gastro-surgery", value: "20-general-gastro-surgery", label: "General and Gastrointestinal Surgery" },
            { key: "20-plastic-surgery", value: "20-plastic-surgery", label: "Plastic Surgery" },
            { key: "20-thoracic-surgery", value: "20-thoracic-surgery", label: "Thoracic Surgery" },
            { key: "20-vascular-surgery", value: "20-vascular-surgery", label: "Vascular Surgery" },
            { key: "20-weight-wellness", value: "20-weight-wellness", label: "Weight Management and Wellness" },
            { key: "20-sports", value: "20-sports", label: "Sports" },
            { key: "20-xray-suite", value: "20-xray-suite", label: "X-Ray Suite" },
            { key: "20-electromyography", value: "20-electromyography", label: "Electromyography" },
            { key: "20-nutrition", value: "20-nutrition", label: "Nutrition" },
            { key: "20-pain-medicine", value: "20-pain-medicine", label: "Pain Medicine" },
            { key: "20-physiatry-4", value: "20-physiatry-4", label: "Physiatry (4th Floor)" },
            { key: "20-pulmonary-testing", value: "20-pulmonary-testing", label: "Pulmonary Function Testing" },
            { key: "20-day-surgery", value: "20-day-surgery", label: "Day Surgery Center" },
        ],
        PATRIOT_PLACE_22: [
            {key: "22-childrens-hospital", value: "22-childrens-hospital", label: "MassGeneral Hospital for Children"},
            {key: "22-spaulding-outpatient", value: "22-spaulding-outpatient", label: "Spaulding Outpatient Center for Children"},
            {key: "22-multi-specialty-clinic", value: "22-multi-specialty-clinic", label: "Multi-Specialty Clinic"},
            {key: "22-allergy", value: "22-allergy", label: "Allergy"},
            {key: "22-cardiac-arrythmia", value: "22-cardiac-arrythmia", label: "Cardiac Arrythmia"},
            {key: "22-dermatology", value: "22-dermatology", label: "Dermatology"},
            {key: "22-endocrinology", value: "22-endocrinology", label: "Endocrinology"},
            {key: "22-gastroenterology", value: "22-gastroenterology", label: "Gastroenterology"},
            {key: "22-kidney-medicine", value: "22-kidney-medicine", label: "Kidney (Renal) Medicine"},
            {key: "22-neurology", value: "22-neurology", label: "Neurology"},
            {key: "22-neurosurgery", value: "22-neurosurgery", label: "Neurosurgery"},
            {key: "22-ophthalmology", value: "22-ophthalmology", label: "Ophthalmology"},
            {key: "22-optometry", value: "22-optometry", label: "Optometry"},
            {key: "22-pulmonology", value: "22-pulmonology", label: "Pulmonology"},
            {key: "22-rheumatology", value: "22-rheumatology", label: "Rheumatology"},
            {key: "22-vein-care", value: "22-vein-care", label: "Vein Care Services"},
            {key: "22-womens-health", value: "22-womens-health", label: "Women's Health"},
            {key: "22-financial-services", value: "22-financial-services", label: "financial-services"},
            {key: "22-blood-draw", value: "22-blood-draw", label: "Blood Draw/Phlebotomy"},
            {key: "22-community-room", value: "22-community-room", label: "Community Room"},
            {key: "22-primary-care", value: "22-primary-care", label: "Primary Care"},
        ],
        CHESTNUT_HILL: [],
    };

    const getBuildingFromLocation = (location: string) => {
        if (location.includes('20 Patriot Pl')) return 'PATRIOT_PLACE_20';
        if (location.includes('22 Patriot Pl')) return 'PATRIOT_PLACE_22';
        if (location.includes('Chestnut Hill')) return 'CHESTNUT_HILL';
        return 'PATRIOT_PLACE_22';
    };

    const [selectedBuilding, setSelectedBuilding] = useState<string>(
        buildingIdentifier || getBuildingFromLocation(selectedLocation)
    );

    const departments = departmentsByBuilding[selectedBuilding] || [];
    const buildingDisplayName =
        selectedBuilding === 'PATRIOT_PLACE_20' ? '20 Patriot Place' :
            selectedBuilding === 'PATRIOT_PLACE_22' ? '22 Patriot Place' :
                selectedBuilding === 'CHESTNUT_HILL' ? 'Chestnut Hill' : 'Patriot Place';



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
                            {buildingDisplayName}
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
                            <Select>
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