import { Link as RouterLink } from 'react-router-dom'; // Renombro el Link por el alias RouterLink ya que tambien estoy importando un componente Link de la libreria de material y tener los 2 con el mismo nombre provocaría un conflicto
import { Google } from '@mui/icons-material';
import { Button, Grid, TextField, Typography, Link } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
  return (
    <AuthLayout title='Login'>
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* En MaterialUI el componente TextField es un input */}
            <TextField
              label='Correo'
              type='email'
              placeholder='joonyyplo@gmail.com'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* En MaterialUI el componente TextField es un input */}
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
