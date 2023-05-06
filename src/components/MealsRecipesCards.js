import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeProvider';
import '../App.css';

function MealsRecipesCards() {
  const {
    dataMeals,
    categoriesMeals,
  } = useContext(RecipeContext);
  return (
    <div>
      <h1>Meals</h1>
      <label>
        { categoriesMeals.map((category, index) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            type="button"
            name={ `${category.strCategory}-category-filter` }
            id={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>))}
      </label>
      { dataMeals.map((meal, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            className="recipes-img"
            src={ meal.strMealThumb }
            alt={ `${meal.strMeal}` }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { meal.strMeal }
          </p>
        </div>
      ))}
    </div>
  );
}

export default MealsRecipesCards;
