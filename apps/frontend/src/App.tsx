import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormPage from './routes/FormPage.tsx';
import Directory from './routes/Directory.tsx';
import Login from './routes/Login.tsx';
import HomePage from "./routes/HomePage.tsx";



function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <div />,
            element: <HomePage />,
        },
        {
            path: '/login',
            errorElement: <div />,
            element: <Login />,
        },
        {
            path: '/servicereqs',
            element: <FormPage />,
        },
        {
            path: '/directory',
            errorElement: <div />,
            element: <Directory />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
