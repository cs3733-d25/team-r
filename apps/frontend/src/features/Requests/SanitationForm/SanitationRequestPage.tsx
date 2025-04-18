import {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from "../../../components/Navbar.tsx";
import {Link} from "react-router-dom";
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"
export function SanitationRequestPage() {
    const [sanitation, setSanitation] = useState([{employeeName:null,sanitationType:null,priority:null,department:null,location:null,roomNumber:null,requestTime:null,comments:null,status:null}]);
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


            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Employee Name</TableHead>
                    <TableHead >Sanitation Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Room Number</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {sanitation.map((row,index) =>
                {
                    return(
                        <>
                            <TableRow key = {index}>
                                <TableCell>{row.employeeName}</TableCell>
                                <TableCell>{row.sanitationType}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.roomNumber}</TableCell>
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
export default SanitationRequestPage;