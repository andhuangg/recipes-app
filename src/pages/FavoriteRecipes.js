import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [copiedRecipeId, setCopiedRecipeId] = useState(null);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const handleShare = (type, id) => {
    const url = `http://localhost:3000/${type}s/${id}`;
    copy(url);
    setCopiedRecipeId(id);
  };

  return (
    <>
      <Header title="Favorite Recipes" iconProfile iconSearch={ false } />
      <div className="container mt-3">

        {favoriteRecipes.map((recipe, index) => (
          <div
            key={ index }
            className="d-flex align-items-center mb-2 shadow p-2 bg-white"
          >
            <div className="w-15 mr-3 width-60">
              <a href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="flex-fill">
              <h6 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h6>
              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="text-muted mb-0"
              >
                {recipe.alcoholicOrNot
                  ? recipe.alcoholicOrNot
                  : `${recipe.nationality} - ${recipe.category}`}
              </p>
            </div>
            <div>
              {copiedRecipeId === recipe.id ? (
                <span className="text-warning">Link copied!</span>
              ) : (
                <button
                  type="button"
                  onClick={ () => handleShare(recipe.type, recipe.id) }
                  className="btn btn-transparent p-0"
                >
                  <img
                    src={ shareIcon }
                    alt="share button"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FavoriteRecipes;
