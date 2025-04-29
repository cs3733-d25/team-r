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

    // TODO: add other filters here

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
                    {/* Location filters group */}
                    <div className="space-y-4 p-3 border border-muted-foreground/20 rounded-md">
                        {/* Building filter */}
                        {/* Department filter */}
                    </div>

                    {/* Status filters group */}
                    <div className="space-y-4 p-3 border border-muted-foreground/20 rounded-md">
                        {/* Status filter */}
                        {/* Priority filter */}
                    </div>

                    {/* Personnel filters */}
                    <div className="space-y-4 p-3 border border-muted-foreground/20 rounded-md">
                        {/* Employee filter */}
                    </div>
                </div>
            </div>
        </div>
    );
}