import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"

export function TransportRequestPage() {
    const [transport, setTransport] = useState([{employeeID:null, patientID:null,transportationType:null,priority:null,department:null,currentBuilding:null,desiredBuilding:null,requestTime:null,comments:null,status:null,userId:null}]);
    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();
    async function retrieveFromDatabase() {
        try{
            const response = await axios.get("/api/transportreq/")
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
            <Table>
                <TableHeader >
                    <TableRow>
                        <TableHead className={"text-center"}>Employee Name</TableHead>
                        <TableHead className={"text-center"}>Patient</TableHead>
                        <TableHead className={"text-center"}>Transportation Type</TableHead>
                        <TableHead className={"text-center"}>Priority</TableHead>
                        <TableHead className={"text-center"}>Department</TableHead>
                        <TableHead className={"text-center"}>Current Building</TableHead>
                        <TableHead className={"text-center"}>Desired Building</TableHead>
                        <TableHead className={"text-center"}>Comments</TableHead>
                        <TableHead className={"text-center"}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-center">
                    {transport.map((row,index) =>
                    {
                        return(
                            <>
                                <TableRow key = {index} className={"border-t"} >
                                    <TableCell>{row.employeeID}</TableCell>
                                    <TableCell>{row.patientID}</TableCell>
                                    <TableCell >{row.transportationType}</TableCell>
                                    <TableCell>{row.priority}</TableCell>
                                    <TableCell>{row.department}</TableCell>
                                    <TableCell>{row.currentBuilding}</TableCell>
                                    <TableCell>{row.desiredBuilding}</TableCell>
                                    <TableCell>{row.comments}</TableCell>
                                    <TableCell>{row.status}</TableCell>

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