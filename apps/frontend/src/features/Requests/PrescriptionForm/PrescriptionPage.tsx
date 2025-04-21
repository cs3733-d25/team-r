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
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee Name</TableHead>
                        <TableHead>Prescription Name</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead >Patient ID</TableHead>
                        <TableHead>Morning Pill Count</TableHead>
                        <TableHead >Midday Pill Count</TableHead>
                        <TableHead >Evening Pill Count</TableHead>
                        <TableHead>Bedtime Pill Count</TableHead>
                        <TableHead>Days Per Week</TableHead>
                        <TableHead >Pill Count</TableHead>
                        <TableHead >Refills</TableHead>
                        <TableHead >Additional Instructions</TableHead>
                        <TableHead >Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className={'text-center'}>
                    {prescription.map((row, index) => {
                        return (
                            <>
                                <TableRow key={index} className={'border-t'}>
                                    <TableCell >
                                        {row.employeeName}
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
