import { Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages';
import ErrorPage from '../../ErrorPage';

export const authRoutes = [
  {
    path: '/auth/*',
    errorElement: <ErrorPage/>,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: '*',
        element: <Navigate to='/auth/login' />,
      },
    ],
  },
];
