import {useState, useEffect} from 'react'
import axios from 'axios'
import {RequestFilters} from '@/components/RequestFilters.tsx';
import {SortableTable} from '@/components/SortableTable.tsx';
import {PaginationControls} from '@/components/PaginationControls.tsx';
import {useRequestFilters, BaseRequest} from '@/hooks/useRequestFilters.ts';
import {RequestInfoButton} from '@/components/ServiceRequests/RequestInfoButton.tsx';

// define this interface to prevent errors
interface SanitationRequest extends BaseRequest{
    employeeID: string | null;
    sanitationType: string | null;
    priority: string | null;
    department: string | null;
    location: string | null;
    roomNumber: string | null;
    requestTime: string | null;
    comments: string | null;
    status: string | null;
    requestId: string | null;
    [key: string]: unknown; // added this index signature to match BaseRequest
}

export function SanitationRequestPage() {
    const [sanitation, setSanitation] = useState<SanitationRequest[]>([{
        employeeID: null,
        sanitationType: null,
        priority: null,
        department: null,
        location: null,
        roomNumber: null,
        requestTime: null,
        comments: null,
        status: null,
        requestId: null
    }]);

    const filtering = useRequestFilters(sanitation);

    useEffect(() => {
        retrieveFromDatabase();
    }, []);

    async function retrieveFromDatabase() {
        try{
            const response = await axios.get("/api/sanitation/")
            console.log("response from / get", response.data)
            setSanitation(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log("error in retrieve:", error);
        }
    }

    const columns = [
        {field: 'employeeID', header: 'Employee', sortable: true},
        {field: 'building', header: 'Building', sortable: true},
        {field: 'department', header: 'Department', sortable: true},
        {field: 'roomNumber', header: 'Room', sortable: true},
        {field: 'sanitationType', header: 'Type', sortable: true},
        {field: 'priority', header: 'Priority', sortable: true},
        {field: 'status', header: 'Status', sortable: true},
        {field: 'actions', header: 'Details', cellRenderer: (item: SanitationRequest) => (<RequestInfoButton type="Sanitation" id={item.requestId ? Number(item.requestId) : null} />) }
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

export default SanitationRequestPage;