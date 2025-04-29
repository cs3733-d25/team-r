import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"
import {PatientTransportTable} from "@/features/Requests/PatientTransport/PatientTransportTable.tsx";

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
            <PatientTransportTable transport={transport} />
        </>
    )
}
export default TransportRequestPage;