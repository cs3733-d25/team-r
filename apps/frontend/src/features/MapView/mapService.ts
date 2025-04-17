import axios from 'axios';
import { Node } from '../../../../backend/src/routes/mapData.ts';

export const fetchParkingLots = async (): Promise<Node[]> => {
    const res = await axios.get('/api/map/parking-lots');
    return res.data;
};

export async function fetchDepartments(building?: string) {
    try {
        const url = building
            ? `/api/departments?building=${building}`
            : '/api/departments';

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
}