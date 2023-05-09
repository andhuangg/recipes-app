import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [showInput, setShowInput] = useState(false);
  const location = useLocation();
  const page = location.pathname.includes('/meals') ? 'meals' : 'drinks';

  const handleClick = () => {
    setShowInput(!showInput);
  };

  return (
    <div>
      <a href="/profile">
        <img alt="profileIcon" data-testid="profile-top-btn" src={ profileIcon } />
      </a>

      <button onClick={ handleClick }>
        <img alt="searchIcon" data-testid="search-top-btn" src={ searchIcon } />
      </button>

      {showInput && <SearchBar page={ page } />}

      <title data-testid="page-title">Título da página</title>
    </div>
  );
}

export default Header;
