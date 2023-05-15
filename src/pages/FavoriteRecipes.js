import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [isNewShared, setIsNewShared] = useState('');
  const getFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const handleClickShare = (type, id) => {
    const pageDetailsPageLink = `http://localhost:3000/${type}s/${id}`;
    setIsNewShared(pageDetailsPageLink);
    copy(pageDetailsPageLink);
  };
  return (
    <div>
      <Header title="Favorite Recipes" iconProfile iconSearch={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        // onClick={  }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        // onClick={  }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        // onClick={  }
      >
        Drinks
      </button>
      { getFromLocalStorage.map((object, index) => (
        <div key={ index }>
          <a
            href={ `http://localhost:3000/${object.type}s/${object.id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ object.image }
              alt="recipe"
            />
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              { object.name }
            </p>
          </a>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {object.alcoholicOrNot
              ? object.alcoholicOrNot : `${object.nationality} - ${object.category}`}
          </p>
          <button
            type="button"
            onClick={ () => handleClickShare(object.type, object.id) }
          >
            <img
              src={ shareIcon }
              alt="share button"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          { isNewShared ? <p>Link copied!</p> : null }
          <button
            type="button"
            // onClick={  }
          >
            <img
              src={ blackHeartIcon }
              alt="favorite button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
