import { useEffect, useState } from 'react';
import axios from 'axios';
import {PrescriptionTable} from "@/features/Requests/PrescriptionForm/PrescriptionTable.tsx";

export function PrescriptionPage() {
    const [prescription, setPrescription] = useState([
        {
            prescriptionID: null,
            employeeID: null,
            employeeName: null,
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
            status: null,
        },
    ]);

    function displayTable() {
        useEffect(() => {
            retrieveFromDatabase();
        }, []);
    }

    displayTable();

    async function retrieveFromDatabase() {
        try {
            const response = await axios.get('/api/pharmacy/all-requests');
            console.log('response from / get', response.data);
            setPrescription(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('error in retrieve:', error);
        }
    }

    return (
        <div>
            <PrescriptionTable prescription={prescription}></PrescriptionTable>
        </div>
    );
}
