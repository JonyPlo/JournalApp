import { Navigate } from 'react-router-dom';
import { JournalPage } from '../pages/JournalPage';
import ErrorPage from '../../ErrorPage';

export const journalRoutes = [
  {
    path: '/*',
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <JournalPage /> },
      {
        path: '/*',
        element: <Navigate to='/' />,
      },
    ],
  },
];
