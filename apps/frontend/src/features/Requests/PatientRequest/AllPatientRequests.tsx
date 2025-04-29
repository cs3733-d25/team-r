import {useState, useEffect} from 'react'
import axios from 'axios'
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"
import {PatientRequestTable} from "@/features/Requests/PatientRequest/PatientRequestTable.tsx";


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
            <PatientRequestTable patientRequest={patientRequest} />
        </>
    )
}
export default AllPatientRequests;