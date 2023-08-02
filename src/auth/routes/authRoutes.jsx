import { Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../';

export const authRoutes = [
  {
    path: 'auth/*',
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
        element: <Navigate to='login' />,
      },
    ],
  },
];
