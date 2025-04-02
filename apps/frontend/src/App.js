import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExamplePage from './routes/ExamplePage.tsx';
function App() {
    var router = createBrowserRouter([
        {
            path: '/',
            errorElement: _jsx("div", {}),
            element: _jsx(ExamplePage, {}),
        },
    ]);
    return _jsx(RouterProvider, { router: router });
}
export default App;
