import {useState} from "react";

export function PrescriptionPage() {
    const [prescription, setPrescription] = useState([{
        prescriptionID: null,
        employeeID: null,
        employee: null,
        priority: null,
        departmentID: null,
        department: null,
        patientID: null,
        patient: null,
        drugName: null,
        morningPillCount: null,
        middayPillCount: null,
        eveningPillCount: null,
        nightPillCount: null,
        days: null,
        numberOfPills: null,
        refills: null,
        additionalInstructions: null
    }]);

    return (
        <div></div>
    )
}