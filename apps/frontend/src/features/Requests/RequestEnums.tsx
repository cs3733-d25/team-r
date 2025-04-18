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


export enum RequestStatus {
    pending = 'Pending',
    accepted = 'Accepted',
    in_progress = 'InProgress',
    completed = 'Completed',
    cancelled = 'Cancelled',
}

export enum Buildings {
    PATRIOT_PLACE_22 = "PATRIOT_PLACE_22",
    PATRIOT_PLACE_20 = "PATRIOT_PLACE_20",
    CHESTNUT_HILL = "CHESTNUT_HILL",
    FAULKNER = 'FAULKNER'
}
export enum RequestMedicalDevice{
    XRay = "XRay",
    Defibrillator = "Defibrillator",
    EKG_Machine = 'EKG_Machine',
    Syringe = 'Syringe',
    Pacemaker = 'pacemaker'
}

export enum RequestNonemergent {
    Room_Maintenance = 'Room maintenance',
    Food = 'Food',
    Speak_to_a_doctor = 'Speak_to_a_doctor',
    Visitation_hours = 'Visitation_hours',
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