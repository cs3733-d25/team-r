import React, {useEffect, useState} from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Directory from '../features/Directory/Directory.tsx';
import Login from '../features/Login/Login.tsx';
import SanitationRequestForm from '../features/Requests/SanitationForm/SanitationRequestForm.tsx';
import { HomeMain } from '../components/HomeMain.tsx';
import CSVTabPage from '../features/CSVFiles/CSVTabs.tsx';
import TestPage from '../features/TestPage.tsx';
import SanitationRequestPage from "../features/Requests/SanitationForm/SanitationRequestPage.tsx";
import PatientRequest from "@/features/Requests/PatientRequest/AllPatientRequests.tsx";
import {PatientRequestForm} from "@/features/Requests/PatientRequest/PatientRequestForm.tsx";
import PatientRequestPage from "@/features/Requests/PatientRequest/PatientRequestPage.tsx";
import {ExternalMap} from "@/features/MapView/ExternalMap.tsx";
import {MapPage} from "@/features/MapView/MapPage.tsx";
import PatientTransportPage from "@/features/Requests/PatientTransport/PatientTransportPage.tsx";
import Prescription from "@/features/Requests/PrescriptionForm/Prescription.tsx";
import SanitationRequestTabs from "@/features/Requests/SanitationForm/SanitationTabs.tsx";
import {DeviceReq} from "@/features/Requests/MedDeviceRequest/DeviceReq.tsx";
import {EditMap} from "@/features/MapView/EditMap.tsx";
import RequestPage  from "@/features/Requests/RequestPage.tsx";
import { NavbarMGH } from '@/components/NavBarMGH/NavbarMGH.tsx';
import axios from "axios";

function App() {
    const [userType, setUserType] = useState("Guest");
    const [session, setSession] = useState(null);
    const [username, setUsername] = useState("");

    async function getSession() {
        try {
            const response = await axios.get('api/login/session');
            const userType = response.data.userType;
            setUserType(userType);
            console.log(response.data);
            console.log("User type:", userType, "- Keagan");
            setSession(response.data.username);
            setUsername(response.data.username);
        } catch (error) {
            console.log('error in retrieve:', error);
        }
    }

    useEffect(() => {
        getSession();
    }, []);


    const router = createBrowserRouter([
        {
            path: '/',
            errorElement:
                <div className={"bg-[url(/wong-pyramid.gif)] h-screen bg-no-repeat bg-cover"}>
                    <p className={'font-trade'}>Page not found</p>
                </div>,
            children: [
                { index: true, element: <HomeMain userType={userType} /> },
                { path: 'home', element: <HomeMain userType={userType} status={"logged-in"} /> },
                { path: 'login', element: <Login onLogin={getSession} /> },
                { path: 'directory', element: <Directory /> },
                { path: 'external-map', element: <ExternalMap /> },
                { path: 'edit-map', element: <EditMap /> },
                { path: 'internal-map', element: <MapPage /> },
                { path: 'sanitation', element: <SanitationRequestTabs/> },
                { path: 'csv', element: <CSVTabPage /> },
                { path: 'sanitationpage', element: <SanitationRequestPage /> },
                { path: 'testing', element: <TestPage /> },
                { path: 'profile', element: <p>Profile</p> },
                { path: 'prescription', element: <Prescription /> },
                { path: 'patientrequestpage', element: <PatientRequestPage /> },
                { path: 'patientrequest', element: <PatientRequest /> },
                { path: 'transport',element: <PatientTransportPage /> },
                { path: 'devicerequest', element: <DeviceReq /> },
                { path: 'requests', element: <RequestPage /> }
            ],
        },
    ]);

    return (
        <div>
            <NavbarMGH userType={userType}/>
            <RouterProvider router={router} />
        </div>);
}

export default App;
