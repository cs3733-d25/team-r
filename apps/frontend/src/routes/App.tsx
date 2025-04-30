import React, { useEffect, useState } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Directory from '../features/Directory/Directory.tsx';
import Login from '../features/Login/Login.tsx';
import AboutPage from '../features/AboutAndCredits/AboutPage.tsx';
import CreditsPage from '../features/AboutAndCredits/CreditsPage.tsx';
import SanitationRequestForm from '../features/Requests/SanitationForm/SanitationRequestForm.tsx';
import { HomeMain } from '../components/HomeMain.tsx';
import CSVTabPage from '../features/CSVFiles/CSVTabs.tsx';
import TestPage from '../features/TestPage.tsx';
import SanitationRequestPage from "../features/Requests/SanitationForm/SanitationRequestPage.tsx";
import PatientRequest, { AllPatientRequests } from "../features/Requests/PatientRequest/AllPatientRequests.tsx";
import { PatientRequestForm } from "@/features/Requests/PatientRequest/PatientRequestForm.tsx";
import PatientRequestPage from "../features/Requests/PatientRequest/PatientRequestPage.tsx";
import { ExternalMap } from "../features/MapView/ExternalMap.tsx";
import { MapPage } from "../features/MapView/MapPage.tsx";
import PatientTransportPage from "../features/Requests/PatientTransport/PatientTransportPage.tsx";
import Prescription from "../features/Requests/PrescriptionForm/Prescription.tsx";
import SanitationRequestTabs from "../features/Requests/SanitationForm/SanitationTabs.tsx";
import { DeviceReq } from "../features/Requests/MedDeviceRequest/DeviceReq.tsx";
import { EditMap } from "../features/MapView/EditMap.tsx";
import RequestPage from "../features/Requests/RequestPage.tsx";
import { NavbarMGH } from '../components/NavBarMGH/NavbarMGH.tsx';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { TourProvider } from '@/components/tour.tsx';
import TranslateRequestForm from "@/features/Requests/TranslateForm/TranslateRequestForm.tsx";
import TranslateRequestPage from "@/features/Requests/TranslateForm/TranslateRequestPage.tsx";
import Translate from "@/features/Requests/TranslateForm/Translate.tsx";
import PatientTransport from "@/features/Requests/PatientTransport/PatientTransport.tsx";
import SettingsPage from "@/features/ThemeSwitcher/SettingsPage.tsx"
import { useTheme } from '../hooks/useTheme';


function App() {
    const { isAuthenticated, user, isLoading } = useAuth0();
    const [userType, setUserType] = useState("Guest");
    const [userFirstName, setUserFirstName] = useState("");
    const { theme } = useTheme();

    console.log('APP IS RENDERED');

    // Get the user type from the database after the user has logged in
    useEffect(() => {
        if (user) {
            console.log('user exists', user);
        } else {
            console.log('No user found: ', user);
        }
        console.log('isLoading', isLoading);
        console.log('userType', userType);
        console.log('user', user);
        console.log('isAuthenticated', isAuthenticated);
        if (isAuthenticated && !isLoading && user) {
            console.log("in if statement");
            //navigate to neck page
            async function getUserType() {
                try {
                    const response = await axios.post(
                        '/api/login/userInfo',
                        { email: user?.email },
                        { withCredentials: true }
                    );
                    console.log("firstName: ", response.data.firstName);
                    const userType = response.data.userType;
                    const firstName = response.data.firstName;
                    setUserType(userType);
                    setUserFirstName(firstName);
                    console.log('userType', userType);
                } catch (error) {
                    console.log(error);
                }
            }
            getUserType();
        }
    }, [isAuthenticated, user, isLoading]);

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
                { path: 'about', element: <AboutPage /> },
                { path: 'credits', element: <CreditsPage /> },
                { path: 'external-map', element: <ExternalMap /> },
                { path: 'edit-map', element: <><TourProvider><EditMap /></TourProvider></> },
                { path: 'internal-map', element: <MapPage /> },
                { path: 'sanitation', element: <SanitationRequestTabs/> },
                { path: 'csv', element: <><TourProvider><CSVTabPage /></TourProvider></> },
                { path: 'sanitationpage', element: <SanitationRequestPage /> },
                { path: 'testing', element: <TestPage /> },
                { path: 'profile', element: <p>Profile</p> },
                { path: 'settings', element: <SettingsPage /> },
                { path: 'prescription', element: <Prescription /> },
                { path: 'patientrequestpage', element: <AllPatientRequests /> },
                { path: 'patientrequest', element: <PatientRequest /> },
                { path: 'transport', element: <PatientTransport /> },
                { path: 'devicerequest', element: <DeviceReq /> },
                { path: 'translation', element: <Translate /> },
                { path: 'requests', element: <RequestPage /> }
            ],
        },
    ]);

    return (
        <div className={`${theme} min-h-screen`}>
            <NavbarMGH userType={userType} userName={userFirstName} />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
