/*
import client from "../apps/backend/src/bin/prisma-client.ts";

async function main() {



    await client.department.createMany({
        data: [
            { name: 'Specialty_Clinic' },
            { name: 'Imaging_Suite' },
            { name: 'Phlebotomy' },
            { name: 'Pharmacy' },
            { name: 'Ambulatory/Urgent Care' },
        ],
    });



    await client.medicalDeviceStatus.createMany({
        data: [
            { name: 'In Use' },
            { name: 'Under Repair' },
            { name: 'Available' },
        ],
    });
 console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        return Promise.reject(e);
    })
    .finally(async () => {
        await client.$disconnect();
    });

 */