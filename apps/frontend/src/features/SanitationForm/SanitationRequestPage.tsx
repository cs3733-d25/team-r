import {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from "../../components/Navbar.tsx";
import {Link} from "react-router-dom";
export function SanitationRequestPage() {
    const [sanitation, setSanitation] = useState([{requestID:null,sanitationType:null,priority:null,department:null,roomNumber:null,requestTime:null,comments:null,status:null,userId:null}]);
    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();
    async function retrieveFromDatabase() {
        try{
            const response = await axios.get("/api/sanitation/")
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
            <h1 className = {"bold text-3xl text-center pb-2"}>Sanitation Requests</h1>
            <Link
                key={'Sanitation Form Page'}
                to={'/sanitation'}
                className={"px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ml-10"}
            >
                Back
            </Link>
            <table className = {"mx-auto w-200"}>
                <thead className = {"border-b"}>
                <tr className={'text-lg border-b'}>
                    <th className={"pl-5"}>Sanitation Type</th>
                    <th className={"pl-5"}>Priority</th>
                    <th className={"pl-5"}>Department</th>
                    <th className={"pl-5"}>Room Number</th>
                    <th className={"pl-5"}>Comments</th>
                    <th className={"pl-5"}>Status</th>
                </tr>
                </thead>
                <tbody className = {"text-center"}>
                {sanitation.map((row,index) =>
                {
                    return(
                        <>
                            <tr key = {index} className = { "border-t"}>
                                <td className={"border-r border-b"}>{row.sanitationType}</td>
                                <td className={"border-r border-b"}>{row.priority}</td>
                                <td className={"border-r border-b"}>{row.department}</td>
                                <td className={"border-r border-b"}>{row.roomNumber}</td>
                                <td className={"border-r border -b"}>{row.comments}</td>
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
export default SanitationRequestPage;