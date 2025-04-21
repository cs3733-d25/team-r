// src/types/listTypes.ts

// Represents items on a specific floor - no need for ListItem interface if just strings
// If items need more data (like IDs, links), change 'string' to 'ListItem' interface
interface FloorData {
    floor: string; // e.g., 'Floor 1', 'Floor 2'
    items: string[]; // List of items on this floor (using string[])
}

// Represents data for a specific hospital/building
interface HospitalData {
    id: string; // Unique identifier for the hospital/building (e.g., '20Patriot', '22Patriot')
    name: string; // Display name (e.g., '20 Patriot', '22 Patriot')
    floors: FloorData[]; // Array of floor data for this hospital
}

// Represents the overall directory data
export type DirectoryData = HospitalData[];

// If you need more data per item, uncomment and use this:
/*
export interface ListItem {
  name: string;
  // Add other properties if needed
}

interface FloorData {
  floor: string;
  items: ListItem[]; // Use ListItem[] here
}

interface HospitalData {
  id: string;
  name: string;
  floors: FloorData[];
}

export type DirectoryData = HospitalData[];
*/