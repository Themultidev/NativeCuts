import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import Start from './pages/Start.jsx';



import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
    {path: '/', element: <App /> },
    {path: 'Start', element: <Start /> },
  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
