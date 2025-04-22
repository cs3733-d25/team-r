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
                <TableHeader >
                <TableRow>
                    <TableHead className={"text-center"}>Employee Name</TableHead>
                    <TableHead className={"text-center"}>Sanitation Type</TableHead>
                    <TableHead className={"text-center"}>Priority</TableHead>
                    <TableHead className={"text-center"}>Department</TableHead>
                    <TableHead className={"text-center"}>Location</TableHead>
                    <TableHead className={"text-center"}>Room Number</TableHead>
                    <TableHead className={"text-center"}>Comments</TableHead>
                    <TableHead className={"text-center"}>Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody className="text-center">
                {sanitation.map((row,index) =>
                {
                    return(
                        <>
                            <TableRow key = {index} className = 'border-t'>
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