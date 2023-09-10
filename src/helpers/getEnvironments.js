export const getEnvironments = () => {
  const enviroments = import.meta.env; // Cargo todas las variables de entorno, si no se escribe esta linea entonces solo se retornara un objeto vacio

  return {
    ...enviroments, // Esparzo todas las variables de entorno y las retorno
  };
};
