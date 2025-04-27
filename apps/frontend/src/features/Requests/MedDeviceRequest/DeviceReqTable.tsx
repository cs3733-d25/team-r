import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table.tsx';

interface DeviceReqTableProps {
    device: {
        deviceID: number | null;
        deviceType: string | null;
        priority: string | null;
        room: string | null;
        department: string | null;
        comments: string | null;
        employeeID: string | null;
        status: string | null;
    }[];
}

export function DeviceReqTable(props: DeviceReqTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className={'text-center'}>Device</TableHead>
                    <TableHead className={'text-center'}>Priority</TableHead>
                    <TableHead className={'text-center'}>Room</TableHead>
                    <TableHead className={'text-center'}>Department</TableHead>
                    <TableHead className={'text-center'}>Employee Name</TableHead>
                    <TableHead className={'text-center'}>Status</TableHead>
                    <TableHead className={'text-center'}>Comments</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className={'text-center'}>
                {props.device.map((row, index) => {
                    return (
                        <>
                            <TableRow key={index} className={'border-t'}>
                                <TableCell>{row.deviceType}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.room}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.employeeID}</TableCell>
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
