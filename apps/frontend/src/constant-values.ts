/* this file replaces the need for enums
    to use:
    - import values from '.....constant-values.ts'
    - const statusOptions = values.status;
 */

//Faulkner floors + all departments
const F1 = ['Admitting/Registration', 'Atrium Cafe', 'Audiology', 'Blood Drawing Lab', 'Cardiac Rehab', 'Dialysis', 'Emergency Department', 'Emergency Entrance', 'GI Endoscopy', 'Information', 'MRI/CT', 'Patient Finances', 'Pre-Admittance Screening', 'Pulmonary Lab', 'Radiology', 'Special Testing', 'Starbucks', 'Taiclet Family Center', 'Vascular Lab'];
const F2 = ['Biomedical Engineering', 'Food Services', 'Morgue', 'Occupational Therapy', 'Otolaryngology', 'Pharmacy', 'Physical Therapy', 'Plastic Surgery', 'Psychiatric Inpatient Care', 'Psychiatric/Addiction Recovery', 'Rehabilitation Services'];
const F3 = ['Cafeteria', 'Chapel', 'Family/Patient Resources', 'Gift Shop', 'Gynecology & Oncology', 'Huvos Auditorium', 'Information', 'Obstetrics and Gynecology Associates', 'Outdoor Dining Terrace', 'Roslindale Pediatric Associates', 'Shuttle Pickup', 'Volunteer Services'];
const F4 = ['Cardiology', 'Foot and Ankle Center', 'Gastroenterology Associates', 'HVMA Internal Medicine', 'HVMA Neurology', 'Medical Library', 'Medical Records', 'MOHS Clinic', 'Neurology', 'Primary care Physicians', 'Pulmonary Services', 'Rheumatology Center', 'Sadowsky Conference Room', 'Social Work', 'Tynan Conference Room', 'Urology'];
const F5 = ['Boston ENT Associates', 'Endocrinology/Diabetes/Hemotology', 'Headache', 'ICU', 'Internal Medicine', 'Oncology Clinic', 'Orthopaedic Associates', 'Outpatient Infusion Center', 'Primary Care Physicians', 'Surgical Specialties', 'X-Ray', 'X-Ray Waiting Room'];
const FAll : string[] = [];
FAll.push(...F1);
FAll.push(...F2);
FAll.push(...F3);
FAll.push(...F4);
FAll.push(...F5);
FAll.sort();

//Brigham Women's floors + all departments
const WN2 = ['Cardiovascular Imaging Center', 'Cath Lab', 'Radiation Oncology', 'Radiology (MRI and CT Scan)'];
const WN1 = ['Cross-Sectional Interventional Radiology', 'Day Surgery Check-in / Pre-Op', 'Medical Records / Film Library', 'Nuclear Medicine & Molecular Imaging', 'Outpatient X-Ray', 'PACU', 'Radiology (MRI and CSIR)', 'Ultrasound'];
const W0 = ['Infusion', 'Phlebotomy, Outpatient'];
const W1 = ['Admitting', 'Bretholtz Family Center', 'Bridge Clinic, Dushku-Palandijian', 'Chapel, Multi-Faith', 'Emergency', 'Neurology', 'Neurosurgery', 'Obstetrics Admitting', 'Rehabilitation Services PT / OT', 'Wound Care Center'];
const W2 = ['Ambulatory Radiology (X-Ray and CT Scan)', 'Bornstein Amphitheater', 'Breast Imaging, Lee Bell Center', 'Brigham Circle Medical Associates', 'Brigham Medcial Specialties / Schuster Transplant.', 'Cafeteria', 'Carrie Hall Conference Room', 'Center for Chest Diseases', 'Center for Weight Management & Metabolic Surgery', 'Comprehensive Breast Health Center', 'Dental Group / Oral Medicine', 'Ear, Nose and Throat (ENT)', 'Echocardiography', 'Electrophysiology', 'Endocrine - Diabetes', 'Endoscopy', 'Gastroenterology & Hepatology', 'Genetics & Genomics Medicine', 'International Patient Center / Executive Health', 'Jen Center for Primary Care', 'Kidney / Pancreas Transplant', 'Kidney Medicine', 'Lung Center', 'Mammography', 'Nutrition', 'Orthopedics', 'Patient Financial Registration', 'Pharmacy', 'Phlebotomy, Outpatient', 'Plastic & Reconstructive Surgery', 'Podiatry', 'Radiation Procedural Check-in', 'Rheumatology', 'Shapiro Family Center', 'Thoracic Surgery Clinic', 'Watkins Cardiovascular Clinic', 'Weiner Center for Pre-Op Evaluation'];
const W3 = ['Center for Fetal Medicine & Reproductive Genetics', 'Center for Infertility & Reproductive Surgery', 'Connors Center for Women\'s Health', 'Dialysis', 'Gynecologic Oncology', 'High Risk Obstetric Ultrasound', 'Infertility & Reproductive Surgery', 'Maternal Fetal Medicine', 'Minimally Invasive Gynecologic Surgery', 'Reproductive Endocrinology Lab', 'Urology', 'Vascular Diagnostic Laboratory'];
const W4 = ['Infectious Disease'];
const W6 = ['Dana-Farber Cancer Inpatient Hospital'];
const WDups : string[] = [];
//pushes all floors to the all floors list, then sorts
for (const floor of [WN2, WN1, W0, W1, W2, W3, W4, W6]) {
    WDups.push(...floor);
}
const WAll = [...new Set(WDups)];
WAll.sort();

