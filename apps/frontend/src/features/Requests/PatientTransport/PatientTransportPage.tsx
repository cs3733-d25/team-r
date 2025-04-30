import {useState, useEffect} from 'react'
import axios from 'axios'
import {RequestFilters} from '@/components/RequestFilters.tsx';
import {SortableTable} from '@/components/SortableTable.tsx';
import {PaginationControls} from '@/components/PaginationControls.tsx';
import {useRequestFilters, BaseRequest} from '@/hooks/useRequestFilters.ts';
import {RequestInfoButton} from '@/components/ServiceRequests/RequestInfoButton.tsx';

interface TransportRequest extends BaseRequest {
    employeeRequestID: string | number | null;
    employeeID: string | null;
    priority: string | null;
    department: string | null;
    patientID: string | null;
    patientName: string | null;
    currentLocation: string | null;
    destination: string | null;
    transportType: string | null;
    requestTime: string | null;
    notes: string | null;
    status: string | null;
    [key: string]: unknown;
}

export function PatientTransportPage() {
    const [transport, setTransport] = useState<TransportRequest[]>([{
        employeeRequestID: null,
        employeeID: null,
        priority: null,
        department: null,
        patientID: null,
        patientName: null,
        currentLocation: null,
        destination: null,
        transportType: null,
        requestTime: null,
        notes: null,
        status: null
    }]);

    const filtering = useRequestFilters(transport);

    useEffect(() => {
        retrieveFromDatabase();
    }, []);

    async function retrieveFromDatabase() {
        try {
            const response = await axios.get("/api/transportreq/")
            setTransport(response.data);
        }
        catch(error) {
            console.log("error in retrieve:", error);
        }
    }

    const columns = [
        {field: 'transportType', header: 'Transport Type', sortable: true},
        {field: 'patientID', header: 'Patient ID', sortable: true},
        {field: 'department', header: 'Department', sortable: true},
        {field: 'employeeID', header: 'Employee', sortable: true},
        {field: 'priority', header: 'Priority', sortable: true},
        {field: 'status', header: 'Status', sortable: true},
        {
            field: 'actions',
            header: 'Details',
            cellRenderer: (item: TransportRequest) => (
                <RequestInfoButton
                    type="Transport"
                    id={item.employeeRequestID ? Number(item.employeeRequestID) : null}
                />
            )
        }
    ];

    return(
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

export default PatientTransportPage;