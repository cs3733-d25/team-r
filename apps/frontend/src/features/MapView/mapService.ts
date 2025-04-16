import axios from 'axios';
import { Node } from '../../../../backend/src/routes/mapData.ts';

export const fetchParkingLots = async (): Promise<Node[]> => {
    const res = await axios.get('/api/map/parking-lots');
    return res.data;
};

/*
export const fetchDepartments = async (): Promise<Node[]> => {
    const res = await axios.get('/api/locations/departments');
    return res.data;
};*/