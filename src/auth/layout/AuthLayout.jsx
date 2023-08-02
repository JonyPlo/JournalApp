import { Grid, Typography } from '@mui/material';
import propTypes from 'prop-types';

export const AuthLayout = ({ children, title }) => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4,
      }} // La propiedad sx es como si fuera un style extended, esta propiedad tiene las mismas funciones que la propiedad style de cualquier etiqueta HTML, pero ademas tambien nos da acceso a el tema que nosotros definimos con nuestro ThemeProvider, en este caso el ThemeProvider esta ubicado dentro del componente AppTheme.jsx
    >
      <Grid
        item
        className='box-shadow'
        xs={3}
        sx={{
          width: { sm: 450 }, // Dentro de este with podemos asignar un objeto y definir diferentes tamaños de pantalla y los pixeles que queramos que tengan, por ejemplo en este caso estamos diciendo que desde el tamaño de pantallas small en adelante sera de 450px
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant='h5' sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

AuthLayout.propTypes = {
  children: propTypes.any.isRequired,
  title: propTypes.string.isRequired,
};

AuthLayout.defaultProps = {
  children: <p>Default tag</p>,
  title: 'Default Title',
};
