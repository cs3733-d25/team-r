import {useEffect, useState } from 'react';

export function CSVPage() {
    const [directoryTable, setDirectoryTable] = useState([{id:0,name:"",type:"",location:""}]);
    const [file, setFile] = useState<File | null>(null);
    function fetchTable()
    {
        useEffect(() => {
            fetch('/api/directory/loadTable')
                .then((res) => res.json())
                .then((data) => setDirectoryTable(data.directTable));
        });
    }
    fetchTable();
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {

if (e.target.files?.[0]) {
    setFile(e.target.files[0]);
}
    };

    return (
        <>
            <h1>Import/Export CSV Files</h1>
            <br/>
            <h2>Directory Table:</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {directoryTable.map((row) =>
                    ( <tr>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.type}</td>
                    <td>{row.location}</td>
                    </tr>)) }


        </tbody>
            </table>
            <br />
            <form>
                <label htmlFor="ImportCSV">Import CSV File:</label>
                <input
                    type="file"
                    name="ImportCSV"
                    accept=".csv"
                    onChange={handleFileChange}
                ></input>
                <label htmlFor="ExportCSV">ExportCSV File:</label>
                <input type="button" id="ExportCSV" name="ExportCSV"></input>
                <br/>
                <label htmlFor="SaveCSV">Save: </label>
                <input type="button" id="SaveCSV" name="SaveCSV">Save</input>
            </form>
        </>
    );
}