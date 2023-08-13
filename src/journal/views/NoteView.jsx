import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';

export const NoteView = () => {
  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid item>
        {/* En el componente Typography podemos usar 2 atributos, el primero es component, que eso lo que hara es decir que etiqueta renderizara el componente Typography, por ejemplo si agregamos component='h2', el componente Typography se convertira en una etiqueta h2 pero el texto no obtendra los cambios per defecto que estas etiquetas ofrecen por defecto, es decir, si hacemos que Typography se convierta en un h1 o una etiqueta p, los estilos del texto no se modificaran. Y por ultimo el atributo variant sirve para cambiar los estilos del texto y la etiqueta, es decir, si agregamos variant='h1' la etiqueta cambiara a h1 y el texto obtendra los estilos de dicha etiqueta. (Typography por defecto es una etiqueta p) */}
        <Typography fontSize='39' fontWeight='light'>
          28 de Agosto, 2023
        </Typography>
      </Grid>
      <Grid item>
        <Button color='primary' sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 20, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un titulo'
          label='Titulo'
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='Que sucedio en el dia de hoy?'
          minRows={5}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
