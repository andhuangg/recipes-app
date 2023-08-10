import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const storedUser = localStorage.getItem('user');
  const userEmail = storedUser ? JSON.parse(storedUser).email : null;

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <>
      <Header title="Profile" iconProfile iconSearch={ false } email={ userEmail } />

      <div className="container mt-5">
        <div className="d-flex flex-column align-items-center">
          <p data-testid="profile-email" className="mb-4 text-center">
            {userEmail}
          </p>

          <button
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
            className="btn btn-primary btn-block mb-2"
          >
            Done Recipes
          </button>

          <button
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
            className="btn btn-success btn-block mb-2"
          >
            Favorite Recipes
          </button>

          <button
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
            className="btn btn-danger btn-block"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
