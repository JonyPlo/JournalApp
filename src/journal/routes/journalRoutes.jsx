import { Navigate } from 'react-router-dom';
import { JournalPage } from '../';

export const journalRoutes = [
  {
    index: true, // index = true significa que cuando la ruta sea igual a la del path padre que en este caso es "/", se renderizara el elemento de este objeto
    element: <JournalPage />,
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
];
