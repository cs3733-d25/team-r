import client from "../apps/backend/src/bin/prisma-client.ts";
//import {PrismaClient} from "../packages/database";


async function main() {
    await client.userType.createMany({
        data: [
            { name: 'Patient' },
            { name: 'Employee' },
        ],
    });

    await client.employeeRole.createMany({
        data: [
            { name: 'Doctor' },
            { name: 'Nurse' },
            { name: 'IT Support' },
            { name: 'Maintenance' },
            { name: 'Administrator' },
        ],
    });

    await client.department.createMany({
        data: [
            { name: 'Specialty_Clinic' },
            { name: 'Imaging_Suite' },
            { name: 'Phlebotomy' },
            { name: 'Pharmacy' },
            { name: 'Ambulatory/Urgent Care' },
        ],
    });

    await client.requestPriority.createMany({
        data: [
            { name: 'Low' },
            { name: 'Medium' },
            { name: 'High' },
            { name: 'Urgent' },
        ],
    });

    await client.requestStatus.createMany({
        data: [
            { name: 'Pending' },
            { name: 'Accepted' },
            { name: 'In Progress' },
            { name: 'Completed' },
            { name: 'Canceled' },
        ],
    });

    await client.building.createMany({
        data: [
            { name: 'Patriot Place 20' },
            { name: 'Patriot Place 22' },
            { name: 'Chestnut Hill' },
        ],
    });

    await client.medicalDevice.createMany({
        data: [
            { name: 'X-Ray' },
            { name: 'Defibrillator' },
            { name: 'EKG Machine' },
            { name: 'Syringe' },
            { name: 'Pacemaker' },
        ],
    });

    await client.requestNonemergent.createMany({
        data: [
            { name: 'Room Maintenance' },
            { name: 'Food' },
            { name: 'Speak to a doctor' },
            { name: 'Visitation Hours' },
        ],
    });

    await client.nodeType.createMany({
        data: [
            { name: 'Entrance' },
            { name: 'Reception' },
            { name: 'Parking' },
            { name: 'Hallway' },
            { name: 'Department' },
            { name: 'Elevator' },
            { name: 'Stairs' },
            { name: 'Other' },
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