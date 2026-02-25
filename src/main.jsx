import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import Start from './pages/Start.jsx';

import Haircuts from './pages/services/Haircuts.jsx';
import BeardTrimsOrShave from './pages/services/BeardTrimsOrShave.jsx';
import HairColorOrDye from './pages/services/HairColorOrDye.jsx';
import LineOrEdgeUp from './pages/services/LineOrEdgeUp.jsx';
import HairTreatment from './pages/services/HairTreatment.jsx';
import KidsCut from './pages/services/KidsCut.jsx';

import SignIn from './pages/SignIn.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/start', element: <Start /> },
  { path: '/SignIn', element: <SignIn /> },
  {path: '/Haircuts', element: <Haircuts /> },
  {path: '/BeardTrimsOrShave', element: <BeardTrimsOrShave /> },
  {path: '/HairColorOrDye', element: <HairColorOrDye /> },
  {path: '/LineOrEdgeUp', element: <LineOrEdgeUp /> },
  {path: '/HairTreatment', element: <HairTreatment /> },
  {path: '/KidsCut', element: <KidsCut /> },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
);
