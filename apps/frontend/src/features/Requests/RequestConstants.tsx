import React from 'react'
import Dropdown from "@/components/Dropdowns/Dropdown.tsx";


interface DeptDropdownProps {
    selectedLocation: string ;
    onChange: (name:string, value: string) => void;
    reset?:  boolean;
}

export const DeptDropdown = ({ selectedLocation, onChange, reset }: DeptDropdownProps) => {

    const deptDropdown = () => {
        switch (selectedLocation) {
            case "Healthcare Center (22 Patriot Pl.)":
                return <Dropdown tableName="departmentsPP22" fieldName="department" onChange={onChange} reset={reset} />;
            case "Healthcare Center (20 Patriot Pl.)":
                return <Dropdown tableName="departmentsPP20" fieldName="department" onChange={onChange} reset={reset}/>;
            case "Healthcare Center (Chestnut Hill)":
                return <Dropdown tableName="departmentsCH" fieldName="department" onChange={onChange} reset={reset}/>;
            case "Faulkner Hospital":
                return <Dropdown tableName="departmentsFAll" fieldName="department" onChange={onChange} reset={reset}/>;
            case "Main Campus Hospital (75 Francis St.)":
                return <Dropdown tableName="departmentsWAll" fieldName="department" onChange={onChange} reset={reset}/>;
            default:
                return null;
        }
    };

    return (
        <div>
            {deptDropdown()}
        </div>
    )

}
