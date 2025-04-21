import client from "../apps/backend/src/bin/prisma-client.ts";

async function main() {
    //chestnut hill
    await client.department.createMany({
        data: [
            {id: 'Allergy and Clinical Immunology CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Allergy and Clinical Immunology'},
            {id: 'Backup Child Care Center CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Backup Child Care Center'},
            {id: 'Dermatology CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Dermatology'},
            {id: 'Physicians Group CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Physicians Group'},
            {id: 'Obstetrics and Gynecology CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Obstetrics and Gynecology'},
            {id: 'Psychiatric Specialties CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Psychiatric Specialties'},
            {id: 'Center for Pain Medicine CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Center for Pain Medicine'},
            {id: "Crohn's and Colitis Center CH-1", recepetionNodeID: 'specialtyCheckIn', name: "Crohn's and Colitis Center"},
            {id: 'Endoscopy Center CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Endoscopy Center'},
            {id: "Center for Women's Health CH-1", recepetionNodeID: 'specialtyCheckIn', name: "Center for Women's Health"},
            {id: 'Laboratory CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Laboratory'},
            {id: 'Multi-Specialty Clinic CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Multi-Specialty Clinic'},
            {id: 'Center for Integrative Health CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Center for Integrative Health'},
            {id: 'Patient Financial Services CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Patient Financial Services'},
            {id: 'Radiology CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Radiology'},
            {id: 'Radiology (MRI/CT Scan) CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Radiology (MRI/CT Scan)'},
            {id: 'Rehabilitation Services CH-1', recepetionNodeID: 'specialtyCheckIn', name: 'Rehabilitation Services'}
        ],
        skipDuplicates: true
    });

    //Patriots Place 22 Floor 4
    await client.department.createMany({
        data: [
            {id: 'Blood Draw/Phlebotomy PP22-4', recepetionNodeID: 'checkIn4000B', name: 'Blood Draw/Phlebotomy'},
            {id: 'Community Room PP22-4', recepetionNodeID: 'checkIn4000B', name: 'Community Room'},
            {id: 'Primary Care PP22-4', recepetionNodeID: 'checkIn4000B', name: 'Primary Care'}
        ],
        skipDuplicates: true
    });

    //Patriot Place 22 Floor 3
    await client.department.createMany({
        data: [
            {id: 'Multi Specialty Clinic PP22-3', recepetionNodeID: '3000A', name: 'Multi Specialty Clinic'},
            {id: 'Allergy PP22-3', recepetionNodeID: '3000A', name: 'Allergy'},
            {id: 'Cardiac Arrhythmia PP22-3', recepetionNodeID: '3000A', name: 'Cardiac Arrhythmia'},
            {id: 'Dermatology PP22-3', recepetionNodeID: '3000A', name: 'Dermatology'},
            {id: 'Endocrinology PP22-3', recepetionNodeID: '3000A', name: 'Endocrinology'},
            {id: 'Gastroenterology PP22-3', recepetionNodeID: '3000A', name: 'Gastroenterology'},
            {id: 'Kidney (Renal) Medicine PP22-3', recepetionNodeID: '3000A', name: 'Kidney (Renal) Medicine'},
            {id: 'Neurology PP22-3', recepetionNodeID: '3000A', name: 'Neurology'},
            {id: 'Neurosurgery PP22-3', recepetionNodeID: '3000A', name: 'Neurosurgery'},
            {id: 'Opthalmology PP22-3', recepetionNodeID: '3000A', name: 'Opthalmology'},
            {id: 'Optometry PP22-3', recepetionNodeID: '3000A', name: 'Optometry'},
            {id: 'Pulmonology PP22-3', recepetionNodeID: '3000A', name: 'Pulmonology'},
            {id: 'Rhematology PP22-3', recepetionNodeID: '3000A', name: 'Rhematology'},
            {id: 'Vein Care Services PP22-3', recepetionNodeID: '3000A', name: 'Vein Care Services'},
            {id: "Women's Health PP22-3", recepetionNodeID: '3000A', name: 'Allergy'},
            {id: 'Patient Financial Services PP22-3', recepetionNodeID: '3000A', name: 'Patient Financial Services'}
        ],
        skipDuplicates: true
    });

    //Patriots Place 20 Floor 1
    await client.department.createMany({
        data: [
            {id: 'Blood Draw/Phlebotomy PP20-1', recepetionNodeID: '130.01', name: 'Blood Draw/Phlebotomy'},
            {id: 'Pharmacy PP20-1', recepetionNodeID: '130.01', name: 'Pharmacy'},
            {id: 'Radiology PP20-1', recepetionNodeID: '110.01', name: 'Radiology'},
            {id: 'Cardiovascular Services PP20-1', recepetionNodeID: '120.01', name: 'Cardiovascular Services'},
            {id: 'Urology PP20-1', recepetionNodeID: '100.00F', name: 'Urology'},
            {id: 'Urgent Care Center PP20-1', recepetionNodeID: '130.01', name: 'Urgent Care Center'}
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