import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copiedRecipeId, setCopiedRecipeId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [favoriteStatus, setFavoriteStatus] = useState({});

  useEffect(() => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const storedFavoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes')) || [];

    const initialFavoriteStatus = {};

    storedDoneRecipes.forEach((recipe) => {
      initialFavoriteStatus[recipe.id] = storedFavoriteRecipes
        .some((fav) => fav.id === recipe.id);
    });

    setFavoriteStatus(initialFavoriteStatus);
    setDoneRecipes(storedDoneRecipes);
  }, []);

  const handleClickFavorite = (recipe) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isAlreadyFavorite = favoriteRecipes
      .some((favRecipe) => favRecipe.id === recipe.id);

    if (isAlreadyFavorite) {
      const newFavorites = favoriteRecipes
        .filter((favRecipe) => favRecipe.id !== recipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      favoriteRecipes.push(recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }

    setFavoriteStatus((prevState) => ({
      ...prevState,
      [recipe.id]: !isAlreadyFavorite,
    }));
  };

  const handleShare = (recipeId, recipeType) => {
    const url = `http://localhost:3000/${recipeType === 'meal' ? 'meals' : 'drinks'}/${recipeId}`;
    copy(url);
    setCopiedRecipeId(recipeId);
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const filteredRecipes = doneRecipes.filter((recipe) => {
    if (filter === 'all') return true;
    return recipe.type === filter;
  });

  return (
    <>
      <Header title="Done Recipes" iconProfile iconSearch={ false } />

      <div className="container mt-3">
        <div className="d-flex justify-content-center mb-3">
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => handleFilter('all') }
            className="btn btn-outline-dark me-2 btn-hover-orange"
          >
            All
          </button>

          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => handleFilter('meal') }
            className="btn btn-outline-dark me-2 btn-hover-orange"
          >
            Meals
          </button>

          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => handleFilter('drink') }
            className="btn btn-outline-dark btn-hover-orange"
          >
            Drinks
          </button>
        </div>

        {filteredRecipes.map((recipe, index) => (
          <div
            key={ index }
            className="d-flex align-items-center mb-2 shadow p-2 bg-white"
          >
            <div className="w-15 mr-3 width-60">
              <Link to={ `/${recipe.type === 'meal' ? 'meals' : 'drinks'}/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  className="img-fluid"
                />
              </Link>
            </div>

            <div className="flex-grow-1">
              <h6 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h6>
              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="text-muted mb-0"
              >
                {recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : recipe.alcoholicOrNot}
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
                className="text-muted mb-0"
              >
                {recipe.doneDate}
              </p>
              {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                <span
                  key={ `${index}-${tagIndex}` }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  className="badge bg-secondary me-2"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="d-flex align-items-center">
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => handleClickFavorite(recipe) }
                className="btn btn-link p-0 me-2"
              >
                <img
                  src={ favoriteStatus[recipe.id] ? blackHeartIcon : whiteHeartIcon }
                  alt="favorite button"
                />
              </button>

              {copiedRecipeId === recipe.id ? (
                <span className="text-warning">Link copied!</span>
              ) : (
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => handleShare(recipe.id, recipe.type) }
                  className="btn btn-link p-0"
                >
                  <img src={ shareIcon } alt="share-button" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DoneRecipes;
