import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from './journalSlice';
import { loadNotes } from '../../helpers/loadNotes';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // Obtengo el uid del usuario logueado
    const { uid } = getState().auth;

    dispatch(savingNewNote());

    // Creo el elemento que se guardara en la DB
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    // Con la funcion doc() de firestore especifico la coleccion a la que quiero apuntar y luego el path que seria la ruta en donde se encuentran mis documentos que quiero almacenar, dicho path se encuentra en Firestore Database dentro de mi app en Forebase
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    // Con la funcion setDoc guardamos un elemento en la base de datos, y para eso necesita dos argumentos, uno es la referencia sobre en donde quiero guardar el elemento, y el segundo argumento es el elemento a guardar. NOTA: recordar que para que esto funcione, en las reglas de firestore debe estar especificado que el usuario debe estar autenticado para poder leer y escribir en la base de datos, por ejemplo agregar la siguiente regla "allow read, write: if request.auth != null;", de lo contrario nos devolvera un error. Recordar que tambien se pueden agregar mas reglas al archivo como por ejemplo controlar que se puede guardar y que no, donde guardar y donde no, etc.
    const resp = await setDoc(newDoc, newNote);

    // Creo la propiedad id en el objeto newNote y le asigno el id de la nota que me devuelve Firebase en el objeto newDoc
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));

    console.log({ newDoc });
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) throw new Error('El uid del usuario no existe');

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes))
  };
};
