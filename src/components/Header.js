import React, { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(!showInput);
  };

  return (
    <div>

      <a href="/profile">
        <img
          alt="profileIcon"
          data-testid="profile-top-btn"
          src={ profileIcon }
        />
      </a>

      {/* lógica para esconder e mostrar o input */}

      <button onClick={ handleClick }>
        <img
          alt="searchIcon"
          data-testid="search-top-btn"
          src={ searchIcon }
        />

      </button>

      {showInput && (
        <input
          data-testid="search-input"
        />

      )}
      <title
        data-testid="page-title"
      >
        Título da página
      </title>

    </div>
  );
}

// Header.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };

export default Header;
