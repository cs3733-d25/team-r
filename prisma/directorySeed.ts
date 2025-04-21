import client from "../apps/backend/src/bin/prisma-client.ts";

async function main() {
    await client.directory.createMany({
        data: [
            {name: "Blood Draw/Phlebotomy", floorNumber: 1, building: "Patriot Place 20"},
            {name: "Pharmacy", floorNumber: 1, building: "Patriot Place 20"},
            {name: "Radiology", floorNumber: 1, building: "Patriot Place 20"},
            {name: "Cardiovascular Services", floorNumber: 1, building: "Patriot Place 20"},
            {name: "Urology", floorNumber: 1, building: "Patriot Place 20"},
            {name: "Urgent Care Center", floorNumber: 1, building: "Patriot Place 20"},

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

            {name: "Surgical Specialties", floorNumber: 3, building: "Patriot Place 20"},
            {name: "Audiology", floorNumber: 3, building: "Patriot Place 20"},
            {name: "ENT", floorNumber: 3, building: "Patriot Place 20"},
            {name: "General and Gastrointestinal Surgery", floorNumber: 3, building: "Patriot Place 20"},
            {name: "Plastic Surgery", floorNumber: 3, building: "Patriot Place 20"},
            {name: "Thoracic Surgery", floorNumber: 3, building: "Patriot Place 20"},
            {name: "Vascular Surgery", floorNumber: 3, building: "Patriot Place 20"},
            {name: "Weight Management and Wellness", floorNumber: 3, building: "Patriot Place 20"},
            {name: "Sports Medicine Center", floorNumber: 3, building: "Patriot Place 20"},
            {name: "X-Ray Suite", floorNumber: 3, building: "Patriot Place 20"},

            {name: "Electromyography", floorNumber: 4, building: "Patriot Place 20"},
            {name: "Nutrition", floorNumber: 4, building: "Patriot Place 20"},
            {name: "Pain Medicine", floorNumber: 4, building: "Patriot Place 20"},
            {name: "Physiatry", floorNumber: 4, building: "Patriot Place 20"},
            {name: "Pulmonary Function Testing", floorNumber: 4, building: "Patriot Place 20"},
            {name: "Day Surgery Center", floorNumber: 4, building: "Patriot Place 20"},

            {name: "MassGeneral Hospital for Children", floorNumber: 1, building: "Patriot Place 22"},
            {name: "Spaulding Outpatient Care for Children", floorNumber: 1, building: "Patriot Place 22"},
            {name: "Multi Specialty Clinic", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Allergy", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Cardiac Arrhythmia", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Dermatology", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Endocrinology", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Gastroenterology", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Kidney (Renal) Medicine", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Neurology", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Neurosurgery", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Ophthalmology", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Optometry", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Pulmonology", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Rheumatology", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Vein Care Services", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Women's Health", floorNumber: 3, building: "Patriot Place 22"},
            {name: "Patient Financial Services", floorNumber: 3, building: "Patriot Place 22"},

            {name: "Blood Draw/Phlebotomy", floorNumber: 4, building: "Patriot Place 22"},
            {name: "Community Room", floorNumber: 4, building: "Patriot Place 22"},
            {name: "Primary Care", floorNumber: 4, building: "Patriot Place 22"},

            {name: "Allergy and Clinical Immunology", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Backup Child Care Center", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Dermatology", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Physicians Group", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Obstetrics and Gynecology", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Psychiatric Specialties", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Center for Pain Medicine", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Crohn's and Colitis Center", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Endoscopy Center", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Center for Women's Health", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Laboratory", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Multi-Specialty Clinic", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Center for Integrative Health", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Patient Financial Services", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Pharmacy", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Radiology", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Radiology (MRI/CT Scan)", floorNumber: 1, building: "Chestnut Hill"},
            {name: "Rehabilitation Services", floorNumber: 1, building: "Chestnut Hill"},

            {name: "Admitting/Registration", floorNumber: 1, building: "Faulkner"},
            {name: "Atrium Cafe", floorNumber: 1, building: "Faulkner"},
            {name: "Audiology", floorNumber: 1, building: "Faulkner"},
            {name: "Blood Drawing Lab", floorNumber: 1, building: "Faulkner"},
            {name: "Cardiac Rehab", floorNumber: 1, building: "Faulkner"},
            {name: "Emergency Department", floorNumber: 1, building: "Faulkner"},
            {name: "Emergency Entrance", floorNumber: 1, building: "Faulkner"},
            {name: "GI Endoscopy", floorNumber: 1, building: "Faulkner"},
            {name: "Information", floorNumber: 1, building: "Faulkner"},
            {name: "MRI/CT", floorNumber: 1, building: "Faulkner"},
            {name: "Patient Finances", floorNumber: 1, building: "Faulkner"},
            {name: "Pre-Admittance Screening", floorNumber: 1, building: "Faulkner"},
            {name: "Pulmonary Lab", floorNumber: 1, building: "Faulkner"},
            {name: "Radiology", floorNumber: 1, building: "Faulkner"},
            {name: "Special Testing", floorNumber: 1, building: "Faulkner"},
            {name: "Starbucks", floorNumber: 1, building: "Faulkner"},
            {name: "Taiclet Family Center", floorNumber: 1, building: "Faulkner"},
            {name: "Vascular Lab", floorNumber: 1, building: "Faulkner"}
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