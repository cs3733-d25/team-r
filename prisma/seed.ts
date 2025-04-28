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
                id: 'John',
                username: 'employee1@example.com',
                password: 'password123',
                userTypeID: 'Employee'
            }
        });

        // 4. Create employee (after department is available)
        await client.employee.create({
            data: {
                id: 'John',
                firstName: 'John',
                lastName: 'Doe',
                departmentId: 'Urology PP20-1',
                role: 'Doctor',
                onShift: true,
            }

        });

        //admin
        await client.user.create({
            data: {
                id: 'admin',
                username: 'admin',
                password: 'admin',
                userTypeID: 'Admin',
            }
        });
    await client.employee.create({
        data: {
            id: 'admin',
            firstName: 'admin',
            lastName: 'Wong',
            departmentId: 'Blood Draw/Phlebotomy PP20-1',
            role: 'Administrator',
            onShift: true,
        }
    });

        //employees
    await client.user.create({
        data: {
            id: 'Nora',
            username: 'Nora',
            password: '1',
            userTypeID: 'Employee',
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

    await client.user.create({
        data: {
            id: 'Akaash',
            username: 'Akaash',
            password: '1',
            userTypeID: 'Employee',
        }
    });
    await client.employee.create({
        data: {
            id: 'Akaash',
            firstName: 'Akaash',
            lastName: 'Walker',
            departmentId: 'Radiology CH-1',
            role: 'Doctor',
            onShift: true,
        }
    });

    await client.user.create({
        data: {
            id: 'Sarayu',
            username: 'Sarayu',
            password: '1',
            userTypeID: 'Employee',
        }
    });
    await client.employee.create({
        data: {
            id: 'Sarayu',
            firstName: 'Sarayu',
            lastName: 'Vijayanagaram',
            departmentId: 'Vein Care Services PP22-3',
            role: 'Doctor',
            onShift: true,
        }
    });

    await client.user.create({
        data: {
            id: 'Owen',
            username: 'Owen',
            password: '1',
            userTypeID: 'Employee',
        }
    });
    await client.employee.create({
        data: {
            id: 'Owen',
            firstName: 'Owen',
            lastName: 'Miller',
            departmentId: 'Vein Care Services PP22-3',
            role: 'Doctor',
            onShift: true,
        }
    });

    //Eployee not on shift - Brian, Riley, Daksh
    await client.user.create({
        data: {
            id: 'Brian',
            username: 'Brian',
            password: '1',
            userTypeID: 'Employee',
        }
    });
    await client.employee.create({
        data: {
            id: 'Brian',
            firstName: 'Brian',
            lastName: 'Grande',
            departmentId: 'Primary Care PP22-4',
            role: 'Doctor',
            onShift: false,
        }
    });

    await client.user.create({
        data: {
            id: 'Riley',
            username: 'Riley',
            password: '1',
            userTypeID: 'Employee',
        }
    });
    await client.employee.create({
        data: {
            id: 'Riley',
            firstName: 'Riley',
            lastName: 'Meyers',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'IT Support',
            onShift: false,
        }
    });

    await client.user.create({
        data: {
            id: 'Daksh',
            username: 'Daksh',
            password: '1',
            userTypeID: 'Employee',
        }
    });
    await client.employee.create({
        data: {
            id: 'Daksh',
            firstName: 'Daksh',
            lastName: 'Gajaria',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'Nurse',
            onShift: false,
        }
    });



    //Patient
    await client.user.create({
        data: {
            id: 'Josh',
            username: 'Josh',
            password: '1',
            userTypeID: 'Patient',
        }
    });
    await client.patient.create({
        data: {
            id: 'Josh',
            firstName: 'Josh',
            lastName: 'Gifford',
            dateOfBirth: new Date('1990-05-15'),
            phone: '123-456-7890',
            assignedDoctorId: 'John'
        }
    });

    await client.user.create({
        data: {
            id: 'Alex',
            username: 'Alex',
            password: '1',
            userTypeID: 'Patient',
        }
    });
    await client.patient.create({
        data: {
            id: 'Alex',
            firstName: 'Alex',
            lastName: 'Lowczyk',
            dateOfBirth: new Date('1990-05-15'),
            phone: '123-456-7890',
            assignedDoctorId: 'John'
        }
    });

    await client.user.create({
        data: {
            id: 'Keagan',
            username: 'Keagan',
            password: '1',
            userTypeID: 'Patient',
        }
    });
    await client.patient.create({
        data: {
            id: 'Keagan',
            firstName: 'Keagan',
            lastName: 'Hitt',
            dateOfBirth: new Date('1990-05-15'),
            phone: '123-456-7890',
            assignedDoctorId: 'John'
        }
    });

    //Requests
    await client.deviceRequest.create({
        data: {
            deviceType: 'X-Ray',
            priority: 'High',
            room: '111',
            department: "Endoscopy Center",
            //requestTime:
            comments: "Please hurry",
            employeeID: 'Riley',
            /*employeeName: */
            status: 'Accepted',
        }
    });
    await client.deviceRequest.create({
        data: {
            deviceType: 'Syringe',
            priority: 'Medium',
            room: '121',
            department: "Blood Drawing Lab",
            //requestTime:
            comments: "Need it promptly",
            employeeID: 'Daksh',
            /*employeeName: */
            status: 'In Progress',
        }
    });
    await client.deviceRequest.create({
        data: {
            deviceType: 'EKG Machine',
            priority: 'High',
            room: '125',
            department: "Urgent Care Center",
            //requestTime:
            comments: "Don't waste time on this",
            employeeID: 'Akaash',
            /*employeeName: */
            status: 'Accepted',
        }
    });


    await client.pharmacyRequest.create({
        data: {
            employeeID: 'John',
            /*employeeName: */
            priority: 'Medium',
            department: "Allergy",
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
            //assigned employee...
        },
    });
    await client.pharmacyRequest.create({
        data: {
            employeeID: 'Brian',
            /*employeeName: */
            priority: 'Low',
            department: "Cardiac Rehab",
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
            //assigned employee...
        },
    });
    await client.pharmacyRequest.create({
        data: {
            employeeID: 'Nora',
            /*employeeName: */
            priority: 'High',
            department: "Foot and Ankle Center",
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
            //assigned employee...
        },
    });


    await client.patientRequest.create({
        data: {
            patientID: 'Alex',
            priority: 'Low',
            department: 'Blood Drawing Lab',
            location: 'Faulkner',
            status: 'Completed',
            employeeID: 'Akaash',
            /*employeeName: */
            request: 'Speak to a doctor',
            comment: 'I would like to donate blood'
            //assignedEmployee: employeeName //fix this to connect correctly
        },
    });
    await client.patientRequest.create({
        data: {
            patientID: 'Josh',
            priority: 'Medium',
            department: 'ENT',
            location: 'Patriot Place 20',
            status: 'Pending',
            employeeID: 'Riley',
            /*employeeName: */
            request: 'Room Maintenance',
            comment: 'I want a clean room'
            //assignedEmployee: employeeName //fix this to connect correctly
        },
    });
    await client.patientRequest.create({
        data: {
            patientID: 'Keagan',
            priority: 'Low',
            department: 'Community Room',
            location: 'Patriot Place 22',
            status: 'Canceled',
            employeeID: 'Daksh',
            /*employeeName: */
            request: 'Food',
            comment: 'Hungry patient'
            //assignedEmployee: employeeName //fix this to connect correctly
        },
    });


    await client.transportRequest.create({
        data: {
            employeeID: 'Nora',
            /*employeeName: */ //employee: { connect: { id: parseInt(request.employeeID, 10) } }, //connect here
            patientID: 'Keagan',
            transportationType: 'Helicopter',
            currentBuilding: 'Patriot Place 22',
            desiredBuilding: 'Chestnut Hill',
            priority: 'High',
            department: 'Primary Care',
            comments: 'Patient needs quick ride',
            status: 'Pending',
            //assignedEmployee: employeeName //connect later
            //user: { connect: { id: request.userID } }, // connect to whatever
        },
    });
    await client.transportRequest.create({
        data: {
            employeeID: 'John',
            /*employeeName: */ //employee: { connect: { id: parseInt(request.employeeID, 10) } }, //connect here
            patientID: 'Josh',
            transportationType: 'Non-Emergency Ambulance',
            currentBuilding: 'Patriot Place 20',
            desiredBuilding: 'Faulkner',
            priority: 'Low',
            department: 'Radiology',
            comments: 'Patient needs ride soon',
            status: 'Accepted',
            //assignedEmployee: employeeName //connect later
            //user: { connect: { id: request.userID } }, // connect to whatever
        },
    });
    await client.transportRequest.create({
        data: {
            employeeID: 'John',
            /*employeeName: */ //employee: { connect: { id: parseInt(request.employeeID, 10) } }, //connect here
            patientID: 'Alex',
            transportationType: 'Emergency Ambulance',
            currentBuilding: 'Faulkner',
            desiredBuilding: 'Chestnut Hill',
            priority: 'High',
            department: 'Plastic Surgery',
            comments: 'Important transport required',
            status: 'Pending',
            //assignedEmployee: employeeName //connect later
            //user: { connect: { id: request.userID } }, // connect to whatever
        },
    });

    await client.sanitationRequest.create({
        data: {
            employeeID: 'Owen',
            sanitationType: 'Spill cleanup',
            priority: 'Low',
            department: 'Physiatry',
            location: 'Patriot Place 20',
            roomNumber: '143',
            comments: 'Milk Spill',
            status: 'Canceled',
        },
    });
    await client.sanitationRequest.create({
        data: {
            employeeID: 'Sarayu',
            sanitationType: 'Biohazard',
            priority: 'Urgent',
            department: 'Center for Pain Medicine',
            location: 'Chestnut Hill',
            roomNumber: '130',
            comments: 'Mix of spilled medicines',
            status: 'Completed',
        },
    });
    await client.sanitationRequest.create({
        data: {
            employeeID: 'Owen',
            sanitationType: 'General cleaning',
            priority: 'Medium',
            department: 'Neurosurgery',
            location: 'Patriot Place 22',
            roomNumber: '143',
            comments: 'Clean the bathroom',
            status: 'Accepted',
        },
    });

    console.log('Users and Requests seeded successfully!');

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