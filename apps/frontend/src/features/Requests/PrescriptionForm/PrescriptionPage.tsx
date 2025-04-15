import {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar.tsx";
import {Link} from "react-router-dom";
import {NavbarMGH} from "@/components/NavbarMGH.tsx";

export function PrescriptionPage() {
    const [prescription, setPrescription] = useState([{
        prescriptionID: null,
        employeeID: null,
        //employee: null,
        priority: null,
        department: null,
        patientID: null,
        drugName: null,
        morningPillCount: null,
        middayPillCount: null,
        eveningPillCount: null,
        nightPillCount: null,
        days: null,
        numberOfPills: null,
        refills: null,
        additionalInstructions: null,
        //status: null
    }]);
    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase()
        }, []);
    }
    displayTable();

    async function retrieveFromDatabase() {
        try {
            const response = await axios.get("/api/pharmacy/all-requests")
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
            <NavbarMGH />
            <h1 className = {"bold text-3xl text-center pb-2"}>Prescription Requests</h1>
            <Link
                key={'Prescription Form Page'}
                to={'/prescription'}
                className={"px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-200 ml-10"}
            >
                Back
            </Link>
            <table className = {"mx-auto w-200"}>
                <thead className = {"border-b"}>
                <tr className={'text-lg border-b'}>
                    <th className={"pl-5"}>Employee Name</th>
                    <th className={"pl-5"}>Prescription Name</th>
                    <th className={"pl-5"}>Priority</th>
                    <th className={"pl-5"}>Department</th>
                    <th className={"pl-5"}>Patient ID</th>
                    <th className={"pl-5"}>Morning Pill Count</th>
                    <th className={"pl-5"}>Midday Pill Count</th>
                    <th className={"pl-5"}>Evening Pill Count</th>
                    <th className={"pl-5"}>Bedtime Pill Count</th>
                    <th className={"pl-5"}>Days Per Week</th>
                    <th className={"pl-5"}>Pill Count</th>
                    <th className={"pl-5"}>Refills</th>
                    <th className={"pl-5"}>Additional Instructions</th>
                    <th className={"pl-5"}>Status</th>
                </tr>
                </thead>
                <tbody className = {"text-center"}>
                {prescription.map((row,index) =>
                {
                    return(
                        <>
                            <tr key = {index} className = { "border-t"}>
                                <td className={"border-r border-b border-foreground"}>{row.employeeID}</td>
                                <td className={"border-r border-b border-foreground"}>{row.drugName}</td>
                                <td className={"border-r border-b border-foreground"}>{row.priority}</td>
                                <td className={"border-r border-b border-foreground"}>{row.department}</td>
                                <td className={"border-r border-b border-foreground"}>{row.patientID}</td>
                                <td className={"border-r border-b border-foreground"}>{row.morningPillCount}</td>
                                <td className={"border-r border-b border-foreground"}>{row.middayPillCount}</td>
                                <td className={"border-r border-b border-foreground"}>{row.eveningPillCount}</td>
                                <td className={"border-r border-b border-foreground"}>{row.nightPillCount}</td>
                                <td className={"border-r border-b border-foreground"}>{row.days}</td>
                                <td className={"border-r border-b border-foreground"}>{row.numberOfPills}</td>
                                <td className={"border-r border-b border-foreground"}>{row.refills}</td>
                                <td className={"border-r border-b border-foreground"}>{row.additionalInstructions}</td>
                                <td className={"border-b border-foreground"}>{row.priority}</td>
                            </tr>

                        </>
                    );

                })}
                </tbody>
            </table>
        </>
    )
}