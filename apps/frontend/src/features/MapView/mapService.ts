import axios from 'axios';

export const fetchParkingLots = async () => {
    const res = await axios.get('/api/mapdata/parking-lots');
    return res.data;
};

export const fetchDepartments = async () => {
    const res = await axios.get('/api/mapdata/departments');
    return res.data;
};