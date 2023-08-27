import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { SidebarItem } from './SidebarItem';

export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);

  return (
    <Box
      component='nav'
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant='permanent'
        open
        //onClose={} // Esta propiedad me permite realizar cualquier logica o condicion que quiera cuando se cierre el Drawer
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notes.length === 0 ? (
            <Grid
              container
              justifyContent={'center'}
              alignItems={'center'}
              sx={{ minHeight: '100vh' }}
            >
              <Typography variant='h5' color={'GrayText'} mx={'.7em'}>
                No hay notas guardadas por el momento
              </Typography>
            </Grid>
          ) : (
            notes?.map((note) => <SidebarItem key={note.id} {...note} />)
          )}
        </List>
      </Drawer>
    </Box>
  );
};
