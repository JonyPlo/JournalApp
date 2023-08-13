import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

// ---------- LOGIN CON GOOGLE ----------

// Esta constante es el proveedor que vamos a usar para que aparezca el popup
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result); // Con esta linea puedo obtener las credenciales, como por ejemplo obtener un toquen que se pueda verificar del lado de google y otras cosas
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      //User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

// NOTA: parte de todo este codigo fue sacado de la siguiente URL: https://firebase.google.com/docs/auth/web/google-signin

// ---------- REGISTRO MANUAL EN GOOGLE ----------

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    // Para llegar a Firebase ocupamos una funcion de Firebase llamada createUserWithEmailAndPassword la cual necesita 3 argumentos, el Auth, que lo extraemos del archivo config.js, el email y el password que queremos registrar
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = result.user;

    // Actualizar el displayName en Firebase. Para esto Firebase nos facilita una funcion llamada updateProfile(), la cual necesita 2 argumentos, el primero seria el usuario logueado actualmente, para eso Firebase tambien nos facilita una propiedad llamada currentUser que la extraemos de FirebaseAuth, la funcion createUserWithEmailAndPassword cuando crea un usuario automaticamente tambien lo loguea en Firebase, y el segundo argumento es un objeto para especificar las propiedades que queremos actualizar, por ejemplo: { displayName, photoURL }
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    const errorCode =
      error.code === 'auth/email-already-in-use'
        ? `El email ${email} ya se encuentra registrado`
        : error.code;

    return {
      ok: false,
      errorCode,
    };
  }
};

// ---------- LOGIN CON USER Y PASSWORD EN GOOGLE ----------

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { displayName, photoURL, uid } = result.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    const errorCode =
      error.code === 'auth/user-not-found'
        ? 'El usuario no esta registrado'
        : error.code === 'auth/wrong-password'
        ? 'Email o password incorrectos'
        : error.code;

    return {
      ok: false,
      errorCode,
    };
  }
};

// ---------- LOGOUT ----------

export const logoutFirebase = async () => {
  // Con en metodo signOut() podemos cerrar la sesion en google, facebook, firebase, twitter, etc. El metodo no retorna nada si el cierre de sesion es exitoso, pero si no pudo cerrar, entonces si devuelve un error
  return await FirebaseAuth.signOut();
};
