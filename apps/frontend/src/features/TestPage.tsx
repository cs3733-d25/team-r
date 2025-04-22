import LocationDepartmentDropdown from "@/components/Dropdowns/Location-Department.tsx";
import { useState } from "react";

function TestPage() {
    const [formData, setFormData] = useState({
        patientID: "",
        assignedEmpID: "",
        priority: "",
        department: "",
        location: "",
        comment: "",
        time: new Date().toString(),
        status: '',
        request: ' ',
        employeeName: '',
    });

    const handleDropdownChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            {/* <InternalMap /> */}
            <LocationDepartmentDropdown
                onChange={handleDropdownChange}
            />
        </div>
    );
}

export default TestPage;
