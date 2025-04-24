
import client from "../apps/backend/src/bin/prisma-client.ts";

async function main() {

    //Patriot Place 20 Floor 1
    await client.directory.createMany({
        data: [
            {name: "Blood Draw/Phlebotomy", floorNumber: 1, building: "Patriot Place 20"},
            {name: "Pharmacy", floorNumber: 1, building: "Patriot Place 20", receptionNodeID: null},
            {name: "Radiology", floorNumber: 1, building: "Patriot Place 20", receptionNodeID: null},
            {name: "Cardiovascular Services", floorNumber: 1, building: "Patriot Place 20", receptionNodeID: null},
            {name: "Urology", floorNumber: 1, building: "Patriot Place 20", receptionNodeID: null},
            {name: "Urgent Care Center", floorNumber: 1, building: "Patriot Place 20", receptionNodeID: null},
        ]
    });
    //Patriot Place 20 Floor 2
    await client.directory.createMany({
        data: [
            {name: "Orthopaedics", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Hand and Upper Extremity", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Arthroplasty", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Pediatric Trauma", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Physiatry", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Podiatry", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Rehabilitation Services", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Cardiac Rehab", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Occupational Therapy", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Hand Therapy", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Upper Extremity", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Physical Therapy", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Speech - Language", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Clinical Lab", floorNumber: 2, building: "Patriot Place 20"},
            {name: "Surgi-Care", floorNumber: 2, building: "Patriot Place 20"},
        ]
    });
    //Patriot Place 20 Floor 3
    await client.directory.createMany({
        data: [
            {name: "Surgical Specialties", floorNumber: 3, building: "Patriot Place 20", receptionNodeID: '3000A'},
            {name: "Audiology", floorNumber: 3, building: "Patriot Place 20", receptionNodeID: '3000A'},
            {name: "ENT", floorNumber: 3, building: "Patriot Place 20", receptionNodeID: '3000A'},
            {name: "General and Gastrointestinal Surgery", floorNumber: 3, building: "Patriot Place 20", receptionNodeID: '3000A'},
            {name: "Plastic Surgery", floorNumber: 3, building: "Patriot Place 20", receptionNodeID: '3000A'},
            {name: "Thoracic Surgery", floorNumber: 3, building: "Patriot Place 20", receptionNodeID: '3000A'},
            {name: "Vascular Surgery", floorNumber: 3, building: "Patriot Place 20", receptionNodeID: '3000A'},
            {name: "Weight Management and Wellness", floorNumber: 3, building: "Patriot Place 20", receptionNodeID: '3000A'},
            {name: "Sports Medicine Center", floorNumber: 3, building: "Patriot Place 20", receptionNodeID: '3000A'},
            {name: "X-Ray Suite", floorNumber: 3, building: "Patriot Place 20", receptionNodeID: '3000A'},
        ]
    });
    //Patriot Place 20 Floor 4
    await client.directory.createMany({
        data: [
            {name: "Electromyography", floorNumber: 4, building: "Patriot Place 20"},
            {name: "Nutrition", floorNumber: 4, building: "Patriot Place 20"},
            {name: "Pain Medicine", floorNumber: 4, building: "Patriot Place 20"},
            {name: "Physiatry", floorNumber: 4, building: "Patriot Place 20"},
            {name: "Pulmonary Function Testing", floorNumber: 4, building: "Patriot Place 20"},
            {name: "Day Surgery Center", floorNumber: 4, building: "Patriot Place 20"},
        ]
    });
    //Patriot Place 22 Floor 1
    await client.directory.createMany({
        data: [
            {
                "name": "MassGeneral Hospital for Children",
                "floorNumber": 1,
                "building": "Patriot Place 22",
                "receptionNodeID": "Entrance-1745515055030"
            },
            {name: "Spaulding Outpatient Care for Children", floorNumber: 1, building: "Patriot Place 22"},
        ]
    });
    //Patriot Place 22 Floor 3
    await client.directory.createMany({
        data: [
            {name: "Multi Specialty Clinic", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Allergy", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Cardiac Arrhythmia", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Dermatology", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Endocrinology", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Gastroenterology", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Kidney (Renal) Medicine", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Neurology", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Neurosurgery", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Ophthalmology", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Optometry", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Pulmonology", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Rheumatology", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Vein Care Services", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Women's Health", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Patient Financial Services", floorNumber: 3, building: "Patriot Place 22", receptionNodeID:"all-patriot-22-3-departments"},
        ]
    });
    //Patriot Place 22 Floor 4
    await client.directory.createMany({
        data: [
            {name: "Laboratory", floorNumber: 1, building: "Chestnut Hill", receptionNodeID: "Reception-1745475750292" },
            {name: "Multi-Specialty Clinic", floorNumber: 1, building: "Chestnut Hill", receptionNodeID: "Reception-1745475823905" },
            {name: "Radiology (MRI/CT Scan)", floorNumber: 1, building: "Chestnut Hill", receptionNodeID: "Reception-1745475823905" },
/*
            {name: "Backup Child Care Center", floorNumber: 2, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: "Crohn's and Colitis Center", floorNumber: 2, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: "Endoscopy Center", floorNumber: 2, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: "Patient Financial Services", floorNumber: 2, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: "Rehabilitation Services", floorNumber: 2, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },


            {name: "Allergy and Clinical Immunology", floorNumber: 3, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: "Brigham Dermatology Associates (BDA)", floorNumber: 3, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: 'Brigham Psychiatric Specialties', floorNumber: 3, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: "Center for Pain Medicine", floorNumber: 3, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: "Pharmacy", floorNumber: 3, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },


            {name: "Brigham Physicians Group (BPG)", floorNumber: 4, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: 'Gretchen S. and Edward A. Fish Center for Women\'s Health', floorNumber: 4, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: 'Osher Clinical Center for Integrative Health', floorNumber: 4, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },

            {name: "Allergy and Clinical Immunology", floorNumber: 5, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: 'Brigham Obstetrics and Gynecology Group (BOGG)', floorNumber: 5, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: 'Brigham Physicians Group (BPG)', floorNumber: 5, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },
            {name: "Radiology", floorNumber: 5, building: "Chestnut Hill", receptionNodeID: 'specialtyCheckIn' },

 */
        ]
    });
    // Faulkner floor 1
    await client.directory.createMany({
        data: [
            {name: "Admitting/Registration", floorNumber: 1, building: "Faulkner"},
            {name: "Atrium Cafe", floorNumber: 1, building: "Faulkner"},
            {name: "Audiology", floorNumber: 1, building: "Faulkner"},
            {name: "Blood Drawing Lab", floorNumber: 1, building: "Faulkner"},
            {name: "Cardiac Rehab", floorNumber: 1, building: "Faulkner"},
            {name: "Emergency Department", floorNumber: 1, building: "Faulkner"},
            {name: "Emergency Entrance", floorNumber: 1, building: "Faulkner"},
            {name: "GI Endoscopy", floorNumber: 1, building: "Faulkner",  receptionNodeID: 'Reception-1745468288835' },
            {name: "Information", floorNumber: 1, building: "Faulkner"},
            {name: "MRI/CT", floorNumber: 1, building: "Faulkner",  receptionNodeID: 'Reception-1745468241433' },
            {name: "Patient Finances", floorNumber: 1, building: "Faulkner"},
            {name: "Pre-Admittance Screening", floorNumber: 1, building: "Faulkner", receptionNodeID: "Reception-1745468225241"},
            {name: "Pulmonary Lab", floorNumber: 1, building: "Faulkner", receptionNodeID: "Reception-1745468299003"},
            {name: "Radiology", floorNumber: 1, building: "Faulkner", receptionNodeID: "Reception-1745468256681"},
            {name: "Special Testing", floorNumber: 1, building: "Faulkner"},
            {name: "Starbucks", floorNumber: 1, building: "Faulkner"},
            {name: "Taiclet Family Center", floorNumber: 1, building: "Faulkner"},
            {name: "Vascular Lab", floorNumber: 1, building: "Faulkner"},

            // {name: 'Biomedical Engineering', floorNumber: 2, building: "Faulkner"},
            // {name: 'Food Services', floorNumber: 2, building: "Faulkner"},
            // {name: 'Morgue', floorNumber: 2, building: "Faulkner"},
            // {name: 'Occupational Therapy', floorNumber: 2, building: "Faulkner"},
            // {name: 'Otolaryngology', floorNumber: 2, building: "Faulkner"},
            // {name: 'Pharmacy', floorNumber: 2, building: "Faulkner"},
            // {name: 'Physical Therapy', floorNumber: 2, building: "Faulkner"},
            // {name: 'Plastic Surgery', floorNumber: 2, building: "Faulkner"},
            // {name: 'Psychiatric Inpatient Care', floorNumber: 2, building: "Faulkner"},
            // {name: 'Psychiatric/Addiction Recovery', floorNumber: 2, building: "Faulkner"},
            // {name: 'Rehabilitation Services', floorNumber: 2, building: "Faulkner"},
            //
            // {name: 'Cafeteria', floorNumber: 3, building: "Faulkner"},
            // {name: 'Chapel', floorNumber: 3, building: "Faulkner"},
            // {name: 'Family/Patient Resources', floorNumber: 3, building: "Faulkner"},
            // {name: 'Gift Shop', floorNumber: 3, building: "Faulkner"},
            // {name: 'Gynecology & Oncology', floorNumber: 3, building: "Faulkner"},
            // {name: 'Huvos Auditorium', floorNumber: 3, building: "Faulkner"},
            // {name: 'Information', floorNumber: 3, building: "Faulkner"},
            // {name: 'Obstetrics and Gynecology Associates', floorNumber: 3, building: "Faulkner"},
            // {name: 'Outdoor Dining Terrace', floorNumber: 3, building: "Faulkner"},
            // {name: 'Roslindale Pediatric Associates', floorNumber: 3, building: "Faulkner"},
            // {name: 'Shuttle Pickup', floorNumber: 3, building: "Faulkner"},
            // {name: 'Volunteer Services', floorNumber: 3, building: "Faulkner"},
            //
            // {name: 'Cardiology', floorNumber: 4, building: "Faulkner"},
            // {name: 'Foot and Ankle Center', floorNumber: 4, building: "Faulkner"},
            // {name: 'Gastroenterology Associates', floorNumber: 4, building: "Faulkner"},
            // {name: 'HVMA Internal Medicine', floorNumber: 4, building: "Faulkner"},
            // {name: 'HVMA Neurology', floorNumber: 4, building: "Faulkner"},
            // {name: 'Medical Library', floorNumber: 4, building: "Faulkner"},
            // {name: 'Medical Records', floorNumber: 4, building: "Faulkner"},
            // {name: 'MOHS Clinic', floorNumber: 4, building: "Faulkner"},
            // {name: 'Neurology', floorNumber: 4, building: "Faulkner"},
            // {name: 'Primary care Physicians', floorNumber: 4, building: "Faulkner"},
            // {name: 'Pulmonary Services', floorNumber: 4, building: "Faulkner"},
            // {name: 'Rheumatology Center', floorNumber: 4, building: "Faulkner"},
            // {name: 'Sadowsky Conference Room', floorNumber: 4, building: "Faulkner"},
            // {name: 'Social Work', floorNumber: 4, building: "Faulkner"},
            // {name: 'Tynan Conference Room', floorNumber: 4, building: "Faulkner"},
            // {name: 'Urology', floorNumber: 4, building: "Faulkner"},
            //
            // {name: 'Boston ENT Associates', floorNumber: 5, building: "Faulkner"},
            // {name: 'Endocrinology/Diabetes/Hemotology', floorNumber: 5, building: "Faulkner"},
            // {name: 'Headache', floorNumber: 5, building: "Faulkner"},
            // {name: 'ICU', floorNumber: 5, building: "Faulkner"},
            // {name: 'Internal Medicine', floorNumber: 5, building: "Faulkner"},
            // {name: 'Oncology Clinic', floorNumber: 5, building: "Faulkner"},
            // {name: 'Orthopaedic Associates', floorNumber: 5, building: "Faulkner"},
            // {name: 'Outpatient Infusion Center', floorNumber: 5, building: "Faulkner"},
            // {name: 'Primary Care Physicians', floorNumber: 5, building: "Faulkner"},
            // {name: 'Surgical Specialties', floorNumber: 5, building: "Faulkner"},
            // {name: 'X-Ray', floorNumber: 5, building: "Faulkner"},
            // {name: 'X-Ray Waiting Room', floorNumber: 5, building: "Faulkner"},
        ]
    });
    console.log('Directory seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        return Promise.reject(e);
    })
    .finally(async () => {
        await client.$disconnect();
    });
