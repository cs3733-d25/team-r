import {useEffect, useState } from 'react';
import axios from 'axios';
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"

function CSVTablePage() {
    const [directoryTable, setDirectoryTable] = useState([{id:null, name:null, floorNumber:null,building: null}]);

    function swapRows(row: number) {
        if (row % 2 === 0) {
            return ''; //if put white here, breaks view in dark mode
        } else {
            return 'background';
        }
    }

    useEffect(() => {
        retrieveFromDatabase();
    }, []);


    async function retrieveFromDatabase() {
        try {
            const response = await axios.get("/api/csv/")
            console.log("response from / get", response.data)
            setDirectoryTable(response.data.currentDirectory);
            console.log(response.data.currentDirectory)
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={"font-trade"}>
            <h2 className = {"text-xl text-center"}>Directory Table:</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className={"text-right"}>Floor Number</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {directoryTable.map((row,index) =>
                    { const newFloor = index === 0 || row.floorNumber != directoryTable[index-1].floorNumber;
                        const newPlace = index === 0 || row.building != directoryTable[index-1].building;
                        return(
                            <>
                                {newPlace && (
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-center font-bold text-lg">{row.building}</TableCell>
                                    </TableRow>
                                )}
                                <TableRow key={index} className={"bg-".concat(swapRows(index))}>
                                    <TableCell className={newFloor? "border-t border-primary" : ""}>{row.name}</TableCell>
                                    {newFloor? <TableCell className={"font-bold text-right border-t border-primary"}>{row.floorNumber}</TableCell>: <TableCell></TableCell>}
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