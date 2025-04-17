import axios from 'axios';
import { Node, Edge } from '../../../../backend/src/routes/mapData.ts';

export const fetchParkingLots = async (): Promise<Node[]> => {
    const res = await axios.get('/api/map/parking-lots');
    return res.data;
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

export const fetchEdgesChestnut = async (): Promise<Edge[]> => {
    const res = await axios.get('/api/map/edges-chestnut');
    return res.data;
};