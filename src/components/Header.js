import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
// import { HeaderContext } from '../context/HeaderProvider';

function Header({ title, iconProfile, iconSearch = true }) {
  // const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  const location = useLocation();
  const page = location.pathname.includes('/meals') ? 'meals' : 'drinks';
  const handleClick = () => {
    setShowInput(!showInput);
  };

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>

      {
        iconProfile
      && (
        <a href="/profile">
          <img
            alt="profileIcon"
            data-testid="profile-top-btn"
            src={ profileIcon }
          />

        </a>
      )
      }

      {/* {
        iconProfile
      && <button type="button" onClick={ () => history.push('/profile') }>
        <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      </button>
      } */}

      {
        iconSearch
      && (
        <button
          type="button"
          onClick={ handleClick }
          name="button-search"
          data-testid="button-search"

        >
          <img
            alt="searchIcon"
            data-testid="search-top-btn"
            src={ searchIcon }
            name="img-search"
          />
        </button>
      )
      }

      {showInput && <SearchBar page={ page } />}

    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  iconProfile: PropTypes.bool,
  searchIcon: PropTypes.bool,
}.isRequired;

export default Header;
