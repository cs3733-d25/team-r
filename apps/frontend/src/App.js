import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import ExamplePage from './routes/ExamplePage.tsx';
import FormPage from './routes/FormPage.tsx';
import HomeHeader from "./components/HomeHeader.tsx";
function RootLayout() {
    return (_jsxs("div", { children: [_jsx(HomeHeader, { title: "Home Page", homelabel: "| Home |", homelabelLink: "/", formlabel: " Service Request |", formlabelLink: "/servicereqs" }), _jsx(Outlet, {})] }));
}
var router = createBrowserRouter([
    {
        path: '/',
        errorElement: _jsx("div", {}),
        element: _jsx(RootLayout, {}),
        children: [
            {
                path: '/',
                element: _jsx(ExamplePage, {}),
            },
            {
                path: '/servicereqs',
                element: _jsx(FormPage, {}),
            }
        ]
    },
]);
function App() {
    return _jsx(RouterProvider, { router: router });
}
export default App;
