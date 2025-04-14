import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormPage from '../features/MedDeviceRequest/FormPage.tsx';
import Directory from '../features/Directory/Directory.tsx';
import Login from '../features/Login/Login.tsx';
import MapView from '../features/MapView/MapView.tsx';
import SanitationRequestForm from '../features/SanitationForm/SanitationRequestForm.tsx';
import { HomeMain } from '../components/HomeMain.tsx';
import CSVPage from '../features/CSVFiles/CSVPage.tsx';
import SanitationRequestPage from '../features/SanitationForm/SanitationRequestPage.tsx';
import TestPage from '../features/TestPage.tsx';

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
                { path: 'mapView', element: <MapView /> },
                { path: 'sanitation', element: <SanitationRequestForm /> },
                { path: 'csv', element: <CSVPage /> },
                { path: 'sanitationpage', element: <SanitationRequestPage /> },
                { path: 'testing', element: <TestPage /> },
                { path: 'profile', element: <p>Profile</p> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
