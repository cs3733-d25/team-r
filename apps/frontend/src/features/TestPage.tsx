import LocationDepartmentDropdown from "@/components/Dropdowns/Location-Department.tsx";
import { useState } from "react";
import {InternalMapControls} from "@/components/InternalMapControls.tsx";

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
            <InternalMapControls/>
        </div>
    );
}

export default TestPage;
