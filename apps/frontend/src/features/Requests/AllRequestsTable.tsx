import {useState, useEffect} from 'react'
import axios from 'axios'
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table"
import {RequestInfoButton} from "@/components/ServiceRequests/RequestInfoButton.tsx";
import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import values from "@/constant-values.ts"

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
    const [filterByPriority, setFilterByPriority] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState("");
    const [filterByBuilding, setFilterByBuilding] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [filterByDepartment, setFilterByDepartment] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const getDepartmentsForBuilding = (building: string) => {
        switch(building) {
            case "Faulkner Hospital":
                return values.departmentsFAll;
            case "Main Campus Hospital (75 Francis St.)":
                return values.departmentsWAll;
            case "Healthcare Center (Chestnut Hill)":
                return values.departmentsCH;
            case "Healthcare Center (20 Patriot Pl.)":
                return values.departmentsPP20;
            case "Healthcare Center (22 Patriot Pl.)":
                return values.departmentsPP22;
            default:
                return [
                    // create a comprehensive list of all departments
                    ...new Set([
                        ...values.departmentsFAll,
                        ...values.departmentsWAll,
                        ...values.departmentsCH,
                        ...values.departmentsPP20,
                        ...values.departmentsPP22,
                    ]),
                ].sort();
        }
    };

    const availableDepartments = getDepartmentsForBuilding(selectedBuilding);

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
        if (filterByEmployee && employeeID && (!req.employeeID || String(req.employeeID) !== employeeID)) {
            return false;
        }
        if (filterByStatus && selectedStatus && (!req.status || req.status !== selectedStatus)) {
            return false;
        }
        if (filterByPriority && selectedPriority && (!req.priority || req.priority !== selectedPriority)) {
            return false;
        }
        if (filterByDepartment && selectedDepartment && (!req.department || req.department !== selectedDepartment)) {
            return false;
        }
        return true;
    });

    const FilterPill = ({ label, value, onRemove }: { label: string, value: string, onRemove: () => void }) => (
        <div className="inline-flex items-center px-3 py-1 mr-2 mb-2 bg-primary text-primary-foreground rounded-full text-sm">
            <span className="mr-1 font-medium">{label}:</span> {value}
            <button onClick={onRemove} className="ml-2 hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    );

    const activeFilters = [];

    if (filterByEmployee && employeeID) {
        activeFilters.push({
            type: 'employee',
            label: 'Employee',
            value: employeeID,
            onRemove: () => {
                setFilterByEmployee(false);
                setEmployeeID("");
            }
        });
    }

    if (filterByStatus && selectedStatus) {
        activeFilters.push({
            type: 'status',
            label: 'Status',
            value: selectedStatus,
            onRemove: () => {
                setFilterByStatus(false);
                setSelectedStatus("");
            }
        });
    }

    if (filterByPriority && selectedPriority) {
        activeFilters.push({
            type: 'priority',
            label: 'Priority',
            value: selectedPriority,
            onRemove: () => {
                setFilterByPriority(false);
                setSelectedPriority("");
            }
        });
    }

    if (filterByBuilding && selectedBuilding) {
        activeFilters.push({
            type: 'building',
            label: 'Building',
            value: selectedBuilding,
            onRemove: () => {
                setFilterByBuilding(false);
                setSelectedBuilding("");
            }
        });
    }

    if (filterByDepartment && selectedDepartment) {
        activeFilters.push({
            type: 'department',
            label: 'Department',
            value: selectedDepartment,
            onRemove: () => {
                setFilterByDepartment(false);
                setSelectedDepartment("");
            }
        });
    }

    return(
        <>
            {/*filter controls and active filters*/}
            <div className="mb-6 pt-4 space-y-4">
                {/* Active filters as pills */}
                {activeFilters.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap items-center">
                            <span className="mr-2 text-sm font-medium">Active Filters:</span>
                            {activeFilters.map((filter, index) => (
                                <FilterPill
                                    key={`${filter.type}-${index}`}
                                    label={filter.label}
                                    value={filter.value}
                                    onRemove={filter.onRemove}
                                />
                            ))}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setFilterByEmployee(false);
                                    setEmployeeID("");
                                    setFilterByStatus(false);
                                    setSelectedStatus("");
                                    setFilterByPriority(false);
                                    setSelectedPriority("");
                                    setFilterByBuilding(false);
                                    setSelectedBuilding("");
                                    setFilterByDepartment(false);
                                    setSelectedDepartment("");
                                }}
                                className="ml-2 text-sm"
                            >
                                Clear All
                            </Button>
                        </div>
                    </div>
                )}

                {/*filter controls in card*/}
                <div className="bg-muted/40 rounded-lg p-4">
                    <div className="flex flex-wrap gap-4">
                        {/*employee filter*/}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="employeeID">Employee ID</Label>
                            <div className="flex space-x-2">
                                <Input
                                    id="employeeID"
                                    value={employeeID}
                                    onChange={(e) => setEmployeeID(e.target.value)}
                                    placeholder="Enter ID"
                                    className="w-40"
                                />
                                <Button
                                    variant={filterByEmployee ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilterByEmployee(!filterByEmployee)}
                                >
                                    {filterByEmployee ? "Applied" : "Apply"}
                                </Button>
                            </div>
                        </div>

                        {/*status filter*/}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="status">Status</Label>
                            <div className="flex space-x-2">
                                <select
                                    id="status"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="rounded-md border h-10 px-3 py-2 w-40"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Canceled">Canceled</option>
                                    <option value="Accepted">Accepted</option>
                                </select>
                                <Button
                                    variant={filterByStatus ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilterByStatus(!filterByStatus)}
                                >
                                    {filterByStatus ? "Applied" : "Apply"}
                                </Button>
                            </div>
                        </div>

                        {/*priority filter*/}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="priority">Priority</Label>
                            <div className="flex space-x-2">
                                <select
                                    id="priority"
                                    value={selectedPriority}
                                    onChange={(e) => setSelectedPriority(e.target.value)}
                                    className="rounded-md border h-10 px-3 py-2 w-40"
                                >
                                    <option value="">All Priorities</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                                <Button
                                    variant={filterByPriority ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilterByPriority(!filterByPriority)}
                                >
                                    {filterByPriority ? "Applied" : "Apply"}
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-end">
                            <Button
                                variant="secondary"
                                onClick={retrieveFromDatabase}
                            >
                                Refresh Data
                            </Button>
                        </div>

                        {/*building filter*/}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="building">Building</Label>
                            <div className="flex space-x-2">
                                <select
                                    id="building"
                                    value={selectedBuilding}
                                    onChange={(e) => {
                                        const newBuilding = e.target.value;
                                        setSelectedBuilding(newBuilding);
                                        // Reset department when building changes
                                        setSelectedDepartment("");
                                    }}
                                    className="rounded-md border h-10 px-3 py-2 w-40"
                                >
                                    <option value="">All Buildings</option>
                                    {values.building.map((building) => (
                                        <option key={building} value={building}>
                                            {building}
                                        </option>
                                    ))}
                                </select>
                                <Button
                                    variant={filterByBuilding ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilterByBuilding(!filterByBuilding)}
                                >
                                    {filterByBuilding ? "Applied" : "Apply"}
                                </Button>
                            </div>
                        </div>

                        {/*department filter*/}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="department">Department</Label>
                            <div className="flex space-x-2">
                                <select
                                    id="department"
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                    className="rounded-md border h-10 px-3 py-2 w-40"
                                >
                                    <option value="">All Departments</option>
                                    {availableDepartments.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                                <Button
                                    variant={filterByDepartment ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilterByDepartment(!filterByDepartment)}
                                >
                                    {filterByDepartment ? "Applied" : "Apply"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
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