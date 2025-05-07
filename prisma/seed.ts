import client from '../apps/backend/src/bin/prisma-client.ts';

async function createAnnouncementWithNotifications(announcementData: {
    id: string;
    title: string;
    content: string;
    date: Date;
    author: string;
    type: string;
    expirationDate: Date | null;
}) {
    const newAnnouncement = await client.announcement.create({
        data: announcementData,
    });

    const employees = await client.employee.findMany();

    await client.notification.createMany({
        data: employees.map((employee) => ({
            userId: employee.id,
            title: `New ${announcementData.type} Announcement: ${announcementData.title}`,
            content:
                announcementData.content.substring(0, 100) +
                (announcementData.content.length > 100 ? '...' : ''),
            type: 'ANNOUNCEMENT',
            sourceId: newAnnouncement.id,
            expiresAt: announcementData.expirationDate || null,
        })),
    });

    return newAnnouncement;
}

async function main() {
    // Create user type
    await client.userType.createMany({
        data: [
            { id: 'Employee', name: 'Employee' },
            { id: 'Patient', name: 'Patient' },
            { id: 'Admin', name: 'Admin' },
        ],
        skipDuplicates: true,
    });
    // 3. Create user
    await client.user.create({
        data: {
            id: 'admin1',
            email: 'admind25r@gmail.com',
            firstName: 'admin1',
            lastName: 'admin1last',
            userType: 'Admin',
        },
    });

    // 4. Create employee (after department is available)
    await client.employee.create({
        data: {
            id: 'admin1',
            firstName: 'admin1',
            lastName: 'admin1last',
            departmentId: 'Urology PP20-1',
            role: 'Admin',
            onShift: true,
        },
    });

    // 3. Create user
    await client.user.create({
        data: {
            id: 'admin',
            email: 'softengd25r@gmail.com',
            firstName: 'admin',
            lastName: 'adminlast',
            userType: 'Admin',
        },
    });

    // 4. Create employee (after department is available)
    await client.employee.create({
        data: {
            id: 'admin',
            firstName: 'admin',
            lastName: 'adminlast',
            departmentId: 'Urology PP20-1',
            role: 'Admin',
            onShift: true,
        },
    });

    //admin
    await client.user.create({
        data: {
            id: 'Staff',
            email: 'staffd25r@gmail.com',
            firstName: 'Staff',
            lastName: 'Staff',
            userType: 'Admin',
        },
    });
    await client.employee.create({
        data: {
            id: 'Staff',
            firstName: 'Staff',
            lastName: 'Staff',
            departmentId: 'Blood Draw/Phlebotomy PP20-1',
            role: 'Administrator',
            onShift: true,
        },
    });

    //employees
    await client.user.create({
        data: {
            id: 'Nora',
            email: 'noracleary@gmail.com',
            userType: 'Employee',
            firstName: 'Nora',
            lastName: 'Cleary',
        },
    });
    await client.employee.create({
        data: {
            id: 'Nora',
            firstName: 'Nora',
            lastName: 'Cleary',
            departmentId: 'Pharmacy PP20-1',
            role: 'Maintenance',
            onShift: true,
        },
    });

    //nora admin
    await client.user.create({
        data: {
            id: 'NoraAdmin',
            email: 'nora@redroc.com',
            userType: 'Admin',
            firstName: 'Nora',
            lastName: 'Cleary',
        },
    });
    await client.employee.create({
        data: {
            id: 'NoraAdmin',
            firstName: 'Nora',
            lastName: 'Cleary',
            departmentId: 'Pharmacy PP20-1',
            role: 'Admin',
            onShift: true,
        },
    });

    await client.user.create({
        data: {
            id: 'Akaash',
            email: 'ajwalker@wpi.edu',
            firstName: 'Akaash',
            lastName: 'Walker',
            userType: 'Employee',
        },
    });
    await client.employee.create({
        data: {
            id: 'Akaash',
            firstName: 'Akaash',
            lastName: 'Walker',
            departmentId: 'Radiology CH-1',
            role: 'Doctor',
            onShift: true,
        },
    });
    //akaash admin
    await client.user.create({
        data: {
            id: 'AkaashAdmin',
            email: 'akaash@redroc.com',
            firstName: 'Akaash',
            lastName: 'Walker',
            userType: 'Admin',
        },
    });
    await client.employee.create({
        data: {
            id: 'AkaashAdmin',
            firstName: 'Akaash',
            lastName: 'Walker',
            departmentId: 'Radiology CH-1',
            role: 'Admin',
            onShift: true,
        },
    });

    await client.user.create({
        data: {
            id: 'Sarayu',
            email: 'svijayanagaram@wpi.edu',
            firstName: 'Sarayu',
            lastName: 'Vijayanagaram',
            userType: 'Employee',
        },
    });

    await client.employee.create({
        data: {
            id: 'Sarayu',
            firstName: 'Sarayu',
            lastName: 'Vijayanagaram',
            departmentId: 'Vein Care Services PP22-3',
            role: 'Doctor',
            onShift: true,
        },
    });

    //sarayu admin
    await client.user.create({
        data: {
            id: 'SarayuAdmin',
            email: 'sarayu@redroc.com',
            firstName: 'Sarayu',
            lastName: 'Vijayanagaram',
            userType: 'Admin',
        },
    });

    await client.employee.create({
        data: {
            id: 'SarayuAdmin',
            firstName: 'Sarayu',
            lastName: 'Vijayanagaram',
            departmentId: 'Vein Care Services PP22-3',
            role: 'Admin',
            onShift: true,
        },
    });

    await client.user.create({
        data: {
            id: 'Owen',
            email: 'ormiller@wpi.edu',
            firstName: 'Owen',
            lastName: 'Miller',
            userType: 'Employee',
        },
    });
    await client.employee.create({
        data: {
            id: 'Owen',
            firstName: 'Owen',
            lastName: 'Miller',
            departmentId: 'Vein Care Services PP22-3',
            role: 'Doctor',
            onShift: true,
        },
    });

    //owen admin
    await client.user.create({
        data: {
            id: 'OwenAdmin',
            email: 'owen@redroc.com',
            firstName: 'Owen',
            lastName: 'Miller',
            userType: 'Admin',
        },
    });
    await client.employee.create({
        data: {
            id: 'OwenAdmin',
            firstName: 'Owen',
            lastName: 'Miller',
            departmentId: 'Vein Care Services PP22-3',
            role: 'Admin',
            onShift: true,
        },
    });

    //Eployee not on shift - Brian, Riley, Daksh
    await client.user.create({
        data: {
            id: 'Brian',
            email: 'brian@wpi.edu',
            firstName: 'Brian',
            lastName: 'Grande',
            userType: 'Employee',
        },
    });
    await client.employee.create({
        data: {
            id: 'Brian',
            firstName: 'Brian',
            lastName: 'Grande',
            departmentId: 'Primary Care PP22-4',
            role: 'Doctor',
            onShift: false,
        },
    });

    //brian - admin
    await client.user.create({
        data: {
            id: 'BrianAdmin',
            email: 'brian@redroc.com',
            firstName: 'Brian',
            lastName: 'Grande',
            userType: 'Admin',
        },
    });
    await client.employee.create({
        data: {
            id: 'BrianAdmin',
            firstName: 'Brian',
            lastName: 'Grande',
            departmentId: 'Primary Care PP22-4',
            role: 'Admin',
            onShift: false,
        },
    });

    await client.user.create({
        data: {
            id: 'Riley',
            email: 'rmeyers@wpi.edu',
            firstName: 'Riley',
            lastName: 'Meyers',
            userType: 'Employee',
        },
    });
    await client.employee.create({
        data: {
            id: 'Riley',
            firstName: 'Riley',
            lastName: 'Meyers',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'IT Support',
            onShift: false,
        },
    });

    //riley admin
    await client.user.create({
        data: {
            id: 'RileyAdmin',
            email: 'riley@redroc.com',
            firstName: 'Riley',
            lastName: 'Meyers',
            userType: 'Admin',
        },
    });
    await client.employee.create({
        data: {
            id: 'RileyAdmin',
            firstName: 'Riley',
            lastName: 'Meyers',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'Admin',
            onShift: false,
        },
    });

    await client.user.create({
        data: {
            id: 'Daksh',
            email: 'dgajaria@wpi.edu',
            firstName: 'Daksh',
            lastName: 'Gajaria',
            userType: 'Employee',
        },
    });
    await client.employee.create({
        data: {
            id: 'Daksh',
            firstName: 'Daksh',
            lastName: 'Gajaria',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'Nurse',
            onShift: false,
        },
    });

    //daksh admin
    await client.user.create({
        data: {
            id: 'DakshAdmin',
            email: 'daksh@redroc.com',
            firstName: 'Daksh',
            lastName: 'Gajaria',
            userType: 'Admin',
        },
    });
    await client.employee.create({
        data: {
            id: 'DakshAdmin',
            firstName: 'Daksh',
            lastName: 'Gajaria',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'Admin',
            onShift: false,
        },
    });

    //Patient
    await client.user.create({
        data: {
            id: 'Josh',
            email: 'jmgifford@wpi.edu',
            firstName: 'Josh',
            lastName: 'Gifford',
            userType: 'Patient',
        },
    });
    await client.patient.create({
        data: {
            id: 'Josh',
            firstName: 'Josh',
            lastName: 'Gifford',
            dateOfBirth: new Date('1990-05-15'),
            phone: '123-456-7890',
            assignedDoctorId: 'Akaash',
        },
    });

    //josh admin
    await client.user.create({
        data: {
            id: 'JoshAdmin',
            email: 'josh@redroc.com',
            firstName: 'Josh',
            lastName: 'Gifford',
            userType: 'Admin',
        },
    });
    await client.employee.create({
        data: {
            id: 'JoshAdmin',
            firstName: 'Josh',
            lastName: 'Gifford',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'Admin',
            onShift: false,
        },
    });

    await client.user.create({
        data: {
            id: 'Alex',
            email: 'amlowczyk@wpi.edu',
            firstName: 'Alex',
            lastName: 'lowczyk',
            userType: 'Patient',
        },
    });
    await client.patient.create({
        data: {
            id: 'Alex',
            firstName: 'Alex',
            lastName: 'Lowczyk',
            dateOfBirth: new Date('1990-05-15'),
            phone: '123-456-7890',
            assignedDoctorId: 'Akaash',
        },
    });

    //alex admin
    await client.user.create({
        data: {
            id: 'AlexAdmin',
            email: 'alex@redroc.com',
            firstName: 'Alex',
            lastName: 'Lowczyk',
            userType: 'Admin',
        },
    });
    await client.employee.create({
        data: {
            id: 'AlexAdmin',
            firstName: 'Alex',
            lastName: 'Lowczyk',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'Admin',
            onShift: false,
        },
    });

    await client.user.create({
        data: {
            id: 'Keagan',
            email: 'kjhitt@wpi.edu',
            firstName: 'Keagan',
            lastName: 'Hitt',
            userType: 'Patient',
        },
    });
    await client.patient.create({
        data: {
            id: 'Keagan',
            firstName: 'Keagan',
            lastName: 'Hitt',
            dateOfBirth: new Date('1990-05-15'),
            phone: '123-456-7890',
            assignedDoctorId: 'Owen',
        },
    });

    //keagan admin
    await client.user.create({
        data: {
            id: 'KeaganAdmin',
            email: 'keagan@redroc.com',
            firstName: 'Keagan',
            lastName: 'Hitt',
            userType: 'Admin',
        },
    });
    await client.employee.create({
        data: {
            id: 'KeaganAdmin',
            firstName: 'Keagan',
            lastName: 'Hitt',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'Admin',
            onShift: false,
        },
    });

    //Requests
    await client.deviceRequest.create({
        data: {
            deviceType: 'X-Ray',
            priority: 'High',
            building: 'Healthcare Center (Chestnut Hill)',
            room: '111',
            department: 'Endoscopy Center',
            //requestTime:
            comments: 'Please hurry',
            employeeID: 'Riley',
            /*employeeName: */
            status: 'Accepted',
            assignedEmployeeID: 'Owen',
        },
    });
    await client.deviceRequest.create({
        data: {
            deviceType: 'Syringe',
            priority: 'Medium',
            building: 'Faulkner Hospital',
            room: '121',
            department: 'Blood Drawing Lab',
            //requestTime:
            comments: 'Need it promptly',
            employeeID: 'Daksh',
            /*employeeName: */
            status: 'In Progress',
            assignedEmployeeID: 'Brian',
        },
    });
    await client.deviceRequest.create({
        data: {
            deviceType: 'EKG Machine',
            priority: 'High',
            building: 'Healthcare Center (20 Patriot Pl.)',
            room: '125',
            department: 'Urgent Care Center',
            //requestTime:
            comments: "Don't waste time on this",
            employeeID: 'Akaash',
            /*employeeName: */
            status: 'Accepted',
            assignedEmployeeID: 'Owen',
        },
    });

    await client.pharmacyRequest.create({
        data: {
            employeeID: 'Nora',
            /*employeeName: */
            priority: 'Medium',
            building: 'Healthcare Center (22 Patriot Pl.)',
            department: 'Allergy',
            patientID: 'Josh',
            // patient: { connect: { id: parseInt(request.patientID) } }, // connect to whatever patient has that ID number
            drugName: 'Zantac',
            morningPillCount: 1,
            middayPillCount: 0,
            eveningPillCount: 0,
            nightPillCount: 0,
            days: 7,
            numberOfPills: 1,
            refills: 2,
            additionalInstructions: 'Take by mouth',
            status: 'In Progress',
            assignedEmployeeID: 'Brian',
        },
    });
    await client.pharmacyRequest.create({
        data: {
            employeeID: 'Brian',
            /*employeeName: */
            priority: 'Low',
            building: 'Faulkner Hospital',
            department: 'Cardiac Rehab',
            patientID: 'Keagan',
            // patient: { connect: { id: parseInt(request.patientID) } }, // connect to whatever patient has that ID number
            drugName: 'Tylenol',
            morningPillCount: 0,
            middayPillCount: 0,
            eveningPillCount: 1,
            nightPillCount: 0,
            days: 3,
            numberOfPills: 3,
            refills: 0,
            additionalInstructions: 'Take by mouth',
            status: 'Complete',
            assignedEmployeeID: 'Sarayu',
        },
    });
    await client.pharmacyRequest.create({
        data: {
            employeeID: 'Sarayu',
            /*employeeName: */
            priority: 'High',
            building: 'Faulkner Hospital',
            department: 'Foot and Ankle Center',
            patientID: 'Alex',
            // patient: { connect: { id: parseInt(request.patientID) } }, // connect to whatever patient has that ID number
            drugName: 'Acetaminophen',
            morningPillCount: 1,
            middayPillCount: 0,
            eveningPillCount: 1,
            nightPillCount: 0,
            days: 4,
            numberOfPills: 5,
            refills: 1,
            additionalInstructions: 'Take by mouth',
            status: 'In Progress',
            assignedEmployeeID: 'Daksh',
        },
    });

    await client.patientRequest.create({
        data: {
            patientID: 'Alex',
            priority: 'Low',
            building: 'Faulkner Hospital',
            department: 'Blood Drawing Lab',
            status: 'Completed',
            employeeID: 'Akaash',
            /*employeeName: */
            request: 'Speak to a doctor',
            comment: 'I would like to donate blood',
            assignedEmployeeID: 'Riley',
        },
    });
    await client.patientRequest.create({
        data: {
            patientID: 'Josh',
            priority: 'Medium',
            department: 'ENT',
            building: 'Healthcare Center (20 Patriot Pl.)',
            status: 'Pending',
            employeeID: 'Riley',
            /*employeeName: */
            request: 'Room Maintenance',
            comment: 'I want a clean room',
            assignedEmployeeID: 'Akaash',
        },
    });
    await client.patientRequest.create({
        data: {
            patientID: 'Keagan',
            priority: 'Low',
            department: 'Community Room',
            building: 'Healthcare Center (22 Patriot Pl.)',
            status: 'Canceled',
            employeeID: 'Daksh',
            /*employeeName: */
            request: 'Food',
            comment: 'Hungry patient',
            assignedEmployeeID: 'Nora',
        },
    });

    await client.transportRequest.create({
        data: {
            employeeID: 'Nora',
            /*employeeName: */ //employee: { connect: { id: parseInt(request.employeeID, 10) } }, //connect here
            patientID: 'Keagan',
            transportationType: 'Helicopter',
            currentBuilding: 'Healthcare Center (22 Patriot Pl.)',
            desiredBuilding: 'Healthcare Center (Chestnut Hill)',
            priority: 'High',
            department: 'Primary Care',
            comments: 'Patient needs quick ride',
            status: 'Pending',
            assignedEmployeeID: 'Owen',
            //user: { connect: { id: request.userID } }, // connect to whatever
        },
    });
    await client.transportRequest.create({
        data: {
            employeeID: 'Sarayu',
            /*employeeName: */ //employee: { connect: { id: parseInt(request.employeeID, 10) } }, //connect here
            patientID: 'Josh',
            transportationType: 'Non-Emergency Ambulance',
            currentBuilding: 'Healthcare Center (20 Patriot Pl.)',
            desiredBuilding: 'Faulkner Hospital',
            priority: 'Low',
            department: 'Radiology',
            comments: 'Patient needs ride soon',
            status: 'Accepted',
            assignedEmployeeID: 'Daksh',
            //user: { connect: { id: request.userID } }, // connect to whatever
        },
    });
    await client.transportRequest.create({
        data: {
            employeeID: 'Brian',
            /*employeeName: */ //employee: { connect: { id: parseInt(request.employeeID, 10) } }, //connect here
            patientID: 'Alex',
            transportationType: 'Emergency Ambulance',
            currentBuilding: 'Faulkner Hospital',
            desiredBuilding: 'Healthcare Center (Chestnut Hill)',
            priority: 'High',
            department: 'Plastic Surgery',
            comments: 'Important transport required',
            status: 'Pending',
            assignedEmployeeID: 'Owen',
            //user: { connect: { id: request.userID } }, // connect to whatever
        },
    });

    await client.sanitationRequest.create({
        data: {
            employeeID: 'Owen',
            sanitationType: 'Spill cleanup',
            priority: 'Low',
            department: 'Physiatry',
            building: 'Healthcare Center (20 Patriot Pl.)',
            roomNumber: '143',
            comments: 'Milk Spill',
            status: 'Canceled',
            assignedEmployeeID: 'Nora',
        },
    });
    await client.sanitationRequest.create({
        data: {
            employeeID: 'Sarayu',
            sanitationType: 'Biohazard',
            priority: 'Urgent',
            department: 'Center for Pain Medicine',
            building: 'Healthcare Center (Chestnut Hill)',
            roomNumber: '130',
            comments: 'Mix of spilled medicines',
            status: 'Completed',
            assignedEmployeeID: 'Owen',
        },
    });
    await client.sanitationRequest.create({
        data: {
            employeeID: 'Owen',
            sanitationType: 'General cleaning',
            priority: 'Medium',
            department: 'Neurosurgery',
            building: 'Healthcare Center (22 Patriot Pl.)',
            roomNumber: '143',
            comments: 'Clean the bathroom',
            status: 'Accepted',
            assignedEmployeeID: 'Akaash',
        },
    });

    //translation request
    await client.translateRequest.create({
        data: {
            employeeID: 'Brian',
            language: 'American Sign Language',
            building: 'Healthcare Center (22 Patriot Pl.)',
            department: 'Primary Care',
            roomNumber: '130',
            status: 'Pending',
            priority: 'Medium',
            comments: 'N/A',
            assignedEmployeeID: 'Nora',
        },
    });
    await client.translateRequest.create({
        data: {
            employeeID: 'Daksh',
            language: 'Mandarin',
            building: 'Healthcare Center (Chestnut Hill)',
            department: 'Endoscopy Center',
            roomNumber: '20',
            status: 'Canceled',
            priority: 'High',
            comments: 'Patient needs written instructions in mandarin.',
            assignedEmployeeID: 'Riley',
        },
    });
    await client.translateRequest.create({
        data: {
            employeeID: 'Riley',
            language: 'Polish',
            building: 'Healthcare Center (Chestnut Hill)',
            department: 'Endoscopy Center',
            roomNumber: '120',
            status: 'Accepted',
            priority: 'Low',
            comments: 'N/A',
            assignedEmployeeID: 'Sarayu',
        },
    });

    await createAnnouncementWithNotifications({
        id: 'ann1',
        title: 'Updated COVID-19 Protocol',
        content: 'Effective immediately, all staff must wear N95 masks...',
        date: new Date('2025-05-03'),
        author: 'Sarayu',
        type: 'urgent',
        expirationDate: null,
    });

    await createAnnouncementWithNotifications({
        id: 'ann2',
        title: 'Annual Staff Appreciation Week',
        content: 'Staff Appreciation Week will be held May 5-9. Activities include a catered lunch on Monday, wellness workshop on Wednesday, and department awards on Friday.',
        date: new Date('2025-05-03'),
        author: 'Owen',
        type: 'general',
        expirationDate: new Date('2025-05-10'),
    });

    await createAnnouncementWithNotifications({
        id: 'ann3',
        title: 'EHR System Maintenance',
        content: 'The Electronic Health Record system will be down for maintenance on June 2nd from 2AM-6AM. Please complete all critical documentation before this time.',
        date: new Date('2025-06-02'),
        author: 'Brian',
        type: 'bulletin',
        expirationDate: new Date('2025-06-03'),
    });

    console.log('Users and Requests seeded successfully!');

    await client.algorithm.create({
        data: {
            algo: 'bfs',
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        return Promise.reject(e);
    })
    .finally(async () => {
        await client.$disconnect();
    });
