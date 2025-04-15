import {useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input.tsx"
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"
function CSVTablePage() {
    const [directoryTable, setDirectoryTable] = useState([{id:null, name:null, floorNumber:null,building: null}]);


    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();
    async function retrieveFromDatabase() {

        try{
            const response = await axios.get("/api/csv/")
            console.log("response from / get", response.data)
            setDirectoryTable(response.data.currentDirectory);
            console.log(response.data.currentDirectory)
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <div>
    <h2 className = {"text-xl text-center"}>Directory Table:</h2>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead >Name</TableHead>
                <TableHead >Floor Number</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody >
            {directoryTable.map((row,index) =>
            { const newFloor = index === 0 || row.floorNumber != directoryTable[index-1].floorNumber;
                const newPlace = index === 0 || row.building != directoryTable[index-1].building;
                return(
                    <>
                        {(newPlace && row.building===("PATRIOT_PLACE_22"))?<TableHead className = {"pl-30 text-center"} >22 Patriot Place</TableHead>:null}
                        {(newPlace && row.building===("PATRIOT_PLACE_20"))?<TableHead className = {"pl-30 text-center"}>20 Patriot Place</TableHead>:null}
                        <TableRow key = {index}>
                            <TableCell >{row.name}</TableCell>
                            {newFloor? <TableCell >{row.floorNumber}</TableCell>:null}

                        </TableRow>

                    </>
                );

            })}
        </TableBody>
    </Table>
        </div>
)
}
export default CSVTablePage;