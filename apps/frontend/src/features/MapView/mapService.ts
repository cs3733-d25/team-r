import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Edge, Node } from '../../../../backend/src/routes/mapData.ts';

export const fetchParkingLots = async (): Promise<Node[]> => {
    const res = await axios.get('/api/map/parking-lots');
    console.log('res.data: ', res.data);
    return res.data;
};

// In mapService.ts, update the fetchDepartments function
export const fetchDepartments = async (building: string) => {
    try {
        console.log('Fetching departments with building:', building);
        const response = await axios.get(`/api/map/departments?building=${building}`);
        console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

export const postNode = async (node: Node): Promise<AxiosResponse> => {
    return await axios.post('/api/map/create-node', node);
};

export const postNodeDeletion  = async (nodeID: string): Promise<AxiosResponse> => {
    return await axios.post('/api/map/delete-node', {nodeID: nodeID});
};

export const postEdgeDeletion  = async (edgeID: string): Promise<AxiosResponse> => {
    return await axios.post('/api/map/delete-edge', {edgeID: edgeID});
};

export const fetchCheckIn = async (): Promise<Node[]> => {
    const res = await axios.get('/api/map/check-in');
    return res.data;
};

export const fetchEntrances = async (): Promise<Node[]> => {
    const res = await axios.get('/api/map/entrances');
    return res.data;
};

export const fetchEdges20_1 = async (): Promise<Edge[]> => {
    const res = await axios.get('/api/map/edges-20-1');
    return res.data;
};
export const fetchEdges20_3 = async (): Promise<Edge[]> => {
    const res = await axios.get('/api/map/edges-20-3');
    return res.data;
};
export const fetchEdges22_1 = async (): Promise<Edge[]> => {
    const res = await axios.get('/api/map/edges-22-1');
    return res.data;
};
export const fetchEdges22_3 = async (): Promise<Edge[]> => {
    const res = await axios.get('/api/map/edges-22-3');
    return res.data;
};
export const fetchEdges22_4 = async (): Promise<Edge[]> => {
    const res = await axios.get('/api/map/edges-22-4');
    return res.data;
};
export const fetchElevators = async (): Promise<Node[]> => {
    const res = await axios.get('/api/map/elevators');
    return res.data;
};

export const fetchEdgesChestnut = async (): Promise<Edge[]> => {
    const res = await axios.get('/api/map/edges-chestnut');
    return res.data;
};

export const fetchEdgesFaulkner = async (): Promise<Edge[]> => {
    const res = await axios.get('/api/map/edges-faulkner');
    // TODO: create backend request
    return res.data;
};

export const fetchHallways = async (): Promise<Node[]> => {
    return await axios.get('/api/map/hallways');
}


export function useMapData(selectedBuilding: string) {
    const [parkingLots, setParkingLots] = useState<Node[]>([]);
    const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        console.log('Loading parking lots');
        const loadParkingLots = async () => {
            try {
                const data = await fetchParkingLots();
                //console.log('Fetched parking lots:', data);
                setParkingLots(data);
            } catch (err) {
                console.error('Error fetching parking lots:', err);
            }
        };
        loadParkingLots();
    }, []);

    useEffect(() => {
        console.log('Triggering loadDepartments for building:', selectedBuilding);
        const loadDepartments = async () => {
            try {
                const data = await fetchDepartments(selectedBuilding);
                setDepartments(data);
            } catch (err) {
                console.error('Error fetching departments:', err);
            }
        };
        loadDepartments();
    }, [selectedBuilding]);

    return { parkingLots, departments };
}