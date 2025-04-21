import client from "../apps/backend/src/bin/prisma-client.ts";

async function main() {
    //chestnut hill
    await client.department.createMany({
        data: [
            {id: 'Allergy and Clinical Immunology', recepetionNodeID: 'specialtyCheckIn', name: 'Allergy and Clinical Immunology'},
            {id: 'Backup Child Care Center', recepetionNodeID: 'specialtyCheckIn', name: 'Backup Child Care Center'},
            {id: 'Dermatology', recepetionNodeID: 'specialtyCheckIn', name: 'Dermatology'},
            {id: 'Physicians Group', recepetionNodeID: 'specialtyCheckIn', name: 'Physicians Group'},
            {id: 'Obstetrics and Gynecology', recepetionNodeID: 'specialtyCheckIn', name: 'Obstetrics and Gynecology'},
            {id: 'Psychiatric Specialties', recepetionNodeID: 'specialtyCheckIn', name: 'Psychiatric Specialties'},
            {id: 'Center for Pain Medicine', recepetionNodeID: 'specialtyCheckIn', name: 'Center for Pain Medicine'},
            {id: "Crohn's and Colitis Center", recepetionNodeID: 'specialtyCheckIn', name: "Crohn's and Colitis Center"},
            {id: 'Endoscopy Center', recepetionNodeID: 'specialtyCheckIn', name: 'Endoscopy Center'},
            {id: "Center for Women's Health", recepetionNodeID: 'specialtyCheckIn', name: "Center for Women's Health"},
            {id: 'Laboratory', recepetionNodeID: 'specialtyCheckIn', name: 'Laboratory'},
            {id: 'Multi-Specialty Clinic', recepetionNodeID: 'specialtyCheckIn', name: 'Multi-Specialty Clinic'},
            {id: 'Center for Integrative Health', recepetionNodeID: 'specialtyCheckIn', name: 'Center for Integrative Health'},
            {id: 'Patient Financial Services', recepetionNodeID: 'specialtyCheckIn', name: 'Patient Financial Services'},
            {id: 'Radiology', recepetionNodeID: 'specialtyCheckIn', name: 'Radiology'},
            {id: 'Radiology (MRI/CT Scan)', recepetionNodeID: 'specialtyCheckIn', name: 'Radiology (MRI/CT Scan)'},
            {id: 'Rehabilitation Services', recepetionNodeID: 'specialtyCheckIn', name: 'Rehabilitation Services'}
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