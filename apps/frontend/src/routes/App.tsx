import React, { useEffect, useState } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Directory from '../features/Directory/Directory.tsx';
import Login from '../features/Login/Login.tsx';
import AboutPage from '../features/AboutAndCredits/AboutPage.tsx';
import CreditsPage from '../features/AboutAndCredits/CreditsPage.tsx';
import { HomeMain } from '../components/HomeMain.tsx';
import CSVTabPage from '../features/CSVFiles/CSVTabs.tsx';
import TestPage from '../features/TestPage.tsx';
import SanitationRequestPage from '../features/Requests/SanitationForm/SanitationRequestPage.tsx';
import PatientRequest, {
    AllPatientRequests,
} from '../features/Requests/PatientRequest/AllPatientRequests.tsx';
import { ExternalMap } from '../features/MapView/ExternalMap.tsx';
import { MapPage } from '../features/MapView/MapPage.tsx';
import Prescription from '../features/Requests/PrescriptionForm/Prescription.tsx';
import SanitationRequestTabs from '../features/Requests/SanitationForm/SanitationTabs.tsx';
import { DeviceReq } from '../features/Requests/MedDeviceRequest/DeviceReq.tsx';
import { EditMap } from '../features/MapView/EditMap.tsx';
import RequestPage from '../features/Requests/RequestPage.tsx';
import { NavbarMGH } from '../components/NavBarMGH/NavbarMGH.tsx';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { TourProvider } from '@/components/tour.tsx';
import Translate from '@/features/Requests/TranslateForm/Translate.tsx';
import FileTranslator from '@/features/Requests/TranslateForm/FileTranslator.tsx';
import PatientTransport from '@/features/Requests/PatientTransport/PatientTransport.tsx';
import SettingsPage from '@/features/ThemeSwitcher/SettingsPage.tsx';
import { useTheme } from '../hooks/useTheme';
import Footer from '../components/Footer';
import {AnnouncementPage} from '@/features/Announcements/AnnouncementPage.tsx';
import AnnouncementEdit from "@/features/Announcements/AnnouncementEdit.tsx";
import CreateAnnouncement from '@/features/Announcements/CreateAnnouncement.tsx';

function App() {
    const { isAuthenticated, user, isLoading } = useAuth0();
    const [userType, setUserType] = useState('Guest');
    const [userFirstName, setUserFirstName] = useState('');
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
            console.log('in if statement');

            //navigate to neck page
            async function getUserType() {
                try {
                    const response = await axios.post(
                        '/api/login/userInfo',
                        { email: user?.email },
                        { withCredentials: true }
                    );
                    console.log('firstName: ', response.data.firstName);
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
            errorElement: (
                <div className={'bg-[url(/wong-pyramid.gif)] h-screen bg-no-repeat bg-cover'}>
                    <p className={'font-trade'}>Page not found</p>
                </div>
            ),
            children: [
                {
                    index: true,
                    element: (
                        <>
                            <HomeMain userType={userType} />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'home',
                    element: (
                        <>
                            <HomeMain userType={userType} status={'logged-in'} />
                            <Footer />
                        </>
                    ),
                },
                { path: 'login', element: <Login /> },
                {
                    path: 'directory',
                    element: (
                        <>
                            <Directory />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'about',
                    element: (
                        <>
                            <AboutPage />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'credits',
                    element: (
                        <>
                            <CreditsPage />
                            <Footer />
                        </>
                    ),
                },
                { path: 'external-map', element: <ExternalMap /> },
                {
                    path: 'edit-map',
                    element: (
                        <>
                            <TourProvider>
                                <EditMap />
                            </TourProvider>
                        </>
                    ),
                },
                { path: 'internal-map', element: <MapPage /> },
                {
                    path: 'sanitation',
                    element: (
                        <>
                            <SanitationRequestTabs />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'csv',
                    element: (
                        <>
                            <TourProvider>
                                <CSVTabPage />
                                <Footer />
                            </TourProvider>
                        </>
                    ),
                },
                {
                    path: 'sanitationpage',
                    element: (
                        <>
                            <SanitationRequestPage />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'testing',
                    element: (
                        <>
                            <TestPage />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'profile',
                    element: (
                        <>
                            <p>Profile</p>
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'settings',
                    element: (
                        <>
                            <SettingsPage />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'prescription',
                    element: (
                        <>
                            <Prescription />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'patientrequestpage',
                    element: (
                        <>
                            <AllPatientRequests />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'patientrequest',
                    element: (
                        <>
                            <PatientRequest />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'transport',
                    element: (
                        <>
                            <PatientTransport />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'devicerequest',
                    element: (
                        <>
                            <DeviceReq />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'translation',
                    element: (
                        <>
                            <TourProvider>
                                <Translate />
                                <Footer />
                            </TourProvider>
                        </>
                    ),
                },
                {
                    path: 'upload-translate',
                    element: (
                        <>
                            <FileTranslator />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'requests',
                    element: (
                        <TourProvider>
                            <RequestPage />
                            <Footer />
                        </TourProvider>
                    ),
                },
                {
                    path: 'announcements',
                    element: (
                        <>
                            <TourProvider>
                                <AnnouncementPage />
                                <Footer />
                            </TourProvider>
                        </>
                    ),
                },
                {
                    path: 'announcementform',
                    element: (
                        <>
                            <CreateAnnouncement />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'announcementedit/:id',
                    element: (
                        <>
                            <AnnouncementEdit />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'urgentannouncements',
                    element: (
                        <>
                            <AnnouncementPage defaultTab="urgent" />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'generalannouncements',
                    element: (
                        <>
                            <AnnouncementPage defaultTab="general" />
                            <Footer />
                        </>
                    ),
                },
                {
                    path: 'bulletinannouncements',
                    element: (
                        <>
                            <AnnouncementPage defaultTab="bulletin" />
                            <Footer />
                        </>
                    ),
                },
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
