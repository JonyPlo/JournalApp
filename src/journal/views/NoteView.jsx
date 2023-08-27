import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from '../../store/journal';

export const NoteView = () => {
  const dispatch = useDispatch();
  const { activeNote, messageSaved, isSaving } = useSelector(
    (state) => state.journal
  );
  // En este componente, el useForm se ejecuta una sola vez, que es cuando el componente se crea, asi qe por mas que activeNote cambie, el useForm no actualizara los estados, por lo tanto no cambiaran los valores en la pagina, para resolver esto fue necesario agregar un useEffect dentro de useForm que tenga como dependencia el activeNote que recibe como parametro para detectar los cambios y asi setear el nuevo estado a formState y el custom hook retorne los nuevos estados
  const { body, title, date, onInputChange, formState } = useForm(activeNote);

  const dateString = useMemo(() => {
    const newDate = new Date();
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files.length === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

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
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type='file'
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <IconButton
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          onClick={onSaveNote}
          color='primary'
          sx={{ padding: 2 }}
          disabled={isSaving}
        >
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
          name='title'
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='Que sucedio en el dia de hoy?'
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>

<Grid container justifyContent='end'>
  <Button onClick={onDelete} sx={{mt: 2}} color='error'>
    <DeleteOutline/>
    Borrar
  </Button>

</Grid>

      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  );
};
