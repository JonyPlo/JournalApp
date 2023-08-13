import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { journalRoutes } from '../journal';
import { authRoutes } from '../auth';
import { AuthRouter } from '../auth/routes/AuthRouter';
import { JournalRouter } from '../journal/routes/JournalRouter';

const router = createBrowserRouter([
  {
    path: 'auth/*',
    element: <AuthRouter />,
    children: authRoutes,
  },
  {
    path: '/*',
    element: <JournalRouter />,
    children: journalRoutes,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
