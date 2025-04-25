import { useEffect, useState } from 'react';
import axios from 'axios';
import {Table, TableHeader, TableRow, TableHead, TableCell, TableBody} from '@/components/ui/table.tsx';

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

            <Table >
                <TableHeader >
                    <TableRow >
                        <TableHead className={"text-center"}>Employee Name</TableHead>
                        <TableHead className={"text-center"}>Prescription Name</TableHead>
                        <TableHead className={"text-center"}>Priority</TableHead>
                        <TableHead className={"text-center"}>Department</TableHead>
                        <TableHead className={"text-center"}>Patient ID</TableHead>
                        <TableHead className={"text-center"}>Morning Pill Count</TableHead>
                        <TableHead className={"text-center"}>Midday Pill Count</TableHead>
                        <TableHead className={"text-center"}>Evening Pill Count</TableHead>
                        <TableHead className={"text-center"}>Bedtime Pill Count</TableHead>
                        <TableHead className={"text-center"}>Days Per Week</TableHead>
                        <TableHead className={"text-center"}>Pill Count</TableHead>
                        <TableHead className={"text-center"}>Refills</TableHead>
                        <TableHead className={"text-center"}>Additional Instructions</TableHead>
                        <TableHead className={"text-center"}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className={'text-center'}>
                    {prescription.map((row, index) => {
                        return (
                            <>
                                <TableRow key={index} className={'border-t'}>
                                    <TableCell >
                                        {row.employeeID}
                                    </TableCell>
                                    <TableCell >
                                        {row.drugName}
                                    </TableCell>
                                    <TableCell >
                                        {row.priority}
                                    </TableCell>
                                    <TableCell >
                                        {row.department}
                                    </TableCell>
                                    <TableCell >
                                        {row.patientID}
                                    </TableCell>
                                    <TableCell >
                                        {row.morningPillCount}
                                    </TableCell>
                                    <TableCell >
                                        {row.middayPillCount}
                                    </TableCell>
                                    <TableCell >
                                        {row.eveningPillCount}
                                    </TableCell>
                                    <TableCell >
                                        {row.nightPillCount}
                                    </TableCell>
                                    <TableCell >
                                        {row.days}
                                    </TableCell>
                                    <TableCell >
                                        {row.numberOfPills}
                                    </TableCell>
                                    <TableCell >
                                        {row.refills}
                                    </TableCell>
                                    <TableCell >
                                        {row.additionalInstructions}
                                    </TableCell>
                                    <TableCell >
                                        {row.status}
                                    </TableCell>
                                </TableRow>
                            </>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
