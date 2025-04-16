import {useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input.tsx"
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"

export function CSVPage() {
    const [directoryTable, setDirectoryTable] = useState([{id:null, name:null, floorNumber:null,building: null}]);
    const [csvfile, setFile] = useState<File | null>(null);


    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }

    };

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
                displayTable();
                setFile(null);
            } catch (error) {
                console.error("CSV File Sendoff didn't work :(")
            }
        }
        else{
            alert("Please Select a CSV file");
        }
    }
    const handleConfirmation = (e:React.ChangeEvent<HTMLInputElement>) => {
        return(
        <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden border-2 border-mgb-light-blue-500">
            <div className="bg-mgb-light-blue-500 text-white font-bold px-4 py-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
                Import Confirmation
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Your CSV File was Imported</h3>
            </div>
        </div>)
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
        <div >
            <h1 className = {"bold text-3xl text-center"}>Import/Export CSV Files</h1>
            <br />
                <div>
                    <Label htmlFor="ImportCSV">Import CSV File:  </Label>
                    <Input
                        type="file"
                        name="ImportCSV"
                        accept=".csv"
                        onChange={handleFileChange}
                    ></Input>
                </div>
                <div className={"float-right"}>
                    <Button variant = "default" id="ExportCSV" name="ExportCSV" onClick ={handleExport}>Export</Button>
                </div>
                <div>
                    <Button variant="default" id="SaveCSV" name="SaveCSV" onClick = {handleSave}>Save</Button>
                </div>
        </div>
    );
}
export default CSVPage;