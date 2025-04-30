import { useState, useEffect } from 'react';
import axios from 'axios';
import {BaseRequest, useRequestFilters} from "@/hooks/useRequestFilters.ts";
import {RequestInfoButton} from "@/components/ServiceRequests/RequestInfoButton.tsx";
import {RequestFilters} from "@/components/RequestFilters.tsx";
import {SortableTable} from "@/components/SortableTable.tsx";
import {PaginationControls} from "@/components/PaginationControls.tsx";


interface TranslateRequest extends BaseRequest {
        translateRequestID: string | number | null;
        employeeName: string | null;
        language: string | null;
        priority: string | null;
        department: string | null;
        location: string | null;
        roomNumber: string | null;
        notes: string | null;
        timestamp: string | null;
        status: string | null;
        [key: string]: unknown;
}

export function TranslateRequestPage() {
    const [translations, setTranslations] = useState<TranslateRequest[]>([
        {
            translateRequestID: null,
            employeeName: null,
            language: null,
            priority: null,
            department: null,
            location: null,
            roomNumber: null,
            notes: null,
            timestamp: null,
            status: null
        }
    ]);

    const filtering = useRequestFilters(translations);

    useEffect(() => {
        retrieveFromDatabase();
    }, []);

    async function retrieveFromDatabase() {
        try {
            const response = await axios.get('/api/translate/');
            console.log('response from / get', response.data);
            setTranslations(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('error in retrieve:', error);
        }
    }

    const columns = [
        {field: 'language', header: 'Language', sortable: true},
        {field: 'location', header: 'Building', sortable: true},
        {field: 'department', header: 'Department', sortable: true},
        {field: 'employeeID', header: 'Employee', sortable: true},
        {field: 'priority', header: 'Priority', sortable: true},
        {field: 'status', header: 'Status', sortable: true},
        {field: 'actions', header: 'Details', cellRenderer: (item: TranslateRequest) => (<RequestInfoButton type="Translate" id={item.translateRequestID ? Number(item.translateRequestID) : null} />)}
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

export default TranslateRequestPage;
