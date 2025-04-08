import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import ExamplePage from './routes/ExamplePage.tsx';
import SanitationRequestForm from './components/SanitationRequestForm.tsx';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <div />,
            element: <SanitationRequestForm  />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
