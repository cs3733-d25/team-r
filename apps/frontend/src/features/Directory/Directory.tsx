import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.tsx';
import { RawDirectoryItem, rawDirectoryItems } from './directoryItems.ts';
import { DirectoryItem, FloorGroup, HospitalDirectoryData } from './listTypes.ts';

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
    const defaultTabValue = hospitalData.length > 0 ? hospitalData[0].buildingValue : '';

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Directory</h1>
                <Tabs defaultValue={defaultTabValue}>
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {hospitalData.map((buildingInfo) => (
                            <TabsTrigger
                                key={buildingInfo.buildingValue}
                                value={buildingInfo.buildingValue}
                                className="text-sm md:text-base"
                            >
                                {buildingInfo.building}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {hospitalData.map((buildingInfo) => (
                        <TabsContent
                            key={buildingInfo.buildingValue}
                            value={buildingInfo.buildingValue}
                        >
                            <div className="mt-6">
                                {buildingInfo.floors.map((floorGroup) => (
                                    <div key={floorGroup.floor} className="mb-8">
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
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </>
    );
}

export default Directory;
