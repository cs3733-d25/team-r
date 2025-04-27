import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import axios from 'axios';
import { PrescriptionTable } from '@/features/Requests/PrescriptionForm/PrescriptionTable.tsx';
import { useState } from 'react';

interface RequestInfoButtonProps {
    id: number | null;
    type: string | null;
}

export function RequestInfoButton(props: RequestInfoButtonProps) {
    //updates only if the button is clicked
    function updateRequests() {
        try {
            switch (props.type) {
                case 'Sanitation': {
                    break;
                }
                case 'Prescription': {
                    retrievePrescription();
                    break;
                }
                case 'Medical Device': {
                    break;
                }
                case 'Patient Request': {
                    break;
                }
                case 'Transport': {
                    break;
                }
            }
        } catch (error) {
            console.error('Error getting request: ', error);
        }
    }

    //there's got to be a better way to do this - every one of these functions gets a different type of request
    //and every useState is for a different request type

    //prescription request
    const [prescription, setPrescription] = useState([
        {
            prescriptionID: null,
            employeeID: null,
            employeeName: null,
            priority: null,
            department: null,
            patientID: null,
            drugName: null,
            morningPillCount: null,
            middayPillCount: null,
            eveningPillCount: null,
            nightPillCount: null,
            days: null,
            numberOfPills: null,
            refills: null,
            additionalInstructions: null,
            status: null,
        },
    ]);

    //there should really be a try/catch here, but since it's only being called inside of a try/catch anyways i'll leave it
    async function retrievePrescription() {
        const request = await axios.post('api/pharmacy/single-request', {id: props.id});
        console.log('response from /single-request', request.data);
        setPrescription(request.data);
    }

    //gets and returns element displaying info about request
    function RequestInfo() {
        if (props.id && props.type) {
            switch (props.type) {
                case 'Sanitation': {
                    return <div>Sanitation!</div>;
                }
                case 'Prescription': {
                    return <PrescriptionTable prescription={prescription} />;
                }
                case 'Medical Device': {
                    return <div>Medical Device!</div>;
                }
                case 'Patient Request': {
                    return <div>Patient Request!</div>;
                }
                case 'Transport': {
                    return <div>Transport!</div>;
                }
            }
        }

        return <p>Error fetching request.</p>;
    }

    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <Button onClick={updateRequests}>i</Button>
                </PopoverTrigger>
                <PopoverContent className={"w-150 mr-5"}>
                    <RequestInfo />
                </PopoverContent>
            </Popover>
        </div>
    );
}
