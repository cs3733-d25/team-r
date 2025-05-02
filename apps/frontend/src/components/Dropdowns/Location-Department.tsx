import {Label} from "@/components/ui/label.tsx";
import Dropdown from './Dropdown.tsx'
import {useEffect, useState} from "react";

interface DropdownLocationProps {
    onChange: (name:string, value: string) => void;
    reset?: boolean;
}


const LocationDepartmentDropdown: React.FC<DropdownLocationProps> = ({ onChange, reset}) => {
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    //put this in Dropdown element and it will reset on submit
    // const [resetDropdowns, setResetDropdowns] = useState(false);
    useEffect(() => {
        if (reset) {
            setSelectedLocation("");
        }
    }, [reset]);
    const handleLocationChange = (name: string, value: string) => {
        setSelectedLocation(value);
        onChange(name, value); // update formData in parent
    };


    const handleDepartmentChange = (name: string, value: string) => {
        onChange(name, value); // update formData in parent
    };

    return (
        <div>
            {/* Location dropdown */}
            <Label className="block text-sm font-semibold text-foreground mb-2">
                Location
                <span className="text-accent">*</span>
                <span className="text-xs text-secondary-foreground block">
                    Select the building making the request.
                </span>
            </Label>
            <Dropdown tableName={"building"} fieldName={'building'} onChange={handleLocationChange} reset={reset}/>
            {/*select department based on location*/}
            {selectedLocation && (
                <>
                    <Label className="block text-sm font-semibold text-foreground mb-2">
                        Department
                        <span className="text-accent">*</span>
                        <span className="text-xs text-secondary-foreground block">
                                            Select a department
                                        </span>
                    </Label>
                    {/*handle departments for location*/}
                    {selectedLocation === "Healthcare Center (22 Patriot Pl.)" ? (
                        <Dropdown tableName={"departmentsPP22"} fieldName={'department'} onChange={handleDepartmentChange} />
                    ) : selectedLocation === "Healthcare Center (20 Patriot Pl.)" ? (
                        <Dropdown tableName={"departmentsPP20"} fieldName={'department'} onChange={handleDepartmentChange}/>
                    ) : selectedLocation === "Healthcare Center (Chestnut Hill)" ? (
                        <Dropdown tableName={"departmentsCH"} fieldName={'department'} onChange={handleDepartmentChange}/>
                    ) : selectedLocation === "Faulkner Hospital" ? (
                        <Dropdown tableName={"departmentsFAll"} fieldName={'department'} onChange={handleDepartmentChange}/>
                    ) : selectedLocation === "Main Campus Hospital (75 Francis St.)" ? (
                        <Dropdown tableName={"departmentsWAll"} fieldName={'department'} onChange={handleDepartmentChange} />
                     ) : null}
                </>
            )}
        </div>

    );
};

export default LocationDepartmentDropdown;