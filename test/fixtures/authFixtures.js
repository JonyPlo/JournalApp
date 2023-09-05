export const initialState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: 'authenticated',
  uid: 'asd123',
  email: 'demo@gmail.com',
  displayName: 'Demo user',
  photoURL: 'https://demo.jpg',
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: undefined,
};

export const demoUser = {
  uid: 'asd123',
  email: 'demo@gmail.com',
  displayName: 'Demo user',
  photoURL: 'https://demo.jpg',
};
