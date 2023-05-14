import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import unfavoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import useFavorites from '../hooks/useFavoriteButton';
import '../App.css';

export default function RecipeInProgressComponent({ mealData }) {
  const { isFavorite, toggleFavorite } = useFavorites(mealData);
  const history = useHistory();

  const getIngredients = () => {
    const ingredientNumbers = Array.from({ length: 20 }, (_, i) => i + 1);
    const ingredientsList = [];

    ingredientNumbers.forEach((num) => {
      const ingredient = mealData[`strIngredient${num}`];
      const measure = mealData[`strMeasure${num}`];
      if (ingredient) {
        ingredientsList.push({ ingredient, measure });
      }
    });

    return ingredientsList;
  };

  const ingredients = getIngredients();
  const [copyMessage, setCopyMessage] = useState('');
  const [allChecked, setAllChecked] = useState(false);

  const [checkedItems, setCheckedItems] = useState(() => {
    const savedProgress = localStorage.getItem(`recipeInProgress-${mealData.idMeal
      ? mealData.idMeal : mealData.idDrink}`);
    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
    return new Array(ingredients.length).fill(false);
  });

  const copyToClipboard = () => {
    const link = window.location.href;
    const baseLink = link.substring(0, link.indexOf('/in-progress'));
    navigator.clipboard.writeText(baseLink);
    setCopyMessage('Link copied!');
  };

  useEffect(() => {
    localStorage.setItem(`recipeInProgress-${mealData.idMeal
      ? mealData.idMeal : mealData.idDrink}`, JSON.stringify(checkedItems));
  }, [checkedItems, mealData.idMeal, mealData.idDrink]);

  useEffect(() => {
    setAllChecked(checkedItems.every((item) => item === true));
  }, [checkedItems]);

  useEffect(() => {
    setAllChecked(checkedItems.every((item) => item === true));
  }, [checkedItems]);

  const handleCheck = (index) => {
    setCheckedItems((oldArray) => {
      const newArray = [...oldArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  const finishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const newDoneRecipe = {
      id: mealData.idMeal ? mealData.idMeal : mealData.idDrink,
      type: mealData.idMeal ? 'meal' : 'drink',
      nationality: mealData.strArea || '',
      category: mealData.strCategory || '',
      alcoholicOrNot: mealData.strAlcoholic || '',
      name: mealData.strMeal ? mealData.strMeal : mealData.strDrink,
      image: mealData.strMealThumb ? mealData.strMealThumb : mealData.strDrinkThumb,
      doneDate: new Date(),
      tags: mealData.strTags ? mealData.strTags.split(',') : [],
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newDoneRecipe]));
    history.push('/done-recipes');
  };

  return (
    <section>
      <img
        src={ mealData.strMealThumb ? mealData.strMealThumb : mealData.strDrinkThumb }
        alt={ mealData.strMealThumb ? mealData.strMealThumb : mealData.strDrinkThumb }
        data-testid="recipe-photo"
      />

      <p data-testid="recipe-title">
        {mealData.strMeal ? mealData.strMeal : mealData.strDrink}
      </p>

      <p data-testid="recipe-category">
        {mealData.strCategory}
      </p>

      <button data-testid="share-btn" onClick={ copyToClipboard }>
        <img src={ shareIcon } alt="" />
      </button>
      <span>{copyMessage}</span>

      <button
        data-testid="favorite-btn"
        onClick={ toggleFavorite }
        src={ isFavorite ? favoriteIcon : unfavoriteIcon }
      >
        <img src={ isFavorite ? favoriteIcon : unfavoriteIcon } alt="" />
      </button>

      <p data-testid="instructions">
        {mealData.strInstructions}
      </p>

      <ul style={ { listStyleType: 'none' } }>
        {ingredients.map((item, index) => (
          <li key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              className={ checkedItems[index] ? 'ingredientDone' : '' }
            >
              <input
                type="checkbox"
                checked={ checkedItems[index] }
                onChange={ () => handleCheck(index) }
              />
              <span>
                {`${item.ingredient} - ${item.measure}`}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <button
        data-testid="finish-recipe-btn"
        disabled={ !allChecked }
        onClick={ finishRecipe }
      >
        Finalizar
      </button>
    </section>
  );
}

RecipeInProgressComponent.propTypes = {
  mealData: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strArea: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strTags: PropTypes.string,
    ...Array.from({ length: 20 }, (_, i) => i + 1).reduce((acc, num) => ({
      ...acc,
      [`strIngredient${num}`]: PropTypes.string,
      [`strMeasure${num}`]: PropTypes.string,
    }), {}),
  }).isRequired,
};
