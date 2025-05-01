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
        employeeID: string | null;
        language: string | null;
        priority: string | null;
        department: string | null;
        building: string | null;
        roomNumber: string | null;
        comments: string | null;
        timestamp: string | null;
        status: string | null;
        assignedEmployeeID: string | null;
    }[]
}

export function TranslateTable(props: TranslateTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className={'text-center'}>Employee</TableHead>
                    <TableHead className={'text-center'}>Language</TableHead>
                    <TableHead className={'text-center'}>Location</TableHead>
                    <TableHead className={'text-center'}>Department</TableHead>
                    <TableHead className={'text-center'}>Room Number</TableHead>
                    <TableHead className={'text-center'}>Priority</TableHead>
                    <TableHead className={"text-center"}>Assigned Employee</TableHead>
                    <TableHead className={'text-center'}>Status</TableHead>
                    <TableHead className={'text-center'}>Comments</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className={'text-center'}>
                {props.translate.map((row, index) => {
                    return (
                        <>
                            <TableRow key={index} className={'border-t'}>
                                <TableCell>{row.employeeID}</TableCell>
                                <TableCell>{row.language}</TableCell>
                                <TableCell>{row.building}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.roomNumber}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.assignedEmployeeID}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.comments}</TableCell>

                            </TableRow>
                        </>
                    );
                })}
            </TableBody>
        </Table>
    );
}
