import {useState, useEffect} from 'react'
import axios from 'axios'

export function AllPatientRequests() {
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
            <h1 className = {"bold text-3xl text-center pb-2"}>Nonemergent Patient Requests</h1>

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
export default AllPatientRequests;