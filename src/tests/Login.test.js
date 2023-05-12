import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWith';
import Login from '../pages/Login';

// O botão deve estar desativado se o email for inválido
// O botão deve estar desativado se a senha deve 6 caracteres ou menos
// O botão deve estar ativado se o email e a senha forem válidos

const submitBtn = 'login-submit-btn';
const emailIpt = 'email-input';
const passwordIpt = 'password-input';

describe('Testes página de Login', () => {
  test('Verifica se os inputs são renderizados', () => {
    renderWithRouter(<Login />);

    const btn = screen.getByTestId(submitBtn);
    const userEmail = screen.getByTestId(emailIpt);
    const userPassword = screen.getByTestId(passwordIpt);

    expect(btn).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(userPassword).toBeInTheDocument();
  });

  test('O botão deve iniciar desabilitado', () => {
    renderWithRouter(<Login />);
    expect(screen.getByTestId(submitBtn)).toBeDisabled();
  });

  test('O botão deve estar desativado se o email for inválido', () => {
    renderWithRouter(<Login />);
    const btn = screen.getByTestId(submitBtn);
    expect(btn).toBeDisabled();

    const userEmail = screen.getByTestId(emailIpt);
    fireEvent.change(userEmail, { target: { value: 'emailinvalido.com' } });
    expect(btn).toBeDisabled();
  });

  test('O botão deve estar desativado se a senha tem 6 caracteres ou menos', () => {
    renderWithRouter(<Login />);
    const btn = screen.getByTestId(submitBtn);
    expect(btn).toBeDisabled();

    const userPassword = screen.getByTestId(passwordIpt);
    fireEvent.change(userPassword, { target: { value: '123456' } });
    expect(btn).toBeDisabled();
  });
});
