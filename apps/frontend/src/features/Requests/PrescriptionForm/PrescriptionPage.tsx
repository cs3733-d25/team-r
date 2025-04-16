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
        <div className={"bg-white"}>
            <h1 className={'bold text-3xl text-center pb-2 font-trade'}>Prescription Requests</h1>
            <Table className={'mx-auto w-200'}>
                <TableHeader className={'border-b'}>
                    <TableRow className={'text-lg border-b'}>
                        <TableHead className={'pl-5'}>Employee Name</TableHead>
                        <TableHead className={'pl-5'}>Prescription Name</TableHead>
                        <TableHead className={'pl-5'}>Priority</TableHead>
                        <TableHead className={'pl-5'}>Department</TableHead>
                        <TableHead className={'pl-5'}>Patient ID</TableHead>
                        <TableHead className={'pl-5'}>Morning Pill Count</TableHead>
                        <TableHead className={'pl-5'}>Midday Pill Count</TableHead>
                        <TableHead className={'pl-5'}>Evening Pill Count</TableHead>
                        <TableHead className={'pl-5'}>Bedtime Pill Count</TableHead>
                        <TableHead className={'pl-5'}>Days Per Week</TableHead>
                        <TableHead className={'pl-5'}>Pill Count</TableHead>
                        <TableHead className={'pl-5'}>Refills</TableHead>
                        <TableHead className={'pl-5'}>Additional Instructions</TableHead>
                        <TableHead className={'pl-5'}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className={'text-center'}>
                    {prescription.map((row, index) => {
                        return (
                            <>
                                <TableRow key={index} className={'border-t'}>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.employeeName}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.drugName}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.priority}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.department}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.patientID}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.morningPillCount}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.middayPillCount}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.eveningPillCount}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.nightPillCount}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.days}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.numberOfPills}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.refills}
                                    </TableCell>
                                    <TableCell className={'border-r border-b border-foreground'}>
                                        {row.additionalInstructions}
                                    </TableCell>
                                    <TableCell className={'border-b border-foreground'}>
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
