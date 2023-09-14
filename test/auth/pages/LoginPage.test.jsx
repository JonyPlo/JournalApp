import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../../src/store/auth';
import { MemoryRouter } from 'react-router-dom';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn(); // IMPORTANTE: Es importante que al comienzo del nombre de la variable lleve la palabta 'mock' de lo contrario no funcionara
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword:
    ({ email, password }) =>
    () =>
      mockStartLoginWithEmailPassword({ email, password }), // En la primer funcion anonima recibimos por parametro el email y password que recibe el startLoginWithEmailPassword real cuando se hace el submit del email y pasword en el tercer test, y esa funcion retorna otra funcion que lo que hace es ejecutar el mock mockStartLoginWithEmailPassword con los argumentos email y password que los recibio de la primer funcion, y de esta forma se envian argumentos que reciben las funciones reales a sus mocks
}));

// Creo un store para poder mandarselo al componente que quiero testear
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  // Este preloadedState establece a mis estados un estado inicial que sera el que yo le especifique, en este caso quiero que los estados de auth se inicialicen como los que tengo ya predefinidos en el objeto notAuthenticatedState
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe('Testing in LoginPage', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should display the component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('google button should call startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText('googleButton');

    fireEvent.click(googleBtn);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test('submit should call startLoginWithEmailPassword', () => {
    const email = 'jony@gmail.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByLabelText('password');
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password },
    });

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
