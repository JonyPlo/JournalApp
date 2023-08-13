import { Navigate, Outlet } from 'react-router-dom';
import { useCheckAuth } from '../../hooks/useCheckAuth';

export const JournalRouter = () => {
  const status = useCheckAuth();

  return status === 'not-authenticated' ? (
    <Navigate to={'auth/login'} />
  ) : (
    <Outlet />
  );
};
