import {PrismaClient} from "../.prisma/client";
const prisma = new PrismaClient();

export async function createEmployee() {
    try {
        const email = "newemployee@example.com";
        const password = "securepassword"; // Hash this before storing
        const firstName = "John";
        const lastName = "Doe";
        const department = "IT";
        const role = "IT_SUPPORT";
        const onShift = true;


        // Create user first
        const user = await prisma.user.create({
            data: {
                email,
                password,
                userType: 'EMPLOYEE',
            },
        });

        // Create employee
        const employee = await prisma.employee.create({
            data: {
                employeeId: `${Date.now()}`, // Generate unique employee ID
                firstName,
                lastName,
                department,
                role,
                onShift,
                userId: user.id, // Link to user
            },
        });

        console.log(" Employee created successfully:", employee);
    } catch (error) {
        console.error("Error creating employee:", error);
    } finally {
        await prisma.$disconnect();
    }
}

//createEmployee();