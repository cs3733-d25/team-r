import {useState, useMemo} from 'react';
import values from '@/constant-values';

// define this interface to prevent errors
export interface BaseRequest {
    employeeID?: string | null;
    status?: string | null;
    priority?: string | null;
    department?: string | null;
    building?: string | null;
    [key: string]: unknown;
}

export function useRequestFilters<T extends BaseRequest>(data: T[]) {
   // filtering
    const [filterOptions, setFilterOptions] = useState({
        employeeID: '',
        status: '',
        priority: '',
        building: '',
        department: ''
    });

    const [filterState, setFilterState] = useState({
        filterByEmployee: false,
        filterByStatus: false,
        filterByPriority: false,
        filterByBuilding: false,
        filterByDepartment: false
    });

    // sorting
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const resetSort = () => {
        setSortField(null);
        setSortDirection('desc');
    };

    // pagination states
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // other helper functions
    const isDepartmentInBuilding = (department: string | null, building: string): boolean => {
        if (!department) return false;
        if (!building) return true;

        switch (building) {
            case 'Healthcare Center (20 Patriot Pl.)':
                return values.departmentsPP20.includes(department);
            case 'Healthcare Center (22 Patriot Pl.)':
                return values.departmentsPP22.includes(department);
            case 'Healthcare Center (Chestnut Hill)':
                return values.departmentsCH.includes(department);
            case 'Faulkner Hospital':
                return values.departmentsFAll.includes(department);
            case 'Main Campus Hospital (75 Francis St.)':
                return values.departmentsWAll.includes(department);
            default:
                return true;
        }
    };

    const getPriorityRank = (priority: string | null): number => {
        switch (priority) {
            case 'Urgent': return 4;
            case 'High': return 3;
            case 'Medium': return 2;
            case 'Low': return 1;
            default: return 0;
        }
    };

    // filter the data
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            // employee filter
            if (filterState.filterByEmployee && filterOptions.employeeID) {
                if (!item.employeeID ||
                    !item.employeeID.toLowerCase().includes(filterOptions.employeeID.toLowerCase())) {
                    return false;
                }
            }

            // status filter
            if (filterState.filterByStatus && filterOptions.status) {
                if (!item.status || item.status !== filterOptions.status) {
                    return false;
                }
            }

            // priority filter
            if (filterState.filterByPriority && filterOptions.priority) {
                if (!item.priority || item.priority !== filterOptions.priority) {
                    return false;
                }
            }

            // building filter
            if (filterState.filterByBuilding && filterOptions.building) {
                // for transport requests, check currentBuilding
                if (item.type === 'Transport') {
                    if (!item.currentBuilding || item.currentBuilding !== filterOptions.building) {
                        return false;
                    }
                }
                else { // other service requests
                    if (!item.building || item.building !== filterOptions.building) {
                        return false;
                    }
                }
            }

            // department filter to check if department exists and belongs to the selected building
            if (filterState.filterByDepartment && filterOptions.department) {
                if (filterState.filterByBuilding && filterOptions.building) {
                    if (!item.department ||
                        item.department !== filterOptions.department ||
                        !isDepartmentInBuilding(item.department, filterOptions.building)) {
                        return false;
                    }
                } else {
                    if (!item.department || item.department !== filterOptions.department) {
                        return false;
                    }
                }
            }

            return true;
        });
    }, [data, filterState, filterOptions]);

    // sort filtered data
    const sortedData = useMemo(() => {
        if (!sortField) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortField as keyof T];
            const bValue = b[sortField as keyof T];

            // handle priority specially
            if (sortField === 'priority') {
                const aRank = getPriorityRank(aValue as string | null);
                const bRank = getPriorityRank(bValue as string | null);
                return sortDirection === 'asc' ? aRank - bRank : bRank - aRank;
            }

            // handle other fields
            if (aValue === bValue) return 0;
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            const aString = String(aValue).toLowerCase();
            const bString = String(bValue).toLowerCase();

            return sortDirection === 'asc'
                ? aString.localeCompare(bString)
                : bString.localeCompare(aString);
        });
    }, [filteredData, sortField, sortDirection]);

    // get paginated data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, itemsPerPage]);

    // calculate total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // toggle sort direction
    const toggleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    // reset filters
    const clearFilters = () => {
        setFilterOptions({
            employeeID: '',
            status: '',
            priority: '',
            building: '',
            department: ''
        });

        setFilterState({
            filterByEmployee: false,
            filterByStatus: false,
            filterByPriority: false,
            filterByBuilding: false,
            filterByDepartment: false
        });
    };

    return {
        filterOptions,
        filterState,
        sortField,
        sortDirection,
        resetSort,
        currentPage,
        itemsPerPage,
        totalPages,
        filteredData,
        paginatedData,
        setFilterOptions,
        setFilterState,
        toggleSort,
        setCurrentPage,
        setItemsPerPage,
        clearFilters
    };
}