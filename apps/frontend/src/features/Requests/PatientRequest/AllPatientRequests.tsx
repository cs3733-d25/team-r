import {useState, useEffect} from 'react'
import axios from 'axios'
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"
import {PatientRequestTable} from "@/features/Requests/PatientRequest/PatientRequestTable.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {DeviceReqForm} from "@/features/Requests/MedDeviceRequest/DeviceReqForm.tsx";
import PatientRequestForm from "@/features/Requests/PatientRequest/PatientRequestForm.tsx";
import PatientRequestPage from "@/features/Requests/PatientRequest/PatientRequestPage.tsx";


export function AllPatientRequests() {
    return(
        <>
            <h1 className="text-2xl font-bold font-trade mb-0 place-self-center">Non Emergent Patient Request Form</h1>
            <Tabs defaultValue="patientForm">
                <TabsList>
                    <TabsTrigger value="patientForm">
                        Non Emergent Patient Request</TabsTrigger>
                    <TabsTrigger value="patientPage"
                    >
                        View All Requests</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="patientForm">
                        <PatientRequestForm/>
                    </TabsContent>
                    <TabsContent value="patientPage">
                        <PatientRequestPage/>
                    </TabsContent>
                </div>
            </Tabs>

        </>
    )
}
export default AllPatientRequests;