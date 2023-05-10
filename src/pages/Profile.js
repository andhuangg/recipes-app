import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user'));

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header title="Profile" iconProfile iconSearch={ false } />
      <p data-testid="profile-email">
        {userEmail}
      </p>
      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
