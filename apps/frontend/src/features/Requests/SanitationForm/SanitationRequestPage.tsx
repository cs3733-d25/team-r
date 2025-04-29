import {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from "../../../components/Navbar.tsx";
import {Link} from "react-router-dom";
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"
import {SanitationTable} from "@/features/Requests/SanitationForm/SanitationTable.tsx";

export function SanitationRequestPage() {
    const [sanitation, setSanitation] = useState([{employeeID:null,sanitationType:null,priority:null,department:null,location:null,roomNumber:null,requestTime:null,comments:null,status:null}]);
    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();
    async function retrieveFromDatabase() {
        try{
            const response = await axios.get("/api/sanitation/")
            console.log("response from / get", response.data)
            setSanitation(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log("error in retrieve:", error);
        }
    }
    return(
        <>
            <SanitationTable sanitation={sanitation}/>
        </>
    )
}
export default SanitationRequestPage;