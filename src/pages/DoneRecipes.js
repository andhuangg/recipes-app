import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [showCopied, setShowCopied] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storedDoneRecipes) {
      const uniqueRecipes = {};
      storedDoneRecipes.forEach((recipe) => {
        uniqueRecipes[recipe.id] = recipe;
      });
      const uniqueRecipesArray = Object.values(uniqueRecipes);
      setDoneRecipes(uniqueRecipesArray);
    }
  }, []);

  const handleShare = (recipeId, recipeType) => {
    const url = `http://localhost:3000/${recipeType === 'meal' ? 'meals' : 'drinks'}/${recipeId}`;
    copy(url);
    setShowCopied(true);
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

      <div>
        <div>

          <button
            data-testid="filter-by-all-btn"
            onClick={ () => handleFilter('all') }
          >
            All
          </button>

          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => handleFilter('meal') }
          >
            Meals
          </button>

          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => handleFilter('drink') }
          >
            Drinks
          </button>

        </div>

        {filteredRecipes.map((recipe, index) => (
          <div key={ index }>

            <Link to={ `/${recipe.type === 'meal' ? 'meals' : 'drinks'}/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>

            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </p>

            <Link to={ `/${recipe.type === 'meal' ? 'meals' : 'drinks'}/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>

            <p data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </p>

            <button
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => handleShare(recipe.id, recipe.type) }
            >
              <img src={ shareIcon } alt="share-button" />
            </button>

            {showCopied && <span>Link copied!</span>}

            {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
              <span
                key={ `${index}-${tagIndex}` }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>

            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default DoneRecipes;
