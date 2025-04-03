import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormPage from './routes/FormPage.tsx';
import Directory from './routes/Directory.tsx';
import Login from './components/Login.tsx';



function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <div />,
            element: <Login />,
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
