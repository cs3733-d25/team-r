import {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from "../../../components/Navbar.tsx";
import {Link} from "react-router-dom";
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"

export function TransportRequestPage() {
    const [transport, setTransport] = useState([{employeeID:null, patientID:null, employeeName:null,transportationType:null,priority:null,department:null,currentBuilding:null,desiredBuilding:null,requestTime:null,comments:null,status:null,userId:null}]);
    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();
    async function retrieveFromDatabase() {
        try{
            const response = await axios.get("/api/transport-request/")
            console.log("response from / get", response.data)
            setTransport(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log("error in retrieve:", error);
        }
    }
    return(
        <>
            <Navbar />
            <h1 className = {"bold text-3xl text-center pb-2"}>Transportation Requests</h1>
            <Link
                key={'Transportation Form Page'}
                to={'/transport'}

            >
                Back
            </Link>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Transportation Type</TableHead>
                    <TableHead >Priority</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Current Building</TableHead>
                    <TableHead>Desired Building</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Request Time</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody className = {"text-center"}>
                {transport.map((row,index) =>
                {
                    return(
                        <>
                            <TableRow key = {index} >
                                <TableCell>{row.employeeName}</TableCell>
                                <TableCell>{row.patientID}</TableCell>
                                <TableCell >{row.transportationType}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.currentBuilding}</TableCell>
                                <TableCell>{row.desiredBuilding}</TableCell>
                                <TableCell>{row.comments}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.requestTime}</TableCell>

                            </TableRow>

                        </>
                    );

                })}
                </TableBody>
            </Table>
        </>
    )
}
export default TransportRequestPage;