export const fileUpload = async (file) => {
  if (!file) throw new Error('No tenemos ningun archivo a subir');

  const cloudUrl = 'https://api.cloudinary.com/v1_1/cloudinary-jony/upload';
  const formData = new FormData();

  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) throw new Error('No se pudo subir la imagen');
    const { secure_url } = await resp.json();

    return secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
