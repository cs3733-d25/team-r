import {useEffect, useState} from 'react';
import axios from 'axios';
import {RequestFilters} from '@/components/RequestFilters.tsx';
import {SortableTable} from '@/components/SortableTable.tsx';
import {PaginationControls} from '@/components/PaginationControls.tsx';
import {useRequestFilters, BaseRequest} from '@/hooks/useRequestFilters.ts';
import {RequestInfoButton} from '@/components/ServiceRequests/RequestInfoButton.tsx';

// define this interface to prevent errors
interface PrescriptionRequest extends BaseRequest {
    prescriptionID: string | number | null;
    employeeID: string | null;
    employeeName: string | null;
    priority: string | null;
    department: string | null;
    patientID: string | null;
    drugName: string | null;
    morningPillCount: number | null;
    middayPillCount: number | null;
    eveningPillCount: number | null;
    nightPillCount: number | null;
    days: number | null;
    numberOfPills: number | null;
    refills: number | null;
    additionalInstructions: string | null;
    status: string | null;
    [key: string]: unknown; // added this index signature to match BaseRequest
}

export function PrescriptionPage() {
    const [prescription, setPrescription] = useState<PrescriptionRequest[]>([
        {
            prescriptionID: null,
            employeeID: null,
            employeeName: null,
            priority: null,
            department: null,
            patientID: null,
            drugName: null,
            morningPillCount: null,
            middayPillCount: null,
            eveningPillCount: null,
            nightPillCount: null,
            days: null,
            numberOfPills: null,
            refills: null,
            additionalInstructions: null,
            status: null,
        }]);

    const filtering = useRequestFilters(prescription);

    useEffect(() => {
        retrieveFromDatabase();
    }, []);

    async function retrieveFromDatabase() {
        try {
            const response = await axios.get('/api/pharmacy/all-requests');
            console.log('response from / get', response.data);
            setPrescription(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('error in retrieve:', error);
        }
    }

    const columns = [
        {field: 'drugName', header: 'Medication', sortable: true},
        {field: 'patientID', header: 'Patient ID', sortable: true},
        {field: 'department', header: 'Department', sortable: true},
        {field: 'employeeID', header: 'Employee', sortable: true},
        {field: 'priority', header: 'Priority', sortable: true},
        {field: 'status', header: 'Status', sortable: true},
        {field: 'actions', header: 'Details', cellRenderer: (item: PrescriptionRequest) => (<RequestInfoButton type="Prescription" id={item.prescriptionID ? Number(item.prescriptionID) : null} />)}
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

export default PrescriptionPage;