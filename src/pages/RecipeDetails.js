import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { fetchDrinksId, fetchMealsId } from '../services/fetchApi';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../App.css';
import Header from '../components/Header';

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
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipeToSave]));
    checkFavorite();
  };

  const NO_MAGIC_NUMBER = 13;
  return (
    <div>
      <Header title="Favorite Recipes" iconProfile iconSearch={ false } />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleClickShare }

      >
        <img
          src={ shareIcon }
          alt="share button"
        />
      </button>
      { isShared ? <p>Link copied!</p> : null }
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => handleClickFavorite(detailsRecipe[0]) }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="share button"
        />
      </button>
      {detailsRecipe.map((detail, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ detail.strMealThumb || detail.strDrinkThumb }
            alt=""
          />
          <p data-testid="recipe-title">{ detail.strMeal || detail.strDrink }</p>
          <p data-testid="recipe-category">
            { `${detail.strCategory} - ${detail.strAlcoholic}` }
          </p>
          <p data-testid="instructions">{ detail.strInstructions }</p>
          {Object.keys(detailsRecipe[0])
            .filter((key) => key.includes('strIngredient')
            && detailsRecipe[0][key] !== null)
            .map((key) => {
              const ingredientIndex = parseInt(key.substring(NO_MAGIC_NUMBER), 10) - 1;
              return (
                <p
                  key={ index }
                  data-testid={ `${ingredientIndex}-ingredient-name-and-measure` }
                >
                  {
                    `${detailsRecipe[0][key]}
                     ${detailsRecipe[0][`strMeasure${ingredientIndex + 1}`]}`
                  }
                </p>
              );
            }) }
          {recipetype === 'meals' && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ detail.strYoutube.replace('watch?v=', 'embed/') }
              title="Meu vídeo incorporado"
              allow="accelerometer;
            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />)}
        </div>
      ))}
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-button"
        onClick={ () => handleClickStart() }
      >
        Start Recipe
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  recipetype: PropTypes.string.isRequired,
};

export default RecipeDetails;
