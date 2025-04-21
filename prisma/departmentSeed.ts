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
            {id: 'Radiology CH', recepetionNodeID: 'specialtyCheckIn', name: 'Radiology'},
            {id: 'Radiology (MRI/CT Scan)', recepetionNodeID: 'specialtyCheckIn', name: 'Radiology (MRI/CT Scan)'},
            {id: 'Rehabilitation Services', recepetionNodeID: 'specialtyCheckIn', name: 'Rehabilitation Services'}
        ],
        skipDuplicates: true
    });

    //Patriots Place 22 Floor 4
    await client.department.createMany({
        data: [
            {id: 'Blood Draw/Phlebotomy PP22-4', recepetionNodeID: 'checkIn4000B', name: 'Blood Draw/Phlebotomy'},
            {id: 'Community Room', recepetionNodeID: 'checkIn4000B', name: 'Community Room'},
            {id: 'Primary Care', recepetionNodeID: 'checkIn4000B', name: 'Primary Care'}
        ],
        skipDuplicates: true
    });

    //Patriot Place 22 Floor 3
    await client.department.createMany({
        data: [
            {id: 'Multi Specialty Clinic', recepetionNodeID: '3000A', name: 'Multi Specialty Clinic'},
            {id: 'Allergy', recepetionNodeID: '3000A', name: 'Allergy'},
            {id: 'Cardiac Arrhythmia', recepetionNodeID: '3000A', name: 'Cardiac Arrhythmia'},
            {id: 'Dermatology', recepetionNodeID: '3000A', name: 'Dermatology'},
            {id: 'Endocrinology', recepetionNodeID: '3000A', name: 'Endocrinology'},
            {id: 'Gastroenterology', recepetionNodeID: '3000A', name: 'Gastroenterology'},
            {id: 'Kidney (Renal) Medicine', recepetionNodeID: '3000A', name: 'Kidney (Renal) Medicine'},
            {id: 'Neurology', recepetionNodeID: '3000A', name: 'Neurology'},
            {id: 'Neurosurgery', recepetionNodeID: '3000A', name: 'Neurosurgery'},
            {id: 'Opthalmology', recepetionNodeID: '3000A', name: 'Opthalmology'},
            {id: 'Optometry', recepetionNodeID: '3000A', name: 'Optometry'},
            {id: 'Pulmonology', recepetionNodeID: '3000A', name: 'Pulmonology'},
            {id: 'Rhematology', recepetionNodeID: '3000A', name: 'Rhematology'},
            {id: 'Vein Care Services', recepetionNodeID: '3000A', name: 'Vein Care Services'},
            {id: "Women's Health", recepetionNodeID: '3000A', name: 'Allergy'},
            {id: 'Patient Financial Services Fl3', recepetionNodeID: '3000A', name: 'Patient Financial Services'}
        ],
        skipDuplicates: true
    });

    //Patriots Place 20 Floor 1
    await client.department.createMany({
        data: [
            {id: 'Blood Draw/Phlebotomy PP20-1', recepetionNodeID: '130.01', name: 'Blood Draw/Phlebotomy'},
            {id: 'Pharmacy', recepetionNodeID: '130.01', name: 'Pharmacy'},
            {id: 'Radiology PP20-1', recepetionNodeID: '110.01', name: 'Radiology'},
            {id: 'Cardiovascular Services', recepetionNodeID: '120.01', name: 'Cardiovascular Services'},
            {id: 'Urology', recepetionNodeID: '100.00F', name: 'Urology'},
            {id: 'Urgent Care Center', recepetionNodeID: '130.01', name: 'Urgent Care Center'}
        ],
        skipDuplicates: true
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