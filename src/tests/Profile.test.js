import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Profile from '../pages/Profile';

describe('testes pagina de perfil', () => {
  const testEmail = 'test@test.com'; // tava dando erro de lint por a string literal estar duplicada 3x

  it('1 se renderiza o email', () => {
    localStorage.setItem('user', JSON.stringify({ email: testEmail }));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    expect(screen.getByTestId('profile-email')).toHaveTextContent(testEmail);
  });

  it('2 vai mandar pra pagina de receitas concluidas quando clico no botão', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    fireEvent.click(getByTestId('profile-done-btn'));
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('3 vai mandar pra pagina de receitas favoritas quando clico no botão', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    fireEvent.click(getByTestId('profile-favorite-btn'));
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('4 limpa o localstorage e manda pro login', () => {
    localStorage.setItem('user', JSON.stringify({ email: testEmail }));
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    fireEvent.click(getByTestId('profile-logout-btn'));
    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe('/');
  });
});
