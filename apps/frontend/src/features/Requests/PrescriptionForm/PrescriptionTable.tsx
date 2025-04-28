import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table.tsx';

interface PrescriptionTableProps {
    prescription: {
        prescriptionID: number | null,
        employeeID: string | null,
        priority: string | null,
        department: string | null,
        patientID: string | null,
        drugName: string | null,
        morningPillCount: number | null,
        middayPillCount: number | null,
        eveningPillCount: number | null,
        nightPillCount: number | null,
        days: number | null,
        numberOfPills: number | null,
        refills: number | null,
        additionalInstructions: string | null,
        status: string | null,
    }[]
}

export function PrescriptionTable(props: PrescriptionTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className={'text-center'}>Employee Name</TableHead>
                    <TableHead className={'text-center'}>Prescription Name</TableHead>
                    <TableHead className={'text-center'}>Priority</TableHead>
                    <TableHead className={'text-center'}>Department</TableHead>
                    <TableHead className={'text-center'}>Patient ID</TableHead>
                    <TableHead className={'text-center'}>Morning Pill Count</TableHead>
                    <TableHead className={'text-center'}>Midday Pill Count</TableHead>
                    <TableHead className={'text-center'}>Evening Pill Count</TableHead>
                    <TableHead className={'text-center'}>Bedtime Pill Count</TableHead>
                    <TableHead className={'text-center'}>Days Per Week</TableHead>
                    <TableHead className={'text-center'}>Pill Count</TableHead>
                    <TableHead className={'text-center'}>Refills</TableHead>
                    <TableHead className={'text-center'}>Additional Instructions</TableHead>
                    <TableHead className={'text-center'}>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className={'text-center'}>
                {props.prescription.map((row, index) => {
                    return (
                        <>
                            <TableRow key={index} className={'border-t'}>
                                <TableCell>{row.employeeID}</TableCell>
                                <TableCell>{row.drugName}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.patientID}</TableCell>
                                <TableCell>{row.morningPillCount}</TableCell>
                                <TableCell>{row.middayPillCount}</TableCell>
                                <TableCell>{row.eveningPillCount}</TableCell>
                                <TableCell>{row.nightPillCount}</TableCell>
                                <TableCell>{row.days}</TableCell>
                                <TableCell>{row.numberOfPills}</TableCell>
                                <TableCell>{row.refills}</TableCell>
                                <TableCell>{row.additionalInstructions}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        </>
                    );
                })}
            </TableBody>
        </Table>
    );
}
