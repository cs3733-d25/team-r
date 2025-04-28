import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";


interface PatientTransportTableProps {
    transport: {
        employeeID:string | null,
        patientID:string | null,
        transportationType:string | null,
        priority:string | null,
        department:string | null,
        currentBuilding:string | null,
        desiredBuilding:string | null,
        requestTime:string | null,
        comments:string | null,
        status:string | null,
        userId:string | null}[]
}

export function PatientTransportTable(props: PatientTransportTableProps) {
    return (
        <Table>
            <TableHeader >
                <TableRow>
                    <TableHead className={"text-center"}>Employee Name</TableHead>
                    <TableHead className={"text-center"}>Patient</TableHead>
                    <TableHead className={"text-center"}>Transportation Type</TableHead>
                    <TableHead className={"text-center"}>Priority</TableHead>
                    <TableHead className={"text-center"}>Department</TableHead>
                    <TableHead className={"text-center"}>Current Building</TableHead>
                    <TableHead className={"text-center"}>Desired Building</TableHead>
                    <TableHead className={"text-center"}>Comments</TableHead>
                    <TableHead className={"text-center"}>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-center">
                {props.transport.map((row,index) =>
                {
                    return(
                        <>
                            <TableRow key = {index} className={"border-t"} >
                                <TableCell>{row.employeeID}</TableCell>
                                <TableCell>{row.patientID}</TableCell>
                                <TableCell >{row.transportationType}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.currentBuilding}</TableCell>
                                <TableCell>{row.desiredBuilding}</TableCell>
                                <TableCell>{row.comments}</TableCell>
                                <TableCell>{row.status}</TableCell>

                            </TableRow>

                        </>
                    );

                })}
            </TableBody>
        </Table>
    )
}