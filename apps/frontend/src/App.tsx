import React from 'react';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import ExamplePage from './routes/ExamplePage.tsx';
import FormPage from './routes/FormPage.tsx';
import HomePage from './routes/HomePage.tsx';
import HomeHeader from './components/HomeHeader.tsx';
import Directory from './routes/maindirectory.tsx';

function RootLayout() {
    return (
        <div>
            <HomeHeader
                title="Home Page"
                homelabel="| Home |"
                homelabelLink="/"
                formlabel={' Service Request |'}
                formlabelLink={'/servicereqs'}
            />
            <Outlet />
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <div />,
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <ExamplePage />,
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
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;

import Login from "./components/Login.tsx";

function App() {
    return (<Login />
    );
     origin/CSP-2-employee-login
}

export default App;
