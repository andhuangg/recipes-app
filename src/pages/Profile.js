import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const storedUser = localStorage.getItem('user');
  // const userEmail = JSON.parse(localStorage.getItem('user'));
  // const userEmail = JSON.parse(localStorage.getItem('user')).email;
  const userEmail = storedUser ? JSON.parse(storedUser).email : null;

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header title="Profile" iconProfile iconSearch={ false } email={ userEmail } />
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
      <Footer />
    </div>
  );
}

export default Profile;
