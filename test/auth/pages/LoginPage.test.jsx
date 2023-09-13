import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../../src/store/auth';
import { MemoryRouter } from 'react-router-dom';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

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

  });
});
