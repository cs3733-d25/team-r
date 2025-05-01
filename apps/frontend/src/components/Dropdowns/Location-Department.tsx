import {Label} from "@/components/ui/label.tsx";
import Dropdown from './Dropdown.tsx'
import {useEffect, useState} from "react";

interface DropdownLocationProps {
    onChange: (name:string, value: string) => void;
    reset?: boolean;
}


const LocationDepartmentDropdown: React.FC<DropdownLocationProps> = ({ onChange, reset}) => {
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedDept, setSelectedDept] = useState<string | null>(null);

    useEffect(() => {
        if (reset) {
            setSelectedLocation("");
        }
        setSelectedDept("")
    }, [reset]);

    useEffect(() => { //if location change
        console.log("Selected location:", selectedLocation);
        setSelectedDept("")
    }, [selectedLocation]);

    useEffect(() => {
        console.log("Selected department:", selectedDept);
    }, [selectedDept]);


    const handleLocationChange = (name: string, value: string) => {
        setSelectedLocation(value);
        onChange(name, value); // update formData in parent
    };

    const handleDepartmentChange = (name: string, value: string) => {
        setSelectedDept(value);
        onChange(name, value); // update formData in parent
    };

    const renderDepartmentDropdown = () => {
        switch (selectedLocation) {
            case "Healthcare Center (22 Patriot Pl.)":
                return <Dropdown tableName="departmentsPP22" fieldName="department" onChange={handleDepartmentChange} reset={reset} />;
            case "Healthcare Center (20 Patriot Pl.)":
                return <Dropdown tableName="departmentsPP20" fieldName="department" onChange={handleDepartmentChange} reset={reset}/>;
            case "Healthcare Center (Chestnut Hill)":
                return <Dropdown tableName="departmentsCH" fieldName="department" onChange={handleDepartmentChange} reset={reset}/>;
            case "Faulkner Hospital":
                return <Dropdown tableName="departmentsFAll" fieldName="department" onChange={handleDepartmentChange} reset={reset}/>;
            case "Main Campus Hospital (75 Francis St.)":
                return <Dropdown tableName="departmentsWAll" fieldName="department" onChange={handleDepartmentChange} reset={reset}/>;
            default:
                return null;
        }
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
                    {renderDepartmentDropdown()}
                </>
            )}

            <p> location: {selectedLocation} </p>
            <p> department: {selectedDept}</p>
        </div>

    );
};

export default LocationDepartmentDropdown;