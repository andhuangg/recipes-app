// import React from 'react';
// import { screen, render } from '@testing-library/react';
// import App from '../App';
// import { buttonValidation } from '../pages/Login';
// // import login from '../pages/Login';

// describe('Testa página de Login', () => {
//   it('Verifica inputs de email e senha na tela', () => {
//     render(<App />);
//     const email = screen.getByTestId('email-input');
//     expect(email).toBeInTheDocument();

//     const password = screen.getByTestId('password-input');
//     expect(password).toBeInTheDocument();
//   });

//   it('Verifica se o email é válido', () => {
//     expect(buttonValidation('email@example.com')).toBe(true);
//     expect(buttonValidation('email@.com')).toBe(false);
//   });

//   it('Verifica se o botão aparece na tela', () => {
//     const btn = screen.getByRole('button');
//     expect(btn).toBeInTheDocument();
//   });
// });
