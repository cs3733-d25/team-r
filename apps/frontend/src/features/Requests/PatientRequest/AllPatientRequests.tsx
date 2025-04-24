import {useState, useEffect} from 'react'
import axios from 'axios'
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"


export function AllPatientRequests() {
    const [patientRequest, setPatientRequest] = useState([{
        patientRequestID:null,
        patientID:null,
        assignedEmpID:null,
        priority:null,
        department:null,
        location:null,
        comment:null,
        time:null,
        status:null,
        employeeID:null,
        request: null}]);

    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();
    async function retrieveFromDatabase() {
        try{
            const response = await axios.get("/api/patientreq/")
            console.log("response from / get", response.data)
            setPatientRequest(response.data);
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
                <TableRow >
                    <TableHead className={"text-center"} >Employee</TableHead>
                    <TableHead className={"text-center"}>Patient ID</TableHead>
                    <TableHead className={"text-center"}>Request</TableHead>
                    <TableHead className={"text-center"}>Priority</TableHead>
                    <TableHead className={"text-center"}>Department</TableHead>
                    <TableHead className={"text-center"}>Location</TableHead>
                    <TableHead className={"text-center"}>Status</TableHead>

                </TableRow>
                </TableHeader>
                <TableBody className={"text-center"}>
                {patientRequest.map((row,index) =>
                {
                    return(
                        <>
                            <TableRow key = {index} className = { "border-t"}>
                                <TableCell>{row.employeeID}</TableCell>
                                <TableCell>{row.patientID}</TableCell>
                                <TableCell>{row.request}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.location}</TableCell>
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
export default AllPatientRequests;