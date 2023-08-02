import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { journalRoutes } from '../journal';
import { authRoutes } from '../auth';

const router = createBrowserRouter([...journalRoutes, ...authRoutes]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
