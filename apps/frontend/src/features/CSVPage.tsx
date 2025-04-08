import {useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar.tsx";


export function CSVPage() {
    const [directoryTable, setDirectoryTable] = useState([{id:0, name:"", floorNumber:0,building: ""}]);
    const [file, setFile] = useState<File | null>(null);
    function fetchTable()
    {
        useEffect(() => {
            fetch('https:/api/directory')
                .then((res) => res.json())
                .then((data) => setDirectoryTable(data.directory));
        });
    }
    fetchTable();
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {




        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };
    const handleSave=async()=>{
        if(file != null && file.name.toLowerCase().endsWith('.csv')){


            try {
                const sendOff = await axios.post('/api/csv/import', file)
                console.log("CSV file is sent off! :)", sendOff);




            } catch (error) {
                console.error("CSV File Sendoff didn't work :(")
            }
            fetchTable()
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
        <div className={'flex-col justify-center'}>
            <Navbar page={'csv'} />
            <h1 className = {"bold text-3xl text-center"}>Import/Export CSV Files</h1>
            <br/>
            <h2 className = {"text-xl text-center"}>Directory Table:</h2>
            <table className = {"mx-auto"}>
                <thead >
                <tr className={'text-lg'}>
                    <th className={"p-5"}>ID</th>
                    <th className={"p-5"}>Name</th>
                    <th className={"p-5"}>Type</th>
                    <th className={"p-5"}>Location</th>
                </tr>
                </thead>
                <tbody>
                {directoryTable.map((row) =>
                    ( <tr>
                        <td  className={"pl-5"}>{row.id}</td>
                        <td className={"pl-5"}>{row.name}</td>
                        <td className={"pl-5"}>{row.floorNumber}</td>
                        <td className={"pl-5"}>{row.building}</td>
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
                <div className={'absolute right-1/4'}>
                    <label htmlFor="ExportCSV">ExportCSV File:  </label>
                    <button id="ExportCSV" name="ExportCSV" onClick ={handleExport} className={"border border-gray-200 bg-gray-200 rounded cursor-pointer"}>Export</button>
                </div>
                <div className={'absolute left-1/4 pt-6'}>
                    <label htmlFor="SaveCSV">Save: </label>
                    <button id="SaveCSV" name="SaveCSV" onClick = {handleSave} className={"border border-gray-200 bg-gray-200 rounded cursor-pointer"}>Save</button>
                </div>
            </form>
        </div>
    );
}
export default CSVPage;