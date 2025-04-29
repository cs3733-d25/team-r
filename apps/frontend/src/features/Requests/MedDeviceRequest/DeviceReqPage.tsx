import {useEffect, useState} from "react";
import axios from "axios";
import {Table, TableHeader, TableRow, TableHead, TableCell, TableBody} from '@/components/ui/table.tsx';
import {DeviceReqTable} from "@/features/Requests/MedDeviceRequest/DeviceReqTable.tsx";

export function DeviceReqPage() {
    const [device, setDevice] = useState([{
        deviceID: null,
        deviceType: null,
        priority: null,
        room: null,
        department: null,
        comments: null,
        employeeID: null,
        status: null
    }]);

    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();

    async function retrieveFromDatabase() {
        try {
            const response = await axios.get("api/devicereq/")
            console.log("response from / get", response.data)
            setDevice(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log("error in retrieve:", error);
        }
    }

    return (
        <div >
            <DeviceReqTable device={device} />
        </div>
    )
}