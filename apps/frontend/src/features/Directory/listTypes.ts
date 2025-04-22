export interface DirectoryItem {
    name: string;
}

export interface FloorGroup {
    floor: string;
    items: DirectoryItem[];
}

export interface BuildingData {
    building: string;
    buildingValue: string;
    floors: FloorGroup[];
}

export type HospitalDirectoryData = BuildingData[];

export interface RawDirectoryItem {
    name: string;
    floorNumber: number;
    building: string;
}