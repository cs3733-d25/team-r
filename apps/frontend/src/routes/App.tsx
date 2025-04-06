import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormPage from '../features/MedDeviceRequest/FormPage.tsx';
import Directory from '../features/Directory/Directory.tsx';
import Login from '../features/Login/Login.tsx';
import MapView from '../features/MapView/MapView.tsx';
import SanitationForm from '../features/SanitationForm/SanitationForm.tsx';
import { HomeMain } from '../components/HomeMain.tsx';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <p>Page not found</p>,
            children: [
                { index: true, element: <HomeMain /> },
                { path: 'login', element: <Login /> },
                { path: 'servicereqs', element: <FormPage /> },
                { path: 'directory', element: <Directory /> },
                { path: 'mapView', element: <MapView /> },
                { path: 'sanitationFrom', element: <SanitationForm /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
