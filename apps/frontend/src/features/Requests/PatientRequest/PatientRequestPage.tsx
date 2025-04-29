import {useState, useEffect} from 'react'
import axios from 'axios'
import {RequestFilters} from '@/components/RequestFilters.tsx';
import {SortableTable} from '@/components/SortableTable.tsx';
import {PaginationControls} from '@/components/PaginationControls.tsx';
import {useRequestFilters, BaseRequest} from '@/hooks/useRequestFilters.ts';
import {RequestInfoButton} from '@/components/ServiceRequests/RequestInfoButton.tsx';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs';
import {PatientRequestForm} from './PatientRequestForm';

// Define the patient request interface
interface PatientRequest extends BaseRequest {
    patientRequestID: string | number | null;
    employeeID: string | null;
    priority: string | null;
    department: string | null;
    patientName: string | null;
    patientID: string | null;
    requestType: string | null;
    notes: string | null;
    status: string | null;
    [key: string]: unknown; // Index signature to match BaseRequest
}

function AllPatientRequests() {
    const [patientRequests, setPatientRequests] = useState<PatientRequest[]>([{
        patientRequestID: null,
        employeeID: null,
        priority: null,
        department: null,
        patientName: null,
        patientID: null,
        requestType: null,
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
        {field: 'requestType', header: 'Request Type', sortable: true},
        {field: 'patientID', header: 'Patient ID', sortable: true},
        {field: 'patientName', header: 'Patient Name', sortable: true},
        {field: 'department', header: 'Department', sortable: true},
        {field: 'employeeID', header: 'Employee', sortable: true},
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

export function PatientRequestPage() {
    return(
        <>
            <h1 className="text-2xl font-bold font-trade mb-0 place-self-center">Nonemergent Patient Request System</h1>
            <h2 className="text-xl font-bold font-trade mb-6 place-self-center">Nora Cleary & Daksh Gajaria</h2>
            <Tabs defaultValue="patientRequest">
                <TabsList>
                    <TabsTrigger value="patientRequest">
                        Nonemergent Patient Request</TabsTrigger>
                    <TabsTrigger value="allPatientRequests">
                        View All Requests</TabsTrigger>
                </TabsList>
                <TabsContent value="patientRequest">
                    <PatientRequestForm/>
                </TabsContent>
                <TabsContent value="allPatientRequests">
                    <AllPatientRequests />
                </TabsContent>
            </Tabs>
        </>
    )
}

export default PatientRequestPage;