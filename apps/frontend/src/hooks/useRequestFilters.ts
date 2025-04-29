import {useState, useMemo} from 'react';
import values from '@/constant-values';

export function useRequestFiltering(data: any[]) {
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

    // pagination states
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // other helper functions
    const isDepartmentInBuilding = (department: string | null, building: string): boolean => {
        if (!department) return false;

        switch (building) {
            case 'Faulkner Hospital':
                return values.departmentsFAll.includes(department);
            // Other cases
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
            return true;
        });
    }, [data, filterState, filterOptions]);

    // sort filtered data
    const sortedData = useMemo(() => {
        if (!sortField) return filteredData;

        return [...filteredData].sort((a, b) => {
            return 0;
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