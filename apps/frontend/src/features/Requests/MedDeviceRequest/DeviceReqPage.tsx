import {useEffect, useState} from "react";
import axios from "axios";
import {Table, TableHeader, TableRow, TableHead, TableCell, TableBody} from '@/components/ui/table.tsx';

export function DeviceReqPage() {
    const [device, setDevice] = useState([{
        deviceID: null,
        deviceType: null,
        priority: null,
        room: null,
        department: null,
        comments: null,
        employeeName: null,
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
            <Table >
                <TableHeader>
                <TableRow  >
                    <TableHead className={"text-center"}>Device</TableHead>
                    <TableHead className={"text-center"}>Priority</TableHead>
                    <TableHead className={"text-center"}>Room</TableHead>
                    <TableHead className={"text-center"}>Department</TableHead>
                    <TableHead className={"text-center"}>Employee Name</TableHead>
                    <TableHead className={"text-center"}>Employee ID</TableHead>
                    <TableHead className={"text-center"}>Status</TableHead>
                    <TableHead className={"text-center"}>Comments</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody className={"text-center"}>
                {device.map((row,index) => {
                    return (
                        <>
                            <TableRow key = {index} className = {"border-t"}>
                                <TableCell >{row.deviceType}</TableCell>
                                <TableCell >{row.priority}</TableCell>
                                <TableCell >{row.room}</TableCell>
                                <TableCell >{row.department}</TableCell>
                                <TableCell >{row.employeeName}</TableCell>
                                <TableCell>{row.employeeID}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell >{row.comments}</TableCell>
                            </TableRow>

                        </>
                    );
                })}
                </TableBody>
            </Table>
        </div>
    )
}