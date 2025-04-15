import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormPage from '../features/MedDeviceRequest/FormPage.tsx';
import Directory from '../features/Directory/Directory.tsx';
import Login from '../features/Login/Login.tsx';
import SanitationRequestForm from '../features/Requests/SanitationForm/SanitationRequestForm.tsx';
import { HomeMain } from '../components/HomeMain.tsx';
import CSVPage from '../features/CSVFiles/CSVPage.tsx';
import TestPage from '../features/TestPage.tsx';
import SanitationRequestPage from "../features/Requests/SanitationForm/SanitationRequestPage.tsx";
import {PrescriptionForm} from "../features/Requests/PrescriptionForm/PrescriptionForm.tsx";
import {PrescriptionPage} from "../features/Requests/PrescriptionForm/PrescriptionPage.tsx";
import PatientRequest from "@/features/Requests/PatientRequest/AllPatientRequests.tsx";
import {PatientRequestForm} from "@/features/Requests/PatientRequest/PatientRequestForm.tsx";
import PatientRequestPage from "@/features/Requests/PatientRequest/PatientRequestPage.tsx";
import {ExternalMap} from "@/features/MapView/ExternalMap.tsx";
import {DeviceReqForm} from "@/features/Requests/MedDeviceRequest/DeviceReqForm.tsx";
import {DeviceReqPage} from "@/features/Requests/MedDeviceRequest/DeviceReqPage.tsx";
import PatientTransportPage from "@/features/Requests/PatientTransport/PatientTransportPage.tsx";


function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement:
                <p className={'font-trade'}>Page not found</p>,
            children: [
                { index: true, element: <HomeMain /> },
                { path: 'home', element: <HomeMain status={'logged-in'} /> },
                { path: 'login', element: <Login /> },
                { path: 'servicereqs', element: <FormPage /> },
                { path: 'directory', element: <Directory /> },
                { path: 'mapView', element: <ExternalMap /> },
                { path: 'sanitation', element: <SanitationRequestForm /> },
                { path: 'csv', element: <CSVPage /> },
                { path: 'sanitationpage', element: <SanitationRequestPage /> },
                { path: 'testing', element: <TestPage /> },
                { path: 'profile', element: <p>Profile</p> },
                { path: 'prescription', element: <PrescriptionForm /> },
                { path: 'prescriptionpage', element: <PrescriptionPage /> },
                { path: 'patientrequestpage', element: <PatientRequestPage /> },
                { path: 'patientrequest', element: <PatientRequest /> },
                {path: 'transport',element: <PatientTransportPage /> },
                { path: 'patientrequest', element: <PatientRequest /> },
                { path: 'devicerequest', element: <DeviceReqForm />},
                { path: 'devicerequestpage', element: <DeviceReqPage />}
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
