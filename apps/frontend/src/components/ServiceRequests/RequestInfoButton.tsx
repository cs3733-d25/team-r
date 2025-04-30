import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import axios from 'axios';
import { PrescriptionTable } from '@/features/Requests/PrescriptionForm/PrescriptionTable.tsx';
import { useState } from 'react';
import {DeviceReqTable} from "@/features/Requests/MedDeviceRequest/DeviceReqTable.tsx";
import {SanitationTable} from "@/features/Requests/SanitationForm/SanitationTable.tsx";
import {PatientRequestTable} from "@/features/Requests/PatientRequest/PatientRequestTable.tsx";
import {PatientTransportTable} from "@/features/Requests/PatientTransport/PatientTransportTable.tsx";
import {TranslateTable} from "@/features/Requests/TranslateForm/TranslateTable.tsx";

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
                    retrieveSanitation();
                    break;
                }
                case 'Prescription': {
                    retrievePrescription();
                    break;
                }
                case 'Medical Device': {
                    retrieveDevice();
                    break;
                }
                case 'Patient Request': {
                    retrievePatientRequest();
                    break;
                }
                case 'Transport': {
                    retrieveTransport();
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

    //sanitation request
    const [sanitation, setSanitation] = useState([{employeeID:null,sanitationType:null,priority:null,department:null,location:null,roomNumber:null,requestTime:null,comments:null,status:null}]);
    //there should really be a try/catch here, but since it's only being called inside of a try/catch anyways i'll leave it
    async function retrieveSanitation() {
        const request = await axios.post('api/sanitation/single-request', {id: props.id});
        console.log('response from /single-request', request.data);
        setSanitation(request.data);
    }

    //medical device request
    const [device, setDevice] = useState([{
        deviceID: null,
        deviceType: null,
        priority: null,
        room: null,
        department: null,
        comments: null,
        employeeID: null,
        status: null
    }]);
    //there should really be a try/catch here, but since it's only being called inside of a try/catch anyways i'll leave it
    async function retrieveDevice() {
        const request = await axios.post('api/devicereq/single-request', {id: props.id});
        console.log('response from /single-request', request.data);
        setDevice(request.data);
    }

    //patient request
    const [patientRequest, setPatientRequest] = useState([{
        patientRequestID:null,
        patientID:null,
        assignedEmpID:null,
        priority:null,
        department:null,
        location:null,
        comment:null,
        time:null,
        status:null,
        employeeID:null,
        request: null}]);
    //there should really be a try/catch here, but since it's only being called inside of a try/catch anyways i'll leave it
    async function retrievePatientRequest() {
        const request = await axios.post('api/patientreq/single-request', {id: props.id});
        console.log('response from /single-request', request.data);
        setPatientRequest(request.data);
    }

    //patient transport request
    const [transport, setTransport] = useState([{employeeID:null, patientID:null,transportationType:null,priority:null,department:null,currentBuilding:null,desiredBuilding:null,requestTime:null,comments:null,status:null,userId:null}]);
    //there should really be a try/catch here, but since it's only being called inside of a try/catch anyways i'll leave it
    async function retrieveTransport() {
        const request = await axios.post('api/transportreq/single-request', {id: props.id});
        console.log('response from /single-request', request.data);
        setTransport(request.data);
    }

    //translte request
    const [translate, setTranslate] = useState([{employeeName: null,
        language: null,
        priority: null,
        department: null,
        location: null,
        roomNumber: null,
        notes: null,
        timestamp: null,
        status: null}]);
    //there should really be a try/catch here, but since it's only being called inside of a try/catch anyways i'll leave it
    async function retrieveTranslate() {
        const request = await axios.post('api/translate/single-request', {id: props.id});
        console.log('response from /single-request', request.data);
        setTranslate(request.data);
    }

    //gets and returns element displaying info about request
    function RequestInfo() {
        if (props.id && props.type) {
            switch (props.type) {
                case 'Sanitation': {
                    return <SanitationTable sanitation={sanitation} />;
                }
                case 'Prescription': {
                    return <PrescriptionTable prescription={prescription} />;
                }
                case 'Medical Device': {
                    return <DeviceReqTable device={device} />;
                }
                case 'Patient Request': {
                    return <PatientRequestTable patientRequest={patientRequest} />;
                }
                case 'Transport': {
                    return <PatientTransportTable transport={transport} />;
                }
                case 'Translate': {
                    return <TranslateTable translate={translate} />;
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
