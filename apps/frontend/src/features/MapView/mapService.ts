import axios from 'axios';
import { useState, useEffect } from 'react';
import { Node, Edge } from '../../../../backend/src/routes/mapData.ts';

// Response type if backend wraps IDs in an object
type NodeIDsResponse = { nodeIDs: string[] };

export const fetchParkingLots = async (): Promise<Node[]> => {
    const res = await axios.get('/api/map/parking-lots');
    console.log('res.data: ', res.data);
    return res.data;
};

export const fetchDepartments = async (
    building: string
): Promise<{ id: string; name: string }[]> => {
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

export function useMapData(selectedBuilding: string) {
    const [parkingLots, setParkingLots] = useState<Node[]>([]);
    const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        console.log('Loading parking lots');
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

// Fetch path from backend routing service using DFS/BFS/A*
export const fetchPath = async (
    startingPoint: string,
    endingPoint: string,
    //algorithm: 'dfs' | 'bfs' | 'aStar'
    algorithm: string
): Promise<string[]> => {
    const resp = await axios.post('/api/algo/', {
        startingPoint,
        endingPoint,
        algorithm,
    });
    console.log("startingPoint in fetchPath", resp.data.startingPoint);
    console.log("endingPoint in fetchPath", resp.data.endingPoint);


    console.log('fetchPath raw response (should be string[]):', resp.data);

    // if it's already an array, just return it
    // if (Array.isArray(resp.data)) {
    //     return resp.data;
    // }
    //
    // // otherwise fall back to the old shape
    // const dataObj = resp.data as NodeIDsResponse;
    // return dataObj.nodeIDs ?? [];
    const path = resp.data.path;
    console.log("pat in mapservice: ", path);
    return path;
};