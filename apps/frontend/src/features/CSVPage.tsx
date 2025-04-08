import {useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar.tsx";


export function CSVPage() {
    const [directoryTable, setDirectoryTable] = useState([{id:null, name:null, floorNumber:null,building: null}]);
    const [file, setFile] = useState<File | null>(null);
        useEffect(() => {
            retrieveFromDatabase()
        },[]);

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
        if(file != null){
            try {
                const sendOff = await axios.post('/api/csv/import', file)
                console.log("CSV file is sent off! :)", sendOff);
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
            <Navbar page={'csv'} />
            <h1 className = {"bold text-3xl text-center"}>Import/Export CSV Files</h1>
            <br/>
            <h2 className = {"text-xl text-center"}>Directory Table:</h2>
           <table className = {"mx-auto"}>
                <thead >
                <tr className={'text-lg'}>
                    <th className={"p-5"}>ID</th>
                    <th className={"p-5"}>Name</th>
                    <th className={"p-5"}>Floor Number</th>
                    <th className={"p-5"}>Location</th>
                </tr>
                </thead>
                <tbody>
                {directoryTable.map((row,index) =>
                    ( <tr key = {index}>
                        {Object.values(row).map((val,i)=>(
                            <td key={i} className={"pl-5"}>{val}</td>
                            ))
                        }

                    </tr>)) }
                </tbody>
            </table>
            <br />
            <form>
                <div className={'absolute left-1/4'}>
                    <label htmlFor="ImportCSV">Import CSV File:  </label>
                    <input
                        type="file"
                        name="ImportCSV"
                        accept=".csv"
                        onChange={handleFileChange}
                        className={"border border-gray-200 bg-gray-200 rounded cursor-pointer"}
                    ></input>
                </div>
                <div className={'flex absolute right-1/4'}>
                    <label htmlFor="ExportCSV">ExportCSV File:  </label>
                    <button id="ExportCSV" name="ExportCSV" onClick ={handleExport} className={"border border-gray-200 bg-gray-200 rounded cursor-pointer"}>Export</button>
                </div>
                <div className={'flex absolute left-1/4 pt-6 pb-20'}>
                    <label htmlFor="SaveCSV">Save: </label>
                    <button id="SaveCSV" name="SaveCSV" onClick = {handleSave} className={"border border-gray-200 bg-gray-200 rounded cursor-pointer"}>Save</button>
                </div>

            </form>
        </div>
    );
}
export default CSVPage;