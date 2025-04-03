import React from 'react';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import FormPage from './routes/FormPage.tsx';
import HomePage from './routes/HomePage.tsx';
import HomeHeader from './components/HomeHeader.tsx';
import Directory from './routes/maindirectory.tsx';
import Login from './components/Login.tsx';

// function RootLayout() {
//     return (
//         <div>
//             <HomeHeader
//                 title="Home Page"
//                 homelabel="| Home |"
//                 homelabelLink="/"
//                 formlabel={' Service Request |'}
//                 formlabelLink={'/servicereqs'}
//             />
//             <Outlet />
//         </div>
//     );
// }



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
