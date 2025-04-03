import { PrismaClient } from "../packages/database";
import { UserType, Department, EmployeeRole, Gender, RequestStatus, RequestPriority, DeviceStatus } from "../packages/database";

const prisma = new PrismaClient();

async function main() {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            email: 'employee1@example.com',
            password: 'password123',
            userType: UserType.EMPLOYEE
        }
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'employee2@example.com',
            password: 'password123',
            userType: UserType.EMPLOYEE
        }
    });

    const user3 = await prisma.user.create({
        data: {
            email: 'employee3@example.com',
            password: 'password123',
            userType: UserType.EMPLOYEE
        }
    });

    const user4 = await prisma.user.create({
        data: {
            email: 'employee4@example.com',
            password: 'password123',
            userType: UserType.EMPLOYEE
        }
    });

    const user5 = await prisma.user.create({
        data: {
            email: 'employee5@example.com',
            password: 'password123',
            userType: UserType.EMPLOYEE
        }
    });

    const user6 = await prisma.user.create({
        data: {
            email: 'patient1@example.com',
            password: 'password123',
            userType: UserType.PATIENT
        }
    });

    const user7 = await prisma.user.create({
        data: {
            email: 'patient2@example.com',
            password: 'password123',
            userType: UserType.PATIENT
        }
    });

    // Create employees with correct schema fields
    const employee1 = await prisma.employee.create({
        data: {
            id: user1.id,
            firstName: 'John',
            lastName: 'Doe',
            department: Department.CARDIOLOGY,
            role: EmployeeRole.DOCTOR,
            onShift: true,
            user: {
                connect: { id: user1.id }
            }
        }
    });

    const employee2 = await prisma.employee.create({
        data: {
            id: user2.id,
            firstName: 'Jane',
            lastName: 'Smith',
            department: Department.NEUROLOGY,
            role: EmployeeRole.NURSE,
            onShift: false,
            user: {
                connect: { id: user2.id }
            }
        }
    });

    const employee3 = await prisma.employee.create({
        data: {
            id: user3.id,
            firstName: 'Michael',
            lastName: 'Brown',
            department: Department.IT,
            role: EmployeeRole.IT_SUPPORT,
            onShift: true,
            user: {
                connect: { id: user3.id }
            }
        }
    });

    const employee4 = await prisma.employee.create({
        data: {
            id: user4.id,
            firstName: 'Emily',
            lastName: 'Davis',
            department: Department.FACILITIES,
            role: EmployeeRole.MAINTENANCE,
            onShift: true,
            user: {
                connect: { id: user4.id }
            }
        }
    });

    const employee5 = await prisma.employee.create({
        data: {
            id: user5.id,
            firstName: 'David',
            lastName: 'Martinez',
            department: Department.ADMINISTRATION,
            role: EmployeeRole.ADMINISTRATOR,
            onShift: false,
            user: {
                connect: { id: user5.id }
            }
        }
    });

    // Create patients
    await prisma.patient.create({
        data: {
            id: user6.id,
            firstName: 'Alice',
            lastName: 'Johnson',
            dateOfBirth: new Date('1990-05-15'),
            gender: Gender.FEMALE,
            phone: '123-456-7890',
            user: {
                connect: { id: user6.id }
            },
            assignedDoctor: {
                connect: { id: employee1.Id }
            }
        }
    });

    await prisma.patient.create({
        data: {
            id: user7.i,
            firstName: 'Bob',
            lastName: 'Williams',
            dateOfBirth: new Date('1985-09-25'),
            gender: Gender.MALE,
            phone: '987-654-3210',
            user: {
                connect: { id: user7.id }
            },
            assignedDoctor: {
                connect: { id: employee2.id }
            }
        }
    });

    // Create medical devices
    await prisma.medicalDevice.createMany({
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
    });

    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        return Promise.reject(e); // Return the error instead of exiting the process
    })
    .finally(async () => {
        await prisma.$disconnect();
    });