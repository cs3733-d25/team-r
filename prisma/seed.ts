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

        // 3. Create user
        await client.user.create({
            data: {
                id: 'admin1',
                email: 'softengD25X@gmail.com',
                firstName: 'Wilson',
                lastName: 'Wong',
                userType: 'Employee'
            }
        });

        // 4. Create employee (after department is available)
        await client.employee.create({
            data: {
                id: 'admin1',
                firstName: 'Wilson',
                lastName: 'Wong',
                departmentId: 'Urology PP20-1',
                role: 'Admin',
                onShift: true,
            }

        });

        //admin
        await client.user.create({
            data: {
                id: 'admin2',
                email: 'staffD25X@gmail.com',
                firstName: 'Admin',
                lastName: 'Admin',
                userType: 'Admin',
            }
        });
    await client.employee.create({
        data: {
            id: 'admin2',
            firstName: 'Admin',
            lastName: 'Admin',
            departmentId: 'Blood Draw/Phlebotomy PP20-1',
            role: 'Administrator',
            onShift: true,
        }
    });

        //employees
    await client.user.create({
        data: {
            id: 'Nora',
            email: 'noracleary@gmail.com',
            userType: 'Employee',
            firstName: 'Nora',
            lastName: 'Cleary',
        }
    });
    await client.employee.create({
        data: {
            id: 'Nora',
            firstName: 'Nora',
            lastName: 'Cleary',
            departmentId: 'Pharmacy PP20-1',
            role: 'Maintenance',
            onShift: true,
        }
    });

    // await client.user.create({
    //     data: {
    //         id: 'Akaash',
    //         username: 'Akaash',
    //         password: '1',
    //         userTypeID: 'Employee',
    //     }
    // });
    // await client.employee.create({
    //     data: {
    //         id: 'Akaash',
    //         firstName: 'Akaash',
    //         lastName: 'Walker',
    //         departmentId: 'Radiology CH-1',
    //         role: 'Doctor',
    //         onShift: true,
    //     }
    // });

    // await client.user.create({
    //     data: {
    //         id: 'Sarayu',
    //         username: 'Sarayu',
    //         password: '1',
    //         userTypeID: 'Employee',
    //     }
    // });
    // await client.employee.create({
    //     data: {
    //         id: 'Sarayu',
    //         firstName: 'Sarayu',
    //         lastName: 'Vijayanagaram',
    //         departmentId: 'Vein Care Services PP22-3',
    //         role: 'Doctor',
    //         onShift: true,
    //     }
    // });

    // await client.user.create({
    //     data: {
    //         id: 'Owen',
    //         username: 'Owen',
    //         password: '1',
    //         userTypeID: 'Employee',
    //     }
    // });
    // await client.employee.create({
    //     data: {
    //         id: 'Owen',
    //         firstName: 'Owen',
    //         lastName: 'Miller',
    //         departmentId: 'Vein Care Services PP22-3',
    //         role: 'Doctor',
    //         onShift: true,
    //     }
    // });
    //
    // //Eployee not on shift - Brian, Riley, Daksh
    // await client.user.create({
    //     data: {
    //         id: 'Brian',
    //         username: 'Brian',
    //         password: '1',
    //         userTypeID: 'Employee',
    //     }
    // });
    // await client.employee.create({
    //     data: {
    //         id: 'Brian',
    //         firstName: 'Brian',
    //         lastName: 'Grande',
    //         departmentId: 'Primary Care PP22-4',
    //         role: 'Doctor',
    //         onShift: false,
    //     }
    // });
    //
    // await client.user.create({
    //     data: {
    //         id: 'Riley',
    //         username: 'Riley',
    //         password: '1',
    //         userTypeID: 'Employee',
    //     }
    // });
    // await client.employee.create({
    //     data: {
    //         id: 'Riley',
    //         firstName: 'Riley',
    //         lastName: 'Meyers',
    //         departmentId: 'Kidney (Renal) Medicine PP22-3',
    //         role: 'IT Support',
    //         onShift: false,
    //     }
    // });

    // await client.user.create({
    //     data: {
    //         id: 'Daksh',
    //         username: 'Daksh',
    //         password: '1',
    //         userTypeID: 'Employee',
    //     }
    // });
    // await client.employee.create({
    //     data: {
    //         id: 'Daksh',
    //         firstName: 'Daksh',
    //         lastName: 'Gajaria',
    //         departmentId: 'Kidney (Renal) Medicine PP22-3',
    //         role: 'Nurse',
    //         onShift: false,
    //     }
    // });

    //
    //
    // //Patient
    // await client.user.create({
    //     data: {
    //         id: 'Josh',
    //         username: 'Josh',
    //         password: '1',
    //         userTypeID: 'Patient',
    //     }
    // });
    // await client.patient.create({
    //     data: {
    //         id: 'Josh',
    //         firstName: 'Josh',
    //         lastName: 'Gifford',
    //         dateOfBirth: new Date('1990-05-15'),
    //         phone: '123-456-7890',
    //         assignedDoctorId: 'John'
    //     }
    // });
    //
    // await client.user.create({
    //     data: {
    //         id: 'Alex',
    //         username: 'Alex',
    //         password: '1',
    //         userTypeID: 'Patient',
    //     }
    // });
    // await client.patient.create({
    //     data: {
    //         id: 'Alex',
    //         firstName: 'Alex',
    //         lastName: 'Lowczyk',
    //         dateOfBirth: new Date('1990-05-15'),
    //         phone: '123-456-7890',
    //         assignedDoctorId: 'John'
    //     }
    // });

    await client.user.create({
        data: {
            id: 'Keagan',
            email: 'kjhitt@wpi.edu',
            firstName: 'Roboto',
            lastName: 'Hitt',
            userType: 'Patient',
        }
    });
    await client.patient.create({
        data: {
            id: 'Keagan',
            firstName: 'Keagan',
            lastName: 'Hitt',
            dateOfBirth: new Date('1990-05-15'),
            phone: '123-456-7890',
            assignedDoctorId: 'admin1'
        }
    });


    console.log('Database seeded successfully!');

    await client.algorithm.create({
        data: {
            algo: 'bfs',
        }
    })
}

main()
    .catch((e) => {
        console.error(e);
        return Promise.reject(e);
    })
    .finally(async () => {
        await client.$disconnect();
    });