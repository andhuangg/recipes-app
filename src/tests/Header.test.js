import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { getByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import AppProvider from '../context/AppProvider';
import RecipeProvider from '../context/RecipeProvider';
import HeaderProvider from '../context/HeaderProvider';

describe('testes pagina de header', () => {
  test('Redenrizando o header', () => {
    renderWithRouter(<Header />);
  });

  test('Testanto testids', () => {
    renderWithRouter(<Header />);
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    // expect(getByTestId('search-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
  });

  test('Testanto history', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );
    const button = getByTestId('profile-top-btn');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/profile');
  });

  test('testando função handleClick', async () => {
    renderWithRouter(
      <HeaderProvider>
        <RecipeProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </RecipeProvider>
      </HeaderProvider>,
    );
    // history.push('/meals');
    const testEmail = screen.getByTestId('email-input');
    const testSenha = screen.getByTestId('password-input');
    const buttonUser = screen.getByRole('button');

    userEvent.type(testEmail, 'laissa@laissa.com');
    userEvent.type(testSenha, 'laissalaissa.com');
    userEvent.click(buttonUser);

    const searchButton = await screen.findByTestId('button-search');
    userEvent.click(searchButton);

    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });
});
