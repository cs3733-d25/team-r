import React, {useEffect, useState} from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Directory from '../features/Directory/Directory.tsx';
import Login from '../features/Login/Login.tsx';
import SanitationRequestForm from '../features/Requests/SanitationForm/SanitationRequestForm.tsx';
import { HomeMain } from '../components/HomeMain.tsx';
import CSVTabPage from '../features/CSVFiles/CSVTabs.tsx';
import TestPage from '../features/TestPage.tsx';
import SanitationRequestPage from "../features/Requests/SanitationForm/SanitationRequestPage.tsx";
import PatientRequest from "../features/Requests/PatientRequest/AllPatientRequests.tsx";
import {PatientRequestForm} from "@/features/Requests/PatientRequest/PatientRequestForm.tsx";
import PatientRequestPage from "../features/Requests/PatientRequest/PatientRequestPage.tsx";
import {ExternalMap} from "../features/MapView/ExternalMap.tsx";
import {MapPage} from "../features/MapView/MapPage.tsx";
import PatientTransportPage from "../features/Requests/PatientTransport/PatientTransportPage.tsx";
import Prescription from "../features/Requests/PrescriptionForm/Prescription.tsx";
import SanitationRequestTabs from "../features/Requests/SanitationForm/SanitationTabs.tsx";
import {DeviceReq} from "../features/Requests/MedDeviceRequest/DeviceReq.tsx";
import {EditMap} from "../features/MapView/EditMap.tsx";
import RequestPage  from "../features/Requests/RequestPage.tsx";
import { NavbarMGH } from '../components/NavBarMGH/NavbarMGH.tsx';
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

function App() {
    const {isAuthenticated, user, isLoading} = useAuth0();
    const [userType, setUserType] = useState("Guest");
    console.log('APP IS RENDERED');

    //get the usertype from the database after the user has logged in
    useEffect(() => {
        console.log('isLoading', isLoading);
        console.log('userType', userType);
        console.log('user', user);
        console.log('isAuthenticated', isAuthenticated);

        if (isAuthenticated && user?.email) {
            async function getUserType() {
                try {
                    const response = await axios.post('/api/login/usertype', {
                        email: user?.email,
                    });
                    const userType = response.data.userType;
                    console.log("FROM /USERTYOE: ", userType);
                    setUserType(userType);
                } catch (error) {
                    //if no user found set to guest
                    setUserType("Guest");
                    console.log(error);
                }
            }
            getUserType();
        }
    }, [isAuthenticated, user]);


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
                { path: 'login', element: <Login /> },
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
        </div>
    );
}

export default App;
