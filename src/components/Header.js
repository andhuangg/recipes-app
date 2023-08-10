import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import chefLogo from '../images/chefLogo.svg';

function Header({ title, iconProfile, iconSearch = true }) {
  const [showInput, setShowInput] = useState(false);
  const location = useLocation();
  const page = location.pathname.includes('/meals') ? 'meals' : 'drinks';

  const handleClick = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="bg-darkorange mb-2">

      <div
        className="d-flex
       justify-content-between
       align-items-center
       p-3
       border-bottom"
      >

        <Link
          to="/meals"
          className="d-flex align-items-center text-white text-decoration-none"
        >
          <img src={ chefLogo } alt="Chef Logo" className="mr-2 height-75" />
          <h1 data-testid="page-title" className="mb-0">{title}</h1>
        </Link>

        <div className="d-flex align-items-center">
          {iconProfile && (
            <a className="mr-3 text-white" href="/profile">
              <img
                alt="profileIcon"
                data-testid="profile-top-btn"
                src={ profileIcon }
                height="30"
              />
            </a>
          )}
          {iconSearch && (
            <button
              className="btn btn-transparent"
              type="button"
              onClick={ handleClick }
              data-testid="button-search"
            >
              <img
                alt="searchIcon"
                data-testid="search-top-btn"
                src={ searchIcon }
                height="30"
              />
            </button>
          )}
        </div>
      </div>

      {showInput && (
        <div className="p-3 d-flex justify-content-center">
          <div className="w-100 max-width-600">
            <SearchBar page={ page } />
          </div>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  iconProfile: PropTypes.bool,
  searchIcon: PropTypes.bool,
}.isRequired;

export default Header;
