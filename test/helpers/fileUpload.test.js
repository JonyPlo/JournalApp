import { v2 as cloudinary } from 'cloudinary'; // Esto es el SDK de backend noje.js de cloudinary
import { fileUpload } from '../../src/helpers/fileUpload';

// Creo la configuracion de cloudinary usando los datos que tengo en mi dashoard de cloudinary y asi realisar la conexion con mi base de datos de cloudinary por decirlo asi
cloudinary.config({
  cloud_name: 'cloudinary-jony',
  api_key: '415993575373419',
  api_secret: 'I3Z7x2_Zd9OyPHzvTn1cuOX-FBo',
  secure: true,
});

describe('Testing in fileUpload', () => {
  test('should upload files correctly on cloudinary ', async () => {
    const imageUrl =
      'https://fotos.perfil.com//2023/08/09/900/0/baki-hanma-la-serie-furor-de-netflix-1628054.jpg';
    const resp = await fetch(imageUrl);
    const blob = await resp.blob(); //El metodo blob() se usa para extraer el archivo propiamente dicho y guardarlo en la constante blob, se lo podria ver tambien como descargar la imagen con .blob() y guardarla en blob
    const file = new File([blob], 'foto.jpg'); // blob es el archivo descargado pero para poder usar ese archivo con javascript ya sea cargar la imagen en algun lugar o usarlo en alguna parte del codigo debo guardarlo en un objeto File()
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    // Elimino la imagen que acabo de subir
    const sergments = new URL(url).pathname
      .split('/')
      .filter((path) => path !== '');
    const imageId = sergments[5].replace('.jpg', '');

    await cloudinary.api.delete_resources([`journal/${imageId}`], {
      resource_type: 'image',
    }); // Si las imagenes estan guardadas en una carpeta en cludinary hay que aclarar la ruta, en este caso en cloudinary guardo las imagenes dentro de una carpeta llamada journal, asi que tengo que especificar la carpeta y recien el id de la imagen. La opcion resource_type no es necesaria pero sirve para asegurarme que lo que voy a borrar es una imagen, tambien podemos asegurarnos si sera un video, etc.
  });

  test('should return null', async () => {
    const file = new File([], 'fotoo.jpg');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
