import {useState, useEffect} from 'react'
import axios from 'axios'
import {RequestFilters} from '@/components/RequestFilters.tsx';
import {SortableTable} from '@/components/SortableTable.tsx';
import {PaginationControls} from '@/components/PaginationControls.tsx';
import {useRequestFilters, BaseRequest} from '@/hooks/useRequestFilters.ts';
import {RequestInfoButton} from '@/components/ServiceRequests/RequestInfoButton.tsx';

interface PatientRequest extends BaseRequest {
    patientRequestID: string | number | null;
    employeeID: string | null;
    priority: string | null;
    department: string | null;
    patientName: string | null;
    building: string | null;
    patientID: string | null;
    request: string | null;
    notes: string | null;
    status: string | null;
    [key: string]: unknown;
}

function PatientRequestPage() {
    const [patientRequests, setPatientRequests] = useState<PatientRequest[]>([{
        patientRequestID: null,
        employeeID: null,
        priority: null,
        department: null,
        building: null,
        patientName: null,
        patientID: null,
        request: null,
        notes: null,
        status: null
    }]);

    const filtering = useRequestFilters(patientRequests);

    useEffect(() => {
        retrieveFromDatabase();
    }, []);

    async function retrieveFromDatabase() {
        try {
            const response = await axios.get('/api/patientreq/');
            setPatientRequests(response.data);
        } catch(error) {
            console.log('error in retrieve:', error);
        }
    }

    const columns = [
        {field: 'employeeID', header: 'Employee', sortable: true},
        {field: 'request', header: 'Request', sortable: true},
        {field: 'building', header: 'Location', sortable: true},
        {field: 'department', header: 'Department', sortable: true},
        {field: 'patientID', header: 'Patient', sortable: true},
        {field: 'priority', header: 'Priority', sortable: true},
        {field: 'status', header: 'Status', sortable: true},
        {field: 'actions', header: 'Details', cellRenderer: (item: PatientRequest) => (<RequestInfoButton type="Patient Request" id={item.patientRequestID ? Number(item.patientRequestID) : null} />) }
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

export default PatientRequestPage;