import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormPage from '../features/MedDeviceRequest/FormPage.tsx';
import Directory from '../features/Directory/Directory.tsx';
import Login from '../features/Login/Login.tsx';
import MapView from '../features/MapView/MapView.tsx';
import SanitationRequestForm from '../features/Requests/SanitationForm/SanitationRequestForm.tsx';
import { HomeMain } from '../components/HomeMain.tsx';
import CSVPage from '../features/CSVFiles/CSVPage.tsx';
import TestPage from '../features/TestPage.tsx';
import SanitationRequestPage from "../features/Requests/SanitationForm/SanitationRequestPage.tsx";
import {PrescriptionForm} from "../features/Requests/PrescriptionForm/PrescriptionForm.tsx";
import {PrescriptionPage} from "../features/Requests/PrescriptionForm/PrescriptionPage.tsx";


function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <p>Page not found</p>,
            children: [
                { index: true, element: <HomeMain /> },
                { path: 'home', element: <HomeMain status={'logged-in'} /> },
                { path: 'login', element: <Login /> },
                { path: 'servicereqs', element: <FormPage /> },
                { path: 'directory', element: <Directory /> },
                { path: 'mapView', element: <MapView /> },
                { path: 'sanitation', element: <SanitationRequestForm /> },
                {path: 'csv', element:<CSVPage/>},
                {path: 'sanitationpage', element: <SanitationRequestPage />},
                {path: 'prescription', element: <PrescriptionForm />},
                {path: 'prescriptionpage', element: <PrescriptionPage />},
                { path: "testing", element: <TestPage/> }
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
