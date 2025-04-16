import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {NavbarMGH} from "@/components/NavbarMGH.tsx";

export function DeviceReqPage() {
    const [prescription, setPrescription] = useState([{
        deviceID: null,
        device: null,
        priority: null,
        room: null,
        department: null,
        comment: null
    }]);
    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();

    async function retrieveFromDatabase() {
        try {
            const response = await axios.get("/api/device/")
            console.log("response from / get", response.data)
            setPrescription(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log("error in retrieve:", error);
        }
    }

    return (
        <>
            <h1 className = {"bold text-3xl text-center pb-2"}>Device Requests</h1>
            <Link
                key={'Device Form Page'}
                to={'/devicerequest'}
                className={"px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-200 ml-10"}
            >
                Back
            </Link>
            <table className = {"mx-auto w-200"}>
                <thead className = {"border-b"}>
                <tr className={'text-lg border-b'}>
                    <th className={"pl-5"}>Device</th>
                    <th className={"pl-5"}>Priority</th>
                    <th className={"pl-5"}>Room</th>
                    <th className={"pl-5"}>Department</th>
                    <th className={"pl-5"}>Comments</th>
                </tr>
                </thead>
                <tbody className = {"text-center"}>
                {prescription.map((row,index) =>
                {
                    return(
                        <>
                            <tr key = {index} className = { "border-t"}>
                                <td className={"border-r border-b"}>{row.device}</td>
                                <td className={"border-r border-b"}>{row.priority}</td>
                                <td className={"border-r border-b"}>{row.room}</td>
                                <td className={"border-r border-b"}>{row.department}</td>
                                <td className={"border-r border -b"}>{row.comment}</td>
                            </tr>

                        </>
                    );
                })}
                </tbody>
            </table>
        </>
    )
}