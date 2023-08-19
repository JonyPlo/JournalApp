import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('El uid del usuario no existe');

  // Apunto a mi coleccion llamada notes para tener una referencia de a donde quiero apuntar especificamente y guardo esa referencia en la variable collectionRef
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

  // Con getDocs Firebase nos devuelve todos los gocumentos guardados en la coleccion notes. Tener en cuenta que los docs son referencias a los documentos de Firebase pero no son las notas con sus propiedades, pero si queremos obtener esa data, o sea el objeto con sus propiedades, entonces tengo que llamar la funcion data() que esta dentro de cada uno de esos documentos. NOTA: en getDocs tambien podemos añadir filtros, condiciones, etc, pero en este caso yo quiero traer todos los documentos como estan en Firestore
  const docs = await getDocs(collectionRef);

  const notes = [];

  // Recorro el array docs para extraer la informacion de cada documento y almacenarla en un objeto para luego pushear ese objeto en el array notes. Recordar que la funcion data() de cada documento me devuelve un objeto con las propiedades y valores de dicho objeto que tengo almacenado en Firebase
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return notes;
};
