import {useEffect, useState } from 'react';
import axios from 'axios';

import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"
function CSVTablePage() {
    const [directoryTable, setDirectoryTable] = useState([{id:null, name:null, floorNumber:null,building: null}]);

////Changed so useEffect isn't called inside the function, apparently that breaks reacts rules according to stackoverflow --Riley
    /*function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();
    */
    useEffect(() => {
        retrieveFromDatabase();
    }, []);


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
                        {newPlace && row.building === "PATRIOT_PLACE_22" && (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center font-bold">22 Patriot Place</TableCell> //changed the pl-30 because the spacing doesn't change anymore than pl-12 -Riley
                            </TableRow>
                        )}
                        {newPlace && row.building === "PATRIOT_PLACE_20" && (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center font-bold">20 Patriot Place</TableCell>
                            </TableRow>
                        )}
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