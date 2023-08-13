import { Link as RouterLink } from 'react-router-dom'; // Renombro el Link por el alias RouterLink ya que tambien estoy importando un componente Link de la libreria de material y tener los 2 con el mismo nombre provocaría un conflicto
import {
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

const regExpDisplayName = /^[A-Za-z\s?]{4,30}$/;
const regExpEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;

const formValidations = {
  displayName: [
    (value) => value?.match(regExpDisplayName),
    'No debe tener numeros y caracteres especiales. Entre 4 y 30 caracteres',
  ],
  email: [
    (value) => value?.match(regExpEmail),
    'El correo debe ser similar al siguiente formato: "correo@gmail.com"',
  ],
  password: [
    (value) => value?.match(regExpPassword),
    'Debe tener al menos 1 mayuscula, 1 minuscula y 1 numero. Entre 8 y 16 caracteres ',
  ],
};

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  );

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title='Crear cuenta'>
      <form
        onSubmit={onSubmit}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* En MaterialUI el componente TextField es un input */}
            <TextField
              label='Nombre Completo'
              type='text'
              placeholder='Nombre Completo'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={Boolean(displayNameValid) && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* En MaterialUI el componente TextField es un input */}
            <TextField
              label='Correo'
              type='email'
              placeholder='joonyyplo@gmail.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={Boolean(emailValid) && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* En MaterialUI el componente TextField es un input */}
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={Boolean(passwordValid) && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={Boolean(errorMessage) ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                disabled={isCheckingAuthentication}
              >
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
