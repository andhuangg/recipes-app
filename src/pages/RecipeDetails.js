import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { fetchDrinksId, fetchMealsId } from '../services/fetchApi';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Header from '../components/Header';

const NO_MAGIC_NUMBER = 13;

function RecipeDetails({ recipetype }) {
  const [detailsRecipe, setDetailsRecipe] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShared, setIsShared] = useState('');
  const history = useHistory();
  const recipeId = history.location.pathname.split('/')[2];

  useEffect(() => {
    const handleFetchApi = async () => {
      try {
        let details;
        if (recipetype === 'meals') {
          details = await fetchMealsId(recipeId);
        }
        if (recipetype === 'drinks') {
          details = await fetchDrinksId(recipeId);
        }
        setDetailsRecipe(details);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchApi();
  }, [recipetype, recipeId]);

  const handleClickStart = () => {
    const { location, push } = history;
    push(`${location.pathname}/in-progress`);
  };

  const handleClickShare = () => {
    const pageLink = window.location.href;
    setIsShared(pageLink);
    copy(pageLink);
  };

  const checkFavorite = () => (isFavorite ? setIsFavorite(false) : setIsFavorite(true));

  const handleClickFavorite = (recipe) => {
    const recipeToSave = {
      id: recipe.idMeal || recipe.idDrink,
      type: recipe.idMeal ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const alreadyFavorited = savedFavorites
      .some((savedRecipe) => savedRecipe.id === recipeToSave.id);

    if (alreadyFavorited) {
      const newFavorites = savedFavorites
        .filter((savedRecipe) => savedRecipe.id !== recipeToSave.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      savedFavorites.push(recipeToSave);
      localStorage.setItem('favoriteRecipes', JSON.stringify(savedFavorites));
    }

    checkFavorite();
  };

  return (
    <>
      <Header title="Recipes" iconProfile iconSearch={ false } />

      <div className="container mt-3">
        {detailsRecipe.map((detail, index) => (
          <div key={ index } className="position-relative text-center">

            <img
              data-testid="recipe-photo"
              src={ detail.strMealThumb || detail.strDrinkThumb }
              alt={ detail.strMeal || detail.strDrink }
              className="img-fluid rounded shadow"
            />

            <div className="position-absolute top-0 end-0 d-flex">
              {!isShared ? (
                <button
                  type="button"
                  data-testid="share-btn"
                  className="btn btn-transparent border-0"
                  onClick={ handleClickShare }
                >
                  <img src={ shareIcon } alt="share button" />
                </button>
              ) : (
                <span
                  className="text-warning
                fw-bold bg-white
                rounded p-2
                 bg-transparent"
                >
                  Link copied!
                </span>
              )}

              <button
                type="button"
                data-testid="favorite-btn"
                className="btn btn-transparent border-0"
                onClick={ () => handleClickFavorite(detailsRecipe[0]) }
              >
                <img
                  src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  alt="favorite button"
                />
              </button>
            </div>

            <h2 data-testid="recipe-title">{detail.strMeal || detail.strDrink}</h2>

            <div className="card mt-3 border shadow-lg">
              <div className="card-body">
                <h5 className="card-title">Instructions</h5>
                <p
                  data-testid="instructions"
                  className="card-text"
                >
                  {detail.strInstructions}
                </p>
              </div>
            </div>

            <div className="card mt-3 border shadow-lg">
              <div className="card-body">
                <h5 className="card-title">Ingredients</h5>
                {Object.keys(detailsRecipe[0])
                  .filter((key) => key.includes('strIngredient')
                    && detailsRecipe[0][key] !== null)
                  .map((key) => {
                    const ingredientIndex = parseInt(
                      key.substring(NO_MAGIC_NUMBER),
                      10,
                    ) - 1;
                    return (
                      <p
                        key={ ingredientIndex }
                        data-testid={ `${ingredientIndex}-ingredient-name-and-measure` }
                        className="card-text"
                      >
                        {`${detailsRecipe[0][key]} 
                        ${detailsRecipe[0][`strMeasure${ingredientIndex + 1}`]}`}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-center mt-2 mb-2">
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="btn btn-lg btn-warning width-75"
            onClick={ () => handleClickStart() }
          >
            Start Recipe
          </button>
        </div>
      </div>
    </>
  );
}

RecipeDetails.propTypes = {
  recipetype: PropTypes.string.isRequired,
};

export default RecipeDetails;
