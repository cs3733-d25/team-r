import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table.tsx';

interface TranslateTableProps {
    translate: {
        employeeName: string | null;
        language: string | null;
        priority: string | null;
        department: string | null;
        location: string | null;
        roomNumber: string | null;
        notes: string | null;
        timestamp: string | null;
        status: string | null;
    }[]
}

export function TranslateTable(props: TranslateTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className={'text-center'}>Employee Name</TableHead>
                    <TableHead className={'text-center'}>Language</TableHead>
                    <TableHead className={'text-center'}>Priority</TableHead>
                    <TableHead className={'text-center'}>Location</TableHead>
                    <TableHead className={'text-center'}>Room Number</TableHead>
                    <TableHead className={'text-center'}>Comments</TableHead>
                    <TableHead className={'text-center'}>Time</TableHead>
                    <TableHead className={'text-center'}>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className={'text-center'}>
                {props.translate.map((row, index) => {
                    return (
                        <>
                            <TableRow key={index} className={'border-t'}>
                                <TableCell>{row.employeeName}</TableCell>
                                <TableCell>{row.language}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.roomNumber}</TableCell>
                                <TableCell>{row.notes}</TableCell>
                                <TableCell>{row.timestamp}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        </>
                    );
                })}
            </TableBody>
        </Table>
    );
}
