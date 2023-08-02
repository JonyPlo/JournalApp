import { Link as RouterLink } from 'react-router-dom'; // Renombro el Link por el alias RouterLink ya que tambien estoy importando un componente Link de la libreria de material y tener los 2 con el mismo nombre provocaría un conflicto
import { Button, Grid, TextField, Typography, Link } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title='Crear cuenta'>
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* En MaterialUI el componente TextField es un input */}
            <TextField
              label='Nombre Completo'
              type='text'
              placeholder='Nombre Completo'
              fullWidth
            />
          </Grid>
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
            <Grid item xs={12}>
              <Button variant='contained' fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
