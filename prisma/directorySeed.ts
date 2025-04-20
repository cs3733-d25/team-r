import client from "../apps/backend/src/bin/prisma-client.ts";

async function main() {
    await client.directory.createMany({
        data: [
            {name: "Blood Draw/Phlebotomy", floorNumber: 1, building: "PATRIOT_PLACE_20"},
            {name: "Pharmacy", floorNumber: 1, building: "PATRIOT_PLACE_20"},
            {name: "Radiology", floorNumber: 1, building: "PATRIOT_PLACE_20"},
            {name: "Cardiovascular Services", floorNumber: 1, building: "PATRIOT_PLACE_20"},
            {name: "Urology", floorNumber: 1, building: "PATRIOT_PLACE_20"},
            {name: "Urgent Care Center", floorNumber: 1, building: "PATRIOT_PLACE_20"},

            {name: "Orthopaedics", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Hand and Upper Extremity", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Arthroplasty", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Pediatric Trauma", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Physiatry", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Podiatry", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Rehabilitation Services", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Cardiac Rehab", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Occupational Therapy", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Hand Therapy", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Upper Extremity", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Physical Therapy", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Speech - Language", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Clinical Lab", floorNumber: 2, building: "PATRIOT_PLACE_20"},
            {name: "Surgi-Care", floorNumber: 2, building: "PATRIOT_PLACE_20"},

            {name: "Surgical Specialties", floorNumber: 3, building: "PATRIOT_PLACE_20"},
            {name: "Audiology", floorNumber: 3, building: "PATRIOT_PLACE_20"},
            {name: "ENT", floorNumber: 3, building: "PATRIOT_PLACE_20"},
            {name: "General and Gastrointestinal Surgery", floorNumber: 3, building: "PATRIOT_PLACE_20"},
            {name: "Plastic Surgery", floorNumber: 3, building: "PATRIOT_PLACE_20"},
            {name: "Thoriacic Surgery", floorNumber: 3, building: "PATRIOT_PLACE_20"},
            {name: "Vascular Surgery", floorNumber: 3, building: "PATRIOT_PLACE_20"},
            {name: "Weight Management and Wellness", floorNumber: 3, building: "PATRIOT_PLACE_20"},
            {name: "Sports Medicine Center", floorNumber: 3, building: "PATRIOT_PLACE_20"},
            {name: "X-Rat Suite", floorNumber: 3, building: "PATRIOT_PLACE_20"},

            {name: "Electromyography", floorNumber: 4, building: "PATRIOT_PLACE_20"},
            {name: "Nutrition", floorNumber: 4, building: "PATRIOT_PLACE_20"},
            {name: "Pain Medicine", floorNumber: 4, building: "PATRIOT_PLACE_20"},
            {name: "Physiatry", floorNumber: 4, building: "PATRIOT_PLACE_20"},
            {name: "Pulmonary Function Testing", floorNumber: 4, building: "PATRIOT_PLACE_20"},
            {name: "Day Surgery Center", floorNumber: 4, building: "PATRIOT_PLACE_20"},

            {name: "MassGeneral Hospital for Children", floorNumber: 1, building: "PATRIOT_PLACE_22"},
            {name: "Spaulding Outpatient Care for Children", floorNumber: 1, building: "PATRIOT_PLACE_22"},
            {name: "Multi Specialty Clinic", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Allergy", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Cardiac Arrhythmia", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Dermatology", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Endocrinology", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Gastroenterology", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Kidney (Renal) Medicine", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Neurology", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Neurosurgery", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Opthalmology", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Optometry", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Pulmonology", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Rhematology", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Vein Care Services", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Women's Health", floorNumber: 3, building: "PATRIOT_PLACE_22"},
            {name: "Patient Financial Services", floorNumber: 3, building: "PATRIOT_PLACE_22"},

            {name: "Blood Draw/Phlebotomy", floorNumber: 4, building: "PATRIOT_PLACE_22"},
            {name: "Community Room", floorNumber: 4, building: "PATRIOT_PLACE_22"},
            {name: "Primary Care", floorNumber: 4, building: "PATRIOT_PLACE_22"},

            {name: "Allergy and Clinical Immunology", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Backup Child Care Center", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Dermatology", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Physicians Group", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Obstetrics and Gynecology", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Psychiatric Specialties", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Center for Pain Medicine", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Crohn's and Colitis Center", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Endoscopy Center", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Center for Women's Health", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Laboratory", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Multi-Specialty Clinic", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Center for Integrative Health", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Patient Financial Services", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Pharmacy", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Radiology", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Radiology (MRI/CT Scan)", floorNumber: 1, building: "CHESTNUT_HILL"},
            {name: "Rehabilitation Services", floorNumber: 1, building: "CHESTNUT_HILL"}
        ]
    });
    console.log('Departments seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        return Promise.reject(e);
    })
    .finally(async () => {
        await client.$disconnect();
    });