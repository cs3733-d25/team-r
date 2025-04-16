import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {NavbarMGH} from "@/components/NavbarMGH.tsx";
import {Table, TableHeader, TableRow, TableHead, TableCell, TableBody} from '@/components/ui/table.tsx';

export function DeviceReqPage() {
    const [device, setDevice] = useState([{
        deviceID: null,
        device: null,
        priority: null,
        room: null,
        department: null,
        comment: null,
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
            const response = await axios.get("/api/device/")
            console.log("response from / get", response.data)
            setDevice(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log("error in retrieve:", error);
        }
    }

    return (
        <div className={"bg-white"}>
            <h1 className = {"bold text-3xl font-trade text-center pb-2"}>Device Requests</h1>
            <Table className = {"mx-auto w-200"}>
                <TableHeader className = {"border-b"}>
                <TableRow className={'text-lg border-b'}>
                    <TableHead className={"pl-5"}>Device</TableHead>
                    <TableHead className={"pl-5"}>Priority</TableHead>
                    <TableHead className={"pl-5"}>Room</TableHead>
                    <TableHead className={"pl-5"}>Department</TableHead>
                    <TableHead className={"pl-5"}>Comments</TableHead>
                    <TableHead className={"pl-5"}>Employee Name</TableHead>
                    <TableHead className={"pl-5"}>Employee ID</TableHead>
                    <TableHead className={"pl-5"}>Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody className = {"text-center"}>
                {device.map((row,index) => {
                    return (
                        <>
                            <TableRow key = {index} className = {"border-t"}>
                                <TableCell className={"border-r border-b"}>{row.device}</TableCell>
                                <TableCell className={"border-r border-b"}>{row.priority}</TableCell>
                                <TableCell className={"border-r border-b"}>{row.room}</TableCell>
                                <TableCell className={"border-r border-b"}>{row.department}</TableCell>
                                <TableCell className={"border-r border -b"}>{row.comment}</TableCell>
                                <TableCell className={"border-r border-b"}>{row.employeeName}</TableCell>
                                <TableCell className={"border-r border-b"}>{row.employeeID}</TableCell>
                                <TableCell className={"border-r border-b"}>{row.status}</TableCell>
                            </TableRow>

                        </>
                    );
                })}
                </TableBody>
            </Table>
        </div>
    )
}