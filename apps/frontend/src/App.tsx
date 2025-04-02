import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import ExamplePage from './routes/ExamplePage.tsx';
import EmailPassword from "./components/EmailPassword.tsx";

function App() {
    return (<EmailPassword />
    );
}

export default App;
