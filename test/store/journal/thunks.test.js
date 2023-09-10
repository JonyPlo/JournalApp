import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';
import { FirebaseDB } from '../../../src/firebase/config';

describe('Testing in Journal Thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('startNewNote should create a new blank note', async () => {
    const uid = 'TEST-UID';

    getState.mockReturnValue({
      auth: { uid },
    });

    // startNewNote no funcionara ya que dentro suyo intentara realizar la autenticacion de firebase para permitirnos guardar la nota, esto se debe a que en las reglas de mi db de produccion en firestore especificamos que para realizar cualquier accion hay que estar autenticados, para resolver esto nos crearemos en firebase otra db/entorno de desarrollo enfocado al testing y ahi si poder definir en las reglas que el usuario no tenga que estar autenticado, las reglas tienen que estar definidas de la diguiente manera "allow read, write;". Por ultimo hay que agregar las configuraciones de la nueva db para testing en el proyecto y hacer los archivos de testing apunten a esa configuracion
    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );

    // Borrar notas/documentos que se crearon en el test de firebase

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    const deletePromises = []; // En este array guardare todas las promesas que se encargaran de eliminar documento por documento

    docs.forEach(({ ref }) => deletePromises.push(deleteDoc(ref)));

    await Promise.all(deletePromises); // NOTA: para que la prueba pase se tuvo que agregar al test un timeout de 10000ms ya que el timeout por defecto es de 5000 y hacer el proceso de crear una nota y borrarla tomaba mas que ese tiempo, por lo tanto el test terminaba con una falla de timeout
  }, 10000);
});
