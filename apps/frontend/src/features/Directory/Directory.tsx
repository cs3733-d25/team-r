import React, { useState } from 'react';
import { RawDirectoryItem, rawDirectoryItems } from './directoryItems.ts';
import { DirectoryItem, FloorGroup, HospitalDirectoryData } from './listTypes.ts';
import { Button } from '@/components/ui/button.tsx';

const buildingDisplayNames: { [key: string]: string } = {
    PATRIOT_PLACE_20: 'Healthcare Center (20 Patriot Pl.)',
    PATRIOT_PLACE_22: 'Healthcare Center (20 Patriot Pl.)',
    CHESTNUT_HILL: 'Healthcare Center (Chestnut Hill)',
    FAULKNER: 'Faulkner Hospital',
    WOMENS: "Main Campus Hospital (75 Francis St.)",
};

const groupDirectoryData = (data: RawDirectoryItem[]): HospitalDirectoryData => {
    const groupedByBuilding: { [building: string]: { [floor: number]: DirectoryItem[] } } = {};

    data.forEach((item) => {
        if (!groupedByBuilding[item.building]) {
            groupedByBuilding[item.building] = {};
        }
        if (!groupedByBuilding[item.building][item.floorNumber]) {
            groupedByBuilding[item.building][item.floorNumber] = [];
        }
        groupedByBuilding[item.building][item.floorNumber].push({ name: item.name });
    });

    return Object.keys(groupedByBuilding)
        .sort((a, b) => buildingDisplayNames[a].localeCompare(buildingDisplayNames[b]))
        .map((buildingRawValue) => {
            const floorsData = groupedByBuilding[buildingRawValue];
            const buildingDisplayName = buildingDisplayNames[buildingRawValue] || buildingRawValue;
            const floorNumbers = Object.keys(floorsData)
                .map(Number)
                .sort((a, b) => a - b);
            const floorGroups: FloorGroup[] = floorNumbers.map((floorNumber) => ({
                floor: `Floor ${floorNumber}`,
                items: floorsData[floorNumber].sort((a, b) => a.name.localeCompare(b.name)),
            }));

            return {
                building: buildingDisplayName,
                buildingValue: buildingRawValue,
                floors: floorGroups,
            };
        });
};

export function Directory() {
    const hospitalData = groupDirectoryData(rawDirectoryItems);
    const [selectedBuilding, setSelectedBuilding] = useState(
        hospitalData.length > 0 ? hospitalData[0].buildingValue : ''
    );

    const selectedBuildingData = hospitalData.find(building => building.buildingValue === selectedBuilding);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Directory</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4">
                    <div className="flex flex-col space-y-2 bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">Locations</h2>
                        {hospitalData.map((buildingInfo) => (
                            <Button
                                key={buildingInfo.buildingValue}
                                onClick={() => setSelectedBuilding(buildingInfo.buildingValue)}
                                variant={selectedBuilding === buildingInfo.buildingValue ? 'default' : 'secondary'}
                                className="whitespace-normal text-left h-auto justify-start py-3 w-full"
                            >
                                {buildingInfo.building}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-3/4">
                    {selectedBuildingData && (
                        <div className="mt-2">
                            {selectedBuildingData.floors.map((floorGroup) => (
                                <div key={floorGroup.floor} className="mb-8 bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
                                        {floorGroup.floor}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
                                        {floorGroup.items.map((item, itemIndex) => (
                                            <div key={itemIndex}>{item.name}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Directory;