import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Directory from '../features/Directory/Directory.tsx';
import Login from '../features/Login/Login.tsx';
import SanitationRequestForm from '../features/Requests/SanitationForm/SanitationRequestForm.tsx';
import { HomeMain } from '../components/HomeMain.tsx';
import CSVPage from '../features/CSVFiles/CSVPage.tsx';
import TestPage from '../features/TestPage.tsx';
import SanitationRequestPage from "../features/Requests/SanitationForm/SanitationRequestPage.tsx";
import PatientRequest from "@/features/Requests/PatientRequest/AllPatientRequests.tsx";
import {PatientRequestForm} from "@/features/Requests/PatientRequest/PatientRequestForm.tsx";
import PatientRequestPage from "@/features/Requests/PatientRequest/PatientRequestPage.tsx";
import {ExternalMap} from "@/features/MapView/ExternalMap.tsx";
import {InternalMapNew} from "@/features/MapView/InternalMapNew.tsx";
import PatientTransportPage from "@/features/Requests/PatientTransport/PatientTransportPage.tsx";
import Prescription from "@/features/Requests/PrescriptionForm/Prescription.tsx";
import SanitationRequestTabs from "@/features/Requests/SanitationForm/SanitationTabs.tsx";
import {DeviceReq} from "@/features/Requests/MedDeviceRequest/DeviceReq.tsx";
import {EditMap} from "@/features/MapView/EditMap.tsx";


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
                { path: 'directory', element: <Directory /> },
                { path: 'mapView', element: <ExternalMap /> },
                { path: 'internal-map', element: <InternalMapNew /> },
                { path: 'sanitation', element: <SanitationRequestTabs/> },
                { path: 'csv', element: <CSVPage /> },
                { path: 'sanitationpage', element: <SanitationRequestPage /> },
                { path: 'testing', element: <TestPage /> },
                { path: 'profile', element: <p>Profile</p> },
                { path: 'prescription', element: <Prescription /> },
                { path: 'patientrequestpage', element: <PatientRequestPage /> },
                { path: 'patientrequest', element: <PatientRequest /> },
                { path: 'transport',element: <PatientTransportPage /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
