import values, {valueKey} from "@/constant-values.ts";
import {Label} from "@/components/ui/label.tsx";
import Dropdown from './Department.tsx'
import {useState} from "react";

interface DropdownLocationProps {
    onChange: (name:string, value: string) => void;
}

const LocationDepartmentDropdown: React.FC<DropdownLocationProps> = ({ onChange }) => {
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

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
            <Label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
                <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 block">
                    Select the building making the patient request.
                </span>
            </Label>
            <Dropdown tableName={"building"} onChange={handleLocationChange} />
            {/*select department based on location*/}
            <p>location dropdown test</p>
            {selectedLocation && (
                <>
                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                        Department
                        <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 block">
                                            Select the department making the patient request.
                                        </span>
                    </Label>
                    {/*handle departments for location*/}
                    {selectedLocation === "Patriot Place 22" ? (
                        <Dropdown tableName={"departmentsPP22"} onChange={handleDepartmentChange} />
                    ) : selectedLocation === "Patriot Place 20" ? (
                        <Dropdown tableName={"departmentsPP20"} onChange={handleDepartmentChange} />
                    ) : selectedLocation === "Chestnut Hill" ? (
                        <Dropdown tableName={"departmentsCH"} onChange={handleDepartmentChange} />
                    ) : null}
                </>
            )}
        </div>

    );
};

export default LocationDepartmentDropdown;