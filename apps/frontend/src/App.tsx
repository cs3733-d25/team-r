import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import ExamplePage from './routes/ExamplePage.tsx';
import FormPage from './routes/FormPage.tsx';
import HomePage from './routes/HomePage.tsx';
import HomeHeader from "./components/HomeHeader.tsx";

function RootLayout() {
    return (
        <div>
            <HomeHeader
                title="Home Page"
                homelabel="| Home |"
                homelabelLink="/"
                formlabel={" Service Request |"}
                formlabelLink={"/servicereq"}
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
                path: '/servicereq',
                element: <FormPage />,
            }
        ]
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
