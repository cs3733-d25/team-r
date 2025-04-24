import {useState, useEffect} from 'react'
import axios from 'axios'
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"

export function AllRequestsTable() {
    //array of all requests
    const [requests, setRequests] = useState([{type: null, department: null, employeeID: null, status: null, priority: null}]);

    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }

    displayTable();

    async function retrieveFromDatabase() {
        try {
            //individually add requests from each api, then add type
            const sanitationRes = await axios.get("/api/sanitation/")
            const sanitationResWType = sanitationRes.data.map(req => ({
                ...req,
                type: "Sanitation",
            }))
            const prescriptionRes = await axios.get("/api/pharmacy/all-requests");
            const prescriptionReqWType = prescriptionRes.data.map(req => ({
                ...req,
                type: "Prescription",
            }))
            const deviceRes = await axios.get("/api/devicereq/");
            const deviceReqWType = deviceRes.data.map(req => ({
                ...req,
                type: "Medical Device",
            }))
            const patientRes = await axios.get("/api/patientreq/");
            const patientReqWType = patientRes.data.map(req => ({
                ...req,
                type: "Patient Request",
            }))
            const transportRes = await axios.get("/api/transportreq/");
            const transportReqWType = transportRes.data.map(req => ({
                ...req,
                type: "Transport",
            }))
            const translateRes = await axios.get("/api/translate/");
            const translateReqWType = translateRes.data.map(req => ({
                ...req,
                type: "Translator",
            }))

            //set all requests to be added to the table
            setRequests([
                ...sanitationResWType,
                ...prescriptionReqWType,
                ...deviceReqWType,
                ...patientReqWType,
                ...transportReqWType,
                ...translateReqWType
            ]);
        } catch (error) {
            console.log("error in retrieve:", error);
        }
    }

    return(
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className={"text-center"}>Request Type</TableHead>
                        <TableHead className={"text-center"}>Department</TableHead>
                        <TableHead className={"text-center"}>Employee</TableHead>
                        <TableHead className={"text-center"}>Priority</TableHead>
                        <TableHead className={"text-center"}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-center">
                    {requests.map((row, index) => (
                        <TableRow key={index} className="border-t">
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.department}</TableCell>
                            <TableCell>{row.employeeID}</TableCell>
                            <TableCell>{row.priority}</TableCell>
                            <TableCell>{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default AllRequestsTable;
