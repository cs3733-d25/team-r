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
            const response = await axios.get("api/servicereq/")
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
                <TableRow >
                    <TableHead >Device</TableHead>
                    <TableHead >Priority</TableHead>
                    <TableHead >Room</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead >Comments</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead >Employee ID</TableHead>
                    <TableHead >Status</TableHead>
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
                                <TableCell >{row.comments}</TableCell>
                                <TableCell >{row.employeeName}</TableCell>
                                <TableCell>{row.employeeID}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>

                        </>
                    );
                })}
                </TableBody>
            </Table>
        </div>
    )
}