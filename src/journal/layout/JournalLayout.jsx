import { Box } from '@mui/system';
import { NavBar, SideBar } from '../components';
import { Toolbar } from '@mui/material';

const drawerWidth = 240; // El numero 240 lo usaremos como valor de 240px

export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: 'flex' }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
