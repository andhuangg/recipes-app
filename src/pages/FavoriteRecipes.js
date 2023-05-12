import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const getFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  console.log(getFromLocalStorage);
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
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ object.image }
            alt=""
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${object.nationality} - ${object.category}`}
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { object.name }
          </p>
          <button
            type="button"
            // onClick={  }
          >
            <img
              src={ shareIcon }
              alt="share button"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
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
