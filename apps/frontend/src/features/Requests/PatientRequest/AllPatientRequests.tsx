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
        employeeName:null,
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


            <Table className = {"mx-auto w-200"}>
                <TableHeader className = {"border-b"}>
                <TableRow className={'text-lg border-b'}>
                    <TableHead className={"pl-5"}>Employee</TableHead>
                    <TableHead className={"pl-5"}>Patient ID</TableHead>
                    <TableHead className={"pl-5"}>Request</TableHead>
                    <TableHead className={"pl-5"}>Priority</TableHead>
                    <TableHead className={"pl-5"}>Department</TableHead>
                    <TableHead className={"pl-5"}>Location</TableHead>
                    <TableHead className={"pl-5"}>Status</TableHead>

                </TableRow>
                </TableHeader>
                <tbody className = {"text-center"}>
                {patientRequest.map((row,index) =>
                {
                    return(
                        <>
                            <TableRow key = {index} className = { "border-t"}>
                                <TableCell>{row.employeeName}</TableCell>
                                <TableCell>{row.patientID}</TableCell>
                                <TableCell>{row.request}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.status}</TableCell>

                            </TableRow>

                        </>
                    );

                })}
                </tbody>
            </Table>
        </>
    )
}
export default AllPatientRequests;