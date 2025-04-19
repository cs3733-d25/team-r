/* this file replaces the need for enums
    to use:
    - import values form '.....constant-values.ts'
    - const statusOptions = values.status;
 */

const values = {
    status: ['Accepted', 'Canceled', 'In Progress', 'Pending', 'Completed'],
    priority: ['Urgent', 'High', 'Medium', 'Low'],
    building: ['Chestnut Hill', 'Patriot Place 20', 'Patriot Place 22'],
    employeeRole: ['Doctor', 'Nurse', 'IT Support', 'Maintenance', 'Administrator'],

    nodeType: ['Entrance', 'Reception', 'Parking', 'Hallway', 'Department', 'Elevator', 'Stairs', 'Other'],

    medicalDevice: ['X-Ray', 'Defibrillator', 'EKG Machine', 'Syringe', 'Pacemaker' ],
    nonemergentRequest: [ 'Room Maintenance', 'Food', 'Speak to a doctor', 'Visitation Hours' ],

    //departments by building
    //Partiot Place 20
    departmentsPP20: ['Blood Draw/Phlebotomy', 'Pharmacy', 'Radiology', 'Cardiovascular Services', 'Urology', 'Urgent Care Center', 'Orthopaedics', 'Hand and Upper Extremity', 'Arthroplasty', 'Pediatric Trauma', 'Physiatry', 'Podiatry', 'Rehabilitation Services', 'Cardiac Rehab', 'Occupational Therapy', 'Hand Therapy', 'Upper Extremity', 'Physical Therapy', 'Speech - Language', 'Clinical Lab', 'Surgi-Care', 'Surgical Specialties', 'Audiology', 'ENT', 'General and Gastrointestinal Surgery', 'Plastic Surgery', 'Thoriacic Surgery', 'Vascular Surgery', 'Weight Management and Wellness', 'Sports Medicine Center', 'X-Rat Suite', 'Electromyography', 'Nutrition', 'Pain Medicine', 'Physiatry', 'Pulmonary Function Testing', 'Day Surgery Center'],
    departmentsPP22: ['MassGeneral Hospital for Children', 'Spaulding Outpatient Care for Children', 'Multi Specialty Clinic', 'Allergy', 'Cardiac Arrhythmia', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Kidney (Renal) Medicine', 'Neurology', 'Neurosurgery', 'Opthalmology', 'Optometry', 'Pulmonology', 'Rhematology', 'Vein Care Services', 'Women\'s Health', 'Patient Financial Services', 'Blood Draw/Phlebotomy', 'Community Room', 'Primary Care'],
    departmentsCH: ['Allergy and Clinical Immunology', 'Backup Child Care Center', 'Dermatology', 'Physicians Group', 'Obstetrics and Gynecology', 'Psychiatric Specialties', 'Center for Pain Medicine', 'Crohn\'s and Colitis Center', 'Endoscopy Center', 'Center for Women\'s Health', 'Laboratory', 'Multi-Specialty Clinic', 'Center for Integrative Health', 'Patient Financial Services', 'Pharmacy', 'Radiology', 'Radiology (MRI/CT Scan)', 'Rehabilitation Services']

};



export default values;
