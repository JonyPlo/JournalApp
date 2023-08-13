import { Navigate, Outlet } from 'react-router-dom';
import { useCheckAuth } from '../../hooks/useCheckAuth';

export const AuthRouter = () => {
  const status = useCheckAuth();

  return status === 'authenticated' ? <Navigate to={'/'} /> : <Outlet />;
};
