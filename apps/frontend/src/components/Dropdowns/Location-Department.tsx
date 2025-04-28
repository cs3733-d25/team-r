import values, {valueKey} from "@/constant-values.ts";
import {Label} from "@/components/ui/label.tsx";
import Dropdown from './Department.tsx'
import {useState} from "react";

interface DropdownLocationProps {
    onChange: (name:string, value: string) => void;
}


const LocationDepartmentDropdown: React.FC<DropdownLocationProps> = ({ onChange }) => {
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    //put this in Dropdown element and it will reset on submit
    //const [resetDropdowns, setResetDropdowns] = useState(false);

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
                    Select the building making the patient request.
                </span>
            </Label>
            <Dropdown tableName={"building"} fieldName={'location'} onChange={handleLocationChange} />
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
                    {selectedLocation === "Patriot Place 22" ? (
                        <Dropdown tableName={"departmentsPP22"} fieldName={'department'} onChange={handleDepartmentChange} />
                    ) : selectedLocation === "Patriot Place 20" ? (
                        <Dropdown tableName={"departmentsPP20"} fieldName={'department'} onChange={handleDepartmentChange}/>
                    ) : selectedLocation === "Chestnut Hill" ? (
                        <Dropdown tableName={"departmentsCH"} fieldName={'department'} onChange={handleDepartmentChange}/>
                    ) : selectedLocation === "Faulkner" ? (
                        <Dropdown tableName={"departmentsFAll"} fieldName={'department'} onChange={handleDepartmentChange}/>
                        // TODO: women's hospital implementation
                    // ) : selectedLocation === "Womens" ? (
                    //     <Dropdown tableName={departments} fieldName={} onChange={} />
                     ) : null}
                </>
            )}
        </div>

    );
};

export default LocationDepartmentDropdown;