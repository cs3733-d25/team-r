import client from "../apps/backend/src/bin/prisma-client.ts";

async function main() {
    // Create user type
    await client.userType.createMany({
        data: [
            { id: 'Employee', name: 'Employee' },
            { id: 'Patient', name: 'Patient' },
            { id: 'Admin', name: 'Admin' }
        ],
        skipDuplicates: true
    });

        // 2. Create department
        const department1 = await client.department.create({
            data: {
                id: 'Phlebotomy',
                recepetionNodeID: 'specialtyCheckIn',
                name: 'Ambulatory/Urgent Care'
            }
        });

        // 3. Create user
        const user1 = await client.user.create({
            data: {
                id: '1',
                username: 'employee1@example.com',
                password: 'password123',
                userTypeID: 'Employee'
            }
        });

        // 4. Create employee (after department is available)
        const employee1 = await client.employee.create({
            data: {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                departmentId: 'Phlebotomy',
                role: 'Doctor',
                onShift: true,
            }

        });


/*
    const user1 = await client.user.create({
        data: {
            id: '1',
            username: 'employee1@example.com',
            password: 'password123',
            userTypeID: '1',
            userType: 'Employee'
        }
    });
    // Create employees with correct schema fields
    const employee1 = await client.employee.create({
        data: {
            id: user1.id,
            firstName: 'John',
            lastName: 'Doe',
            departmentId: '1',
            role: 'Doctor',
            onShift: true,
            user: {
                connect: { id: user1.id }
            }
        }
    });

    const department1 = await client.department.create({
        data: {
            id: '90',
            name: 'Ambulatory/Urgent Care',
            recepetionNodeID: '90'
        }
    })

    const user2 = await client.user.create({
        data: {
            username: 'employee2@example.com',
            password: 'password123',
            userType: 'Employee'
        }
    });

    const user3 = await client.user.create({
        data: {
            username: 'employee3@example.com',
            password: 'password123',
            userType: 'Employee'
        }
    });

    const user4 = await client.user.create({
        data: {
            username: 'employee4@example.com',
            password: 'password123',
            userType: UserType.EMPLOYEE
        }
    });

    const user5 = await client.user.create({
        data: {
            username: 'employee5@example.com',
            password: 'password123',
            userType: UserType.EMPLOYEE
        }
    });

    const user6 = await client.user.create({
        data: {
            username: 'patient1@example.com',
            password: 'password123',
            userType: UserType.PATIENT
        }
    });

    const user7 = await client.user.create({
        data: {
            username: 'patient2@example.com',
            password: 'password123',
            userType: UserType.PATIENT
        }
    });

    //create user admin for iteration 1 testing
    const user8 = await client.user.create({
        data: {
            username: 'admin',
            password: 'admin',
            userType: UserType.EMPLOYEE
        }
    });

    //create user admin for iteration 2 testing
    const user9 = await client.user.create({
        data: {
            username: 'adminD25X@gmail.com',
            password: 'cs3733D25X',
            userType: UserType.EMPLOYEE
        }
    });




    // Create employees with correct schema fields
/*
    await prisma.employee.createMany({
        data: [
            { id: user1.id, firstName: 'John', lastName: 'Doe', department: Department.Phlebotomy, role: EmployeeRole.DOCTOR, onShift: true },
        ]
    });

    await prisma.employee.create({data:{ firstName: 'John', lastName: 'Doe', department: Department.Phlebotomy, role: EmployeeRole.DOCTOR, onShift: true, user: { connect: { id: user1.id }}}});

    const employee2 = await prisma.employee.create({
        data: {
            firstName: 'Jane',
            lastName: 'Smith',
            department: Department.Specialty_Clinic,
            role: EmployeeRole.NURSE,
            onShift: false,
            user: {
                connect: { id: user2.id }
            }
        }
    });

    const employee3 = await prisma.employee.create({
        data: {
            firstName: 'Michael',
            lastName: 'Brown',
            department: Department.SPECIALTY_CLINIC,
            role: EmployeeRole.IT_SUPPORT,
            onShift: true,
            user: {
                connect: { id: user3.id }
            }
        }
    });

    const employee4 = await prisma.employee.create({
        data: {
            firstName: 'Emily',
            lastName: 'Davis',
            department: Department.SPECIALTY_CLINIC,
            role: EmployeeRole.MAINTENANCE,
            onShift: true,
            user: {
                connect: { id: user4.id }
            }
        }
    });

    const employee5 = await prisma.employee.create({
        data: {
            firstName: 'David',
            lastName: 'Martinez',
            department: Department.SPECIALTY_CLINIC,
            role: EmployeeRole.ADMINISTRATOR,
            onShift: false,
            user: {
                connect: { id: user5.id }
            }
        }
    });

    //employee data for admin user - iteration 1 testing
    const employee6 = await prisma.employee.create({
        data: {
            firstName: 'Wilson',
            lastName: 'Wong',
            department: Department.Specialty_Clinic,
            role: EmployeeRole.ADMINISTRATOR,
            onShift: false,
            user: {
                connect: { id: user8.id }
            }
        }
    });


    // Create patients

    await client.patient.create({
        data: {
            firstName: 'Alice',
            lastName: 'Johnson',
            dateOfBirth: new Date('1990-05-15'),
            gender: Gender.FEMALE,
            phone: '123-456-7890',
            user: {
                connect: { id: user6.id }
            },
            assignedDoctor: {
                connect: { id: 1 }
            }
        }
    });
/*
    await prisma.patient.create({
        data: {
            firstName: 'Bob',
            lastName: 'Williams',
            dateOfBirth: new Date('1985-09-25'),
            gender: Gender.MALE,
            phone: '987-654-3210',
            user: {
                connect: { id: user7.id }
            },
            assignedDoctor: {
                connect: { id: employee1.id }
            }
        }
    });

    await client.department.createMany({
        data:[
            { name: "Imaging Suite", receptionNodeID: '90'},
            { name: "Pharmacy", receptionNodeID: '90'},
            { name:"Ambulatory/Urgent Care", receptionNodeID: '90'},
            { name: "Phlebotomy", receptionNodeID: '90'},
            { name: "Specialty Clinic", receptionNodeID: '90'}
        ]
    })

    await prisma.priorities.createMany({
        data: [
            { type: RequestPriority.Low, name: "Low"},
            { type: RequestPriority.Medium, name: "Medium"},
            { type: RequestPriority.High, name: "High"},
            { type: RequestPriority.Urgent, name: "Urgent"},
        ]
    })

    await prisma.statuses.createMany({
        data: [
            { type: RequestStatus.pending, name: "Pending" },
            { type: RequestStatus.accepted, name: "Accepted" },
            { type: RequestStatus.in_progress, name: "In progress" },
            { type: RequestStatus.completed, name: "Completed" },
            { type: RequestStatus.cancelled, name: "Cancelled" },
        ]
    })


    await prisma.locations.createMany({
        data: [
            { type: Building.PATRIOT_PLACE_20, name: "Patriot Place 20" },
            { type: Building.PATRIOT_PLACE_22, name: "Patriot Place 22" },
            { type: Building.CHESTNUT_HILL, name: "Chestnut Hill" },
        ]
    })

    // Create medical devices
    await prisma.devices.createMany({
        data: [
            { type: RequestMedicalDevice.XRay, name: 'X Ray' },
            { type: RequestMedicalDevice.EKG_Machine, name: 'EKG Machine' },
            { type: RequestMedicalDevice.Defibrillator, name: 'Defibrillator' },
            { type: RequestMedicalDevice.Syringe, name: 'Syringe' },
            { type: RequestMedicalDevice.Pacemaker, name: 'Pacemaker' },
        ],
    });

    await prisma.nonemergencies.createMany({
        data: [
            { type: RequestNonemergent.Room_Maintenance, name: 'Room maintenance' },
            { type: RequestNonemergent.Food, name: 'Food' },
            { type: RequestNonemergent.Speak_to_a_doctor, name: 'Speak to a doctor' },
            { type: RequestNonemergent.Visitation_hours, name: 'Visitation hours' },
        ],
    });

    /*await prisma.medicalDevice.createMany({
        data: [
            { medicalDeviceType: 'X-Ray Machine', currentLocation: 'Imaging Room 1', currentStatus: DeviceStatus.available },
            { medicalDeviceType: 'Defibrillator', currentLocation: 'Emergency Room', currentStatus: DeviceStatus.available },
            { medicalDeviceType: 'EKG Machine', currentLocation: 'Storage Room 2', currentStatus: DeviceStatus.available },
            { medicalDeviceType: 'Ventilator', currentLocation: 'ICU Storage', currentStatus: DeviceStatus.available },
            { medicalDeviceType: 'Infusion Pump', currentLocation: 'Pharmacy Storage', currentStatus: DeviceStatus.available },
            { medicalDeviceType: 'Ultrasound Machine', currentLocation: 'Maternity Ward', currentStatus: DeviceStatus.maintenance }
        ]
    });


    // Create device requests
    await prisma.deviceRequest.createMany({
        data: [
            {
                deviceType: 'Defibrillator',
                priority: RequestPriority.high,
                employeeId: employee1.id,
                deliveryLocation: 'ER Bay 3',
                requestTime: new Date('2023-05-01T09:00:00Z'),
                requestAcceptedTime: new Date('2023-05-01T09:05:00Z'),
                assignedEmployeeId: employee4.id,
                requestCompletedTime: new Date('2023-05-01T09:15:00Z'),
                status: RequestStatus.completed,
                comments: 'Urgent need for cardiac arrest patient'
            },
            {
                deviceType: 'X-Ray Machine',
                priority: RequestPriority.medium,
                employeeId: employee2.id,
                deliveryLocation: 'Imaging Room 1',
                requestTime: new Date('2023-05-02T10:00:00Z'),
                requestAcceptedTime: new Date('2023-05-02T10:05:00Z'),
                assignedEmployeeId: employee3.id,
                requestCompletedTime: new Date('2023-05-02T10:20:00Z'),
                status: RequestStatus.completed,
                comments: 'Routine checkup for chest pain'
            },
            {
                deviceType: 'EKG Machine',
                priority: RequestPriority.low,
                employeeId: employee3.id,
                deliveryLocation: 'Cardiology Room 1',
                requestTime: new Date('2023-05-03T11:00:00Z'),
                requestAcceptedTime: new Date('2023-05-03T11:05:00Z'),
                assignedEmployeeId: employee5.id,
                requestCompletedTime: new Date('2023-05-03T11:10:00Z'),
                status: RequestStatus.pending,
                comments: 'Patient requires heart rate monitoring'
            },
            {
                deviceType: 'Ventilator',
                priority: RequestPriority.high,
                employeeId: employee4.id,
                deliveryLocation: 'ICU',
                requestTime: new Date('2023-05-04T12:00:00Z'),
                requestAcceptedTime: new Date('2023-05-04T12:05:00Z'),
                assignedEmployeeId: employee1.id,
                requestCompletedTime: new Date('2023-05-04T12:30:00Z'),
                status: RequestStatus.in_progress,
                comments: 'Critical care required for COVID patient'
            },
            {
                deviceType: 'Infusion Pump',
                priority: RequestPriority.medium,
                employeeId: employee5.id,
                deliveryLocation: 'Pharmacy Storage',
                requestTime: new Date('2023-05-05T13:00:00Z'),
                requestAcceptedTime: new Date('2023-05-05T13:05:00Z'),
                assignedEmployeeId: employee2.id,
                requestCompletedTime: new Date('2023-05-05T13:10:00Z'),
                status: RequestStatus.completed,
                comments: 'For administering fluids to patient post-surgery'
            },
            {
                deviceType: 'Defibrillator',
                priority: RequestPriority.high,
                employeeId: employee2.id,
                deliveryLocation: 'ER Bay 4',
                requestTime: new Date('2023-05-06T14:00:00Z'),
                requestAcceptedTime: new Date('2023-05-06T14:05:00Z'),
                assignedEmployeeId: employee4.id,
                requestCompletedTime: new Date('2023-05-06T14:20:00Z'),
                status: RequestStatus.completed,
                comments: 'Urgent need for cardiac arrest patient'
            },
            {
                deviceType: 'Ultrasound Machine',
                priority: RequestPriority.low,
                employeeId: employee1.id,
                deliveryLocation: 'Maternity Ward',
                requestTime: new Date('2023-05-07T15:00:00Z'),
                requestAcceptedTime: new Date('2023-05-07T15:05:00Z'),
                assignedEmployeeId: employee3.id,
                requestCompletedTime: new Date('2023-05-07T15:30:00Z'),
                status: RequestStatus.pending,
                comments: 'Routine checkup for pregnancy ultrasound'
            },
            {
                deviceType: 'X-Ray Machine',
                priority: RequestPriority.medium,
                employeeId: employee3.id,
                deliveryLocation: 'Imaging Room 2',
                requestTime: new Date('2023-05-08T16:00:00Z'),
                requestAcceptedTime: new Date('2023-05-08T16:05:00Z'),
                assignedEmployeeId: employee5.id,
                requestCompletedTime: new Date('2023-05-08T16:20:00Z'),
                status: RequestStatus.in_progress,
                comments: 'Checkup for bone fracture'
            },
            {
                deviceType: 'EKG Machine',
                priority: RequestPriority.high,
                employeeId: employee4.id,
                deliveryLocation: 'Cardiology Room 2',
                requestTime: new Date('2023-05-09T17:00:00Z'),
                requestAcceptedTime: new Date('2023-05-09T17:05:00Z'),
                assignedEmployeeId: employee1.id,
                requestCompletedTime: new Date('2023-05-09T17:15:00Z'),
                status: RequestStatus.completed,
                comments: 'Emergency cardiac evaluation needed'
            },
            {
                deviceType: 'Defibrillator',
                priority: RequestPriority.high,
                employeeId: employee5.id,
                deliveryLocation: 'ER Bay 5',
                requestTime: new Date('2023-05-10T18:00:00Z'),
                requestAcceptedTime: new Date('2023-05-10T18:05:00Z'),
                assignedEmployeeId: employee2.id,
                requestCompletedTime: new Date('2023-05-10T18:30:00Z'),
                status: RequestStatus.cancelled,
                comments: 'Cancelled due to unavailable equipment'
            },
            {
                deviceType: 'Infusion Pump',
                priority: RequestPriority.medium,
                employeeId: employee2.id,
                deliveryLocation: 'Patient Room 205',
                requestTime: new Date(),
                requestAcceptedTime: null,
                assignedEmployeeId: null,
                requestCompletedTime: null,
                status: RequestStatus.pending,
                comments: 'Patient requiring continuous medication delivery.'
            }
        ]
    });*/

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