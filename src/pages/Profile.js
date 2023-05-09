import React from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user')).email;

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <h1>Profile</h1>
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
