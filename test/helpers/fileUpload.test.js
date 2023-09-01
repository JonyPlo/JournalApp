import { fileUpload } from '../../src/helpers/fileUpload';

describe('Testing in fileUpload', () => {
  test('should upload files correctly on cloudinary ', async () => {
    const imageUrl =
      'https://fotos.perfil.com//2023/08/09/900/0/baki-hanma-la-serie-furor-de-netflix-1628054.jpg';
    const resp = await fetch(imageUrl);
    const blob = await resp.blob(); //El metodo blob() se usa para extraer el archivo propiamente dicho y guardarlo en la constante blob, se lo podria ver tambien como descargar la imagen con .blob() y guardarla en blob
    const file = new File([blob], 'foto.jpg'); // blob es el archivo descargado pero para poder usar ese archivo con javascript ya sea cargar la imagen en algun lugar o usarlo en alguna parte del codigo debo guardarlo en un objeto File()

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');
  });
});
