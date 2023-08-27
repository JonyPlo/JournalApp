import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from './journalSlice';
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers/fileUpload';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // Obtengo el uid del usuario logueado
    const { uid } = getState().auth;

    dispatch(savingNewNote());

    // Creo el elemento que se guardara en la DB
    const newNote = {
      title: '',
      body: '',
      imageUrls: [],
      date: new Date().getTime(),
    };

    // Con la funcion doc() de firestore especifico la coleccion a la que quiero apuntar y luego el path que seria la ruta en donde se encuentran mis documentos que quiero almacenar, dicho path se encuentra en Firestore Database dentro de mi app en Forebase
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    // Con la funcion setDoc guardamos un elemento en la base de datos, y para eso necesita dos argumentos, uno es la referencia sobre en donde quiero guardar el elemento, y el segundo argumento es el elemento a guardar. NOTA: recordar que para que esto funcione, en las reglas de firestore debe estar especificado que el usuario debe estar autenticado para poder leer y escribir en la base de datos, por ejemplo agregar la siguiente regla "allow read, write: if request.auth != null;", de lo contrario nos devolvera un error. Recordar que tambien se pueden agregar mas reglas al archivo como por ejemplo controlar que se puede guardar y que no, donde guardar y donde no, etc.
    await setDoc(newDoc, newNote);

    // Creo la propiedad id en el objeto newNote y le asigno el id de la nota que me devuelve Firebase en el objeto newDoc
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    dispatch(setSaving()); // Cambio el state isSaving a true

    const noteToFirestore = { ...activeNote };
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true }); // La opcion merge: true hace que al reemplazar el objeto que esta en firestore por el nuevo que estoy mandando, se mantengan sus propiedades que no coincidan con el nuevo que estoy mandando, por ejemplo, aqui estoy mandando un objeto nuevo que ya no tiene la propiedad id, pero el objeto en firestore si tiene esa propiedad, entonces se reemplazara el objeto viejo de firestore por el nuevo que estoy mandando pero se conservara la propiedad id con su valor del objeto viejo en el nuevo

    dispatch(updateNote(activeNote));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    // Debido a que si quiero cargar varias imagenes tengo que hacer muchas peticiones post por cada imagen, en este caso usaremos Promise.all() para que una vez se hayan subido todas las imagenes y todas las promesas hayan terminado, revien continuaria el codigo
    // Inicializo un arreglo que contendra todas las promesas
    const fileUploadPromises = [];
    for (const file of files) {
      // Recorro el array files que llega como parametro y pusheo dentro de fileUploadPromises una promesa por cada item que tenga el arreglo files
      fileUploadPromises.push(fileUpload(file));
    }

    //Intoduzco el arreglo de promesas dentro de Promise.all()
    const photosUrl = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrl));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);

    try {
      await deleteDoc(docRef);
      dispatch(deleteNoteById(activeNote.id));
    } catch (error) {
      console.log(error);
      throw new Error('Error al intentar borrar la nota');
    }
  };
};
