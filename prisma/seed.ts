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
                id: 'admin',
                email: 'softengd25r@gmail.com',
                firstName: 'Wilson',
                lastName: 'Wong',
                userType: 'Admin'
            }
        });

        // 4. Create employee (after department is available)
        await client.employee.create({
            data: {
                id: 'admin',
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
                id: 'Staff',
                email: 'staffd25r@gmail.com',
                firstName: 'Staff',
                lastName: 'Staff',
                userType: 'Admin',
            }
        });
    await client.employee.create({
        data: {
            id: 'Staff',
            firstName: 'Staff',
            lastName: 'Staff',
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

    //nora admin
    await client.user.create({
        data: {
            id: 'NoraAdmin',
            email: 'nora@redroc.com',
            userType: 'Admin',
            firstName: 'Nora',
            lastName: 'Cleary',
        }
    });
    await client.employee.create({
        data: {
            id: 'NoraAdmin',
            firstName: 'Nora',
            lastName: 'Cleary',
            departmentId: 'Pharmacy PP20-1',
            role: 'Admin',
            onShift: true,
        }
    });

    await client.user.create({
        data: {
            id: 'Akaash',
            email: 'ajwalker@wpi.edu',
            firstName: 'Akaash',
            lastName: 'Walker',
            userType: 'Employee',
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
    //akaash admin
    await client.user.create({
        data: {
            id: 'AkaashAdmin',
            email: 'akaash@redroc.com',
            firstName: 'Akaash',
            lastName: 'Walker',
            userType: 'Admin',
        }
    });
    await client.employee.create({
        data: {
            id: 'AkaashAdmin',
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
            email: 'svijayanagaram@wpi.edu',
            firstName: 'Sarayu',
            lastName: 'Vijayanagaram',
            userType: 'Employee',
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

    //sarayu admin
    await client.user.create({
        data: {
            id: 'SarayuAdmin',
            email: 'sarayu@redroc.com',
            firstName: 'Sarayu',
            lastName: 'Vijayanagaram',
            userType: 'Admin',
        }
    });

    await client.employee.create({
        data: {
            id: 'SarayuAdmin',
            firstName: 'Sarayu',
            lastName: 'Vijayanagaram',
            departmentId: 'Vein Care Services PP22-3',
            role: 'Admin',
            onShift: true,
        }
    });

    await client.user.create({
        data: {
            id: 'Owen',
            email: 'ormiller@wpi.edu',
            firstName: 'O-bot',
            lastName: 'Miller',
            userType: 'Employee',
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

    //owen admin
    await client.user.create({
        data: {
            id: 'OwenAdmin',
            email: 'owen@redroc.com',
            firstName: 'O-bot',
            lastName: 'Miller',
            userType: 'Admin',
        }
    });
    await client.employee.create({
        data: {
            id: 'OwenAdmin',
            firstName: 'Owen',
            lastName: 'Miller',
            departmentId: 'Vein Care Services PP22-3',
            role: 'Admin',
            onShift: true,
        }
    });

    //Eployee not on shift - Brian, Riley, Daksh
    await client.user.create({
        data: {
            id: 'Brian',
            email: 'brian@wpi.edu',
            firstName: 'Brian',
            lastName: 'Grande',
            userType: 'Employee',
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

    //brian - admin
    await client.user.create({
        data: {
            id: 'BrianAdmin',
            email: 'brian@redroc.com',
            firstName: 'Brian',
            lastName: 'Grande',
            userType: 'Admin',
        }
    });
    await client.employee.create({
        data: {
            id: 'BrianAdmin',
            firstName: 'Brian',
            lastName: 'Grande',
            departmentId: 'Primary Care PP22-4',
            role: 'Admin',
            onShift: false,
        }
    });

    await client.user.create({
        data: {
            id: 'Riley',
            email: 'rmeyers@wpi.edu',
            firstName: 'Riley',
            lastName: 'Meyers',
            userType: 'Employee',
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

    //riley admin
    await client.user.create({
        data: {
            id: 'RileyAdmin',
            email: 'riley@redroc.com',
            firstName: 'Riley',
            lastName: 'Meyers',
            userType: 'Admin',
        }
    });
    await client.employee.create({
        data: {
            id: 'RileyAdmin',
            firstName: 'Riley',
            lastName: 'Meyers',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'Admin',
            onShift: false,
        }
    });

    await client.user.create({
        data: {
            id: 'Daksh',
            email: 'dgajaria@wpi.edu',
            firstName: 'Daksh',
            lastName: 'Gajaria',
            userType: 'Employee',
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

    //daksh admin
    await client.user.create({
        data: {
            id: 'DakshAdmin',
            email: 'daksh@redroc.com',
            firstName: 'Daksh',
            lastName: 'Gajaria',
            userType: 'Admin',
        }
    });
    await client.employee.create({
        data: {
            id: 'DakshAdmin',
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
            email: 'jmgifford@wpi.edu',
            firstName: 'Josh',
            lastName: 'Gifford',
            userType: 'Patient',
        }
    });
    await client.patient.create({
        data: {
            id: 'Josh',
            firstName: 'Josh',
            lastName: 'Gifford',
            dateOfBirth: new Date('1990-05-15'),
            phone: '123-456-7890',
            assignedDoctorId: 'Akaash'
        }
    });

    //josh admin
    await client.user.create({
        data: {
            id: 'JoshAdmin',
            email: 'josh@redroc.com',
            firstName: 'Josh',
            lastName: 'Gifford',
            userType: 'Admin',
        }
    });
    await client.employee.create({
        data: {
            id: 'JoshAdmin',
            firstName: 'Josh',
            lastName: 'Gifford',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'Admin',
            onShift: false,
        }
    });

    await client.user.create({
        data: {
            id: 'Alex',
            email: 'amlowczyk@wpi.edu',
            firstName: 'Alex',
            lastName: 'lowczyk',
            userType: 'Patient',
        }
    });
    await client.patient.create({
        data: {
            id: 'Alex',
            firstName: 'Alex',
            lastName: 'Lowczyk',
            dateOfBirth: new Date('1990-05-15'),
            phone: '123-456-7890',
            assignedDoctorId: 'Akaash'
        }
    });

    //alex admin
    await client.user.create({
        data: {
            id: 'AlexAdmin',
            email: 'alex@redroc.com',
            firstName: 'Alex',
            lastName: 'Lowczyk',
            userType: 'Admin',
        }
    });
    await client.employee.create({
        data: {
            id: 'AlexAdmin',
            firstName: 'Alex',
            lastName: 'Lowczyk',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'Admin',
            onShift: false,
        }
    });

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
            assignedDoctorId: 'Owen'
        }
    });

    //keagan admin
    await client.user.create({
        data: {
            id: 'KeaganAdmin',
            email: 'keagan@redroc.com',
            firstName: 'Roboto',
            lastName: 'Hitt',
            userType: 'Admin',
        }
    });
    await client.employee.create({
        data: {
            id: 'KeaganAdmin',
            firstName: 'Keagan',
            lastName: 'Hitt',
            departmentId: 'Kidney (Renal) Medicine PP22-3',
            role: 'Admin',
            onShift: false,
        }
    });


    //Requests
    await client.deviceRequest.create({
        data: {
            deviceType: 'X-Ray',
            priority: 'High',
            building: 'Healthcare Center (Chestnut Hill)',
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
            employeeID: 'Nora',
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
            employeeID: 'Sarayu',
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
            location: 'Faulkner Hospital',
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
            location: 'Healthcare Center (20 Patriot Pl.)',
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
            location: 'Healthcare Center (22 Patriot Pl.)',
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
            currentBuilding: 'Healthcare Center (22 Patriot Pl.)',
            desiredBuilding: 'Healthcare Center (Chestnut Hill)',
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
            //assignedEmployee: employeeName //connect later
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
            location: 'Healthcare Center (20 Patriot Pl.)',
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
            location: 'Healthcare Center (Chestnut Hill)',
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
            location: 'Healthcare Center (22 Patriot Pl.)',
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