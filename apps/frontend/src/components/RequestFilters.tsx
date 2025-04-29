import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";
import values from '@/constant-values';

export interface FilterOptions {
    employeeID: string;
    status: string;
    priority: string;
    building: string;
    department: string;
}

export interface FilterState {
    filterByEmployee: boolean;
    filterByStatus: boolean;
    filterByPriority: boolean;
    filterByBuilding: boolean;
    filterByDepartment: boolean;
}

interface FilterProps {
    options: FilterOptions;
    filterState: FilterState;
    onFilterChange: (options: FilterOptions, state: FilterState) => void;
    onClearFilters: () => void;
}

export function RequestFilters({options, filterState, onFilterChange, onClearFilters}: FilterProps) {
    const [localOptions, setLocalOptions] = useState<FilterOptions>(options);
    const [localState, setLocalState] = useState<FilterState>(filterState);

    const getDepartmentsForBuilding = (building: string) => {
        switch (building) {
            case 'Faulkner Hospital':
                return values.departmentsFAll;
            case 'Main Campus Hospital (75 Francis St.)':
                return values.departmentsWAll;
            default:
                return [
                    ...new Set([
                        ...values.departmentsFAll,
                        ...values.departmentsWAll,
                        ...values.departmentsCH,
                        ...values.departmentsPP20,
                        ...values.departmentsPP22,
                    ]),
                ].sort();
        }
    };

    const availableDepartments = getDepartmentsForBuilding(localOptions.building);

    // update parent component when local state changes
    useEffect(() => {
        onFilterChange(localOptions, localState);
    }, [localOptions, localState]);

    // filter pills
    const FilterPill = ({ label, value, onRemove }: { label: string; value: string; onRemove: () => void }) => (
        <div className="inline-flex items-center px-3 py-1 mr-2 mb-2 bg-primary text-primary-foreground rounded-full text-sm">
            <span className="mr-1 font-medium">{label}:</span> {value}
            <button onClick={onRemove} className="ml-2 hover:text-gray-200">×</button>
        </div>
    );

    // generate active filters
    const activeFilters = [];

    if (localState.filterByEmployee && localOptions.employeeID) {
        activeFilters.push({
            type: 'employee',
            label: 'Employee',
            value: localOptions.employeeID,
            onRemove: () => {
                setLocalState({...localState, filterByEmployee: false});
                setLocalOptions({...localOptions, employeeID: ''});
            },
        });
    }

    if (localState.filterByStatus && localOptions.status) {
        activeFilters.push({
            type: 'status',
            label: 'Status',
            value: localOptions.status,
            onRemove: () => {
                setLocalState({...localState, filterByStatus: false});
                setLocalOptions({...localOptions, status: ''});
            },
        });
    }

    if (localState.filterByPriority && localOptions.priority) {
        activeFilters.push({
            type: 'priority',
            label: 'Priority',
            value: localOptions.priority,
            onRemove: () => {
                setLocalState({...localState, filterByPriority: false});
                setLocalOptions({...localOptions, priority: ''});
            },
        });
    }

    if (localState.filterByBuilding && localOptions.building) {
        activeFilters.push({
            type: 'building',
            label: 'Building',
            value: localOptions.building,
            onRemove: () => {
                setLocalState({...localState, filterByBuilding: false});
                setLocalOptions({...localOptions, building: '', department: ''});
                setLocalState({...localState, filterByBuilding: false, filterByDepartment: false});
            },
        });
    }

    if (localState.filterByDepartment && localOptions.department) {
        activeFilters.push({
            type: 'department',
            label: 'Department',
            value: localOptions.department,
            onRemove: () => {
                setLocalState({...localState, filterByDepartment: false});
                setLocalOptions({...localOptions, department: ''});
            },
        });
    }


    return (
        <div className="mb-6 pt-4 space-y-4">
            {/* Active filters as pills */}
            {activeFilters.length > 0 && (
                <div className="mb-4">
                    <div className="flex flex-wrap items-center">
                        <span className="mr-2 text-sm font-medium">Active Filters:</span>
                        {activeFilters.map((filter, index) => (
                            <FilterPill
                                key={`${filter.type}-${index}`}
                                label={filter.label}
                                value={filter.value}
                                onRemove={filter.onRemove}
                            />
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            className="ml-2 text-sm"
                        >
                            Clear All
                        </Button>
                    </div>
                </div>
            )}

            {/* Filter cards UI */}
            <div className="bg-muted/40 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-4 p-3 border border-muted-foreground/20 rounded-md">
                        <h3 className="text-sm font-medium">Location Filters</h3>
                        <div className="space-y-3">
                            {/*building filter*/}
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="building">Building</label>
                                <div className="flex space-x-2">
                                    <select
                                        id="building"
                                        value={localOptions.building}
                                        onChange={(e) => {
                                            const newBuilding = e.target.value;
                                            setLocalOptions({
                                                ...localOptions,
                                                building: newBuilding,
                                                department: ''
                                            });
                                        }}
                                        className="rounded-md border h-10 px-3 py-2 flex-1 min-w-0"
                                    >
                                        <option value="">All Buildings</option>
                                        {values.building.map((building) => (
                                            <option key={building} value={building}>
                                                {building}
                                            </option>
                                        ))}
                                    </select>
                                    <Button
                                        variant={localState.filterByBuilding ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setLocalState({
                                            ...localState,
                                            filterByBuilding: !localState.filterByBuilding
                                        })}
                                    >
                                        {localState.filterByBuilding ? 'Applied' : 'Apply'}
                                    </Button>
                                </div>
                            </div>

                            {/*department filter*/}
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="department">Department</label>
                                <div className="flex space-x-2">
                                    <select
                                        id="department"
                                        value={localOptions.department}
                                        onChange={(e) => setLocalOptions({
                                            ...localOptions,
                                            department: e.target.value
                                        })}
                                        className="rounded-md border h-10 px-3 py-2 flex-1 min-w-0"
                                    >
                                        <option value="">All Departments</option>
                                        {availableDepartments.map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                    <Button
                                        variant={localState.filterByDepartment ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setLocalState({
                                            ...localState,
                                            filterByDepartment: !localState.filterByDepartment
                                        })}
                                    >
                                        {localState.filterByDepartment ? 'Applied' : 'Apply'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*status filters group*/}
                    <div className="space-y-4 p-3 border border-muted-foreground/20 rounded-md">
                        <h3 className="text-sm font-medium">Request Status</h3>
                        <div className="space-y-3">
                            {/*status filter*/}
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="status">Status</label>
                                <div className="flex space-x-2">
                                    <select
                                        id="status"
                                        value={localOptions.status}
                                        onChange={(e) => setLocalOptions({
                                            ...localOptions,
                                            status: e.target.value
                                        })}
                                        className="rounded-md border h-10 px-3 py-2 flex-1 min-w-0"
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Canceled">Canceled</option>
                                        <option value="Accepted">Accepted</option>
                                    </select>
                                    <Button
                                        variant={localState.filterByStatus ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setLocalState({
                                            ...localState,
                                            filterByStatus: !localState.filterByStatus
                                        })}
                                    >
                                        {localState.filterByStatus ? 'Applied' : 'Apply'}
                                    </Button>
                                </div>
                            </div>

                            {/*priority filter*/}
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="priority">Priority</label>
                                <div className="flex space-x-2">
                                    <select
                                        id="priority"
                                        value={localOptions.priority}
                                        onChange={(e) => setLocalOptions({
                                            ...localOptions,
                                            priority: e.target.value
                                        })}
                                        className="rounded-md border h-10 px-3 py-2 flex-1 min-w-0"
                                    >
                                        <option value="">All Priorities</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Urgent">Urgent</option>
                                    </select>
                                    <Button
                                        variant={localState.filterByPriority ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setLocalState({
                                            ...localState,
                                            filterByPriority: !localState.filterByPriority
                                        })}
                                    >
                                        {localState.filterByPriority ? 'Applied' : 'Apply'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*personnel filter group*/}
                    <div className="space-y-4 p-3 border border-muted-foreground/20 rounded-md">
                        <h3 className="text-sm font-medium">Personnel</h3>
                        <div className="space-y-3">
                            {/*employee filter*/}
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="employeeID">Employee ID</label>
                                <div className="flex space-x-2">
                                    <input
                                        id="employeeID"
                                        value={localOptions.employeeID}
                                        onChange={(e) => setLocalOptions({
                                            ...localOptions,
                                            employeeID: e.target.value
                                        })}
                                        placeholder="Enter ID"
                                        className="rounded-md border h-10 px-3 py-2 flex-1 min-w-0"
                                    />
                                    <Button
                                        variant={localState.filterByEmployee ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setLocalState({
                                            ...localState,
                                            filterByEmployee: !localState.filterByEmployee
                                        })}
                                    >
                                        {localState.filterByEmployee ? 'Applied' : 'Apply'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}