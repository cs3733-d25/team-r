import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";


interface SanitationTableProps {
    sanitation: {
        employeeID:string | null,
        sanitationType:string | null,
        priority:string | null,
        department:string | null,
        building:string | null,
        roomNumber:string | null,
        requestTime:string | null,
        comments:string | null,
        status:string | null}[]
}

export function SanitationTable(props: SanitationTableProps) {
    return (
        <Table>
            <TableHeader >
                <TableRow>
                    <TableHead className={"text-center"}>Employee</TableHead>
                    <TableHead className={"text-center"}>Sanitation Type</TableHead>
                    <TableHead className={"text-center"}>Location</TableHead>
                    <TableHead className={"text-center"}>Department</TableHead>
                    <TableHead className={"text-center"}>Room</TableHead>
                    <TableHead className={"text-center"}>Priority</TableHead>
                    <TableHead className={"text-center"}>Status</TableHead>
                    <TableHead className={"text-center"}>Comments</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody className="text-center">
                {props.sanitation.map((row,index) =>
                {
                    return(
                        <>
                            <TableRow key = {index} className = 'border-t'>
                                <TableCell>{row.employeeID}</TableCell>
                                <TableCell>{row.sanitationType}</TableCell>
                                <TableCell>{row.building}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.roomNumber}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.comments}</TableCell>


                            </TableRow>

                        </>
                    );

                })}
            </TableBody>
        </Table>
    )
}