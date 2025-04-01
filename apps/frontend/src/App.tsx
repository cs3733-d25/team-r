import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import ExamplePage from './routes/ExamplePage.tsx';
import Directory from "./routes/maindirectory.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <div />,
            element: <Directory />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
