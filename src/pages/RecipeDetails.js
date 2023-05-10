import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import PropTypes from 'prop-types';
import { fetchDrinksId, fetchMealsId } from '../services/fetchApi';

function RecipeDetails({ recipetype }) {
  const [detailsRecipe, setDetailsRecipe] = useState([]);
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
  console.log(detailsRecipe);
  const NO_MAGIC_NUMBER = 13;
  return (
    <div>
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
    </div>
  );
}

RecipeDetails.propTypes = {
  recipetype: PropTypes.string.isRequired,
};

export default RecipeDetails;
