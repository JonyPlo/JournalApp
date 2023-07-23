import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { authRoutes } from '../auth/routes/authRoutes';
import { journalRoutes } from '../journal/routes/JournalRoutes';

const router = createBrowserRouter([...authRoutes, ...journalRoutes]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
