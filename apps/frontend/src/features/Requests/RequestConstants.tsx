import React from 'react'
import Dropdown from "@/components/Dropdowns/Dropdown.tsx";


interface DeptDropdownProps {
    selectedLocation: "Healthcare Center (22 Patriot Pl.)" | "Healthcare Center (20 Patriot Pl.)" | "Healthcare Center (Chestnut Hill)" | "Faulkner Hospital" | "Main Campus Hospital (75 Francis St.)" ;
    onChange: (name:string, value: string) => void;
    reset?:  boolean;
}

export const DeptDropdown = () => {

        // switch (selectedLocation) {
        //     case "Healthcare Center (22 Patriot Pl.)":
        //         return <Dropdown tableName="departmentsPP22" fieldName="department" onChange={handleDepartmentChange} reset={resetDept} />;
        //     case "Healthcare Center (20 Patriot Pl.)":
        //         return <Dropdown tableName="departmentsPP20" fieldName="department" onChange={handleDepartmentChange} reset={resetDept}/>;
        //     case "Healthcare Center (Chestnut Hill)":
        //         return <Dropdown tableName="departmentsCH" fieldName="department" onChange={handleDepartmentChange} reset={resetDept}/>;
        //     case "Faulkner Hospital":
        //         return <Dropdown tableName="departmentsFAll" fieldName="department" onChange={handleDepartmentChange} reset={resetDept}/>;
        //     case "Main Campus Hospital (75 Francis St.)":
        //         return <Dropdown tableName="departmentsWAll" fieldName="department" onChange={handleDepartmentChange} reset={resetDept}/>;
        //     default:
        //         return null;
        // }


    return (
        <div>
            DEPT
        </div>
    )
}
