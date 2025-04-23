import {useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input.tsx"
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"
export function CSVPage() {
    const [directoryTable, setDirectoryTable] = useState([{id:null, name:null, floorNumber:null,building: null}]);
    const [csvfile, setFile] = useState<File | null>(null);



    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }

    };

    async function retrieveFromDatabase() {
        try{
            console.log("Retrieving from database! -Keagan")
            const response = await axios.get("/api/csv/")
            console.log("response from / get", response.data)
            setDirectoryTable(response.data.currentDirectory);
            console.log(response.data.currentDirectory)
        }
        catch(error){
            console.log(error);
        }
    }
    const handleSave=async()=>{
        if(csvfile != null){
            const formData = new FormData();
            formData.append('csvfile', csvfile);
            try {
                console.log("CSV file is trying to send off! :)")
                const sendOff = await axios.post('/api/csv/import', formData, {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                })


                console.log("CSV file is sent off! :)", sendOff);
                retrieveFromDatabase();
            } catch (error) {
                console.error("CSV File Sendoff didn't work :(")
            }
        }
        else{
            alert("Please Select a CSV file");
        }
    }
    const handleExport = async()=> {
        {
            await axios
                .get('/api/csv/export', { responseType: 'blob' })
                .then((response) => {
                    const csvURL = URL.createObjectURL(
                        new Blob([response.data], { type: 'text/csv' })
                    );
                    const csvLink = document.createElement('a');
                    csvLink.href = csvURL;
                    csvLink.setAttribute('download', 'directoryData.csv');
                    document.body.appendChild(csvLink);
                    csvLink.click();
                    csvLink.remove();
                    console.log('CSV Downloaded Yay!');
                })
                .catch((error) => {
                    console.error("CSV Didn't fully download :(");
                });
        }
    }
    return (
        <div className={'flex-col'} >
            <h1 className = {"bold text-3xl text-center"}>Import/Export CSV Files</h1>
            <br/>
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
            <br />
                <div className={'absolute left-1/4 mr-10'}>
                    <Label htmlFor="ImportCSV">Import CSV File:  </Label>
                    <Input
                        type="file"
                        name="ImportCSV"
                        accept=".csv"
                        onChange={handleFileChange}
                    ></Input>
                </div>
                <div className={'flex absolute right-1/4 ml-10'}>
                    <Button variant = "default" id="ExportCSV" name="ExportCSV" onClick ={handleExport}>Export</Button>
                </div>
                <div className={'flex absolute left-1/4 pt-15 pb-20'}>
                    <Button variant="default" id="SaveCSV" name="SaveCSV" onClick = {handleSave}>Save</Button>
                </div>
        </div>
    );
}
export default CSVPage;