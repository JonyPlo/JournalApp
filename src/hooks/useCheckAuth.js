import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/auth';
import { FirebaseAuth } from '../firebase/config';

export const useCheckAuth = () => {
  // Aqui defino la logica para evaluar cada vez que recargue la pagina si el usuario sigue autenticado o no
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Con onAuthStateChanged Firebase nos ofrece una forma de estar pendiente de los cambios que el usuario va a tener, ya sea que inicie o cierre sesion, en otras palabras la funcion onAuthStateChanged se le conoce como un obserbable, quiere decir que son funciones que estan todo el tiempo pendiendes de si algo cambio o no para dispararse nuevamente
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, []);

  return status;
};