const values = {
    status: ['Accepted', 'Canceled', 'In Progress', 'Pending', 'Completed'],
    priority: ['Urgent', 'High', 'Medium', 'Low'],
    building: ['Healthcare Center (Chestnut Hill)', 'Healthcare Center (20 Patriot Pl.)', 'Healthcare Center (22 Patriot Pl.)', 'Faulkner Hospital', 'Main Campus Hospital (75 Francis St.)'],
    employeeRole: ['Doctor', 'Nurse', 'IT Support', 'Maintenance', 'Administrator'],
    blank: [''],  //for dropdowns requiring another dropdown to be completed first

    nodeType: ['Entrance', 'Reception', 'Parking', 'Hallway', 'Department', 'Elevator', 'Stairs', 'Other'],

    medicalDevice: ['X-Ray', 'Defibrillator', 'EKG Machine', 'Syringe', 'Pacemaker' ],
    nonemergentRequest: [ 'Room Maintenance', 'Food', 'Speak to a doctor', 'Visitation Hours' ],

    //departments by building
    //Partiot Place 20
    departmentsPP20: ['Blood Draw/Phlebotomy', 'Cardiovascular Services', 'Pharmacy', 'Radiology', 'Urgent Care Center', 'Urology', 'Arthroplasty', 'Cardiac Rehab', 'Clinical Lab', 'Hand and Upper Extremity', 'Hand Therapy', 'Occupational Therapy', 'Orthopaedics', 'Pediatric Trauma', 'Physical Therapy', 'Podiatry', 'Rehabilitation Services', 'Speech - Language', 'Surgi-Care', 'Upper Extremity', 'Audiology', 'ENT', 'General and Gastrointestinal Surgery', 'Plastic Surgery', 'Sports Medicine Center', 'Surgical Specialties', 'Thoriacic Surgery', 'Vascular Surgery', 'Weight Management and Wellness', 'X-Ray Suite', 'Day Surgery Center', 'Electromyography', 'Nutrition', 'Pain Medicine', 'Physiatry', 'Pulmonary Function Testing'].sort(),
    departmentsPP22: ['MassGeneral Hospital for Children', 'Spaulding Outpatient Care for Children', 'Allergy', 'Cardiac Arrhythmia', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Kidney (Renal) Medicine', 'Multi Specialty Clinic', 'Neurology', 'Neurosurgery', 'Opthalmology', 'Optometry', 'Patient Financial Services', 'Pulmonology', 'Rhematology', 'Vein Care Services', 'Women\'s Health', 'Blood Draw/Phlebotomy', 'Community Room', 'Primary Care'].sort(),
    departmentsCH: ['Laboratory', 'Multi-Specialty Clinic', 'Radiology (MRI/CT Scan)', 'Backup Child Care Center', 'Crohn\'s and Colitis Center', 'Endoscopy Center', 'Patient Financial Services', 'Rehabilitation Services', 'Allergy and Clinical Immunology', 'Brigham Dermatology Associates (BDA)', 'Brigham Psychiatric Specialties', 'Center for Pain Medicine', 'Pharmacy', 'Brigham Physician\'s Group (BPG)', 'Gretchen S. and Edward A. Fish Center for Women\'s Health', 'Osher Clinical Center for Integrative Health', 'Brigham Obstetrics and Gynecology Group (BOGG)', 'Radiology'].sort(),
    departmentsF1: F1,
    departmentsF2: F2,
    departmentsF3: F3,
    departmentsF4: F4,
    departmentsF5: F5,
    departmentsFAll: FAll, //see above
    departmentsWAll: WAll, //all Brigham Women's departments, sorted
};

export type valueKey = keyof typeof values; // "priority" | "status"
export default values;
