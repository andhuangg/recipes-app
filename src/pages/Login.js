import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const buttonValidation = () => {
    const maxNumber = 6;
    const emailRegex = /\S+@\S+\.\S+/;
    const validation = emailRegex.test(email) && password.length > maxNumber;
    return !validation;
  };

  const history = useHistory();

  const saveUserLocalStorage = () => {
    const user = { email };
    localStorage.setItem(
      'user',
      JSON.stringify(user),
    );
    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          id="email"
          type="text"
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="email"
        />
      </label>
      <label htmlFor="password">
        <input
          data-testid="password-input"
          id="password"
          type="text"
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="password"
        />
      </label>

      <button
        disabled={ buttonValidation() }
        data-testid="login-submit-btn"
        type="button"
        onClick={ saveUserLocalStorage }

      >
        Enter

      </button>

    </form>
  );
}

export default Login;
