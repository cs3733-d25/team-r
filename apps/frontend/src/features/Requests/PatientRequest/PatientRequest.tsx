import {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from "../../../components/Navbar.tsx";
import {Link} from "react-router-dom";

export function PatientRequestPage() {
    const [sanitation, setSanitation] = useState([{
        patientRequestID:null,
        patientID:null,
        assignedEmpID:null,
        priority:null,
        department:null,
        location:null,
        comment:null,
        time:null,
        status:null}]);

    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();
    async function retrieveFromDatabase() {
        try{
            const response = await axios.get("/api/patientreq/")
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
            <Navbar />
            <h1 className = {"bold text-3xl text-center pb-2"}>Nonemergent Patient Requests</h1>
            <Link
                key={'Nonemergent Patient Request Form Page'}
                to={'/patientRequest'}
                className={"px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ml-10"}
            >
                Back
            </Link>
            <table className = {"mx-auto w-200"}>
                <thead className = {"border-b"}>
                <tr className={'text-lg border-b'}>
                    <th className={"pl-5"}>Comments</th>
                    <th className={"pl-5"}>Priority</th>
                    <th className={"pl-5"}>Department</th>
                    <th className={"pl-5"}>Location</th>
                    <th className={"pl-5"}>Status</th>
                    <th className={"pl-5"}>Status</th>
                </tr>
                </thead>
                <tbody className = {"text-center"}>
                {sanitation.map((row,index) =>
                {
                    return(
                        <>
                            <tr key = {index} className = { "border-t"}>
                                <td className={"border-r border-b"}>{row.comment}</td>
                                <td className={"border-r border-b"}>{row.priority}</td>
                                <td className={"border-r border-b"}>{row.department}</td>
                                <td className={"border-r border-b"}>{row.location}</td>
                                <td className={"border-r border -b"}>{row.status}</td>
                                <td className={"border-b"}>{row.status}</td>

                            </tr>

                        </>
                    );

                })}
                </tbody>
            </table>
        </>
    )
}
export default PatientRequestPage;