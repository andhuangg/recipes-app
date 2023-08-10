import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import chefLogo from '../images/chefLogo.svg';

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
    <div className="container mt-5">
      <div className="text-center mb-5">
        <img src={ chefLogo } alt="Chef Food Logo" className="mb-3 height-100" />
        <h1>Chef Food</h1>
      </div>

      <form className="max-width-600 mx-auto">
        <div className="mb-3">
          <input
            data-testid="email-input"
            id="email"
            type="email"
            className="form-control"
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="Email"
          />
        </div>

        <div className="mb-3">
          <input
            data-testid="password-input"
            id="password"
            type="password"
            className="form-control"
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder="Password"
          />
        </div>

        <button
          disabled={ buttonValidation() }
          data-testid="login-submit-btn"
          type="button"
          className="btn btn-darkorange w-100"
          onClick={ saveUserLocalStorage }
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
