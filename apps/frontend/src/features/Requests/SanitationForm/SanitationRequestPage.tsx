import {useState, useEffect} from 'react'
import axios from 'axios'
import {RequestFilters} from '@/components/RequestFilters.tsx';
import {SortableTable} from '@/components/SortableTable.tsx';
import {PaginationControls} from '@/components/PaginationControls.tsx';
import {useRequestFiltering} from '@/hooks/useRequestFilters.ts';
import {RequestInfoButton} from '@/components/ServiceRequests/RequestInfoButton.tsx';

export function SanitationRequestPage() {
    const [sanitation, setSanitation] = useState([{employeeID:null,sanitationType:null,priority:null,department:null,location:null,roomNumber:null,requestTime:null,comments:null,status:null}]);

    const filtering = useRequestFiltering(sanitation);

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
        {field: 'sanitationType', header: 'Type', sortable: true},
        {field: 'department', header: 'Department', sortable: true},
        {field: 'employeeID', header: 'Employee', sortable: true},
        {field: 'priority', header: 'Priority', sortable: true},
        {field: 'status', header: 'Status', sortable: true},
        {field: 'actions', header: 'Details', cellRenderer: (item: any) => (
            <RequestInfoButton type="Sanitation" id={item.requestId} />
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

export default SanitationRequestPage;