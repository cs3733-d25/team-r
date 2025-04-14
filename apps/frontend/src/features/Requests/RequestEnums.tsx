export enum RequestPriority {
    low = 'Low',
    medium = 'Medium',
    high = 'High',
    urgent = 'Emergency'
}

export enum Department {
    SPECIALTY_CLINIC = 'Specialty_Clinic',
    IMAGING_SUITE = 'Imaging_Suite',
    PHLEBOTOMY = 'Phlebotomy',
    PHARMACY = 'Pharmacy',
    AMBULATORY_URGENCARE = 'Ambulatory_UrgentCare'
}

interface SubmittedPrescription {
    employeeID: string;
    patientID: string;
    priority: RequestPriority;
    department: Department;
    morningPillCount: number;
    middayPillCount: number;
    eveningPillCount: number;
    nightPillCount: number;
    days: number;
    additionalInstructions: string;
    drugName: string;
    timestamp: string;
}