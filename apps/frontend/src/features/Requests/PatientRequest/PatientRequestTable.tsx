import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

interface PatientRequestTableProps {
    patientRequest: {
        patientRequestID: number | null,
        patientID: string | null,
        assignedEmpID: string | null,
        priority: string | null,
        department: string | null,
        location: string | null,
        comment: string | null,
        time: string | null,
        status: string | null,
        employeeID: string | null,
        request: string | null
    }[]
}

export function PatientRequestTable(props: PatientRequestTableProps) {
    return (
        <Table>
            <TableHeader >
                <TableRow >
                    <TableHead className={"text-center"} >Employee</TableHead>
                    <TableHead className={"text-center"}>Patient ID</TableHead>
                    <TableHead className={"text-center"}>Request</TableHead>
                    <TableHead className={"text-center"}>Priority</TableHead>
                    <TableHead className={"text-center"}>Department</TableHead>
                    <TableHead className={"text-center"}>Location</TableHead>
                    <TableHead className={"text-center"}>Status</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody className={"text-center"}>
                {props.patientRequest.map((row,index) =>
                {
                    return(
                        <>
                            <TableRow key = {index} className = { "border-t"}>
                                <TableCell>{row.employeeID}</TableCell>
                                <TableCell>{row.patientID}</TableCell>
                                <TableCell>{row.request}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.status}</TableCell>

                            </TableRow>

                        </>
                    );

                })}
            </TableBody>
        </Table>
    )
}