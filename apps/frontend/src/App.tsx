import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import ExamplePage from './routes/ExamplePage.tsx';
import SanitationRequestForm from './components/SanitationRequest/SanitationRequestForm.tsx';

function App() {
  const router = createBrowserRouter([
      {
          path: '/',
          errorElement: <p>Page not found</p>,
          children: [
              { index: true, element: <HomeMain /> },
              { path: 'login', element: <Login /> },
              { path: 'servicereqs', element: <FormPage /> },
              { path: 'directory', element: <Directory /> },
              { path: 'mapView', element: <MapView /> },
              { path: 'sanitation', element: <SanitationRequestForm /> }, // Add this line
          ],
      },
  ]);

    return <RouterProvider router={router} />;
}

export default App;
