import {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from "../../../components/Navbar.tsx";
import {Link} from "react-router-dom";
export function SanitationRequestPage() {
    const [transport, setTransport] = useState([{transportationType:null,priority:null,department:null,currentBuilding:null,desiredBuilding:null,requestTime:null,comments:null,status:null,userId:null}]);
    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();
    async function retrieveFromDatabase() {
        try{
            const response = await axios.get("/api/transport-request/")
            console.log("response from / get", response.data)
            setTransport(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log("error in retrieve:", error);
        }
    }
    return(
        <>
            <Navbar />
            <h1 className = {"bold text-3xl text-center pb-2"}>Transportation Requests</h1>
            <Link
                key={'Transportation Form Page'}
                to={'/transport'}

            >
                Back
            </Link>
            <table className = {"mx-auto w-200"}>
                <thead className = {"border-b"}>
                <tr className={'text-lg border-b'}>
                    <th className = {"text-center"}>User ID</th>
                    <th className={"pl-5"}>Transportation Type</th>
                    <th className={"pl-5"}>Priority</th>
                    <th className={"pl-5"}>Department</th>
                    <th className={"pl-5"}>Current Building</th>
                    <th className={"pl-5"}>Desired Building</th>
                    <th className={"pl-5"}>Comments</th>
                    <th className={"pl-5"}>Status</th>
                    <th className={"pl-5"}>Request Time</th>
                </tr>
                </thead>
                <tbody className = {"text-center"}>
                {transport.map((row,index) =>
                {
                    return(
                        <>
                            <tr key = {index} className = { "border-t"}>
                                <td className={"border-r border-b"}>{row.transportationType}</td>
                                <td className={"border-r border-b"}>{row.priority}</td>
                                <td className={"border-r border-b"}>{row.department}</td>
                                <td className={"border-r border-b"}>{row.currentBuilding}</td>
                                <td className={"border-r border-b"}>{row.desiredBuilding}</td>
                                <td className={"border-r border -b"}>{row.comments}</td>
                                <td className={"border-b"}>{row.status}</td>
                                <td className={"border-r border-b"}>{row.requestTime}</td>

                            </tr>

                        </>
                    );

                })}
                </tbody>
            </table>
        </>
    )
}
export default SanitationRequestPage;