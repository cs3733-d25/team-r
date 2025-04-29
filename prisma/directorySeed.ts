
import client from "../apps/backend/src/bin/prisma-client.ts";

async function main() {

    //Patriot Place 20 Floor 1
    await client.directory.createMany({
        data: [
            {name: "Blood Draw/Phlebotomy", floorNumber: 1, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Phlebotomy"},
            {name: "Pharmacy", floorNumber: 1, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Phlebotomy"},
            {name: "Radiology", floorNumber: 1, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Imaging Suite"},
            {name: "Cardiovascular Services", floorNumber: 1, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Specialty Clinic"},
            {name: "Urology", floorNumber: 1, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Specialty Clinic"},
            {name: "Urgent Care Center", floorNumber: 1, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Ambulatory/Urgent Care"},
        ]
    });
    //Patriot Place 20 Floor 2
    await client.directory.createMany({
        data: [
            {name: "Orthopaedics", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Hand and Upper Extremity", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Arthroplasty", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Pediatric Trauma", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Physiatry", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Podiatry", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Rehabilitation Services", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Cardiac Rehab", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Occupational Therapy", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Hand Therapy", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Upper Extremity", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Physical Therapy", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Speech - Language", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Clinical Lab", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Surgi-Care", floorNumber: 2, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
        ]
    });
    //Patriot Place 20 Floor 3
    await client.directory.createMany({
        data: [
            {name: "Surgical Specialties", floorNumber: 3, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Audiology", floorNumber: 3, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "ENT", floorNumber: 3, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "General and Gastrointestinal Surgery", floorNumber: 3, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Plastic Surgery", floorNumber: 3, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Thoracic Surgery", floorNumber: 3, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Vascular Surgery", floorNumber: 3, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Weight Management and Wellness", floorNumber: 3, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Sports Medicine Center", floorNumber: 3, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "X-Ray Suite", floorNumber: 3, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
        ]
    });
    //Patriot Place 20 Floor 4
    await client.directory.createMany({
        data: [
            {name: "Electromyography", floorNumber: 4, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Nutrition", floorNumber: 4, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Pain Medicine", floorNumber: 4, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Physiatry", floorNumber: 4, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Pulmonary Function Testing", floorNumber: 4, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
            {name: "Day Surgery Center", floorNumber: 4, building: "Healthcare Center (20 Patriot Pl.)", receptionNodeID: "Elevator 20"},
        ]
    });
    //Patriot Place 22 Floor 1
    await client.directory.createMany({
        data: [
            {
                "name": "MassGeneral Hospital for Children",
                "floorNumber": 1,
                "building": "Healthcare Center (22 Patriot Pl.)",
                "receptionNodeID": "Entrance-1745515055030"
            },
            {name: "Spaulding Outpatient Care for Children", floorNumber: 1, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID: "Entrance-1745515055030"},
        ]
    });
    //Patriot Place 22 Floor 3
    await client.directory.createMany({
        data: [
            {name: "Multi Specialty Clinic", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Allergy", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Cardiac Arrhythmia", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Dermatology", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Endocrinology", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Gastroenterology", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Kidney (Renal) Medicine", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Neurology", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Neurosurgery", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Ophthalmology", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Optometry", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Pulmonology", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Rheumatology", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Vein Care Services", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Women's Health", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
            {name: "Patient Financial Services", floorNumber: 3, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID:"all-patriot-22-3-departments"},
        ]
    });
    // Patriot Place 22 Floor 4
    await client.directory.createMany({
        data: [
            {name: "Community Room", floorNumber: 4, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID: "Primary Care"},
            {name: "Primary Care", floorNumber: 4, building: "Healthcare Center (22 Patriot Pl.)", receptionNodeID: "Community Room"},
        ]
    })

    // Chestnut Hill
    await client.directory.createMany({
        data: [
            {name: "Laboratory", floorNumber: 1, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: "Reception-1745475750292" },
            {name: "Multi-Specialty Clinic", floorNumber: 1, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: "Reception-1745475823905" },
            {name: "Radiology (MRI/CT Scan)", floorNumber: 1, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: "Reception-1745475823905" },

            {name: "Backup Child Care Center", floorNumber: 2, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: "Crohn's and Colitis Center", floorNumber: 2, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: "Endoscopy Center", floorNumber: 2, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: "Patient Financial Services", floorNumber: 2, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: "Rehabilitation Services", floorNumber: 2, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },


            {name: "Allergy and Clinical Immunology", floorNumber: 3, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: "Brigham Dermatology Associates (BDA)", floorNumber: 3, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: 'Brigham Psychiatric Specialties', floorNumber: 3, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: "Center for Pain Medicine", floorNumber: 3, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: "Pharmacy", floorNumber: 3, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },


            {name: "Brigham Physicians Group (BPG)", floorNumber: 4, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: 'Gretchen S. and Edward A. Fish Center for Women\'s Health', floorNumber: 4, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: 'Osher Clinical Center for Integrative Health', floorNumber: 4, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },

            {name: "Allergy and Clinical Immunology", floorNumber: 5, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: 'Brigham Obstetrics and Gynecology Group (BOGG)', floorNumber: 5, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: 'Brigham Physicians Group (BPG)', floorNumber: 5, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
            {name: "Radiology", floorNumber: 5, building: "Healthcare Center (Chestnut Hill)", receptionNodeID: 'Reception-1745475750292' },
        ]
    });
    // Faulkner floor 1
    await client.directory.createMany({
        data: [
            {name: "Admitting/Registration", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "Atrium Cafe", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "Audiology", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "Blood Drawing Lab", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "Cardiac Rehab", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "Dialysis", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Dialysis Reception"},
            {name: "Emergency Department", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "Emergency Entrance", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "GI Endoscopy", floorNumber: 1, building: "Faulkner Hospital",  receptionNodeID: 'Reception-1745468288835' },
            {name: "Information", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "MRI/CT", floorNumber: 1, building: "Faulkner Hospital",  receptionNodeID: 'Reception-1745468241433' },
            {name: "Patient Finances", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "Pre-Admittance Screening", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "Pulmonary Lab", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468299003"},
            {name: "Radiology", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468256681"},
            {name: "Special Testing", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "Starbucks", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "Taiclet Family Center", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: "Vascular Lab", floorNumber: 1, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},

            {name: 'Biomedical Engineering', floorNumber: 2, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Food Services', floorNumber: 2, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Morgue', floorNumber: 2, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Occupational Therapy', floorNumber: 2, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Otolaryngology', floorNumber: 2, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Pharmacy', floorNumber: 2, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Physical Therapy', floorNumber: 2, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Plastic Surgery', floorNumber: 2, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Psychiatric Inpatient Care', floorNumber: 2, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Psychiatric/Addiction Recovery', floorNumber: 2, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Rehabilitation Services', floorNumber: 2, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},

            {name: 'Cafeteria', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Chapel', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Family/Patient Resources', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Gift Shop', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Gynecology & Oncology', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Huvos Auditorium', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Information', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Obstetrics and Gynecology Associates', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Outdoor Dining Terrace', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Roslindale Pediatric Associates', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Shuttle Pickup', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Volunteer Services', floorNumber: 3, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},

            {name: 'Cardiology', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Foot and Ankle Center', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Gastroenterology Associates', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'HVMA Internal Medicine', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'HVMA Neurology', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Medical Library', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Medical Records', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'MOHS Clinic', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Neurology', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Primary care Physicians', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Pulmonary Services', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Rheumatology Center', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Sadowsky Conference Room', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Social Work', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Tynan Conference Room', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Urology', floorNumber: 4, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},

            {name: 'Boston ENT Associates', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Endocrinology/Diabetes/Hemotology', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Headache', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'ICU', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Internal Medicine', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Oncology Clinic', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Orthopaedic Associates', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Outpatient Infusion Center', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Primary Care Physicians', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'Surgical Specialties', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'X-Ray', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
            {name: 'X-Ray Waiting Room', floorNumber: 5, building: "Faulkner Hospital", receptionNodeID: "Reception-1745468225241"},
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
