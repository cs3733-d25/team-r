import('@prisma/client').then(({ PrismaClient }) => {
    const prisma = new PrismaClient();

    async function main() {
        // Create users
        const user1 = await prisma.user.create({
            data: {
                email: 'employee1@example.com',
                password: 'password123',
                userType: 'EMPLOYEE',
            },
        });

        const user2 = await prisma.user.create({
            data: {
                email: 'employee2@example.com',
                password: 'password123',
                userType: 'EMPLOYEE',
            },
        });

        const user3 = await prisma.user.create({
            data: {
                email: 'employee3@example.com',
                password: 'password123',
                userType: 'EMPLOYEE',
            },
        });

        const user4 = await prisma.user.create({
            data: {
                email: 'employee4@example.com',
                password: 'password123',
                userType: 'EMPLOYEE',
            },
        });

        const user5 = await prisma.user.create({
            data: {
                email: 'employee5@example.com',
                password: 'password123',
                userType: 'EMPLOYEE',
            },
        });

        // Create employees
        const employee1 = await prisma.employee.create({
            data: {
                employeeId: 'E1001',
                firstName: 'John',
                lastName: 'Doe',
                department: 'CARDIOLOGY',
                role: 'DOCTOR',
                onShift: true,
                userId: user1.id,
            },
        });

        const employee2 = await prisma.employee.create({
            data: {
                employeeId: 'E1002',
                firstName: 'Jane',
                lastName: 'Smith',
                department: 'NEUROLOGY',
                role: 'NURSE',
                onShift: false,
                userId: user2.id,
            },
        });

        const employee3 = await prisma.employee.create({
            data: {
                employeeId: 'E1003',
                firstName: 'Michael',
                lastName: 'Brown',
                department: 'ORTHOPEDICS',
                role: 'SURGEON',
                onShift: true,
                userId: user3.id,
            },
        });

        const employee4 = await prisma.employee.create({
            data: {
                employeeId: 'E1004',
                firstName: 'Emily',
                lastName: 'Davis',
                department: 'PEDIATRICS',
                role: 'NURSE',
                onShift: true,
                userId: user4.id,
            },
        });

        const employee5 = await prisma.employee.create({
            data: {
                employeeId: 'E1005',
                firstName: 'David',
                lastName: 'Martinez',
                department: 'EMERGENCY',
                role: 'PARAMEDIC',
                onShift: false,
                userId: user5.id,
            },
        });

        // Create patients
        await prisma.patient.create({
            data: {
                patientId: 'P2001',
                firstName: 'Alice',
                lastName: 'Johnson',
                dateOfBirth: new Date('1990-05-15'),
                gender: 'FEMALE',
                phone: '123-456-7890',
                userId: user2.id,
                assignedDoctorId: employee1.id,
            },
        });

        await prisma.patient.create({
            data: {
                patientId: 'P2002',
                firstName: 'Bob',
                lastName: 'Williams',
                dateOfBirth: new Date('1985-09-25'),
                gender: 'MALE',
                phone: '987-654-3210',
                userId: user1.id,
                assignedDoctorId: employee2.id,
            },
        });

        await prisma.patient.create({
            data: {
                patientId: 'P2003',
                firstName: 'Charlie',
                lastName: 'Davis',
                dateOfBirth: new Date('2000-12-20'),
                gender: 'MALE',
                phone: '555-987-6543',
                userId: user3.id,
                assignedDoctorId: employee3.id,
            },
        });

        await prisma.patient.create({
            data: {
                patientId: 'P2004',
                firstName: 'Diana',
                lastName: 'Miller',
                dateOfBirth: new Date('1980-01-30'),
                gender: 'FEMALE',
                phone: '555-321-4321',
                userId: user4.id,
                assignedDoctorId: employee4.id,
            },
        });

        await prisma.patient.create({
            data: {
                patientId: 'P2005',
                firstName: 'Eva',
                lastName: 'Clark',
                dateOfBirth: new Date('1995-07-10'),
                gender: 'FEMALE',
                phone: '555-987-1234',
                userId: user5.id,
                assignedDoctorId: employee5.id,
            },
        });

        console.log('Data seeded successfully!');
    }

    main()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
});