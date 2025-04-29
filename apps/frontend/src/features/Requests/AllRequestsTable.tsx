import {useState, useEffect} from 'react'
import axios from 'axios'
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"
import {RequestInfoButton} from "@/components/ServiceRequests/RequestInfoButton.tsx";
import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

interface BaseRequest {
    department: string | null;
    employeeID: string | number | null;
    status: string | null;
    priority: string | null;
}

interface TypedRequest extends BaseRequest {
    type: string | null;
    id: string | number | null;
}

// Specific request type interfaces
interface SanitationRequest extends BaseRequest {
    requestId: string | number;
}

interface PrescriptionRequest extends BaseRequest {
    prescriptionID: string | number;
}

interface DeviceRequest extends BaseRequest {
    requestId: string | number;
}

interface PatientRequest extends BaseRequest {
    patientRequestID: string | number;
}

interface TransportRequest extends BaseRequest {
    employeeRequestID: string | number;
}

export function AllRequestsTable() {
    //array of all requests
    const [requests, setRequests] = useState([{type: null, department: null, employeeID: null, status: null, priority: null, id: null}]);

    // filters
    const [filterByEmployee, setFilterByEmployee] = useState(false);
    const [employeeID, setEmployeeID] = useState("");
    const [filterByStatus, setFilterByStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        retrieveFromDatabase()
    }, []);

    async function retrieveFromDatabase() {
        try{
            //individually add requests from each api, then add type
            const sanitationRes = await axios.get("/api/sanitation/")
            const sanitationResWType = sanitationRes.data.map((req: SanitationRequest) => ({
                ...req,
                type: "Sanitation",
                id: req.requestId,
            }))
            const prescriptionRes = await axios.get("/api/pharmacy/all-requests");
            const prescriptionReqWType = prescriptionRes.data.map((req: PrescriptionRequest) => ({
                ...req,
                type: "Prescription",
                id: req.prescriptionID,
            }))
            const deviceRes = await axios.get("/api/devicereq/");
            const deviceReqWType = deviceRes.data.map((req: DeviceRequest) => ({
                ...req,
                type: "Medical Device",
                id: req.requestId,
            }))
            const patientRes = await axios.get("/api/patientreq/");
            const patientReqWType = patientRes.data.map((req: PatientRequest) => ({
                ...req,
                type: "Patient Request",
                id: req.patientRequestID,
            }))
            const transportRes = await axios.get("/api/transportreq/");
            const transportReqWType = transportRes.data.map((req: TransportRequest) => ({
                ...req,
                type: "Transport",
                id: req.employeeRequestID,
            }))

            //set all requests to be added to the table
            setRequests([...sanitationResWType, ...prescriptionReqWType, ...deviceReqWType, ...patientReqWType, ...transportReqWType]);
        }
        catch(error){
            console.log("error in retrieve:", error);
        }
    }

    // filtering logic
    const filteredRequests = requests.filter(req => {
        // Only keep requests that pass all active filters
        if (filterByEmployee && employeeID && (!req.employeeID || String(req.employeeID) !== employeeID)) {
            return false;
        }
        if (filterByStatus && selectedStatus && (!req.status || req.status !== selectedStatus)) {
            return false;
        }
        return true;
    });

    return(
        <>
            <div className="mb-6 pt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-2 md:flex-row md:items-end">
                    <div className="flex flex-col gap-1.5">
                        <Input
                            id="employeeID"
                            value={employeeID}
                            onChange={(e) => setEmployeeID(e.target.value)}
                            placeholder="Enter employee ID"
                            className="w-48"
                        />
                    </div>
                    <Button
                        variant={filterByEmployee ? "default" : "outline"}
                        onClick={() => setFilterByEmployee(!filterByEmployee)}
                        className="mt-2 md:mt-0"
                    >
                        {filterByEmployee ? "Filtering by Employee" : "Filter by Employee"}
                    </Button>

                    {/*status filter*/}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="status">Status</Label>
                        <select
                            id="status"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="rounded-md border h-10 px-3 py-2 w-48"
                        >
                            <option value="">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                    </div>
                    <Button
                        variant={filterByStatus ? "default" : "outline"}
                        onClick={() => setFilterByStatus(!filterByStatus)}
                        className="mt-2 md:mt-0"
                    >
                        {filterByStatus ? "Filtering by Status" : "Filter by Status"}
                    </Button>
                </div>
                <Button
                    variant="secondary"
                    onClick={retrieveFromDatabase}
                >
                    Refresh Data
                </Button>
            </div>

            <Table>
                <TableHeader >
                    <TableRow>
                        <TableHead className={"text-center"}>Request Type</TableHead>
                        <TableHead className={"text-center"}>Department</TableHead>
                        <TableHead className={"text-center"}>Employee</TableHead>
                        <TableHead className={"text-center"}>Priority</TableHead>
                        <TableHead className={"text-center"}>Status</TableHead>
                        <TableHead className={"text-center"}>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-center">
                    {filteredRequests.map((row,index) =>
                    {
                        return(
                            <TableRow key={index} className='border-t'>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.employeeID}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    <RequestInfoButton type={row.type} id={row.id} />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    )
}

export default AllRequestsTable;