import {useState, useEffect} from 'react'
import axios from 'axios'
import {RequestFilters} from '@/components/RequestFilters.tsx';
import {SortableTable} from '@/components/SortableTable.tsx';
import {PaginationControls} from '@/components/PaginationControls.tsx';
import {useRequestFilters, BaseRequest} from '@/hooks/useRequestFilters.ts';
import {RequestInfoButton} from '@/components/ServiceRequests/RequestInfoButton.tsx';

interface DeviceRequest extends BaseRequest {
    requestId: string | number | null;
    deviceID: string | null;
    deviceType: string | null;
    priority: string | null;
    building: string | null;
    room: string | null;
    department: string | null;
    comments: string | null;
    employeeID: string | null;
    status: string | null;
    [key: string]: unknown;
}

export function DeviceReqPage() {
    const [device, setDevice] = useState<DeviceRequest[]>([{
        requestId: null,
        deviceID: null,
        deviceType: null,
        priority: null,
        building: null,
        room: null,
        department: null,
        comments: null,
        employeeID: null,
        status: null
    }]);

    const filtering = useRequestFilters(device);

    useEffect(() => {
        retrieveFromDatabase();
    }, []);

    async function retrieveFromDatabase() {
        try {
            const response = await axios.get("/api/devicereq/")
            setDevice(response.data);
        } catch(error) {
            console.log("error in retrieve:", error);
        }
    }

    const columns = [
        {field: 'employeeID', header: 'Employee', sortable: true},
        {field: 'deviceType', header: 'Device', sortable: true},
        {field: 'building', header: 'Location', sortable: true},
        {field: 'department', header: 'Department', sortable: true},
        {field: 'room', header: 'Room', sortable: true},
        {field: 'priority', header: 'Priority', sortable: true},
        {field: 'status', header: 'Status', sortable: true},
        {field: 'actions', header: 'Details', cellRenderer: (item: DeviceRequest) => (<RequestInfoButton type="Medical Device" id={item.requestId ? Number(item.requestId) : null} />) }
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

export default DeviceReqPage;