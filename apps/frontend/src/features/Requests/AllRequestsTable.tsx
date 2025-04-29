import {useState, useEffect} from 'react';
import axios from 'axios';
import {RequestFilters} from '@/components/RequestFilters.tsx';
import {SortableTable} from '@/components/SortableTable.tsx';
import {PaginationControls} from '@/components/PaginationControls.tsx';
import {useRequestFilters} from '@/hooks/useRequestFilters.ts';
import {RequestInfoButton} from '@/components/ServiceRequests/RequestInfoButton.tsx';
import values from '@/constant-values.ts';

interface TypedRequest {
    type: string | null;
    id: string | number | null;
    department: string | null;
    employeeID: string | number | null;
    status: string | null;
    priority: string | null;
    [key: string]: unknown;
}

interface SanitationRequest {
    requestId: string | number;
    [key: string]: unknown;
}

interface PrescriptionRequest {
    prescriptionID: string | number;
    [key: string]: unknown;
}

interface DeviceRequest {
    requestId: string | number;
    [key: string]: unknown;
}

interface PatientRequest {
    patientRequestID: string | number;
    [key: string]: unknown;
}

interface TransportRequest {
    employeeRequestID: string | number;
    [key: string]: unknown;
}

export function AllRequestsTable() {
    const [requests, setRequests] = useState<TypedRequest[]>([{
        type: null,
        department: null,
        employeeID: null,
        status: null,
        priority: null,
        id: null
    }]);

    const filtering = useRequestFilters(requests);

    useEffect(() => {
        retrieveFromDatabase();
    }, []);

    async function retrieveFromDatabase() {
        try {
            const sanitationRes = await axios.get('/api/sanitation/');
            const sanitationResWType = sanitationRes.data.map((req: SanitationRequest) => ({
                ...req,
                type: 'Sanitation',
                id: req.requestId,
            }));

            const prescriptionRes = await axios.get('/api/pharmacy/all-requests');
            const prescriptionReqWType = prescriptionRes.data.map((req: PrescriptionRequest) => ({
                ...req,
                type: 'Prescription',
                id: req.prescriptionID,
            }));

            const deviceRes = await axios.get('/api/devicereq/');
            const deviceReqWType = deviceRes.data.map((req: DeviceRequest) => ({
                ...req,
                type: 'Medical Device',
                id: req.requestId,
            }));

            const patientRes = await axios.get('/api/patientreq/');
            const patientReqWType = patientRes.data.map((req: PatientRequest) => ({
                ...req,
                type: 'Patient Request',
                id: req.patientRequestID,
            }));

            const transportRes = await axios.get('/api/transportreq/');
            const transportReqWType = transportRes.data.map((req: TransportRequest) => ({
                ...req,
                type: 'Transport',
                id: req.employeeRequestID,
            }));

            // combine all requests
            setRequests([
                ...sanitationResWType,
                ...prescriptionReqWType,
                ...deviceReqWType,
                ...patientReqWType,
                ...transportReqWType,
            ]);
        } catch (error) {
            console.log('error in retrieve:', error);
        }
    }

    // define table columns
    const columns = [
        {field: 'type', header: 'Request Type', sortable: true},
        {field: 'department', header: 'Department', sortable: true},
        {field: 'employeeID', header: 'Employee', sortable: true},
        {field: 'priority', header: 'Priority', sortable: true},
        {field: 'status', header: 'Status', sortable: true},
        {
            field: 'actions',
            header: 'Details',
            cellRenderer: (item: TypedRequest) => (
                <RequestInfoButton
                    type={item.type as string}
                    id={typeof item.id === 'string' ? Number(item.id) : (item.id as number)}
                />
            )
        }
    ];

    return (
        <>
            <RequestFilters
                options={filtering.filterOptions}
                filterState={filtering.filterState}
                onFilterChange={(options, state) => {
                    filtering.setFilterOptions(options);
                    filtering.setFilterState(state);
                }}
                onClearFilters={filtering.clearFilters}
            />

            <SortableTable
                columns={columns}
                data={filtering.paginatedData}
                sortField={filtering.sortField}
                sortDirection={filtering.sortDirection}
                onSort={filtering.toggleSort}
            />

            <PaginationControls
                currentPage={filtering.currentPage}
                totalPages={filtering.totalPages}
                itemsPerPage={filtering.itemsPerPage}
                totalItems={filtering.filteredData.length}
                onPageChange={(page) => filtering.setCurrentPage(page)}
                onItemsPerPageChange={(count) => {
                    filtering.setItemsPerPage(count);
                    filtering.setCurrentPage(1);
                }}
            />
        </>
    );
}

export default AllRequestsTable;